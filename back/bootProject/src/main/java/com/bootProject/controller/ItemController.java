package com.bootProject.controller;

import com.bootProject.dto.ItemDTO;
import com.bootProject.entity.Item;
import com.bootProject.service.ItemService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

    /* 상품 저장 */
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public ResponseEntity<Void> saveItem(@RequestPart List<MultipartFile> file,
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

    /* 상품 전체 찾기 */
    @RequestMapping("/findAll")
    public ResponseEntity<List<Item>> saveItem() {
        List<Item> result = itemService.findAllItem();

        return ResponseEntity.ok(result);
    }

}
