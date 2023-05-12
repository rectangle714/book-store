package com.collie.user.item.service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.collie.user.item.dao.ItemDAO;
import com.collie.user.item.domain.ItemListDomain;
import com.collie.user.item.domain.ItemQnaDetailDomain;
import com.collie.user.item.domain.ItemQnaDomain;
import com.collie.user.item.domain.ReviewDomain;
import com.collie.user.pagination.RangeVO;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import com.collie.user.item.domain.ItemDetailDomain;
import com.collie.user.item.vo.ItemQnaListVO;
import com.collie.user.item.vo.ItemQnaVO;
import com.collie.user.item.vo.ReviewDetailVO;
import com.collie.user.item.vo.ReviewFlagVO;
import com.collie.user.item.vo.ReviewVO;

public class ItemService {
	
	/**
	 * ī�װ� ���� �̿��ؼ� ������ ����� �����´�.
	 * @param rVO
	 * @param sVO
	 * @return jsonObject jsonString
	 */
	public List<ItemListDomain> getItemList(RangeVO rVO) {
		List<ItemListDomain> list = null;
		ItemDAO dDAO = ItemDAO.getInstance();
		
		//JSP���� �ʿ��� ��ü ���ڵ� ���� ��ȸ
		int totalCnt = getItemListCnt(rVO);
		rVO.setTotal_cnt(totalCnt);
		rVO.setPage_scale(6);
		rVO.calcPaging();// ��� ���� �� ���� �� ����¡ ���
		list = dDAO.selectItemList(rVO);
		
		return list;
	}
	
	public int getItemListCnt(RangeVO rVO) {
		ItemDAO dDAO = ItemDAO.getInstance();
		int cnt = dDAO.selectItemListCnt(rVO);
		return cnt;
	}
	

	public String toJson(List<ItemListDomain> list, RangeVO rVO) {
		JSONObject jo = new JSONObject();
		jo.put("search_tot_cnt", list.size());
		jo.put("start_num", rVO.getStart_num());
		jo.put("end_num", rVO.getEnd_num());
		
		jo.put("start_page", rVO.getStart_page());
		jo.put("end_page", rVO.getEnd_page());
		jo.put("pre_page", rVO.getPre_page());
		jo.put("next_page", rVO.getNext_page());
		jo.put("current_page", rVO.getCurrent_page());
		jo.put("total_page", rVO.getTotal_page());
		
		JSONArray ja = new JSONArray();
		JSONObject jsonTemp = null;
		for(ItemListDomain item : list) {
			jsonTemp = new JSONObject();
			jsonTemp.put("item_num", item.getItem_num());
			jsonTemp.put("item_name", item.getItem_name());
			jsonTemp.put("item_price", item.getItem_price());
			jsonTemp.put("item_img", item.getItem_img());
			ja.add(jsonTemp);
		}
		jo.put("item_list", ja);		
		return jo.toJSONString();
	}
	
	/**
	 * ������ �������� 
	 * @param item_Num
	 * @return
	 */
	public ItemDetailDomain viewItemDetail(int item_Num) {
		ItemDetailDomain idd = null;
		
		ItemDAO dDAO = ItemDAO.getInstance();
		idd = dDAO.selectItemDetail(item_Num);

		List<String> detailImgList = new ArrayList<String>();
		List<String> tabImgList = new ArrayList<String>();
		
		List<String> result = dDAO.detailImgList(item_Num);
				
	      for(int i = 0; i < result.size(); i++) {
	         String imgPath = result.get(i); //DB���� �޾ƿ� �̹��� ���  ��������
	         if(imgPath.startsWith("tab_")) {
	            tabImgList.add(imgPath);
	         } else {
	        	 detailImgList.add(imgPath);
	         }//end else
	      }
	      System.out.println( "itemservice "+  tabImgList.size() );
	      idd.setDetailImgList(detailImgList);
	      idd.setTabImgList(tabImgList);
		
		//idd.setDetailImgList(dDAO.detailImgList(item_Num));
		
		return idd;
	}
	
	/**
	 * ���� ����� ��ȸ�ϴ� ��
	 * @param rVO
	 * @return
	 */
	public List<ReviewDomain> getReviewList(RangeVO rVO){
		List<ReviewDomain> list = null;
		
		ItemDAO iDAO = ItemDAO.getInstance();
		int total_cnt = getReviewListCnt(rVO);
		rVO.setTotal_cnt(total_cnt);
		rVO.setPage_scale(5);
		rVO.calcPaging();
		list = iDAO.selectReviewList(rVO);
		
		return list;
	}//getReviewList
	
	/**
	 * ���� ��� ���������̼��� ���� ��� ������ ���� ��
	 * @param rVO
	 * @return
	 */
	public int getReviewListCnt(RangeVO rVO) {
		int cnt = 0;
		
		ItemDAO iDAO = ItemDAO.getInstance();
		cnt = iDAO.selectReviewListCnt(rVO);
		
		return cnt;
	}//getReviewListCnt
	
