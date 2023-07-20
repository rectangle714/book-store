package com.bootProject.controller;

import com.bootProject.dto.MemberRequestDto;
import com.bootProject.dto.MemberResponseDto;
import com.bootProject.dto.TokenDto;
import com.bootProject.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<MemberResponseDto> signup(@RequestBody MemberRequestDto requestDto) {
        return ResponseEntity.ok(authService.signup(requestDto));
    }

    /*
    *   로그인
    */
    @PostMapping("/login")
    public ResponseEntity<TokenDto> login(@RequestBody MemberRequestDto requestDto) {
        return ResponseEntity.ok(authService.login(requestDto));
    }

/*    @PostMapping("/reissue")
    public ResponseEntity<TokenDto> reissue() {
        return ResponseEntity.ok();
    }*/

}
