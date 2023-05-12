package com.collie.user.mypage.domain;

public class OrderListDomain {
	private int order_num, total_price;
	private String item_name, item_img, input_date;
	
	public int getOrder_num() {
		return order_num;
	}
	public int getTotal_price() {
		return total_price;
	}
	public String getItem_name() {
		return item_name;
	}
	public String getItem_img() {
		return item_img;
	}
	public String getInput_date() {
		return input_date;
	}
	public void setOrder_num(int order_num) {
		this.order_num = order_num;
	}
	public void setTotal_price(int total_price) {
		this.total_price = total_price;
	}
	public void setItem_name(String item_name) {
		this.item_name = item_name;
	}
	public void setItem_img(String item_img) {
		this.item_img = item_img;
	}
	public void setInput_date(String input_date) {
		this.input_date = input_date;
	}
	
}
