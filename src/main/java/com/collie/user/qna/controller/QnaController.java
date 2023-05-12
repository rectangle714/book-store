package com.collie.user.qna.controller;

import javax.servlet.http.HttpSession;

import com.collie.user.qna.service.QnaService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.collie.user.member.domain.LoginDomain;
import com.collie.user.qna.vo.QnaAddVO;

@SessionAttributes("user_info")
@Controller
public class QnaController {
	
	
	@RequestMapping(value = "/qna/qna_form.do", method = RequestMethod.GET)
	public String qnaForm(QnaAddVO qaVO,HttpSession ss) {
		
		String url = "redirect:/login_form.do";
		
		if(ss.getAttribute("user_info")!=null) {
			url="/qna/qna_form";
		}
		
		return url;
	}

	@RequestMapping(value = "/qna/qna_process.do", method = RequestMethod.POST)
	public String qnaAdd(QnaAddVO qaVO, HttpSession ss) throws NumberFormatException{
		String url="/qna/qna_form"; //�Է� ���н� form���� ���ư�
		
		QnaService qs = new QnaService();
		
		LoginDomain lod = (LoginDomain)ss.getAttribute("user_info");
		qaVO.setMember_num(lod.getMember_num());
		
		if(!qs.addQna(qaVO)) { //flag�� true�̸� �Է� ���� , flag�� false�� ��� �Է� �����̹Ƿ� if�� ����
			
			url="/qna/qna";
			
		}
		
		return url;
	}
}
