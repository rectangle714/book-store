package com.collie.user.mypage.domain;

import java.util.List;

public class OrderDetailDomain {
	private List<OrderItemDomain> orderItemList;
	private int total_price;
	private String input_date, card_num, card_bank, receive_name, receive_phone, receive_addr, receive_addr_detail, receive_zipcode,
						company, invoice_no, shipping_flag;
	
	public List<OrderItemDomain> getOrderItemList() {
		return orderItemList;
	}
	public int getTotal_price() {
		return total_price;
	}
	public String getInput_date() {
		return input_date;
	}
	public String getCard_num() {
		return card_num;
	}
	public String getCard_bank() {
		return card_bank;
	}
	public String getReceive_name() {
		return receive_name;
	}
	public String getReceive_phone() {
		return receive_phone;
	}
	public String getReceive_addr() {
		return receive_addr;
	}
	public String getReceive_addr_detail() {
		return receive_addr_detail;
	}
	public String getReceive_zipcode() {
		return receive_zipcode;
	}
	public String getCompany() {
		return company;
	}
	public String getInvoice_no() {
		return invoice_no;
	}
	public String getShipping_flag() {
		return shipping_flag;
	}
	public void setOrderItemList(List<OrderItemDomain> orderItemList) {
		this.orderItemList = orderItemList;
	}
	public void setTotal_price(int total_price) {
		this.total_price = total_price;
	}
	public void setInput_date(String input_date) {
		this.input_date = input_date;
	}
	public void setCard_num(String card_num) {
		this.card_num = card_num;
	}
	public void setCard_bank(String card_bank) {
		this.card_bank = card_bank;
	}
	public void setReceive_name(String receive_name) {
		this.receive_name = receive_name;
	}
	public void setReceive_phone(String receive_phone) {
		this.receive_phone = receive_phone;
	}
	public void setReceive_addr(String receive_addr) {
		this.receive_addr = receive_addr;
	}
	public void setReceive_addr_detail(String receive_addr_detail) {
		this.receive_addr_detail = receive_addr_detail;
	}
	public void setReceive_zipcode(String receive_zipcode) {
		this.receive_zipcode = receive_zipcode;
	}
	public void setCompany(String company) {
		this.company = company;
	}
	public void setInvoice_no(String invoice_no) {
		this.invoice_no = invoice_no;
	}
	public void setShipping_flag(String shipping_flag) {
		this.shipping_flag = shipping_flag;
	}
	
}
