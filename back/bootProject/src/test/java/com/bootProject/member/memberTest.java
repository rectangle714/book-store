package com.bootProject.member;

import com.bootProject.entity.Role;
import com.bootProject.entity.Member;
import com.bootProject.repository.MemberRepository;
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
                .role(Role.ROLE_USER)
                .email("test")
                .nickname("사용자")
                .password(password)
                .build();

        memberList.add(user);

        Member admin = Member.builder()
                .role(Role.ROLE_ADMIN)
                .email("admin")
                .nickname("관리자")
                .password(password)
                .build();

        memberList.add(admin);

        memberRepository.saveAll(memberList);
    }

}
