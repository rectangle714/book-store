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
#containerSubTitle{ border-bottom: 1px solid #333; margin-top: 30px; padding-bottom: 0px; color: #666666 }
#containerContent{ margin-top: 90px }
#passForm{ width: 620px; margin: 0px auto }
.col-form-label{ padding-right: 0px; padding-left: 50px }
#pass{ width:300px;  padding: 0px; margin-left: 60px }
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
	$("#btn").click(function(){
		if( $("#pass").val() == "" ){
			alert("비밀번호를 입력해주세요.");
			return;
		}//end if
		$("#passForm").submit();
	});
});//ready
</script>
</head>
<body style="font-family: nanumbarungothic">

<div id="wrap">
	
	<c:import url="/header.do" />
	
	<div id="container"> 
		<jsp:include page="../common/mypage_menu.jsp"/>
		<div id="contentWrap">
		<div id="containerTitle">
			<h4><strong>개인정보 수정</strong></h4>
		</div>
			<div id="containerSubTitle">
				<h5><strong>비밀번호 재확인</strong></h5>
				<h6>회원님의 정보를 안전하게 보호하기 위해 비밀번호를 다시 한 번 확인해주세요.</h6>
			</div>
			<div id="containerContent">
				<form id="passForm" method="post" action="check_member.do">
				  <div class="form-group row">
				   	<label for="inputEmail3" class="col-sm-2 col-form-label"><strong>비밀번호</strong></label>
				    <div class="col-sm-10">
				      <input type="password" class="form-control" id="pass" name="pass">
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