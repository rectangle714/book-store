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
#wrap{ min-height: 940px; margin: 0px auto; }
#container{ min-height: 600px;}

#findDiv{width: 100%; min-height: 500px; margin-top: 20px}
#title{text-align: center; margin-bottom: 30px}

.frmWarp{display: flex; justify-content: center;}
.form{font-size: 15px; height: 90px;}

#btnDiv{margin-top: 20px}
.collieBtnMain{ width: 340px; border: 1px solid #17462B; padding: 10px 0px 10px 0px; margin-top: 5px; margin-bottom: 5px; color: #fff; font-size: 15px; background-color: #17462B }
</style>


<!-- Google CDN -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
<script type="text/javascript">
$(function(){
});//ready

if( !${find_pass== null?true:find_pass}) {
	alert("입력하신 정보가 올바르지 않습니다. 다시 한 번 확인해주세요.");
	}

function chkPass() {
	
	if($("#name").val().trim()==""){
		alert("이름을 입력해주세요");
		$("#name").focus();
		return;
	}
	
	if($("#id").val().trim()==""){
		alert("아이디를 입력해주세요");
		$("#id").focus();
		return;
	}
	if($("#email").val().trim()==""){
		alert("이메일을 입력해주세요");
		$("#email").focus();
		return;
	}
	
	
	$("#findPassFrm").submit();
	
}//chkPass
</script>


</head>
<body style="font-family: nanumbarungothic">

<div id="wrap">
	
	<c:import url="/header.do" />
	
	<div id="container">
		<div id="findDiv">
		<h3 id="title">비밀번호 찾기</h3>
		
		<div class="frmWarp">
			<form action="find_pass_process.do" method="post" id="findPassFrm">
				<label>이름</label><br/>
				<input type="text" class="form-control" name="name" id="name" style="height: 50px"><br/>
				<label>아이디</label><br/>
				<input type="text" class="form-control" name="id" id="id" style="height: 50px"><br/>
				<label>이메일</label><br/>
				<input type="text" class="form-control" name="email" id="email" style="height: 50px"><br/>
				<button type="button" style="widows: 100px" onclick="chkPass()" id="loginBtn" class="collieBtnMain">찾기</button>
			</form>
		</div>
	</div>
 </div>	
	<jsp:include page="../common/footer.jsp" />
	
</div>

</body>
</html>