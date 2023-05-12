package com.collie.user.item.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import com.collie.user.item.domain.ItemListDomain;
import com.collie.user.item.domain.ItemQnaDomain;
import com.collie.user.member.domain.LoginDomain;
import com.collie.user.pagination.RangeVO;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.collie.user.item.domain.ReviewDomain;
import com.collie.user.item.service.ItemService;
import com.collie.user.item.vo.ItemQnaListVO;
import com.collie.user.item.vo.ItemQnaVO;
import com.collie.user.item.vo.ReviewDetailVO;
import com.collie.user.item.vo.ReviewFlagVO;
import com.collie.user.item.vo.ReviewVO;

@Controller
public class ItemController {
	
	@RequestMapping(value="/item/getItems.do", method= {RequestMethod.POST, RequestMethod.GET})
	public String getItemList(RangeVO rVO, Model model) {
		ItemService iService = new ItemService();
		List<ItemListDomain> list = iService.getItemList(rVO);
		model.addAttribute("item_list", list);
		model.addAttribute("paging", rVO);
		return "/item/search_item_result";
	}
	
	@RequestMapping(value="/item/search.do", method=RequestMethod.POST)
	public String getSearchList(RangeVO rVO, Model model) {
		ItemService iService = new ItemService();
		List<ItemListDomain> list = iService.getItemList(rVO);
		String json = iService.toJson(list, rVO);
		
		model.addAttribute("json", json);
		return "/item/search_item_json";
	}
	
	@RequestMapping(value = "/item/item_detail.do",method = {RequestMethod.GET,RequestMethod.POST})
	public String viewItemDetail(String item_num,Model model) throws NumberFormatException {
		ItemService iservice = new ItemService();
		
		model.addAttribute("item_detail",(iservice.viewItemDetail(Integer.parseInt(item_num))));
		
		return "/item/item_detail";
	}
	
	/**
	 * ���� ����� ��ȸ�ϴ� ��
	 * @param rVO
	 * @param model
	 * @return
	 */
	@RequestMapping(value="/item/review_list.do", method=RequestMethod.GET)
	public String getReviewList(HttpSession session, ReviewFlagVO rfVO, RangeVO rVO, Model model) {
		List<ReviewDomain> list = null;
		ItemService is = new ItemService();
		rVO.setField_name("item_num");
		rVO.setField_value(rfVO.getItem_num());
		list = is.getReviewList(rVO);
		model.addAttribute("review_list", list);
		model.addAttribute("paging", rVO);
		
		if( (LoginDomain)session.getAttribute("user_info") != null ) {
			boolean flag = false;
			LoginDomain ld = (LoginDomain)session.getAttribute("user_info");
			rfVO.setMember_num(ld.getMember_num());
			//���並 �ۼ��� ������ �ִ���(��ǰ�� �����ߴ���) Ȯ��
			flag = is.getReviewFlag(rfVO);
			model.addAttribute("buyFlag", flag);
		}//end if
		
		return "item/review_list";
	}//getReviewList
	
	/**
	 * ���� ��� ���������̼� - ��������ȣ Ŭ�� �� ����
	 * @param rVO
	 * @param model
	 * @return
	 */
	@RequestMapping(value="/item/review_list_page.do", method=RequestMethod.GET)
	public String reviewListPaging(RangeVO rVO, Model model) {
		ItemService is = new ItemService();
		List<ReviewDomain> list = is.getReviewList(rVO);
		rVO.setField_name("item_num");
		rVO.setField_value(rVO.getField_value());
		String json = is.reviewListJson(list, rVO);
		model.addAttribute("json", json);
		
		return "item/review_list_json";
	}//reviewListPaging
	
	/**
	 * ���� �� ������ ��ȸ�ϴ� ��
	 * @param rdVO
	 * @return
	 */
	@RequestMapping(value="/item/review_detail.do", method=RequestMethod.GET, produces="application/json;charset=UTF-8" )
	@ResponseBody
	public String viewReviewDetail(ReviewDetailVO rdVO) {
		ItemService is = new ItemService();
		String json = is.viewReviewDetail(rdVO);
		
		return json;
	}//viewReviewDetail
	
