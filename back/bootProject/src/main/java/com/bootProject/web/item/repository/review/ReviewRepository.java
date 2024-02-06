package com.bootProject.web.item.repository.review;

import com.bootProject.web.item.dto.ReviewDTO;
import com.bootProject.web.item.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review,Long>, ReviewRepositoryCustom {

    @Override
    List<Review> findReviewList(String itemId);

}
