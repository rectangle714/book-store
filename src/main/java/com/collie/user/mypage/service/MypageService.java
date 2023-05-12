package com.collie.user.mypage.service;

import java.security.NoSuchAlgorithmException;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import com.collie.user.mypage.dao.MypageDAO;
import com.collie.user.mypage.domain.MemberInfoDomain;
import com.collie.user.mypage.domain.OrderDetailDomain;
import com.collie.user.mypage.domain.OrderListDomain;
import com.collie.user.mypage.vo.DeleteMemberVO;
import com.collie.user.mypage.vo.ModifyMemberVO;
import com.collie.user.mypage.vo.MyOrderVO;
import com.collie.user.mypage.domain.QnaDetailDomain;
import com.collie.user.mypage.domain.QnaListDomain;
import com.collie.user.mypage.vo.PassCheckVO;
import com.collie.user.mypage.vo.QnaVO;
import com.collie.user.mypage.vo.UpdatePassVO;
import com.collie.user.pagination.RangeVO;
import kr.co.sist.util.cipher.DataEncrypt;

public class MypageService {

	/**
	 * �ֹ� ���� ����� �ҷ����� ��
	 * @param rVO
	 * @return
	 */
	public List<OrderListDomain> getOrderList(RangeVO rVO){
		List<OrderListDomain> list = null;
		
		MypageDAO mDAO = MypageDAO.getInstance();
		int totalCnt = getOrderListCnt(rVO);
		rVO.setTotal_cnt(totalCnt);
		rVO.setPage_scale(3);
		rVO.calcPaging();
		list = mDAO.selectOrderList(rVO);
		
		return list;
	}//getOrderList
	
	/**
	 * �ֹ� ���� ���������̼��� ���� ������ ���� ��
	 * @param rVO
	 * @return
	 */
	public int getOrderListCnt(RangeVO rVO) {
		int cnt = 0;
		
		MypageDAO mDAO = MypageDAO.getInstance();
		cnt = mDAO.selectOrderListCnt(rVO);

		return cnt;
	}//getOrderListCnt
	
	/**
	 * �ֹ� ���� ���������̼��� ���� JSON ����
	 * @param list
	 * @param rVO
	 * @return
	 */
	public String orderListJson(List<OrderListDomain> list, RangeVO rVO) {
		JSONObject jo = new JSONObject();
		jo.put("total_cnt", list.size());
		jo.put("start_num", rVO.getStart_num());
		jo.put("end_num", rVO.getEnd_num());
		
		jo.put("start_page", rVO.getStart_page());
		jo.put("end_page", rVO.getEnd_page());
		jo.put("pre_page", rVO.getPre_page());
		jo.put("next_page", rVO.getNext_page());
		jo.put("current_page", rVO.getCurrent_page());
		jo.put("total_page", rVO.getTotal_page());
		
		JSONArray ja = new JSONArray();
		JSONObject joTemp = null;
		for( OrderListDomain item : list ) {
			joTemp = new JSONObject();
			joTemp.put("order_num", item.getOrder_num());
			joTemp.put("total_price", item.getTotal_price());
			joTemp.put("item_name", item.getItem_name());
			joTemp.put("item_img", item.getItem_img());
			joTemp.put("input_date", item.getInput_date());
			ja.add(joTemp);
		}//end for
		jo.put("order_list", ja);
		
		return jo.toJSONString();
	}//orderListJson
	
	/**
	 * �ֹ� ���� ���������� �ҷ����� ��
	 * @param order_num
	 * @return
	 */
	public OrderDetailDomain getOrderDetail(MyOrderVO moVO) {
		OrderDetailDomain odd = null;
		
		MypageDAO mDAO = MypageDAO.getInstance();
		odd = mDAO.selectOrderDetail(moVO);
		
		return odd;
	}//getOrderDetail
	
	/**
	 * �ֹ������� ����ϴ� ��
	 * @param moVO
	 * @return
	 */
	public boolean cancelOrder(MyOrderVO moVO) {
		boolean flag = false;
		
		MypageDAO mDAO = MypageDAO.getInstance();
		flag = mDAO.deleteOrder(moVO)==1;
		
		return flag;
	}//cancelOrder
	
	
	/**
	 * ���� ��й�ȣ�� Ȯ���ϴ� ��
	 * @param pcVO
	 * @return ��ġ �ϸ� true, ��ġ���� ������ false
	 */
	public boolean getMemberPass(PassCheckVO pcVO) {
		boolean flag = false;
		MypageDAO mpDAO = MypageDAO.getInstance();
		try {
			pcVO.setPass(DataEncrypt.messageDigest("MD5", pcVO.getPass()));
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}//end catch
		flag = mpDAO.selectMemberPass(pcVO) != 0;
		
		return flag;
	}//getMemberPass
	
