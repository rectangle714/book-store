package com.bootProject.service;

import com.bootProject.config.SecurityUtil;
import com.bootProject.dto.MemberRequestDto;
import com.bootProject.dto.MemberResponseDto;
import com.bootProject.entity.Member;
import com.bootProject.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    /*
    *   로그인한 사용자 정보 조회
    */
    @Transactional(readOnly = true)
    public MemberResponseDto getMyInfoBySecurity() {
        return memberRepository.findById(SecurityUtil.getCurrentMemberId())
                .map(MemberResponseDto::of)
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다."));
    }

    /*
    *   사용자 닉네임 변경
    */
    @Transactional
    public MemberResponseDto changeMemberNickname(String email, String nickname) {
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
        member = Member.builder()
                .id(member.getId())
                .email(member.getEmail())
                .password(member.getPassword())
                .nickname(nickname)
                .authority(member.getAuthority())
                .build();

        return MemberResponseDto.of(memberRepository.save(member));
    }

    /*
    *   사용자 패스워드 변경
    */
    @Transactional
    public MemberResponseDto changeMemberPassword(String exPassword, String newPassword) {
        Member member = memberRepository.findById(SecurityUtil.getCurrentMemberId()).orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다."));
        if(!passwordEncoder.matches(exPassword, member.getPassword())) {
            throw new RuntimeException("비밀번호가 맞지 않습니다.");
        }
        member = Member.builder()
                .id(member.getId())
                .email(member.getEmail())
                .password(passwordEncoder.encode(newPassword))
                .nickname(member.getNickname())
                .authority(member.getAuthority())
                .build();

        return MemberResponseDto.of(memberRepository.save(member));
    }

    /*
    *   전체 사용자 조회
    */
    @Transactional(readOnly = true)
    public List<Member> findAllMember() {
        return memberRepository.findAll();
    }


}
