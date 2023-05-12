package com.collie.user.mypage.dao;

import java.util.List;

import com.collie.user.dao.GetCollieHandler;
import com.collie.user.mypage.domain.MemberInfoDomain;
import com.collie.user.mypage.domain.OrderDetailDomain;
import com.collie.user.mypage.domain.OrderListDomain;
import com.collie.user.mypage.vo.DeleteMemberVO;
import com.collie.user.pagination.RangeVO;
import org.apache.ibatis.session.SqlSession;

import com.collie.user.mypage.domain.QnaDetailDomain;
import com.collie.user.mypage.domain.QnaListDomain;
import com.collie.user.mypage.vo.ModifyMemberVO;
import com.collie.user.mypage.vo.MyOrderVO;
import com.collie.user.mypage.vo.PassCheckVO;
import com.collie.user.mypage.vo.QnaVO;
import com.collie.user.mypage.vo.UpdatePassVO;

public class MypageDAO {
	private static MypageDAO mpDAO;
	
	 private MypageDAO() {
     }//MypageDAO
     
     public static MypageDAO getInstance() {
         if( mpDAO == null ) {
              mpDAO = new MypageDAO();
         }//end if
         return mpDAO;
     }//getInstance

     /**
      * �ֹ� ���� ����� �ҷ����� ��
     * @param rVO
     * @return
     */
    public List<OrderListDomain> selectOrderList(RangeVO rVO){
    	 List<OrderListDomain> list = null;
    	 
    	 SqlSession ss = GetCollieHandler.getInstance().getSqlSession();
    	 list = ss.selectList("kr.co.collie.user.mypage.selectOrderList", rVO);
    	 ss.close();
    	 
    	 return list;
     }//selectOrderList
    
    /**
     * �ֹ� ���� ��� ���������̼��� ���� ������ ���� ��
     * @param rVO
     * @return
     */
    public int selectOrderListCnt(RangeVO rVO) {
    	int cnt = 0;
    	
    	SqlSession ss = GetCollieHandler.getInstance().getSqlSession();
    	cnt = ss.selectOne("kr.co.collie.user.mypage.selectOrderListCnt", rVO);
    	ss.close();
    	
    	return cnt;
    }//selectOrderListCnt

    /**
     * �ֹ� ���� ���������� �ҷ����� ��
     * @param order_num
     * @return
     */
    public OrderDetailDomain selectOrderDetail(MyOrderVO moVO) {
    	OrderDetailDomain odd = null;
    	
    	SqlSession ss = GetCollieHandler.getInstance().getSqlSession();
    	odd = ss.selectOne("kr.co.collie.user.mypage.selectOrderInfo", moVO);
    	ss.close();
    	
    	return odd;
    }//selectOrderDetail
    
    /**
     * �ֹ������� ����ϴ� ��
     * @param moVO
     * @return
     */
    public int deleteOrder(MyOrderVO moVO) {
    	int cnt = 0;
    	
    	SqlSession ss = GetCollieHandler.getInstance().getSqlSession();
    	ss.delete("kr.co.collie.user.mypage.deleteOrder", moVO);
    	ss.commit();
    	ss.close();
    	
    	return cnt;
    }//deleteOrder

     
     /**
      * ���� ��й�ȣ�� Ȯ���ϴ� ��
      * @param pcVO
      * @return
      */
     public int selectMemberPass(PassCheckVO pcVO) {
         Integer result = 0;
         SqlSession ss = GetCollieHandler.getInstance().getSqlSession();
         result = ss.selectOne("kr.co.collie.user.mypage.selectMemberPass", pcVO);
         if(result == null) {
        	 result = 0;
         }
         ss.close();
         
         return result.intValue();
     }//selectMemberPass
     
     /**
     * ��� ���� ��������
     * @param pcVO
     * @return
     */
    public MemberInfoDomain selectMemberInfo(PassCheckVO pcVO) {
    	 MemberInfoDomain mid = null;
    	 SqlSession ss = GetCollieHandler.getInstance().getSqlSession();
    	 
    	 mid = ss.selectOne("kr.co.collie.user.mypage.selectMemberInfo", pcVO);
    	 
    	 ss.close();
    	 
    	 return mid;
     }//selectMemberInfo
     
     
     /**
     * ������� ����
     * @param mmVO
     * @return
     */
    public int updateMemberInfo(ModifyMemberVO mmVO) {
         int cnt =0;
         
         SqlSession ss = GetCollieHandler.getInstance().getSqlSession();
         
         cnt = ss.update("kr.co.collie.user.mypage.updateMember", mmVO);
         ss.commit();
         
         ss.close();
         
         return cnt;
     }//updateMemberInfo
    
    
    public int deleteMember(DeleteMemberVO dmVO) {
    	int cnt = 0;
    	
    	SqlSession ss = GetCollieHandler.getInstance().getSqlSession();
    	cnt = ss.update("kr.co.collie.user.mypage.removeMember", dmVO);
    	
    	ss.commit();
    	
    	ss.close();
    	
    	return cnt;
    }//deleteMember
    
	/**
	 * ��й�ȣ�� �����ϴ� ��.
	 * @param upVO
	 * @return
	 */
	public int updateMemberPass(UpdatePassVO upVO) {
		SqlSession ss = GetCollieHandler.getInstance().getSqlSession();
		int cnt = ss.update("kr.co.collie.user.mypage.updateMemberPass", upVO);
		ss.commit();
		ss.close();
		
		return cnt;
	}//updateMemberPass
	
	public int selectQnaTotalCnt(int memberNum) {
		int cnt=0;
		
		SqlSession ss=GetCollieHandler.getInstance().getSqlSession();
		cnt=ss.selectOne("selectQnaTotalCnt", memberNum);
		ss.close();
		
		return cnt;
	}//selectQnaTotalCnt
	
	public List<QnaListDomain> selectQnaList(RangeVO rVO){
		List<QnaListDomain> list = null;
		SqlSession ss = GetCollieHandler.getInstance().getSqlSession();
		list = ss.selectList("selectQnaList",rVO);
		ss.close();
		
		return list;
	}//selectQnaList
	
	public QnaDetailDomain selectQnaDetail(QnaVO qVO) {
		QnaDetailDomain qdd = null;
		SqlSession ss = GetCollieHandler.getInstance().getSqlSession();
		qdd = ss.selectOne("selectQnaDetail",qVO);
		ss.close();
		return qdd;
	}
	
}//class
