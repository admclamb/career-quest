package com.careerquest.backend.account;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.careerquest.backend.account.factories.AccountFactory;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/board")
public class AccountController {
    private final AccountService accountService;
    private final AccountFactory accountFactory;
}
