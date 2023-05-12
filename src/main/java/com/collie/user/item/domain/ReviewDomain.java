package com.collie.user.item.domain;

public class ReviewDomain {
	private int idx, review_num;
	private String review_subject, id, input_date;
	
	public int getIdx() {
		return idx;
	}
	public void setIdx(int idx) {
		this.idx = idx;
	}
	public int getReview_num() {
		return review_num;
	}
	public String getReview_subject() {
		return review_subject;
	}
	public String getId() {
		return id;
	}
	public String getInput_date() {
		return input_date;
	}
	public void setReview_num(int review_num) {
		this.review_num = review_num;
	}
	public void setReview_subject(String review_subject) {
		this.review_subject = review_subject;
	}
	public void setId(String id) {
		this.id = id;
	}
	public void setInput_date(String input_date) {
		this.input_date = input_date;
	}
	
}