	/**
	 * ���並 �ۼ��ϱ� ���� ���� �ҷ����� ��
	 * @param session
	 * @param rfVO
	 * @return
	 */
	@RequestMapping(value="/item/review_form.do", method=RequestMethod.GET)
	public String reviewForm() {
		return "item/review_form";
	}//reviewForm
	
	/**
	 * ���並 �ۼ��ϴ� ��
	 * @param rVO
	 * @return
	 */
	@RequestMapping(value="/item/review_write.do", method=RequestMethod.POST)
	public String addReview(ReviewVO rVO, HttpSession session, int item_num) {
		LoginDomain ld = (LoginDomain)session.getAttribute("user_info");
		if( ld != null) {
			rVO.setMember_num(ld.getMember_num());
			ItemService is = new ItemService();
			is.addReview(rVO);
		}//end if
		
		return "redirect:/item/item_detail.do?item_num="+item_num;
	}//addReview
	
	@RequestMapping(value="/item/item_qna_list.do", method=RequestMethod.GET)
	public String viewItemQnaList(ItemQnaListVO iqlVO, String current_page, Model model) throws NumberFormatException {
		
		if(current_page==null) {
			current_page="1";
		}//end if
		int currentPage=Integer.parseInt(current_page);
		
		ItemService is=new ItemService();
		
		int totalCnt=is.getItemQnaCnt(iqlVO.getItem_num());
		RangeVO rVO=new RangeVO();
		rVO.setTotal_cnt(totalCnt);
		rVO.setCurrent_page(currentPage);
		rVO.setPage_scale(5);
		rVO.calcPaging();
		
		iqlVO.setStart_num( rVO.getStart_num() );
		iqlVO.setEnd_num( rVO.getEnd_num() );
		
		List<ItemQnaDomain> list=is.getItemQnaList(iqlVO);
		model.addAttribute("qna_list", list);
		
		model.addAttribute("paging", rVO);
		
		return "item/item_qna";
	}//viewItemQnaList
	
	@RequestMapping(value="/item/item_qna_move_page.do", method=RequestMethod.POST,  produces="application/json;charset=UTF-8")
	@ResponseBody
	public String viewItemQnaMovePage(ItemQnaListVO iqlVO, String current_page) throws NumberFormatException {
		String json=null;
		
		if(current_page==null) {
			current_page="1";
		}//end if
		int currentPage=Integer.parseInt(current_page);

		ItemService is=new ItemService();
		json=is.getItemQnaMovePage(iqlVO, currentPage);
		
		return json;
	}//viewItemQnaMovePage
	
	@RequestMapping(value="/item/item_qna_detail.do", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
	@ResponseBody
	public String getItemQnaDetail(int item_qna_num) throws NumberFormatException {
		String json=null;
		
		json=new ItemService().getItemQnaDetail(item_qna_num);
		
		return json;
	}//getItemQnaDetail
	
	@RequestMapping(value="/item/item_qna_add_form.do", method=RequestMethod.POST)
	public String viewItemQnaForm() throws NumberFormatException {
		
		return "item/item_qna_form";
	}//addItemQna
	
	@RequestMapping(value="/item/qna_add_process.do", method=RequestMethod.POST)
	public String addItemQna(ItemQnaVO iqVO, HttpSession session) throws NumberFormatException {
		String url="redirect:/item/item_detail.do?item_num="+iqVO.getItem_num()+"&item_qna_flag=true";
		
		LoginDomain ld=(LoginDomain)session.getAttribute("user_info");
		iqVO.setMember_num(ld.getMember_num());
		
		boolean flag=new ItemService().addItemQna(iqVO);
		
		if(!flag) {
			url="redirect:/item/item_detail.do?item_num="+iqVO.getItem_num()+"&item_qna_flag=false";
		}//end if
		
		return url;
	}//addItemQna
	
}
