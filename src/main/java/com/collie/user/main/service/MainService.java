package com.collie.user.main.service;

import java.util.List;

import com.collie.user.main.dao.MainDAO;
import com.collie.user.main.domain.CategoryDomain;
import com.collie.user.main.domain.NewItemDomain;

public class MainService {
	
	/**
	 * ī�װ� ��� ��ȸ
	 * @return ī�װ� ���
	 */
	public List<CategoryDomain> getCategories() {
		List<CategoryDomain> list = null;
		MainDAO mDAO = MainDAO.getInstance();
		list = mDAO.selectCategoryList();
		return list;
	}

	/**
	 * ����ǰ(��ȸ �Ͻ� �Ѵ� ��~ ��ȸ �Ͻñ����� ��ǰ) ��� ��ȸ
	 * @return ����ǰ ���
	 */
	public List<NewItemDomain> getNewItems() {
		List<NewItemDomain> list = null;
		MainDAO mDAO = MainDAO.getInstance();
		list = mDAO.selectNewItems();
		return list;
	}
	
	
}
