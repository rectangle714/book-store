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
    private long itemId;
    private String title;
    private String contents;
    private long price;
    private String category;
    private List<SaveFile> saveFileList;

    public static ItemDTO of(Item item) {
        return ItemDTO.builder()
                .itemId(item.getId())
                .title(item.getTitle())
                .contents(item.getContents())
                .price(item.getPrice())
                .category(item.getCategory())
                .saveFileList(item.getFileList())
                .build();
    }

}
