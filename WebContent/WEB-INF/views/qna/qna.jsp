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
#container{ min-height: 400px; width: 70%; margin: 0px auto; text-align: center; margin-top: 150px; }

#msgWarp{margin:0px auto; margin-top: 80px; display: flex; justify-content: center;}

#btnDiv{margin-top: 20px; align-items: center;}
.collieBtnMain{ width: 140px; border: 1px solid #17462B; padding: 10px 0px 10px 0px; margin-top: 50px; margin-bottom: 5px; color: #fff; font-size: 15px; background-color: #17462B }

</style>

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">

<link rel="stylesheet" type="text/css" href="http://211.238.142.25/common/css/common.css">

<!-- Google CDN -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
<script type="text/javascript">
$(function(){
	$("#goHome").click(function() {
		location.href="/index.do";
	});//click
});//ready

</script>
</head>
<body style="font-family: nanumbarungothic">

<div id="wrap">
	
	<c:import url="/header.do" />
	<div id="container">
		
	<div class="msgWarp">
	<h3>문의가 등록되었습니다.</h3>
	</div>	
		
	<div id="btnDiv">
		<button type="button" class="collieBtnMain" id="goHome">메인으로</button>
	</div>	
	</div>
	
	<jsp:include page="../common/footer.jsp" />
	
</div>

</body>
</html>