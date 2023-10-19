package com.bootProject.repository.item;

import com.bootProject.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long>,  ItemRepositoryCustom{
    @Override
    public List<Item> findListAll();
}
