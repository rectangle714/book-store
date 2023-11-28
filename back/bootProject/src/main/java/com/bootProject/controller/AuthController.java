package com.bootProject.controller;

import com.bootProject.common.exception.BusinessException;
import com.bootProject.dto.KakaoLoginDTO;
import com.bootProject.dto.MemberDTO;
import com.bootProject.dto.TokenDTO;
import com.bootProject.jwt.TokenProvider;
import com.bootProject.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final TokenProvider tokenProvider;

    /*
    * 회원가입
    */
    @PostMapping("/signup")
    public ResponseEntity<MemberDTO> signup(@RequestBody MemberDTO memberDto)  throws BusinessException {
        return ResponseEntity.ok(authService.signup(memberDto));
    }

    /*
    * 로그인
    */
    @PostMapping("/login")
    public ResponseEntity<TokenDTO> login(@RequestBody(required = false) MemberDTO memberDto) {
        return ResponseEntity.ok(authService.login(memberDto));
    }

    /*
    * 로그아웃
    */
    @PostMapping("/logout")
    public void logOut(HttpServletRequest request, HttpServletResponse response) {
        authService.logOut(request, response);
    }

    /*
    *   Auth 2.0 Login (네이버)
    */
    @PostMapping("/naverLogin")
    public ResponseEntity<TokenDTO> naverLogin(HttpServletRequest request, HttpServletResponse response, @RequestParam(value = "token", required = false)String accessToken) throws Exception {
        TokenDTO responseToken = authService.getNaverUserByToken(accessToken);
        return ResponseEntity.ok(responseToken);
    }

    /*
    *   Auth 2.0 Login (카카오)
    */
    @PostMapping("/kakaoLogin")
    public ResponseEntity<TokenDTO> kakaoLogin(HttpServletRequest request, HttpServletResponse response, @RequestBody KakaoLoginDTO param) {
        TokenDTO responseToken = authService.getKakaoUserByToken(param);
        return ResponseEntity.ok(responseToken);
    }

}
