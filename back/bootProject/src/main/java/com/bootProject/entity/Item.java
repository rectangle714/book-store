package com.bootProject.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

    @JsonManagedReference
    @OneToMany(mappedBy = "item")
    private List<SaveFile> fileList = new ArrayList<>();


    @Builder
    public Item(Long id, String title, String contents) {
        this.id = id;
        this.title = title;
        this.contents = contents;
    }

}
