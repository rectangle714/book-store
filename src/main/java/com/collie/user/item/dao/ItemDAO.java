package com.collie.user.item.dao;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.collie.user.dao.GetCollieHandler;
import com.collie.user.item.domain.ItemDetailDomain;
import com.collie.user.item.domain.ItemListDomain;
import com.collie.user.item.domain.ItemQnaDetailDomain;
import com.collie.user.item.domain.ItemQnaDomain;
import com.collie.user.item.domain.ReviewDomain;
import com.collie.user.item.vo.ItemQnaListVO;
import com.collie.user.item.vo.ItemQnaVO;
import com.collie.user.item.vo.ReviewDetailVO;
import com.collie.user.item.vo.ReviewFlagVO;
import com.collie.user.item.vo.ReviewVO;
import com.collie.user.pagination.RangeVO;

public class ItemDAO {
	
	private static ItemDAO iDAO;
	
	private ItemDAO() {
	}
	
	public static ItemDAO getInstance() {
		if(iDAO == null) {
			iDAO = new ItemDAO();
		}
		return iDAO;
	}

	/**
	 * 
	 * ī�װ� ���� �̿��ؼ� ������ ����� �����´�.
	 * @param rVO
	 * @return
	 */
	public List<ItemListDomain> selectItemList(RangeVO rVO) {
		List<ItemListDomain> list = null;
		SqlSession ss = GetCollieHandler.getInstance().getSqlSession();
		list = ss.selectList("kr.co.collie.user.item.selectItemList",rVO);
		ss.close();
		return list;
	}
	


	public int selectItemListCnt(RangeVO rVO) {
		SqlSession ss = GetCollieHandler.getInstance().getSqlSession();
		int cnt = ss.selectOne("kr.co.collie.user.item.selectItemListCnt", rVO);
		ss.close();
		return cnt;
	}
	
	public ItemDetailDomain selectItemDetail(int item_Num) {
		ItemDetailDomain idd = null;
		SqlSession ss =GetCollieHandler.getInstance().getSqlSession();
		idd = ss.selectOne("selectItemDetail", item_Num);
		ss.close();
		
		return idd;
	}
	
	public List<String> detailImgList(int item_Num){
		List<String> list = null;
		SqlSession ss = GetCollieHandler.getInstance().getSqlSession();
		list = ss.selectList("detailImgList",item_Num);
		System.out.println("DAO======"+ list.size());
		ss.close();
		return list;
	}
	
	/**
	 * ���� ����� ��ȸ�ϴ� ��
	 * @param rVO
	 * @return
	 */
	public List<ReviewDomain> selectReviewList(RangeVO rVO){
		List<ReviewDomain> list = null;
		
		SqlSession ss = GetCollieHandler.getInstance().getSqlSession();
		list = ss.selectList("kr.co.collie.user.item.selectReviewList", rVO);
		ss.close();
		
		return list;
	}//selectReviewList
	
	/**
	 * ���� ��� ���������̼��� ���� ��� ������ ���� ��
	 * @param rVO
	 * @return
	 */
	public int selectReviewListCnt(RangeVO rVO) {
		int cnt = 0;
		
		SqlSession ss = GetCollieHandler.getInstance().getSqlSession();
		cnt = ss.selectOne("kr.co.collie.user.item.selectReviewListCnt", rVO);
		ss.close();
		
		return cnt;
	}//selectReviewListCnt
	
	/**
	 * ���� �� ������ ��ȸ�ϴ� ��
	 * @param rdVO
	 * @return
	 */
	public String selectReviewDetail(ReviewDetailVO rdVO) {
		String review_content = null;
		
		SqlSession ss= GetCollieHandler.getInstance().getSqlSession();
		review_content = ss.selectOne("kr.co.collie.user.item.selectReviewDetail", rdVO);
		ss.close();
		
		return review_content;
	}//selectReviewDetail
	
	/**
	 * ���並 �ۼ��� ������ �ִ���(��ǰ�� �����ߴ���) Ȯ���ϴ� ��
	 * @param rfVO
	 * @return
	 */
	public String selectReviewFlag(ReviewFlagVO rfVO) {
		String flag = "N";
		
		SqlSession ss = GetCollieHandler.getInstance().getSqlSession();
		int cnt = ss.selectOne("kr.co.collie.user.item.selectReviewFlag", rfVO);
		if( cnt == 1 ) {
			flag = "Y";
		}//end if
		ss.close();
		
		return flag;
	}//selectReviewFlag
	
	/**
	 * ���並 �ۼ��ϴ� ��
	 * @param rVO
	 * @return
	 */
	public int insertReview(ReviewVO rVO) {
		int cnt = 0;
		
		SqlSession ss = GetCollieHandler.getInstance().getSqlSession();
		cnt = ss.insert("kr.co.collie.user.item.insertReview", rVO);
		ss.commit();
		ss.close();
		
		return cnt;
	}//insertReview
	
	public List<ItemQnaDomain> selectItemQnaList(ItemQnaListVO iqlVO){
		List<ItemQnaDomain> list=null;
		
		SqlSession ss=GetCollieHandler.getInstance().getSqlSession();
		list=ss.selectList("selectItemQnaList",iqlVO);
		ss.close();
		
		return list;
	}//selectItemQnaList
	
	
	public ItemQnaDetailDomain selectItemQnaDetail(int itemQnaNum) {
		ItemQnaDetailDomain iqdDomain=null;
		
		SqlSession ss=GetCollieHandler.getInstance().getSqlSession();
		iqdDomain=ss.selectOne("selectItemQnaDetail", itemQnaNum);
		ss.close();
		
		return iqdDomain;
	}//selectItemQnaDetail
	
	public int selectItemQnaCnt(int itemNum) {
		int cnt=0;
		
		SqlSession ss=GetCollieHandler.getInstance().getSqlSession();
		cnt=ss.selectOne("selectItemQnaCnt",itemNum);
		ss.close();
		
		return cnt;
	}//selectItemQnaCnt
	
	public void insertItemQna(ItemQnaVO iqVO) throws SQLException {
		
		SqlSession ss=GetCollieHandler.getInstance().getSqlSession();
		ss.insert("insertItemQna",iqVO);
		ss.commit();
		ss.close();
		
	}//insertItemQna
	
	public static void main(String[] args) {
		ReviewDetailVO rdVO = new ReviewDetailVO();
		rdVO.setItem_num(1);
		rdVO.setReview_num(66);
		
		System.out.println(ItemDAO.getInstance().selectReviewDetail(rdVO));
	}
	
}
