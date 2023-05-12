package com.collie.user.cart.vo;

public class OrderVO {
	private int member_num, total_price;
	private int[] cart_num;
	private String receive_name, receive_phone, receive_zipcode, receive_addr, receive_addr_detail, 
				payment, card_num, card_bank, card_expiration;
	public int getMember_num() {
		return member_num;
	}
	public void setMember_num(int member_num) {
		this.member_num = member_num;
	}
	public int getTotal_price() {
		return total_price;
	}
	public void setTotal_price(int total_price) {
		this.total_price = total_price;
	}
	public int[] getCart_num() {
		return cart_num;
	}
	public void setCart_num(int[] cart_num) {
		this.cart_num = cart_num;
	}
	public String getReceive_name() {
		return receive_name;
	}
	public void setReceive_name(String receive_name) {
		this.receive_name = receive_name;
	}
	public String getReceive_phone() {
		return receive_phone;
	}
	public void setReceive_phone(String receive_phone) {
		this.receive_phone = receive_phone;
	}
	public String getReceive_zipcode() {
		return receive_zipcode;
	}
	public void setReceive_zipcode(String receive_zipcode) {
		this.receive_zipcode = receive_zipcode;
	}
	public String getReceive_addr() {
		return receive_addr;
	}
	public void setReceive_addr(String receive_addr) {
		this.receive_addr = receive_addr;
	}
	public String getReceive_addr_detail() {
		return receive_addr_detail;
	}
	public void setReceive_addr_detail(String receive_addr_detail) {
		this.receive_addr_detail = receive_addr_detail;
	}
	public String getPayment() {
		return payment;
	}
	public void setPayment(String payment) {
		this.payment = payment;
	}
	public String getCard_num() {
		return card_num;
	}
	public void setCard_num(String card_num) {
		this.card_num = card_num;
	}
	public String getCard_bank() {
		return card_bank;
	}
	public void setCard_bank(String card_bank) {
		this.card_bank = card_bank;
	}
	public String getCard_expiration() {
		return card_expiration;
	}
	public void setCard_expiration(String card_expiration) {
		this.card_expiration = card_expiration;
	}
	
}//class
