package com.bootProject.repository.cart;

import com.bootProject.dto.CartDTO;
import com.bootProject.entity.Cart;
import com.bootProject.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart, Long>, CartRepositoryCustom {
    @Override
    List<CartDTO> selectCartList(String email);
}
