package com.bootProject.repository.cart;

import com.bootProject.dto.CartDTO;
import com.bootProject.entity.Cart;
import com.bootProject.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CartRepositoryCustom {
    public List<CartDTO> selectCartList(String email);
    public Cart selectByItemIdAndMemberId(Long itemId, Long memberId);
    public Page<CartDTO> selectCartPage(Pageable pageable, String email);

}
