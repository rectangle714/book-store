package com.bootProject.dto;

import com.bootProject.entity.Item;
import com.bootProject.entity.SaveFile;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ItemDTO {
    private String title;
    private String contents;
    private long price;
    private String category;
    private List<String> itemList;
    private List<String> fileList;
    private List<SaveFile> saveFileList;
    private List<MultipartFile> file;

    public static ItemDTO of(Item item) {
        return ItemDTO.builder()
                .title(item.getTitle())
                .contents(item.getContents())
                .price(item.getPrice())
                .category(item.getCategory())
                .saveFileList(item.getFileList())
                .build();
    }

}
