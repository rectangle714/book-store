package com.collie.user.dao;

import java.io.IOException;
import java.io.Reader;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

public class GetCollieHandler {
	private static GetCollieHandler gch;
	private static SqlSessionFactory ssf;
	
	private GetCollieHandler() {
		
	}//CartDAO
	
	public static GetCollieHandler getInstance() {
		if(gch==null) {
			gch=new GetCollieHandler();
		}//end if
		return gch;
	}//getInstance
	
	public SqlSession getSqlSession() {
		SqlSession ss=null;
		
		try {
			if(ssf==null) {
				//1.xml�� ����(buildpath���� included�� Excluded�� ��� ���� �ؾ� ��)
				String xmlConfig="kr/co/collie/user/dao/collie_config.xml";
				Reader reader=Resources.getResourceAsReader(xmlConfig);
				//2.MyBatis Framework ����
				ssf=new SqlSessionFactoryBuilder().build(reader);
				reader.close();//xml�� �о���� ��Ʈ���� ���´�.
			}//end if
			ss=ssf.openSession();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return ss;
	}//getSqlSession
	
}//class
