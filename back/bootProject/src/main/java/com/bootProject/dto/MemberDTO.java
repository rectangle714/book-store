package com.bootProject.dto;

import com.bootProject.entity.Role;
import com.bootProject.entity.Member;
import lombok.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberDTO {
    private String memberId;
    private String email;
    private String password;
    private String nickname;
    private String phone;
    private String role;
    private String authCode;
    private String zipNo;
    private String address;
    private String addressDetail;


    public Member toMember() {
        return Member.builder()
                .email(email)
                .password(password)
                .nickname(nickname)
                .phone(phone)
                .role(Role.USER)
                .zipNo(zipNo)
                .address(address)
                .addressDetail(addressDetail)
                .build();
    }
    public static MemberDTO of(Member member) {
        return MemberDTO.builder()
                .email(member.getEmail())
                .phone(member.getPhone())
                .nickname(member.getNickname())
                .role(member.getRole().toString())
                .zipNo(member.getZipNo())
                .address(member.getAddress())
                .addressDetail(member.getAddressDetail())
                .build();
    }

    public UsernamePasswordAuthenticationToken toAuthentication() {
        return new UsernamePasswordAuthenticationToken(email, password);
    }

}
