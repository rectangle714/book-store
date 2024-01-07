package com.bootProject.repository.cart;

import com.bootProject.dto.CartDTO;
import com.bootProject.entity.Cart;
import com.bootProject.entity.Member;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;
import static com.bootProject.entity.QCart.cart;
import static com.bootProject.entity.QMember.member;
import static com.bootProject.entity.QItem.item;

@RequiredArgsConstructor
public class CartRepositoryImpl implements CartRepositoryCustom{

    private final JPAQueryFactory queryFactory;
    @Override
    public List<CartDTO> selectCartList(String email) {
        return queryFactory
                .select(
                        Projections.constructor(
                                CartDTO.class, cart.id, cart.quantity,
                                item.title,item.contents, item.price, item.category,
                                member.email
                        )
                )
                .from(cart)
                .leftJoin(cart.memberId, member)
                .leftJoin(cart.itemId, item)
                .where(member.email.eq(email))
                .fetch();
    }
}
