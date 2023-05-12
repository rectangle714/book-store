package com.collie.user.main.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.collie.user.main.domain.CategoryDomain;
import com.collie.user.main.domain.NewItemDomain;
import com.collie.user.main.service.MainService;

@Controller
public class MainController {
	
	/**
	 * ���� ȭ�鿡 ǥ�õ� header ���� ���� �����´�.(ī�װ� ����)
	 * 
	 * @param model jsp�� ���� �Ѱ� �� Model
	 * @return header jsp ������
	 */
	@RequestMapping(value = "/header.do", method= {RequestMethod.GET, RequestMethod.POST})
	public String getHeader(Model model) {
		MainService ms = new MainService();
		List<CategoryDomain> cateList = ms.getCategories();
		
		model.addAttribute("cate_list",cateList);
		return "common/header";
	}
	
	@RequestMapping(value="/index.do", method= {RequestMethod.GET, RequestMethod.POST})
	public String main(Model model) {
		MainService ms = new MainService();
		List<NewItemDomain> newItemList = ms.getNewItems();
		model.addAttribute("new_item_list", newItemList);
		return "main";
	}//main
	
	
}//class
