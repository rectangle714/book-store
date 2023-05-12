package com.collie.user.item.domain;

import java.util.List;

public class ItemDetailDomain {
	
	private int item_stock, item_price;
	private String item_name, item_unit,item_weight,item_guide,
			item_title, item_subtitle, item_detail, item_img;

	private List<String> detailImgList;
	private List<String> tabImgList ;

	public int getItem_stock() {
		return item_stock;
	}

	public void setItem_stock(int item_stock) {
		this.item_stock = item_stock;
	}

	public int getItem_price() {
		return item_price;
	}

	public void setItem_price(int item_price) {
		this.item_price = item_price;
	}

	public String getItem_name() {
		return item_name;
	}

	public void setItem_name(String item_name) {
		this.item_name = item_name;
	}

	public String getItem_unit() {
		return item_unit;
	}

	public void setItem_unit(String item_unit) {
		this.item_unit = item_unit;
	}

	public String getItem_weight() {
		return item_weight;
	}

	public void setItem_weight(String item_weight) {
		this.item_weight = item_weight;
	}

	public String getItem_guide() {
		return item_guide;
	}

	public void setItem_guide(String item_guide) {
		this.item_guide = item_guide;
	}

	public String getItem_title() {
		return item_title;
	}

	public void setItem_title(String item_title) {
		this.item_title = item_title;
	}

	public String getItem_subtitle() {
		return item_subtitle;
	}

	public void setItem_subtitle(String item_subtitle) {
		this.item_subtitle = item_subtitle;
	}

	public String getItem_detail() {
		return item_detail;
	}

	public void setItem_detail(String item_detail) {
		this.item_detail = item_detail;
	}

	public String getItem_img() {
		return item_img;
	}

	public void setItem_img(String item_img) {
		this.item_img = item_img;
	}

	public List<String> getDetailImgList() {
		return detailImgList;
	}

	public void setDetailImgList(List<String> detailImgList) {
		this.detailImgList = detailImgList;
	}

	public List<String> getTabImgList() {
		return tabImgList;
	}

	public void setTabImgList(List<String> tabImgList) {
		this.tabImgList = tabImgList;
	}

	
}
