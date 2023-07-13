package com.bootProject.member;

import com.bootProject.entity.Authority;
import com.bootProject.entity.Member;
import com.bootProject.repository.MemberRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootTest
public class memberTest {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    MemberRepository memberRepository;

    @Test
    @DisplayName("계정생성 테스트")
    void createMemberTest() {
        String password = passwordEncoder.encode("1234");

        Member member = Member.builder()
                .authority(Authority.ROLE_ADMIN)
                .email("testAdmin@naver.com")
                .nickname("testAdmin")
                .password(password)
                .build();

        memberRepository.save(member);

    }

}
