package com.back.domain.member.member.controller;

import com.back.domain.member.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/v1/members/")
@RequiredArgsConstructor
@RestController
public class ApiV1MemberController {
    private final MemberService memberService;
}
