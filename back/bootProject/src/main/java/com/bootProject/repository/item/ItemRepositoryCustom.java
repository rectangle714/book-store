package com.bootProject.repository.item;

import com.bootProject.dto.ItemDTO;
import com.bootProject.entity.Item;

import java.util.List;
import java.util.Optional;

public interface ItemRepositoryCustom {
    public List<Item> findListAll(String cate);
    public ItemDTO findItemById(long id);
    public List<Item> findRecentRegisteredItem();
}
