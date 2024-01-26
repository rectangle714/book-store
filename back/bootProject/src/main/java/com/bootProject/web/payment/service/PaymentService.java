package com.bootProject.web.payment.service;

import com.bootProject.common.code.ErrorCode;
import com.bootProject.common.exception.BusinessException;
import com.bootProject.web.cart.repository.CartRepository;
import com.bootProject.web.member.entity.Member;
import com.bootProject.web.member.mapper.MemberMapper;
import com.bootProject.web.member.repository.MemberRepository;
import com.bootProject.web.payment.dto.PaymentDTO;
import com.bootProject.web.payment.entity.Payment;
import com.bootProject.web.payment.mapper.PaymentMapper;
import com.bootProject.web.payment.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class PaymentService {

    private final MemberRepository memberRepository;
    private final PaymentRepository paymentRepository;
    private final CartRepository cartRepository;

    public String processPayment(List<PaymentDTO> paymentDtoList) throws BusinessException {
        Member member = memberRepository.findByEmail(paymentDtoList.get(0).getEmail()).orElseThrow(() ->
                new BusinessException(ErrorCode.ACCOUNT_NOT_FOUND, ErrorCode.ACCOUNT_NOT_FOUND.getDescription())
        );
        PaymentMapper paymentMapper = PaymentMapper.INSTANCE;
        List<Payment> paymentList = new ArrayList<Payment>();
        List<Long> cartIds = new ArrayList<Long>();

        for(PaymentDTO paymentDTO : paymentDtoList) {
            paymentDTO.setMemberId(member);
            Payment payment = paymentMapper.toPayment(paymentDTO);
            paymentList.add(payment);
            cartIds.add(paymentDTO.getId());
        }

        cartRepository.updateCartIsPaid(cartIds);   //cart isPaid 값 Y로 변경
        paymentRepository.saveAll(paymentList);     //payment 테이블에 값 추가
        
        return "success";
    }

}
