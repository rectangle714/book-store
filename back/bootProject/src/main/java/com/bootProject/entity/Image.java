package com.bootProject.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;

@Entity
@Getter
@Table(name = "image")
public class Image extends Base{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id")
    private Long id;
    private String originalName;
    private String storedName;
//    private String

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id")
    private Item item;

    @Builder
    public Image(Long id, String originalName, String storedName, Item item) {
        this.id = id;
        this.originalName = originalName;
        this.storedName = storedName;
        this.item = item;
    }
}
