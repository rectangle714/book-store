package com.bootProject.service;

import com.bootProject.dto.CartDTO;
import com.bootProject.entity.Cart;
import com.bootProject.repository.cart.CartRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Transactional
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;

    public void insertCart(CartDTO cartDTO) {
//        Cart cart = Cart.builder()
//                .memberId()
//                .itemId()
//                .build();

    }

}
