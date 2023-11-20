package com.bootProject.repository.item;

import com.bootProject.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long>,  ItemRepositoryCustom{
    @Override
    public List<Item> findListAll();
    @Override
    public Item findItemById(long id);
}
