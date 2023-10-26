package com.bootProject.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "file")
@NoArgsConstructor
public class SaveFile extends Base {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "file_id")
    private Long file_id;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id")
    private Item item;

    private String originFileName;
    private String storedFileName;
    private Long fileSize;

    @Builder
    public SaveFile(Long file_id, Item item, String originFileName, String storedFileName, Long fileSize) {
        this.file_id = file_id;
        this.item = item;
        this.originFileName = originFileName;
        this.storedFileName = storedFileName;
        this.fileSize = fileSize;
    }
}
