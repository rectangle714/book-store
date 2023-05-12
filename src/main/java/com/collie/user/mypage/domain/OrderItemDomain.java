package com.collie.user.mypage.domain;

public class OrderItemDomain {
	private String item_name, item_img;
	private int item_price, item_cnt, item_num;
	
	public String getItem_name() {
		return item_name;
	}
	public String getItem_img() {
		return item_img;
	}
	public int getItem_price() {
		return item_price;
	}
	public int getItem_cnt() {
		return item_cnt;
	}
	public int getItem_num() {
		return item_num;
	}
	public void setItem_name(String item_name) {
		this.item_name = item_name;
	}
	public void setItem_img(String item_img) {
		this.item_img = item_img;
	}
	public void setItem_price(int item_price) {
		this.item_price = item_price;
	}
	public void setItem_cnt(int item_cnt) {
		this.item_cnt = item_cnt;
	}
	public void setItem_num(int item_num) {
		this.item_num = item_num;
	}
	
}
