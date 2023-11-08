package com.bootProject.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Member extends Base{

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    private String phone;
    private String nickname;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Builder
    public Member(Long id, String email, String name, String password, String phone, String nickname, Role role) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.password = password;
        this.phone = phone;
        this.nickname = nickname;
        this.role = role;
    }
}


