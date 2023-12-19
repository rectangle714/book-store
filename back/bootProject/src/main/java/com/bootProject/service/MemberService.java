package com.bootProject.service;

import com.bootProject.common.code.ErrorCode;
import com.bootProject.common.exception.BusinessException;
import com.bootProject.common.util.RedisUtil;
import com.bootProject.common.util.SecurityUtil;
import com.bootProject.dto.MemberDTO;
import com.bootProject.entity.Member;
import com.bootProject.mail.MailService;
import com.bootProject.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.Duration;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class MemberService {
    private static final String AUTH_CODE_PREFIX = "AuthCode ";
    @Value("${spring.mail.auth-code-expiration-millis}")
    private long authCodeExpirationMillis;
    private final MailService mailService;
    private final MemberRepository memberRepository;
    private final RedisUtil redisUtil;
    private final PasswordEncoder passwordEncoder;

    public MemberDTO getMyInfoBySecurity() {
        String email = SecurityUtil.getCurrentMemberEmail();
        MemberDTO memberDTO = memberRepository.findByEmail(SecurityUtil.getCurrentMemberEmail())
                .map(MemberDTO::of)
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다."));
        return memberDTO;
    }

    @Transactional
    public void changeMemberInfo(MemberDTO memberDTO) throws BusinessException{
        Member member = memberRepository.findByEmail(memberDTO.getEmail()).orElseThrow(() ->
            new BusinessException(ErrorCode.ACCOUNT_NOT_FOUND, ErrorCode.ACCOUNT_NOT_FOUND.getDescription())
        );
        member.updateMember(passwordEncoder.encode(memberDTO.getPassword()), memberDTO.getPhone(), memberDTO.getNickname());
        memberRepository.save(member);
    }

    @Transactional
    public MemberDTO changeMemberPassword(String exPassword, String newPassword) {
        Member member = memberRepository.findByEmail(SecurityUtil.getCurrentMemberEmail()).orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다."));
        if(!passwordEncoder.matches(exPassword, member.getPassword())) {
            throw new RuntimeException("비밀번호가 맞지 않습니다.");
        }
        member = Member.builder()
                .id(member.getId())
                .email(member.getEmail())
                .password(passwordEncoder.encode(newPassword))
                .nickname(member.getNickname())
                .role(member.getRole())
                .build();

        return MemberDTO.of(memberRepository.save(member));
    }

    public List<Member> findAllMember() {
        return memberRepository.findAll();
    }

    public Member findByEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        return member.orElseGet(() -> null);
    }

    public void sendCodeToEmail(String toEmail) {
        String title = "이메일 인증번호";
        String authCode = createCode();
        mailService.sendEmail(toEmail, title, authCode);
        redisUtil.setData(AUTH_CODE_PREFIX + toEmail,
                authCode, Duration.ofMillis(authCodeExpirationMillis).toMillis());

    }

    /* 이메일 인증 코드 생성 */
    private String createCode() {
        int length = 6;
        try {
            Random random = SecureRandom.getInstanceStrong();
            StringBuilder builder = new StringBuilder();
            for(int i=0; i<length; i++) {
                builder.append(random.nextInt(10));
            }
            return builder.toString();
        } catch (NoSuchAlgorithmException e) {
            log.error("이메일 인증코드 생성중 오류발생");
            return null;
        }
    }

    /* 이메일 코드 검증  */
    public boolean verifiedCode(String email, String authCode) {
        String redisAuthCode = redisUtil.getData(AUTH_CODE_PREFIX + email);
        boolean authResult = null != redisAuthCode && redisAuthCode.equals(authCode);

        return authResult;
    }

}
