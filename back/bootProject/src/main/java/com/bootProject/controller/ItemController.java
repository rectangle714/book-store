package com.bootProject.controller;

import com.bootProject.entity.Item;
import com.bootProject.service.ItemService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/item")
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;

    /* 상품 저장 */
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public ResponseEntity<Void> saveItem(@RequestPart List<MultipartFile> file, Item item) throws Exception {
        if(item != null) {
            itemService.saveItem(file, item);
        }
        return ResponseEntity.ok().build();
    }

    /* 상품 전체 찾기 */
    @RequestMapping("/findAll")
    public ResponseEntity<List<Item>> saveItem() {
        List<Item> result = itemService.findAllItem();
        return ResponseEntity.ok(result);
    }

}
