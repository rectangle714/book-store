package com.bootProject.controller;

import com.bootProject.config.SecurityUtil;
import com.bootProject.dto.MemberDTO;
import com.bootProject.dto.TokenDTO;
import com.bootProject.jwt.TokenProvider;
import com.bootProject.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final TokenProvider tokenProvider;

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
    public ResponseEntity<TokenDTO> login(@RequestBody(required = false) MemberDTO memberDto) {
        return ResponseEntity.ok(authService.login(memberDto));
    }

    @PostMapping("/logout")
    public void logOut(@RequestBody(required = false) TokenDTO tokenDTO) {
        if(null != tokenDTO.getAccessToken()) {
            authService.logOut(tokenDTO.getAccessToken());
        }
    }
}
