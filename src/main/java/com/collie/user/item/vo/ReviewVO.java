package com.collie.user.item.vo;

public class ReviewVO {
	private int item_num, member_num;
	private String review_subject, review_content;
	
	public int getItem_num() {
		return item_num;
	}
	public int getMember_num() {
		return member_num;
	}
	public String getReview_subject() {
		return review_subject;
	}
	public String getReview_content() {
		return review_content;
	}
	public void setItem_num(int item_num) {
		this.item_num = item_num;
	}
	public void setMember_num(int member_num) {
		this.member_num = member_num;
	}
	public void setReview_subject(String review_subject) {
		this.review_subject = review_subject;
	}
	public void setReview_content(String review_content) {
		this.review_content = review_content;
	}
	
}
