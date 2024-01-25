package com.bootProject.web.item.controller;

import com.bootProject.web.item.dto.ItemDTO;
import com.bootProject.web.item.entity.Item;
import com.bootProject.web.item.mapper.ItemMapper;
import com.bootProject.web.item.service.ItemService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("/api/v1/item")
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;

    /* 상품 저장 */
    @PostMapping(value = "/save")
    public ResponseEntity<String> saveItem(ItemDTO itemDTO) throws Exception {
        Item item = ItemMapper.INSTANCE.toEntity(itemDTO);
        itemService.saveItem(itemDTO.getFile(), item);
        return ResponseEntity.ok("success");
    }

    /* 상품 전체 찾기 */
    @GetMapping("/findAll")
    public ResponseEntity<List<Item>> findAllItem(@RequestParam(required = false)String cate) {
        List<Item> result = new ArrayList<Item>();
        result = itemService.getAllItem(cate);
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
    @PostMapping(value = "/delete")
    public ResponseEntity<String> findItemDetail(@RequestParam(value = "itemList[]")List<Long> itemList,
                                               @RequestParam(value = "fileList[]")List<Long> fileList) {
        itemService.deleteItem(itemList, fileList);
        return ResponseEntity.ok("success");
    }

    /* 이미지 파일 조회 */
    @GetMapping("/images/{filename}")
    public Resource showImage(@PathVariable String filename) throws MalformedURLException {
        String path = "src/main/resources/images/";
        return new UrlResource("file:" + path +filename);
    }

}
