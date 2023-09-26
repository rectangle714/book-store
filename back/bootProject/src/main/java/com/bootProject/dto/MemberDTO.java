package com.bootProject.dto;

import com.bootProject.entity.Role;
import com.bootProject.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberDTO {
    private String memberId;
    private String email;
    private String password;
    private String nickname;
    private String role;

    public Member toMember(PasswordEncoder passwordEncoder) {
        return Member.builder()
                .email(email)
                .password(passwordEncoder.encode(password))
                .nickname(nickname)
                .role(Role.ROLE_USER)
                .build();
    }
    public static MemberDTO of(Member member) {
        return MemberDTO.builder()
                .email(member.getEmail())
                .nickname(member.getNickname())
                .role(member.getRole().toString())
                .build();
    }

    public UsernamePasswordAuthenticationToken toAuthentication() {
        return new UsernamePasswordAuthenticationToken(email, password);
    }

}
