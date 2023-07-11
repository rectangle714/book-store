package com.bootProject.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Getter
@Table(name = "item")
public class Item extends Base{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String contents;

    private String image;

    @Builder
    public Item(Long id, String title, String contents, String image) {
        this.id = id;
        this.title = title;
        this.contents = contents;
        this.image = image;
    }

}
