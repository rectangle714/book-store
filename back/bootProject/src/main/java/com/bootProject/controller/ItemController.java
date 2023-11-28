package com.bootProject.controller;

import com.bootProject.dto.ItemDTO;
import com.bootProject.entity.Item;
import com.bootProject.service.ItemService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/api/v1/item")
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;

    /*
    *   상품 저장
    */
    @PostMapping(value = "/save")
    public ResponseEntity<Void> saveItem(@RequestPart(required = false) List<MultipartFile> file,
                                         @RequestParam(name = "title", required = false) String title,
                                         @RequestParam(name = "contents", required = false) String contents) throws Exception {
        if(!"".equals(title) && !"".equals(contents)) {
            Item item = Item.builder()
                    .title(title)
                    .contents(contents)
                    .build();
            itemService.saveItem(file, item);
        }
        return ResponseEntity.ok().build();
    }

    /*
    *   상품 전체 찾기
    */
    @GetMapping("/findAll")
    public ResponseEntity<List<Item>> saveItem() {
        List<Item> result = itemService.findAllItem();

        return ResponseEntity.ok(result);
    }

    /*
    *   상품 상세 정보 조회
    */
    @GetMapping("/detail")
    public ResponseEntity<Item> findItemDetail(@RequestParam(value = "itemId")long id) {
        Item result = itemService.findItemInfo(id);
        return ResponseEntity.ok(result);
    }

    /*
    *   상품 삭제
    */
    @PostMapping("/delete")
    public ResponseEntity<HttpStatus> findItemDetail(@RequestParam(value = "itemList[]", required = false)List<Long> itemList,
                                               @RequestParam(value = "fileList[]", required = false)List<Long> fileList) {
        itemService.deleteItem(itemList, fileList);
        return ResponseEntity.ok(HttpStatus.OK);
    }

}
