package com.bootProject.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class ItemDTO {
    private String title;
    private String contents;
    private List<String> itemList;
    private List<String> fileList;
}
