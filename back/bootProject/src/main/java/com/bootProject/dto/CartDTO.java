package com.bootProject.dto;

import com.bootProject.entity.Cart;
import com.bootProject.entity.Item;
import com.bootProject.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartDTO {
    //Cart
    private long cartId;
    private long quantity;

    //Item
    private String itemTitle;
    private String itemContents;
    private long itemPrice;
    private String itemCategory;

    //Member
    private String email;
    private long memberId;

}
