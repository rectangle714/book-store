<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>MARKET COLLIE</title>
<style type="text/css">
#wrap{ min-height: 940px; margin: 0px auto; }
#container{ min-height: 600px;}
#containerContentWrap{ margin-top: 50px; margin-bottom: 50px; display: flex; justify-content: center; }
#containerContent{ width: 70%; display: flex; align-items: center; justify-content: space-between; }

#findDiv{width: 100%; min-height: 500px; margin-top: 30px}
#title{text-align: center; margin-bottom: 10px}

.frmWarp{display: flex; justify-content: center;}
.form{font-size: 15px; margin-bottom: 20px}
.collieBtnMain{ width: 340px; border: 1px solid #17462B; padding: 10px 0px 10px 0px; margin-top: 5px; margin-bottom: 5px; color: #fff; font-size: 15px; background-color: #17462B }
</style>

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">

<link rel="stylesheet" type="text/css" href="http://211.238.142.25/common/css/common.css">

<!-- Google CDN -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
<script type="text/javascript">
$(function(){
	
	 $("#new_pass").keydown(function(evt){
		   if( evt.which == 13 ){
			   chkPass();
		   }//end if
	   });//keydown
	   $("#passCheck").keydown(function(evt){
		   if( evt.which == 13 ){
			   chkPass();
		   }//end if
	   });//keydown
	   $("#new_pass").keyup(function(evt){
		   if( evt.which != 13 ){
			   chkConfirmPass();
		   }//end if
	   });//keyup
	   $("#passCheck").keyup(function(evt){
		   if( evt.which != 13 ){
			   chkConfirmPass();
		   }//end if
	   });//keyup
	
});//ready
	
	function chkPass() {
	
	var pass1 = $("#new_pass").val();
	var pass2 = $("#passCheck").val();
	
	if($("#new_pass").val().trim()==""){
		alert("새로운 비밀번호를 입력해주세요");
		$("#new_pass").focus();
		return;
	}
	
	if($("#passCheck").val().trim()==""){
		alert("비밀번호확인란을 입력해주세요");
		$("#passCheck").focus();
		return;
	}
	
		
	if($("#new_pass").val().replace(/[0-9A-Za-z]/g, "") != ""){
		alert("비밀번호는 숫자 또는 영문 대,소문자만 가능합니다.");
		$("#new_pass").val("");
		return;
	}//end if	
	
	if(pass1 != pass2){
		alert("비밀번호가 일치하지 않습니다. 다시 확인해주세요")
		return;
	}//end if
	
	$("#modifyFrm").submit();
	
	}//chkPass
	
	function chkConfirmPass() {
		
		if( $("#new_pass").val() == $("#passCheck").val() && $("#passCheck").val() != '' ){ //새 비밀번호와 비밀번호 확인란이 일치하고 비밀번호 확인란이 비어있지 않으면
			$("#passCheck").prop('class','form-control is-valid'); //폼 색깔을 초록색으로 설정
			$("#cpIFeedback").css('display','none'); //경고문구 숨기기
			$("#cpVFeedback").css('display','inline-block'); //일치문구 보여주기
		}else{
			$("#passCheck").prop('class','form-control is-invalid'); //폼 색깔을 빨간색으로 설정
			$("#cpIFeedback").css('display','inline-block'); //경고문구 보여주기
			$("#cpVFeedback").css('display','none'); //일치문구 숨기기
		}//end else
		
		if( $("#new_pass").val() == '' && $("#passCheck").val() == '' ){ //모두 빈칸이면
			$("#cpIFeedback").css('display','none'); //경고문구 숨기기
			$("#passCheck").prop('class','form-control'); //폼 색깔을 원래대로
		}//end if
		
	}

	 

</script>
</head>
<body style="font-family: nanumbarungothic">

<div id="wrap">
	
	<c:import url="/header.do" />
	<div id="container">
	
		<div id="findDiv">
		<h3 id="title">비밀번호 변경</h3>
		
		<div class="frmWarp">
			<form id="modifyFrm" action="modify_pass_process.do" method="post">
				<div id="inputBox">
				<div class="form">
					<label>새비밀번호</label>
					<input type="password" class="form-control" id= "new_pass" name="new_pass" style="height: 50px">
				</div>
			
				<div class="form">
					<label>비밀번호확인</label>
					<input type="password" class="form-control" id="passCheck" name="passCheck" style="height: 50px">
					<div id="cpIFeedback" class="invalid-feedback" style="display:none">비밀번호가 일치하지 않습니다.</div>
	     			<div id="cpVFeedback" class="valid-feedback" style="display:none">비밀번호가 일치합니다.</div>
				</div>
				</div>	
				<div id="checkPwd"></div>

				<div id="btnDiv">
					<button type="button" id="modifyBtn" name="modifyBtn" class="collieBtnMain" onclick="chkPass()">입력</button>
				</div>
			</form>
			</div>
	</div>
	</div>
	
	<jsp:include page="../common/footer.jsp" />
	
</div>

</body>
</html>