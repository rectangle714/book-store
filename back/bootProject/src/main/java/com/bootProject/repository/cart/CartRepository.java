package com.bootProject.repository.cart;

import com.bootProject.dto.CartDTO;
import com.bootProject.entity.Cart;
import com.bootProject.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart, Long>, CartRepositoryCustom {
    @Override
    public List<CartDTO> selectCartList(String email);
    @Override
    public Cart selectByItemIdAndMemberId(Long itemId, Long memberId);

    @Override
    public Page<CartDTO> selectCartPage(Pageable pageable, String email);

}