	/**
	 * ��й�ȣ�� �����ϴ� ��
	 * @param upVO
	 * @return
	 */
	public boolean modifyPass(UpdatePassVO upVO) {
		boolean flag = false;
		
		MypageDAO mpDAO = MypageDAO.getInstance();
		try {
			upVO.setPass(DataEncrypt.messageDigest("MD5", upVO.getPass()));
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}//end catch
		flag = mpDAO.updateMemberPass(upVO)==1;
		
		return flag;
	}//modifyPass
	
	/**
	 * ��� ���� ��������
	 * @param pcVO
	 * @return
	 */
	public MemberInfoDomain getMemberInfo(PassCheckVO pcVO) {
		MemberInfoDomain  mid = null;
		
		MypageDAO mDAO = MypageDAO.getInstance();
		
		mid=mDAO.selectMemberInfo(pcVO);
		
		
		return mid;
	}//getMemberInfo
	
	
	/**
	 * ��� ���� ����
	 * @param mmVO
	 * @return
	 */
	public boolean modifyMemberInfo(ModifyMemberVO mmVO) {
		boolean flag = false;
		
		MypageDAO mDAO = MypageDAO.getInstance();
		flag = mDAO.updateMemberInfo(mmVO) != 0;
		
		return flag;
	}//modifyMemberInfo
	
	/**
	 * ȸ�� Ż��
	 * @param dmVO
	 * @return
	 */
	public boolean removeMember(DeleteMemberVO dmVO) {
		  
		boolean flag = false;
		
		MypageDAO mDAO = MypageDAO.getInstance();
		flag = mDAO.deleteMember(dmVO)==1;
		MypageDAO mpDAO = MypageDAO.getInstance();
		try {
			dmVO.setPass(DataEncrypt.messageDigest("MD5", dmVO.getPass()));
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}//end catch
		
		flag = mpDAO.deleteMember(dmVO)!=0;
		
		return flag;
		
	}//removeMember
	
	public int getQnaTotalCnt(int member_num) {
		int cnt=0;
		
		MypageDAO mpDAO = MypageDAO.getInstance();
		cnt=mpDAO.selectQnaTotalCnt(member_num);
		
		return cnt;
	}//getQnaTotalCnt
	
	public List<QnaListDomain> getQnaList(RangeVO rVO){
		List<QnaListDomain> list = null;
		
		MypageDAO mpDAO = MypageDAO.getInstance();
		list = mpDAO.selectQnaList(rVO);
		
		return list;
	}//getQnaList
	
	public String moveQnaListPage(int member_num, int current_page) {
		JSONObject json=new JSONObject();
		List<QnaListDomain> list = null;
		
		MypageDAO mpDAO = MypageDAO.getInstance();
		
		RangeVO rVO=new RangeVO();
		rVO.setField_name("member_num");
		rVO.setField_value(member_num);
		rVO.setCurrent_page(current_page);
		rVO.setTotal_cnt(mpDAO.selectQnaTotalCnt(member_num));
		rVO.calcPaging();
		
		System.out.println("range vo : " + rVO);
		
		list = mpDAO.selectQnaList(rVO);
		String flag="fail";
		if(list!=null) {
			flag="success";
			JSONArray jsonArr=new JSONArray();
			JSONObject jsonObj=null;
			for(int i=0; i<list.size(); i++) {
				//idx, qna_num;
				//qna_subject,qna_flag,input_date;
				jsonObj=new JSONObject();
				jsonObj.put("idx", list.get(i).getIdx());
				jsonObj.put("qna_num", list.get(i).getQna_num());
				jsonObj.put("qna_subject", list.get(i).getQna_subject());
				jsonObj.put("qna_flag", list.get(i).getQna_flag());
				jsonObj.put("input_date", list.get(i).getInput_date());
				jsonArr.add(jsonObj);
			}//end for
			json.put("qna_list", jsonArr);
			
			json.put("start_num", rVO.getStart_num());
			json.put("end_num", rVO.getEnd_num());
			
			json.put("start_page", rVO.getStart_page());
			json.put("end_page", rVO.getEnd_page());
			json.put("pre_page", rVO.getPre_page());
			json.put("next_page", rVO.getNext_page());
			json.put("current_page", rVO.getCurrent_page());
			json.put("total_page", rVO.getTotal_page());
			
		}//end if
		json.put("flag", flag);
		
		
		return json.toJSONString();
	}//moveQnaListPage
	

	public String getQnaDetail(QnaVO qVO) {
		JSONObject json=new JSONObject();
		
		MypageDAO mpDAO = MypageDAO.getInstance();
		QnaDetailDomain qdd=mpDAO.selectQnaDetail(qVO);
		
		String flag="fail";
		if(qdd!=null) {
			flag="success";
		}//end if
		
		json.put("flag", flag);
		json.put("qna_content", qdd.getQna_content());
		json.put("qna_reply", qdd.getQna_reply());
		json.put("reply_date", qdd.getReply_date());
		
		return json.toJSONString();
	}//getQnaDetail
}//class

	
	
