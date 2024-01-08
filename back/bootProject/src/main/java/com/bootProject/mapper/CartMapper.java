package com.bootProject.mapper;

import com.bootProject.dto.CartDTO;
import com.bootProject.entity.Cart;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface CartMapper {

    @Mapping(target = "memberId.id", source = "memberId")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    public Cart updateFromDto(CartDTO cartDTO);

}
