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
        cartDTO.setMember(member);
        cartDTO.setItem(item);
        Cart cart = CartMapper.INSTANCE.updateFromDto(cartDTO);
        cartRepository.save(cart);
    }

    @Transactional(readOnly = true)
    public List<CartDTO> selectCartList(String email) {
        List<CartDTO> cartList = cartRepository.selectCartList(email);
        return cartList;
    }

    public void deleteCart(Long cartId) {
        Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new RuntimeException("존재하지 않는 장바구니 정보 입니다."));
        cartRepository.delete(cart);
    }

}
