package com.bootProject.repository.item;

import com.bootProject.entity.Item;

import java.util.List;
import java.util.Optional;

public interface ItemRepositoryCustom {
    public List<Item> findListAll();
    public Item findItemById(long id);
}
