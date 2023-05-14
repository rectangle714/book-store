package com.collie.user.cart.controller;


import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

import java.sql.SQLException;
import java.util.List;

import com.collie.user.cart.service.CartService;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.collie.user.cart.vo.CartVO;
import com.collie.user.cart.vo.ItemCntVO;
import com.collie.user.cart.vo.OrderVO;
import com.collie.user.member.domain.LoginDomain;

@Controller
public class CartController {
	
	/**
	 * ��ٱ��Ͽ� ��ǰ�� �߰��ϴ� ��
	 * @param session
	 * @param cVO
	 * @return
	 */
	@RequestMapping(value="/item/cart", method=POST)
	@ResponseBody
	public void addCart(HttpSession session, CartVO cVO) {
		LoginDomain ld = (LoginDomain)session.getAttribute("user_info");
		if( ld != null ) {
			cVO.setMember_num(ld.getMember_num());
			CartService cs = new CartService();
			cs.addCart(cVO);
		}//end if
	}//addCart
	
	@RequestMapping(value="/cart/view", method=GET)
	public String viewCart(HttpSession session, Model model) {
		
		LoginDomain user_info=(LoginDomain)session.getAttribute("user_info");
		
		if( user_info!=null && user_info.getMember_num()!=0 ){
			List<CartGoodsDomain> cart_list=new CartService().getMyCart(user_info.getMember_num());
			model.addAttribute("cart_list", cart_list);
		}//end if
		
		return "cart/view_cart";
	}//viewCart
	
	@RequestMapping(value="/cart/modify_cnt", method=POST)
	@ResponseBody
	public String modifyItemCnt(String cart_num, ItemCntVO icVO) throws NumberFormatException{
		String json=null;
		
		icVO.setCartNum(Integer.parseInt(cart_num));
		json=new CartService().modifyItemCnt(icVO);
		
		return json;
	}//plusItemCnt
	
	@RequestMapping(value="/cart/remove_Item", method=POST)
	@ResponseBody
	public String removeSelectedItem(String[] cart_num, HttpSession session) throws NumberFormatException{
		String json=null;
		int[] cartNumArr=new int[cart_num.length];
		for(int i=0; i<cart_num.length; i++) {
			cartNumArr[i]=Integer.parseInt(cart_num[i]);
		}//end for
		LoginDomain userInfo=(LoginDomain)session.getAttribute("user_info");
		json=new CartService().removeSelectedItem(cartNumArr,userInfo.getMember_num());
		
		return json;
	}//plusItemCnt
	
	@RequestMapping(value="/cart/order_form", method=POST)
	public String viewOrderForm(String[] cart_num, Model model) {
		int[] cartNumArr=new int[cart_num.length];
		for(int i=0; i<cart_num.length; i++) {
			cartNumArr[i]=Integer.parseInt(cart_num[i]);
		}//end for
		/*List<CartGoodsDomain> list=new CartService().getOrderGoods(cartNumArr);
		model.addAttribute("cart_list", list);*/
		
		return "cart/order_form";
	}//viewOrderForm
	
	@RequestMapping(value="/cart/order", method=POST)
	public String order(OrderVO oVO, HttpSession session, Model model){
		String url="cart/order_result";
		int orderNum=0;
		
		LoginDomain lDomain=(LoginDomain)session.getAttribute("user_info");
		if( lDomain!=null && lDomain.getMember_num()!=0 ){
			oVO.setMember_num(lDomain.getMember_num());
			
			try {
				orderNum=new CartService().orderItem(oVO);
			} catch (SQLException e) {
				url="err/order_err";
				e.printStackTrace();
			}
			
			model.addAttribute("order_num", orderNum);
		}//end if
		
		return url;
	}//order
	
}//class
