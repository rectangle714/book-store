package com.bootProject.service;

import com.bootProject.entity.Item;
import com.bootProject.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;

    @Transactional
    public void saveItem(Item item) {
        try {
            itemRepository.save(item);
        } catch(Exception e) {
            e.printStackTrace();
        }
    }

    public List<Item> findAllItem() {
        List<Item> itemList = new ArrayList<Item>();
        try {
            itemList = itemRepository.findAll();
        } catch(Exception e) {
            log.debug("전체 아이템 조회 에러 발생");
            e.printStackTrace();
        }
        return itemList;
    }

}
