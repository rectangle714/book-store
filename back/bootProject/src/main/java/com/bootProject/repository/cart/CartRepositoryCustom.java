package com.bootProject.repository.cart;

import com.bootProject.dto.CartDTO;
import com.bootProject.entity.Cart;
import com.bootProject.entity.Member;

import java.util.List;

public interface CartRepositoryCustom {

    public List<CartDTO> selectCartList(String email);

}
