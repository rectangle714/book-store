package com.collie.user.member.service;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;

import org.json.simple.JSONObject;

import com.collie.user.member.dao.MemberDAO;
import com.collie.user.member.domain.LoginDomain;
import com.collie.user.member.vo.FindIdVO;
import com.collie.user.member.vo.FindPassVO;
import com.collie.user.member.vo.JoinVO;
import com.collie.user.member.vo.LoginVO;
import com.collie.user.member.vo.UpdatePassVO;
import kr.co.sist.util.cipher.DataEncrypt;
public class MemberService {
	

	public boolean join(JoinVO jVO) {
		boolean flag = false;
		
		MemberDAO mDAO = MemberDAO.getInstance();
		try {
			jVO.setPass(DataEncrypt.messageDigest("MD5", jVO.getPass()));
			if(jVO != null) {
				flag=true;
				mDAO.insertMember(jVO);
			}//end if
		} catch (IOException e) {
			e.printStackTrace();
		}catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}//end catch
		
		return flag;
	}//join
	
	public LoginDomain login(LoginVO loginVO) {
		LoginDomain loginDomain =  null;
		MemberDAO memDao = MemberDAO.getInstance();
		try {
			loginVO.setPass(DataEncrypt.messageDigest("MD5", loginVO.getPass()));
		} catch (NoSuchAlgorithmException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		loginDomain = memDao.selectLogin(loginVO);
		return loginDomain;
	}//login

	
	public String dupIdCheck(String id) {
		String rid = "";
		
		MemberDAO mDAO = MemberDAO.getInstance();
		
		rid=mDAO.dupId(id);
		
		JSONObject json=new JSONObject();
		json.put("id_dup_result", rid != null);
		
		return json.toJSONString();
	}//dupIdCheck
	
	public String dupEmailCheck(String email){
		String rEmail = "";
		
		MemberDAO mDAO = MemberDAO.getInstance();
		
		rEmail = mDAO.dupEmail(email);
		
		JSONObject jsonObj = new JSONObject();
		jsonObj.put("email_dup_result", rEmail != null );
		
		return jsonObj.toJSONString();
	}//dupEmailCheck
	
	public String findId(FindIdVO fidVO) {
		MemberDAO mDAO = MemberDAO.getInstance();
		String id =  mDAO.selectMemberId(fidVO);
		return id;
	}//findId
	
	public boolean findPass(FindPassVO fpsVO) {
		boolean flag = false;
		MemberDAO mDAO = MemberDAO.getInstance();
		//��ȸ�� ���̵� null�� �ƴϸ� true 
		String pass=mDAO.selectMemberPass(fpsVO);
		if(pass != null) {//��й�ȣ ����
			flag= true;
		}
		return flag;
	}
	
	public boolean modifyPass(UpdatePassVO upVO) {
		boolean flag= false;
		MemberDAO mDAO = MemberDAO.getInstance();
		try {
			upVO.setNew_pass(DataEncrypt.messageDigest("MD5", upVO.getNew_pass()));
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		int result = mDAO.updateMemberPass(upVO);
		if(result != 0) {
			flag=true;
		}
		return flag;
	}
	
}//class
