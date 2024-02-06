package com.bootProject.web.item.dto;

import com.bootProject.web.item.entity.Item;
import com.bootProject.web.member.entity.Member;
import lombok.Data;

@Data
public class ReviewDTO {

    private Long id;
    private Long itemId;
    private String email;
    private String contents;
    private String ipAddress;
    private Member member;

}
