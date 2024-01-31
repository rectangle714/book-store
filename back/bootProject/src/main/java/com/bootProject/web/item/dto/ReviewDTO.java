package com.bootProject.web.item.dto;

import lombok.Data;

@Data
public class ReviewDTO {

    private Long itemId;
    private String email;
    private String contents;

}
