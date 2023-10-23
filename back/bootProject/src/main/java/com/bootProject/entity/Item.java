package com.bootProject.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@Table(name = "item")
@NoArgsConstructor
public class Item extends Base{

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_id")
    private Long id;
    private String title;
    private String contents;


    @Builder
    public Item(Long id, String title, String contents, String originFileName, String storedFileName, Long fileSize) {
        this.id = id;
        this.title = title;
        this.contents = contents;
    }

}
