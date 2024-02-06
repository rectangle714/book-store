package com.bootProject.web.item.mapper;

import com.bootProject.web.item.dto.ReviewDTO;
import com.bootProject.web.item.entity.Review;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ReviewMapper {

    ReviewMapper INSTANCE = Mappers.getMapper(ReviewMapper.class);

    @Named("reviewDTOLIst")
    @Mapping(target = "member", source = "member")
    public ReviewDTO toDTO(Review review);

    @IterableMapping(qualifiedByName = "reviewDTOLIst")
    public List<ReviewDTO> toDTOList(List<Review> reviewList);

}
