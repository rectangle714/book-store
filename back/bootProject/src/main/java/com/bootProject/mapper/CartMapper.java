package com.bootProject.mapper;

import com.bootProject.dto.CartDTO;
import com.bootProject.entity.Cart;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface CartMapper {

    CartMapper INSTANCE = Mappers.getMapper(CartMapper.class);

    @Mapping(target = "memberId", source = "member")
    @Mapping(target = "itemId", source = "item")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    public Cart updateFromDto(CartDTO cartDTO);

}
