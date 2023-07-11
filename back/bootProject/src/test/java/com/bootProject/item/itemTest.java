package com.bootProject.item;

import com.bootProject.entity.Item;
import com.bootProject.repository.ItemRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

@SpringBootTest
public class itemTest {

    @Autowired
    ItemRepository itemRepository;

    @Test
    @DisplayName("제품입력")
    void insert() {
        List<Item> itemList = new ArrayList<Item>();

        Item item1 = Item.builder()
                .title("아이템1")
                .contents("아이템1 내용")
                .image("아이템 이미지")
                .build();
        itemList.add(item1);

        Item item2 = Item.builder()
                .title("아이템2")
                .contents("아이템2 내용")
                .image("아이템2 이미지")
                .build();
        itemList.add(item2);

        itemRepository.saveAll(itemList);

    }

}
