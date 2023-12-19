package com.bootProject.controller;

import com.bootProject.common.exception.BusinessException;
import com.bootProject.dto.ChangePasswordRequestDto;
import com.bootProject.dto.MemberDTO;
import com.bootProject.entity.Member;
import com.bootProject.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/member")
public class MemberController {
    private final MemberService memberService;

    /* 마이페이지 */
    @GetMapping("/me")
    public ResponseEntity<MemberDTO> findMemberInfo() {
        MemberDTO myInfoBySecurity = memberService.getMyInfoBySecurity();
        return ResponseEntity.ok(myInfoBySecurity);
    }

    /* 사용자 정보 변경 */
    @PostMapping("/update")
    public ResponseEntity<String> setMemberNickname(@RequestBody MemberDTO request) throws BusinessException {
        memberService.changeMemberInfo(request);
        return ResponseEntity.ok("success");
    }

    @PostMapping("/password")
    public ResponseEntity<MemberDTO> setMemberPassword(@RequestBody ChangePasswordRequestDto request) {
        return ResponseEntity.ok(memberService.changeMemberPassword(request.getExPassword(), request.getNewPassword()));
    }

    /* 전체 사용자 조회 */
    @GetMapping("/findAll")
    public ResponseEntity<List<Member>> findAll() {
        return ResponseEntity.ok(memberService.findAllMember());
    }

}
