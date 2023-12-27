package com.bootProject.controller;

import com.bootProject.dto.ItemDTO;
import com.bootProject.entity.Item;
import com.bootProject.service.ItemService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("/api/v1/item")
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;

    /* 상품 저장 */
    @PostMapping(value = "/save")
    public ResponseEntity<Void> saveItem(ItemDTO itemDTO) throws Exception {
        if(!"".equals(itemDTO.getTitle()) && !"".equals(itemDTO.getContents())) {
            Item item = Item.builder()
                    .title(itemDTO.getTitle())
                    .contents(itemDTO.getContents())
                    .price(itemDTO.getPrice())
                    .category(itemDTO.getCategory())
                    .build();
            itemService.saveItem(itemDTO.getFile(), item);
        }
        return ResponseEntity.ok().build();
    }

    /* 상품 전체 찾기 */
    @GetMapping("/findAll")
    public ResponseEntity<List<Item>> findAllItem() {
        List<Item> result = itemService.getAllItem();

        return ResponseEntity.ok(result);
    }

    /* 최근 등록된 상품 조회  */
    @GetMapping("/findRecentRegisteredItem")
    public ResponseEntity<List<Item>> findRecentRegisteredItem() {
        List<Item> result = itemService.getRecentRegisteredItem();
        return ResponseEntity.ok(result);
    }

    /* 상품 상세 정보 조회 */
    @GetMapping("/detail")
    public ResponseEntity<ItemDTO> findItemDetail(@RequestParam(value = "itemId")long id) {
        ItemDTO result = itemService.findItemInfo(id);
        return ResponseEntity.ok(result);
    }

    /* 상품 삭제 */
    @PostMapping(value = "/delete", produces = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ResponseEntity<HttpStatus> findItemDetail(@RequestParam(value = "itemList[]")List<Long> itemList,
                                               @RequestParam(value = "fileList[]")List<Long> fileList) {
        itemService.deleteItem(itemList, fileList);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /* 이미지 파일 조회 */
    @GetMapping("/images/{filename}")
    public Resource showImage(@PathVariable String filename) throws MalformedURLException {
        String path = "src/main/resources/images/";
        return new UrlResource("file:" + path +filename);
    }

}
