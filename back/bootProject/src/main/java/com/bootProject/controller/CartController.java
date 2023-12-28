package com.bootProject.controller;

import com.bootProject.entity.Item;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@Slf4j
@RestController
@RequestMapping("/api/v1/cart")
@RequiredArgsConstructor
public class CartController {

    @PostMapping("/insert")
    public ResponseEntity<String> insertCart() {
        try{

            return ResponseEntity.ok("SUCCESS");
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.badRequest().body("FAIL");
        }

    }

}
