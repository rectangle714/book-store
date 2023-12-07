package com.bootProject.item;

import com.bootProject.entity.Item;
import com.bootProject.repository.item.ItemRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;


@Slf4j
@SpringBootTest
public class itemTest {

    @Autowired
    ItemRepository itemRepository;

    @Test
    @DisplayName("제품입력")
    void insert() {
//        List<Item> itemList = new ArrayList<Item>();
//
//        Item item1 = Item.builder()
//                .title("아이템1")
//                .contents("아이템1 내용")
//                .build();
//        itemList.add(item1);
//
//        Item item2 = Item.builder()
//                .title("아이템2")
//                .contents("아이템2 내용")
//                .build();
//        itemList.add(item2);
//
//        itemRepository.saveAll(itemList);
    }

    @Test
    @DisplayName("최근 추가된 책 목록 찾기")
    void findRecentItemList() {
        List<Item> itemList = new ArrayList<Item>();
        List<Item> recentRegisteredItem = itemRepository.findRecentRegisteredItem();
        for (Item item:recentRegisteredItem) {
            log.info("item value = {}", item.getId());
        }
    }

}
