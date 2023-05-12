package com.collie.user.main.dao;

import java.util.List;

import com.collie.user.dao.GetCollieHandler;
import org.apache.ibatis.session.SqlSession;

import com.collie.user.main.domain.CategoryDomain;
import com.collie.user.main.domain.NewItemDomain;

public class MainDAO {

	private static MainDAO mDAO;

	private MainDAO() {
	}
	
	public static MainDAO getInstance() {
		if(mDAO == null) {
			mDAO = new MainDAO();
		}
		return mDAO;
	}
	
	/**
	 * ī�װ� ��� ��ȸ
	 * @return ī�װ� ���
	 */
	public List<CategoryDomain> selectCategoryList() {
		List<CategoryDomain> cateList = null;
		SqlSession ss = GetCollieHandler.getInstance().getSqlSession();
		cateList = ss.selectList("selectCateList");
		ss.close();
		return cateList;
	}

	/**
	 * ����ǰ(��ȸ �Ͻ� �Ѵ� �� ~ ��ȸ �Ͻñ����� ��ǰ) ��� ��ȸ
	 * @return ����ǰ ���
	 */
	public List<NewItemDomain> selectNewItems() {
		List<NewItemDomain> newItemList = null;
		SqlSession ss = GetCollieHandler.getInstance().getSqlSession();
		newItemList = ss.selectList("selectNewItemList");
		ss.close();
		return newItemList;
	}
}
