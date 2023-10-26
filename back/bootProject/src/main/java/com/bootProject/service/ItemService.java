package com.bootProject.service;

import com.bootProject.entity.Item;
import com.bootProject.entity.SaveFile;
import com.bootProject.repository.File.FileRepository;
import com.bootProject.repository.item.ItemRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;
    private final FileRepository fileRepository;

    @Transactional
    public void saveItem(List<MultipartFile> multipartFile, Item item) throws Exception {
        item = itemRepository.save(item);
        if(!multipartFile.isEmpty()) {
            List<SaveFile> fileList = uploadFile(multipartFile, item);
            fileRepository.saveAll(fileList);
        }
    }

    public List<Item> findAllItem() {
        List<Item> itemList = new ArrayList<Item>();
        try {
            itemList = itemRepository.findListAll();
            log.debug(itemList.get(0).toString());
        } catch(Exception e) {
            log.debug("전체 아이템 조회 에러 발생 ");
            e.printStackTrace();
        }
        return itemList;
    }

    /** 파일 저장  **/
    public List<SaveFile> uploadFile(List<MultipartFile> multipartFile, Item item) throws Exception{

            List<SaveFile> fileList = new ArrayList<>();
            // 파일명을 업로드 한 날짜로 변환하여 저장
            LocalDateTime now = LocalDateTime.now();
            DateTimeFormatter dateTimeFormatter =
                    DateTimeFormatter.ofPattern("yyyyMMdd");
            String current_date = now.format(dateTimeFormatter);

            // 프로젝트 디렉터리 내의 저장을 위한 절대 경로 설정
            // 경로 구분자 File.separator 사용
            String absolutePath = new File("../../front/frontend/public/").getCanonicalPath(); //+ File.separator + File.separator;

            // 파일을 저장할 세부 경로 지정
            String path = "images" + File.separator + current_date;
            File newFile = new File(absolutePath + File.separator + path);
            if(!newFile.exists()){
                boolean wasSuccessful = newFile.mkdirs();
                if(!wasSuccessful) log.error("file: was not successful");
            }

            // 다중 파일 처리
            for(MultipartFile file : multipartFile) {
                // 파일의 확장자 추출
                String originalFileExtension = "";
                String contentType = file.getContentType();

                // 확장자명이 존재할 때
                if(ObjectUtils.isEmpty(contentType)) {
                    break;
                } else {
                    if(contentType.contains("image/jpeg")) {
                        originalFileExtension = ".jpg";
                    } else if(contentType.contains("image/png")) {
                        originalFileExtension = ".png";
                    } else {    //다른 확장자면 처리 x
                        break;
                    }
                }

                String newFileName = "";
                newFileName = System.nanoTime() + originalFileExtension;

                SaveFile saveFile = SaveFile.builder()
                        .item(item)
                        .originFileName(file.getOriginalFilename())
                        .storedFileName(path + File.separator + newFileName)
                        .fileSize(file.getSize())
                        .build();

                fileList.add(saveFile);

                newFile = new File(absolutePath + File.separator + path + File.separator + newFileName);
                file.transferTo(newFile);

                newFile.setWritable(true);
                newFile.setReadable(true);
            }


        return fileList;
    }

}

