package com.bootProject.member;

import com.bootProject.entity.Role;
import com.bootProject.entity.Member;
import com.bootProject.repository.member.MemberRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;

@SpringBootTest
public class memberTest {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    MemberRepository memberRepository;

    @Test
    @DisplayName("계정생성 테스트")
    void createMemberTest() {
        String password = passwordEncoder.encode("123");

        List<Member> memberList = new ArrayList<Member>();

        Member user = Member.builder()
                .name("사용자")
                .email("test")
                .password(password)
                .role(Role.USER)
                .build();

        memberList.add(user);

        Member admin = Member.builder()
                .name("관리자")
                .email("admin")
                .password(password)
                .role(Role.ADMIN)
                .build();

        memberList.add(admin);

        memberRepository.saveAll(memberList);
    }

}
