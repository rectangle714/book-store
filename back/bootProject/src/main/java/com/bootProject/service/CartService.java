package com.bootProject.service;

import com.bootProject.common.code.ErrorCode;
import com.bootProject.common.exception.BusinessException;
import com.bootProject.dto.CartDTO;
import com.bootProject.dto.ItemDTO;
import com.bootProject.entity.Cart;
import com.bootProject.entity.Item;
import com.bootProject.entity.Member;
import com.bootProject.repository.cart.CartRepository;
import com.bootProject.repository.item.ItemRepository;
import com.bootProject.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

        ItemDTO itemDTO = itemRepository.findItemById(cartDTO.getCartId());
//        Cart.builder().itemId(itemDTO.getItemId()).memberId(member.getId());
//        cartRepository.save()
    }

}
