package com.bootProject.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;

@Entity
@Getter
@Table(name = "file")
public class SaveFile extends Base {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "file_id")
    private Long file_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id")
    private Item item_id;

    private String originFileName;
    private String storedFileName;
    private Long fileSize;

    @Builder
    public SaveFile(Long file_id, Item item_id, String originFileName, String storedFileName, Long fileSize) {
        this.file_id = file_id;
        this.item_id = item_id;
        this.originFileName = originFileName;
        this.storedFileName = storedFileName;
        this.fileSize = fileSize;
    }
}
