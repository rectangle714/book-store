<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>MARKET COLLIE</title>
<style type="text/css">
#wrap{ min-height: 940px; margin: 0px auto; }
#container{ min-height: 600px;}
#containerContentWrap{ margin-top: 30px; margin-bottom: 50px; display: flex; justify-content: center; }
#containerContent{ width: 70%; display: flex; align-items: center; justify-content: space-between; }

.container{ margin: 0 auto; margin-top:150px; min-height: 741px}
#loginDiv{text-align: center; margin-top:30px; width: 100%; min-height: 500px; text-align: center;}
#title{text-align: center; margin-bottom: 30px}

.loginFrm{margin-top: 30px}
.login_rel{padding: 5px 5px 8px 5px}
.form{ text-align: center; font-size: 15px; height: 30px; margin-bottom: 30px}
.form-control{border: 1px solid #d4d4d4; border-radius: 4px; font-size: 14px;line-height: 50px; margin: 0px auto}
#btnDiv{text-align: center; font-size: 15px; }
.collieBtnMain{ width: 340px; border: 1px solid #17462B; padding: 10px 0px 10px 0px; margin-top: 5px; margin-bottom: 5px; color: #fff; font-size: 15px; background-color: #17462B }
.collieBtn{ width: 340px; border: 1px solid #17462B; padding: 10px 0px 10px 10px; margin-top: 5px; margin-bottom: 5px; color: #17462B; font-size: 15px; background-color: #fff }

</style>
<!-- Google CDN -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>

<link rel="stylesheet" type="text/css" href="http://211.238.142.25/common/css/common.css">


<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script type="text/javascript">
$(function(){
	
});//ready

if(${ login_flag eq 'fail' }){
	alert("아이디와 비밀번호가 맞지 않습니다.\n다시 시도해주세요");
}//end if

window.onload=function(){
	document.getElementById("id").addEventListener("keydown",chkEnter);
	document.getElementById("pass").addEventListener("keydown",chkEnter);
	document.getElementById("loginBtn").addEventListener("click",chkNull);
	
}//function

function chkEnter() { 
	if(window.event.which==13){
		 chkNull();
	}//end if
}//chkEnter

function chkNull() {
	
	var obj = document.loginFrm;
	if(obj.id.value.trim()==""){
		alert("아이디를 입력해주세요");
		obj.id.focus(); //control에 커서를 이동
		return;
	}//end if
	
	if(obj.pass.value.trim()==""){
		alert("비밀번호를 입력해주세요.");
		obj.pass.focus();
		return;
		
	}//end if
	
	$("#loginFrm").submit();
	
}//chkNull

	function join() {
	location.href="join_clause.do";
		
	}

</script>
</head>
<body style="font-family: nanumbarungothic">

<div id="wrap">
   
   <c:import url="/header.do" />
   
   <div id="container">
   
   <div id =loginDiv>
   <h3 id="title">로그인</h3>
   <form name="loginFrm" id="loginFrm" action="login_process.do" method="post">
		<div class="form">
			<input type="text" class="form-control" id="id" name="id" placeholder="아이디를 입력하세요 " autofocus="autofocus" tabindex="1" style="width:340px;  height: 50px; "> <br/>
		</div>
		
		<div class="form">
			<input type="password" class="form-control" id="pass" name="pass" placeholder="비밀번호를 입력하세요" tabindex="2" style=" width:340px;  height: 50px; "><br/>
		</div>
		
		 <div class="login_rel">

			<a href="find/idForm.do" id="findID" class="link_rel" data-tiara-action-name="아이디찾기_링크">아이디 찾기</a>
			<span class="txt_bar">|</span>
			<a href="find/passForm.do" id="findPass" class="link_rel" data-tiara-action-name="비밀번호찾기_링크">비밀번호 찾기</a>
	 	</div>
	 	
	 <div id="btnDiv">
	 
			<button id="loginBtn" type="button" class="collieBtnMain" tabindex="3">로그인</button><br/>
			<button id="joinBtn" type="button" class="collieBtn" tabindex="4" onclick="join()">회원가입</button>
	 </div>
   
   </form>
   </div>
   
   </div>

   
   <jsp:include page="../common/footer.jsp" />
   
</div>

</body>
</html>
