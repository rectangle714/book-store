package com.bootProject.web.payment.controller;

import com.bootProject.common.exception.BusinessException;
import com.bootProject.web.payment.dto.PaymentDTO;
import com.bootProject.web.payment.entity.Payment;
import com.bootProject.web.payment.service.PaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/payment")
@Controller
public class PaymentController {
    private final PaymentService paymentService;

    @PostMapping("/processPayment")
    public ResponseEntity<String> processPayment(@RequestBody List<PaymentDTO> paymentList) throws BusinessException {
        String result = paymentService.processPayment(paymentList);
        if("success".equals(result)) {
            return ResponseEntity.ok("success");
        } else {
            return ResponseEntity.badRequest().body("fail");
        }

    }

}
