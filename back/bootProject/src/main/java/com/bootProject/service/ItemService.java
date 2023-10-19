package com.bootProject.service;

import com.bootProject.entity.Item;
import com.bootProject.repository.item.ItemRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;

    @Transactional
    public void saveItem(@RequestPart MultipartFile file, Item item) {
        try {
            uploadFile(file);
            itemRepository.save(item);
        } catch (IOException e) {
            log.debug("파일 저장에 오류가 발생했습니다.");
            e.printStackTrace();
        } catch(Exception e) {
            log.debug("상품 저장 에러 발생가 발생했습니다. ");
            e.printStackTrace();
        }

    }

    public List<Item> findAllItem() {
        List<Item> itemList = new ArrayList<Item>();
        try {
            itemList = itemRepository.findListAll();
        } catch(Exception e) {
            log.debug("전체 아이템 조회 에러 발생 ");
            e.printStackTrace();
        }
        return itemList;
    }

    public void uploadFile(MultipartFile file) throws IOException {
        file.transferTo(new File("C:\\image\\"+file.getOriginalFilename()));
    }

}
