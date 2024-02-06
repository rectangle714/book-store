package com.bootProject.web.item.repository.review;

import com.bootProject.web.item.dto.ReviewDTO;
import com.bootProject.web.item.entity.Review;

import java.util.List;

public interface ReviewRepositoryCustom {

    public List<Review> findReviewList(String itemId);

}
