package com.collie.user.mypage.vo;

public class DeleteMemberVO {
	private int member_num;
	private String pass;
	
	public int getMember_num() {
		return member_num;
	}
	public void setMember_num(int member_num) {
		this.member_num = member_num;
	}
	public String getPass() {
		return pass;
	}
	public void setPass(String pass) {
		this.pass = pass;
	}
	@Override
	public String toString() {
		return "DeleteMemberVO [member_num=" + member_num + ", pass=" + pass + "]";
	}
	 
	
	
}
