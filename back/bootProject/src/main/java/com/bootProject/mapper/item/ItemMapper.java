package com.bootProject.mapper.item;

import com.bootProject.dto.ItemDTO;
import com.bootProject.entity.Item;
import com.bootProject.entity.SaveFile;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.util.List;


@Mapper
public interface ItemMapper {
    ItemMapper INSTANCE = Mappers.getMapper(ItemMapper.class);

    @Mapping(target="itemId", source = "id")
    @Mapping(target="saveFileList", source = "fileList")
    public ItemDTO toDTO(Item item);

}
