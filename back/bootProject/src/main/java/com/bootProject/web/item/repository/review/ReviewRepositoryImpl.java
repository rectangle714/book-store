package com.bootProject.web.item.repository.review;

import com.bootProject.web.item.dto.ReviewDTO;
import static com.bootProject.web.item.entity.QItem.item;
import static com.bootProject.web.item.entity.QReview.review;
import static com.bootProject.web.member.entity.QMember.member;

import com.bootProject.web.item.entity.Review;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
public class ReviewRepositoryImpl implements ReviewRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    @Override
    public List<Review> findReviewList(String itemId) {
        List<Review> reviewList = new ArrayList<>();
        reviewList = queryFactory
                .selectFrom(review)
                .join(review.member, member).fetchJoin()
                .where(item.id.eq(Long.parseLong(itemId)))
                .fetch();
        return reviewList;
    }
}
