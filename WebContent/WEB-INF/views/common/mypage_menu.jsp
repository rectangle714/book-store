<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div id="containerMenu">
	<div id="menuTitle"><h3><strong>마이페이지</strong></h3></div>
	<table class="table table-bordered">
    	<tr><td onclick="location.href='order_list.do'">주문 내역</td></tr>
    	<tr><td onclick="location.href='qna_list.do'">문의 내역</td></tr>
    	<tr><td onclick="location.href='check_member_form.do'">개인정보 수정</td></tr>
    	<tr><td onclick="location.href='check_pass_form.do'">비밀번호 변경</td></tr>
    </table>
    <div id="qnaBox" onclick="location.href='../qna/qna_form.do'">
    	<strong>도움이 필요하신가요?</strong><br/>
    	1:1 문의하기
    </div>
    <div id="cscBox">
    	<strong>고객센터</strong><br/>
		1644-1101 (오전 7시~ 오후 7시)<br/>
		<strong>1:1문의</strong> (24시간 접수 가능)<br/>
		※ 고객센터 운영 시간에<br/>
		순차적으로 답변해드리겠습니다.
    </div>
</div>