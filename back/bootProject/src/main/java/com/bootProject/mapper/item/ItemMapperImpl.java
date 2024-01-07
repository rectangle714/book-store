package com.bootProject.mapper.item;

import com.bootProject.dto.ItemDTO;
import com.bootProject.dto.ItemDTO.ItemDTOBuilder;
import com.bootProject.entity.Item;
import com.bootProject.entity.SaveFile;
import org.springframework.stereotype.Component;

import java.util.List;

public class ItemMapperImpl implements ItemMapper{

    @Override
    public ItemDTO toDTO(Item item) {
        if(null == item) {
            return null;
        }

        ItemDTOBuilder itemDTO = ItemDTO.builder();
        itemDTO.itemId(item.getId());
        itemDTO.title(item.getTitle());
        itemDTO.contents(item.getContents());
        itemDTO.price(item.getPrice());
        itemDTO.category(item.getCategory());
        itemDTO.saveFileList(item.getFileList());

        return itemDTO.build();
    }
}
