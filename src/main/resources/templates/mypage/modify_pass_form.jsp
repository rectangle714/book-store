<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>MARKET COLLIE</title>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
<link rel="stylesheet" type="text/css" href="http://211.238.142.25/common/css/common.css">

<style type="text/css">
#container{ width: 70%; margin: 0px auto; min-height: 700px; margin-top:50px; }
#containerMenu{ width: 200px; float: left; }
#menuTitle{ text-align: center; }
.table-bordered{ width: 200px; text-align: left; margin-top: 30px; color: #666666; font-size: 15px; }
.table-bordered td:hover{ background-color: #F7F7F7; color: #17462B }
.table-bordered td{ cursor: pointer; }
#qnaBox{ background-color: #F7F7F7; color: #666666; padding: 10px; font-size: 13px; padding-left: 20px }
#qnaBox:hover{ cursor: pointer; }
#cscBox{ color: #666666; font-size: 14px; margin-top: 70px }
#contentWrap{ margin-left: 240px }
#containerSubTitle{ border-bottom: 1px solid #17462B; margin-top: 30px; padding-bottom: 0px; color: #666666 }
#containerContent{ margin-top: 90px }
#passForm{ width: 820px; margin: 0px auto; padding-left: 70px }
.col-form-label{ padding-right: 0px }
#new_pass, #new_pass_confirm, #cpIFeedback, #cpVFeedback{ width:300px;  padding: 0px; margin-left: 60px }
hr{ margin-top: 90px }
.btn-primary{ background-color: #17462B; border-color: #17462B; margin:0px auto; margin-top: 30px; width: 250px; padding: 15px  }
.btn-primary:hover, .btn-primary:active, .btn-primary:focus{ background-color: #17462B !important; }
#btnDiv{ width: 250px; margin: 0px auto }
</style>
<!-- Google CDN -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
<script type="text/javascript">
$(function(){
	//비밀번호 확인 : 틀린 비밀번호 입력했을 때 돌려보내는 일
	var msg = '${ msg }';
	if( msg != '' ){
		alert(msg);
		location.replace = history.back();
	}//end if
	
	//비밀번호 변경
	$("#btn").click(function(){
		if( ${ empty sessionScope.user_info } ){
			alert("로그인이 필요한 서비스입니다.");
			location.href = "/login_form.do";
			return;
		}//end if
		if($("#new_pass").val().replace(/[0-9A-Za-z]/g, "") != ""){
			alert("비밀번호는 숫자 또는 영문 대,소문자만 가능합니다.");
			$("#new_pass").val("");
			return;
			}//end if
			chkNull();
	});//click
   $("#new_pass").keydown(function(evt){
	   if( evt.which == 13 ){
		   chkNull();
	   }//end if
   });//keydown
   $("#new_pass_confirm").keydown(function(evt){
	   if( evt.which == 13 ){
		   chkNull();
	   }//end if
   });//keydown
   $("#new_pass").keyup(function(evt){
	   if( evt.which != 13 ){
		   chkConfirmPass();
	   }//end if
   });//keyup
   $("#new_pass_confirm").keyup(function(evt){
	   if( evt.which != 13 ){
		   chkConfirmPass();
	   }//end if
   });//keyup
});//ready

function chkNull(){
	if( $("#new_pass").val() == "" ){
		alert("새로운 비밀번호를 입력해주세요.");
		return;
	}//end if
	if( $("#new_pass_confirm").val() == "" ){
		alert("비밀번호 확인란을 입력해주세요.");
		return;
	}//end if
	if( $("#new_pass").val() != $("#new_pass_confirm").val() ){
		alert("비밀번호 확인란이 일치하지 않습니다.");
		$("#new_pass").val("");
		$("#new_pass_confirm").val("");
		$("#cpIFeedback").css('display','none'); //경고문구 숨기기
		$("#new_pass_confirm").prop('class','form-control'); //폼 색깔을 원래대로
		return;
	}//end if
	$("#passForm").submit();
}//chkNull

function chkConfirmPass(){
	if( $("#new_pass").val() == $("#new_pass_confirm").val() && $("#new_pass_confirm").val() != '' ){ //새 비밀번호와 비밀번호 확인란이 일치하고 비밀번호 확인란이 비어있지 않으면
		$("#new_pass_confirm").prop('class','form-control is-valid'); //폼 색깔을 초록색으로 설정
		$("#cpIFeedback").css('display','none'); //경고문구 숨기기
		$("#cpVFeedback").css('display','inline-block'); //일치문구 보여주기
	}else{
		$("#new_pass_confirm").prop('class','form-control is-invalid'); //폼 색깔을 빨간색으로 설정
		$("#cpIFeedback").css('display','inline-block'); //경고문구 보여주기
		$("#cpVFeedback").css('display','none'); //일치문구 숨기기
	}//end else
	if( $("#new_pass").val() == '' && $("#new_pass_confirm").val() == '' ){ //모두 빈칸이면
		$("#cpIFeedback").css('display','none'); //경고문구 숨기기
		$("#new_pass_confirm").prop('class','form-control'); //폼 색깔을 원래대로
	}//end if
}//chkConfirmPass

</script>
</head>
<body style="font-family: nanumbarungothic">

<div id="wrap">
	
	<c:import url="/header.do" />
	
	<div id="container">
		<jsp:include page="../common/mypage_menu.jsp"/>
		<div id="contentWrap">
		<div id="containerTitle">
			<h4><strong>비밀번호 변경</strong></h4>
		</div>
			<div id="containerSubTitle">
			</div>
			<div id="containerContent">
				<form id="passForm" method="post" action="modify_pass.do">
				  <div class="form-group row">
				   	<label for="inputEmail3" class="col-sm-2 col-form-label"><strong>새 비밀번호</strong></label>
				    <div class="col-sm-10">
				      <input type="password" class="form-control" id="new_pass" name="pass">
				    </div>
				  </div>
				  <div class="form-group row">
				   	<label for="inputEmail3" class="col-sm-2 col-form-label"><strong>새 비밀번호 확인</strong></label>
				    <div class="col-sm-10">
				      <input type="password" class="form-control" id="new_pass_confirm">
				      <div id="cpIFeedback" class="invalid-feedback" style="display:none">비밀번호가 일치하지 않습니다.</div>
	      			  <div id="cpVFeedback" class="valid-feedback" style="display:none">비밀번호가 일치합니다.</div>
				    </div>
				  </div>
				</form>
				<hr>
				<div id="btnDiv">
					<button type="button" class="btn btn-primary" id="btn">확인</button>
				</div>
			</div>
		</div>
	</div>
	
	<jsp:include page="../common/footer.jsp" />
	
</div>

</body>
</html>	