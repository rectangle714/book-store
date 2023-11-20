package com.bootProject.mail;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class MailService {

    private final JavaMailSender javaMailSender;

    /** 이메일 전송 **/
    public void sendEmail(String toEmail, String title, String text) {
        SimpleMailMessage emailForm = getEmailForm(toEmail, title, text);
        try {
            javaMailSender.send(emailForm);
        } catch (RuntimeException e) {
            log.error("메일 발송 실패 - toEmail: {}, title: {}, text: {}", toEmail, title, text);
            throw new RuntimeException();
        }
    }

    /** 발신할 이메일 세팅 **/
    private SimpleMailMessage getEmailForm(String toEmail, String title, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject(title);
        message.setText(text);

        return message;
    }

}
