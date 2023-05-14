package com.collie.user.cart.service;

import java.sql.SQLException;
import java.util.List;

import org.json.simple.JSONObject;

import com.collie.user.cart.vo.CartVO;
import com.collie.user.cart.vo.ItemCntVO;
import com.collie.user.cart.vo.OrderVO;

public class CartService {
	
	/**
	 * ��ٱ��Ͽ� ��ǰ�� �߰��ϴ� ��
	 * @param cVO
	 * @return
	 */
	public boolean addCart(CartVO cVO) {
		boolean addFlag = false;
		
		/*CartDAO cDAO = CartDAO.getInstance();
		addFlag = cDAO.insertCart(cVO)==1;*/
		
		return addFlag;
	}//addCart
	
	public List<CartGoodsDomain> getMyCart(int memberNum){
		List<CartGoodsDomain> list=null;
		
		CartDAO cDAO=CartDAO.getInstance();
		list=cDAO.selectCartGoods(memberNum);
		
		return list;
	}//getMyCart
	
	public String modifyItemCnt(ItemCntVO icVO) {
		JSONObject json=new JSONObject();
		json.put("flag", "fail");
		
		CartDAO cDAO=CartDAO.getInstance();
		int cnt=cDAO.updateItemCnt(icVO);
		if(cnt==1) {
			json.put("flag", "success");
		}
		//json.put("item_cnt",cDAO.selectItemCnt(icVO.getCartNum()));
		
		return json.toJSONString();
	}//modifyItemCnt
	
	public String removeSelectedItem(int[] cartNumArr, int memberNum) {
		JSONObject json=new JSONObject();
		json.put("flag","fail");
		
		CartDAO cDAO=CartDAO.getInstance();
		int cnt=cDAO.deleteSelectedItem(cartNumArr);
		if(cnt==cartNumArr.length) {
			json.put("flag", "success");
		}//end if
		
		return json.toJSONString();
	}//removeSelectedItem
	
	public List<CartGoodsDomain> getOrderGoods(int[] cartNum){
		List<CartGoodsDomain> list=null;
		
		CartDAO cDAO=CartDAO.getInstance();
		list=cDAO.selectOrderGoods(cartNum);
		
		return list;
	}//getMyCart
	
	public int orderItem(OrderVO oVO)  throws SQLException {
		int orderNum=0;
		
		CartDAO cDAO=CartDAO.getInstance();
		cDAO.insertOrderItem(oVO);
		orderNum=cDAO.selectOrderNum(oVO.getMember_num());
		cDAO.deleteSelectedItem(oVO.getCart_num());
		
		return orderNum;
	}//orderItem
	
}//class
