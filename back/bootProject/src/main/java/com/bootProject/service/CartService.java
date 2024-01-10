package com.bootProject.service;

import com.bootProject.common.code.ErrorCode;
import com.bootProject.common.exception.BusinessException;
import com.bootProject.dto.CartDTO;
import com.bootProject.dto.ItemDTO;
import com.bootProject.entity.Cart;
import com.bootProject.entity.Item;
import com.bootProject.entity.Member;
import com.bootProject.mapper.CartMapper;
import com.bootProject.mapper.ItemMapper;
import com.bootProject.repository.cart.CartRepository;
import com.bootProject.repository.item.ItemRepository;
import com.bootProject.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class CartService {

    private final MemberRepository memberRepository;
    private final CartRepository cartRepository;
    private final ItemRepository itemRepository;

    public void insertCart(CartDTO cartDTO) throws BusinessException {
        Member member = memberRepository.findByEmail(cartDTO.getEmail())
                .orElseThrow(() -> new BusinessException(ErrorCode.ACCOUNT_NOT_FOUND, ErrorCode.ACCOUNT_NOT_FOUND.getDescription()));
        Item item = ItemMapper.INSTANCE.toEntity(itemRepository.findItemById(cartDTO.getItemId()));

        /* 사용자 장바구니에 존재하는 상품인지 확인 (존재하면 갯수만 +1) */
        Cart isExistItem = cartRepository.selectByItemIdAndMemberId(item.getId(), member.getId());
        if(isExistItem != null) {
            isExistItem.updateQuantity("increse",1);
        } else {
            cartDTO.setMember(member);
            cartDTO.setItem(item);
            Cart cart = CartMapper.INSTANCE.updateFromDto(cartDTO);
            cartRepository.save(cart);
        }
    }

    @Transactional(readOnly = true)
    public List<CartDTO> selectCartList(String email) {
        List<CartDTO> cartList = cartRepository.selectCartList(email);
        return cartList;
    }

    @Transactional(readOnly = true)
    public Page<CartDTO> selectCartPage(Pageable pageable, String email) {
        Page<CartDTO> cartList = cartRepository.selectCartPage(pageable, email);
        return cartList;
    }

    public void deleteCart(Long cartId) {
        Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new RuntimeException("존재하지 않는 장바구니 정보 입니다."));
        cartRepository.delete(cart);
    }

    public void modifyCartQuantity(String flag, Long cartId) {
        Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new RuntimeException("존재하지 않는 장바구니 정보 입니다."));
        cart.updateQuantity(flag, 1);
    }

}
