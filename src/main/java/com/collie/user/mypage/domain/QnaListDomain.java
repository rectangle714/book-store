package com.collie.user.mypage.domain;

public class QnaListDomain {
	
	private int idx,qna_num;
	private String qna_subject,qna_flag,input_date;
	
	
	public int getIdx() {
		return idx;
	}
	public void setIdx(int idx) {
		this.idx = idx;
	}
	public int getQna_num() {
		return qna_num;
	}
	public void setQna_num(int qna_num) {
		this.qna_num = qna_num;
	}
	public String getQna_subject() {
		return qna_subject;
	}
	public void setQna_subject(String qna_subject) {
		this.qna_subject = qna_subject;
	}
	public String getQna_flag() {
		return qna_flag;
	}
	public void setQna_flag(String qna_flag) {
		this.qna_flag = qna_flag;
	}
	public String getInput_date() {
		return input_date;
	}
	public void setInput_date(String input_date) {
		this.input_date = input_date;
	}
	
}
