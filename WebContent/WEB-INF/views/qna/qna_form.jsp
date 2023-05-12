<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>MARKET COLLIE</title>
<style type="text/css">
#wrap{ min-height: 1240px; margin: 0px auto; }
#container{ min-height: 800px;}

#titwrap{display: flex; justify-content: center; }
#title{text-align: center;}
#address{text-align: right; }
.frmWarp{ display: flex; justify-content: center; min-height: 600px}


.form{font-size: 15px; height: 50px; margin-bottom: 50px}

#btnDiv{margin-top: 300px; margin-bottom:30px; align-items: center; text-align: center;}
.collieBtnMain{width: 140px; border: 1px solid #17462B; padding: 10px 0px 10px 0px; margin-top: 5px; margin-bottom: 5px; color: #fff; font-size: 15px; background-color: #17462B }

</style>

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">

<link rel="stylesheet" type="text/css" href="http://211.238.142.25/common/css/common.css">

<!-- Google CDN -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
<script type="text/javascript">
$(function(){
	
});//ready

window.onload=function(){
	document.getElementById("qnaSub").addEventListener("keydown",chkEnter);
	document.getElementById("qnaCon").addEventListener("keydown",chkEnter);
	document.getElementById("qnaBtn").addEventListener("click",chkNull);
	
}//function

function chkEnter() { 
	if(window.event.which==13){
		 chkNull();
	}//end if
}//chkEnter

function chkNull() {
	
	var obj = document.qnaFrm;
	if(obj.qna_subject.value.trim()==""){
		alert("제목을 입력해주세요");
		obj.qna_subject.focus(); //control에 커서를 이동
		return;
	}//end if
	
	if(obj.qna_content.value.trim()==""){
		alert("내용을 입력해주세요.");
		obj.qna_content.focus();
		return;
		
	}//end if
	
	$("#qnaFrm").submit();
	
}//chkNull

</script>
</head>
<body style="font-family: nanumbarungothic">

<div id="wrap">
	
	<c:import url="/header.do" />
	
	<div id="container">
	
		<div class="frmWarp">
			<form id="qnaFrm" name="qnaFrm" action="qna_process.do" method="post">
				<div class="inputBox">
						<h3 id="title">1:1문의</h3><br/>
						<h6 id="address"> email : collie@gmail.com</h6><br/>
					<div class="form">
					<label>제목</label><br/>
						<input type="text" name="qna_subject" id="qnaSub" class="form-control" style="height: 50px"><br/>
					</div>
					<div class="form">
					<label>내용</label><br/>
						<textarea name="qna_content" id="qnaCon" class="form-control" cols="50" rows="10"></textarea><br/>
					</div>
					
				</div>
					<div id="btnDiv">
						<button type="button" style="widows: 100px" id="qnaBtn" class="collieBtnMain">등록</button>
					</div>
			</form>
		</div>
	</div>
	
	<jsp:include page="../common/footer.jsp" />
	
</div>

</body>
</html>