package com.bootProject.controller;

import com.bootProject.dto.CartDTO;
import com.bootProject.entity.Cart;
import com.bootProject.entity.Item;
import com.bootProject.service.CartService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@Slf4j
@RestController
@RequestMapping("/api/v1/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @PostMapping("/save")
    public ResponseEntity<String> saveCart(@RequestBody CartDTO cartDTO) throws Exception {
        cartService.insertCart(cartDTO);
        return ResponseEntity.ok("success");
    }

    @GetMapping("/selectList")
    public ResponseEntity<List<CartDTO>> getCartList(@RequestParam String email) throws Exception {
        List<CartDTO> result = cartService.selectCartList(email);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/delete")
    public ResponseEntity<String> deleteCart(@RequestBody Long cartId) {
        cartService.deleteCart(cartId);
        return ResponseEntity.ok("success");
    }

}