	/**
	 * ���� ��� ���������̼��� ���� JSON ����
	 * @param list
	 * @param rVO
	 * @return
	 */
	public String reviewListJson(List<ReviewDomain> list, RangeVO rVO) {
		JSONObject jo = new JSONObject();
		jo.put("total_cnt", list.size());
		jo.put("start_num", rVO.getStart_num());
		jo.put("end_num", rVO.getEnd_num());
		
		jo.put("start_page", rVO.getStart_page());
		jo.put("end_page", rVO.getEnd_page());
		jo.put("pre_page", rVO.getPre_page());
		jo.put("next_page", rVO.getNext_page());
		
		JSONArray ja = new JSONArray();
		JSONObject jsonTemp = null;
		for(ReviewDomain review : list) {
			jsonTemp = new JSONObject();
			jsonTemp.put("idx", review.getIdx());
			jsonTemp.put("review_num", review.getReview_num());
			jsonTemp.put("review_subject", review.getReview_subject());
			jsonTemp.put("id", review.getId());
			jsonTemp.put("input_date", review.getInput_date());
			ja.add(jsonTemp);
		}
		jo.put("review_list", ja);		
		return jo.toJSONString();
	}//reviewListJson
	
	/**
	 * ���� �� ������ ��ȸ�ϴ� ��
	 * @param rdVO
	 * @return
	 */
	public String viewReviewDetail(ReviewDetailVO rdVO) {
		String review_content = null;
		JSONObject jo = new JSONObject();
		
		ItemDAO iDAO = ItemDAO.getInstance();
		review_content = iDAO.selectReviewDetail(rdVO);
		jo.put("review_content", review_content);
		
		return jo.toJSONString();
	}//viewReviewDetail
	
	/**
	 * ���並 �ۼ��� ������ �ִ���(��ǰ�� �����ߴ���) Ȯ���ϴ� ��
	 * @param rfVO
	 * @return
	 */
	public boolean getReviewFlag(ReviewFlagVO rfVO) {
		boolean flag = false;
		
		ItemDAO iDAO = ItemDAO.getInstance();
		flag = iDAO.selectReviewFlag(rfVO)=="Y";
		
		return flag;
	}//getReviewFlag
	
	/**
	 * ���並 �ۼ��ϴ� ��
	 * @param rVO
	 * @return
	 */
	public boolean addReview(ReviewVO rVO) {
		boolean flag = false;
		
		ItemDAO iDAO = ItemDAO.getInstance();
		flag = iDAO.insertReview(rVO)==1;
		
		return flag;
	}//addReview
	
	public List<ItemQnaDomain> getItemQnaList(ItemQnaListVO iqlVO){
		List<ItemQnaDomain> list=null;
		
		ItemDAO iDAO=ItemDAO.getInstance();
		list=iDAO.selectItemQnaList(iqlVO);
		
		return list;
	}//getItemQnaList
	
	public String getItemQnaMovePage(ItemQnaListVO iqlVO, int currentPage){
		JSONObject json=new JSONObject();
		
		ItemDAO iDAO=ItemDAO.getInstance();
		
		int totalCnt=iDAO.selectItemQnaCnt(iqlVO.getItem_num());
		RangeVO rVO=new RangeVO();
		rVO.setTotal_cnt(totalCnt);
		rVO.setCurrent_page(currentPage);
		rVO.setPage_scale(5);
		rVO.calcPaging();
		
		iqlVO.setStart_num( rVO.getStart_num() );
		iqlVO.setEnd_num( rVO.getEnd_num() );
		List<ItemQnaDomain> list=iDAO.selectItemQnaList(iqlVO);
		
		String flag="fail";
		if(list!=null) {
			flag="success";
			
			JSONArray jsonArr=new JSONArray();
			JSONObject jsonObj=null;
			for(int i=0; i<list.size(); i++) {
				jsonObj=new JSONObject();
				jsonObj.put("idx", list.get(i).getIdx());
				jsonObj.put("item_qna_num", list.get(i).getItem_qna_num());
				jsonObj.put("id", list.get(i).getId());
				jsonObj.put("item_qna_subject", list.get(i).getItem_qna_subject());
				jsonObj.put("item_qna_flag", list.get(i).getItem_qna_flag());
				jsonObj.put("input_date", list.get(i).getInput_date());
				jsonArr.add(jsonObj);
			}//end for
			json.put("qna_list", jsonArr);
			
			json.put("current_page",rVO.getCurrent_page());
			json.put("pre_page",rVO.getPre_page());
			json.put("next_page",rVO.getNext_page());
			json.put("start_page",rVO.getStart_page());
			json.put("end_page",rVO.getEnd_page());
			json.put("total_page",rVO.getTotal_page());
		}//end if
		json.put("flag", flag);
		
		
		return json.toJSONString();
	}//getItemQnaList
	
	public String getItemQnaDetail(int itemQnaNum) {
		JSONObject json=new JSONObject();
		
		ItemQnaDetailDomain iqdDomain=ItemDAO.getInstance().selectItemQnaDetail(itemQnaNum);
		
		String flag="fail";
		if(iqdDomain!=null) {
			flag="success";
			json.put("item_qna_content", iqdDomain.getItem_qna_content());
			json.put("item_qna_reply", iqdDomain.item_qna_reply);
			json.put("reply_date", iqdDomain.reply_date);
		}//end if
		json.put("flag", flag);
		
		return json.toString();
	}//getItemQnaDetail
	
	public int getItemQnaCnt(int itemNum) {
		int cnt=0;
		
		cnt=ItemDAO.getInstance().selectItemQnaCnt(itemNum);
		
		return cnt;
	}//getItemQnaCnt
	
	public boolean addItemQna(ItemQnaVO iqVO) {
		boolean flag=false;
		
		try {
			ItemDAO.getInstance().insertItemQna(iqVO);
			flag=true;
		} catch (SQLException e) {
			e.printStackTrace();
		}//end catch
		
		return flag;
	}//addItemQna
}
