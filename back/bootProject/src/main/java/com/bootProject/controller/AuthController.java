package com.bootProject.controller;

import com.bootProject.config.SecurityUtil;
import com.bootProject.dto.MemberDTO;
import com.bootProject.dto.TokenDto;
import com.bootProject.entity.Member;
import com.bootProject.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    /*
    *   회원가입
    */
    @PostMapping("/signup")
    public ResponseEntity<MemberDTO> signup(@RequestBody MemberDTO memberDto) {
        return ResponseEntity.ok(authService.signup(memberDto));
    }

    /*
    *   로그인
    */
    @PostMapping("/login")
    public ResponseEntity<TokenDto> login(@RequestBody MemberDTO memberDto) {
        return ResponseEntity.ok(authService.login(memberDto));
    }

    @PostMapping("/logout")
    public void logOut() {
        Long currentMemberId = SecurityUtil.getCurrentMemberId();
        authService.logOut(currentMemberId+"");
    }
}
