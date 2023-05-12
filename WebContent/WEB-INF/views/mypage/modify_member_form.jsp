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
#containerContent{ margin-top: 40px; }
#contentDiv{ margin: 0px auto; padding-left: 40px }
.form-control-plaintext{ width: 80px }
#passForm{ width: 620px; margin: 0px auto }
.col-form-label{ padding-right: 0px; padding-left: 50px }
#pass{ width:300px;  padding: 0px; margin-left: 60px }
hr{ margin-top: 90px }
.btn-primary:hover, .btn-primary:active, .btn-primary:focus{ background-color: #17462B !important; }
#btnDiv{ width: 250px; margin: 0px auto }
.modify-btns {text-align:right;}
.modify-btn {background-color: #17462B; border-color: #17462B; margin:0px auto; margin-top: 30px; width: 150px; padding: 15px; color: white }
</style>
<!-- Google CDN -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script type="text/javascript">
$(function(){
	
	setDefaultValue();
	
	var msg = '${ msg }';
	if( msg != '' ){
		alert(msg);
		history.back();
	}//end if
		
	$("#removeBtn").click(function(){
			
		location.href="remove_member_form.do"
			
	});//click
	
	$("#modifyBtn").click(function(){
		
		if($("#phone1").val().trim()==""){
			alert("연락처를 입력해주세요");
			return;
		}
		
		if($("#phone2").val().trim()==""){
			alert("연락처를 입력해주세요");
			return;
		}
		
		if($("#phone3").val().trim()==""){
			alert("연락처를 입력해주세요");
			return;
		}
		
		if($("#phone1").val().replace(/[0-9]/g, "") != ""){
	          alert("연락처는 숫자만 입력 가능합니다.");
	          $("#phone1").val("");
	          return;
	       }
		
		if($("#phone2").val().replace(/[0-9]/g, "") != ""){
	          alert("연락처는 숫자만 입력 가능합니다.");
	          $("#phone2").val("");
	          return;
	       }
		
		if($("#phone3").val().replace(/[0-9]/g, "") != ""){
	          alert("연락처는 숫자만 입력 가능합니다.");
	          $("#phone3").val("");
	          return;
	       }
		
		if($("#addr").val().trim()==""){
			alert("주소를 입력해 주세요");
			$("#addr").focus();
			return;
		}
		
		if($("#addr_detail").val().trim()==""){
			alert("상세주소를 입력해 주세요");
			$("#addr_detail").focus();
			return;
		}
		
		$("#Frm").submit();
		
	});//click
	
});//ready

function sample4_execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function(data) {
           // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

           // 도로명 주소의 노출 규칙에 따라 주소를 조합한다.
           // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
           var fullRoadAddr = data.roadAddress; // 도로명 주소 변수
           var extraRoadAddr = ''; // 도로명 조합형 주소 변수

           // 법정동명이 있을 경우 추가한다. (법정리는 제외)
           // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
           if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
               extraRoadAddr += data.bname;
           }
           // 건물명이 있고, 공동주택일 경우 추가한다.
           if(data.buildingName !== '' && data.apartment === 'Y'){
              extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
           }
           // 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
           if(extraRoadAddr !== ''){
               extraRoadAddr = ' (' + extraRoadAddr + ')';
           }
           // 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다.
           if(fullRoadAddr !== ''){
               fullRoadAddr += extraRoadAddr;
           }

           // 우편번호와 주소 정보를 해당 필드에 넣는다.
           console.log(data.zonecode);
           console.log(fullRoadAddr);
           
           
           $("[name=addr1]").val(data.zonecode);
           $("[name=addr2]").val(fullRoadAddr);
           
           document.getElementById('zipcode').value = data.zonecode; //5자리 새우편번호 사용
           document.getElementById('addr').value = fullRoadAddr;
       }
    }).open();
}


function setDefaultValue() {
	var phone = '${user_info.phone}';
	if(phone != '') {
		var phoneArr = phone.split('-');
		$('#phone1').val(phoneArr[0]);
		$('#phone2').val(phoneArr[1]);
		$('#phone3').val(phoneArr[2]);
	}
	
	var zipcode = '${user_info.zipcode}';
	if(zipcode != '') {
		$('#zipcode').val(zipcode);
	}
	var addr = '${user_info.addr}';
	if(addr != '') {
		$('#addr').val(addr);
	}
	var addr_detail = '${user_info.addr_detail}';
	if(addr_detail != '') {
		$('#addr_detail').val(addr_detail);
	}
}
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
			</div>
			<div id="containerContent">
			<form action="update_member.do" method="post" id="Frm">
			<div id="contentDiv">
	  		<div class="form-inline">
		 	 	<div class="form-group mb-2">
			    <input type="text" readonly class="form-control-plaintext" id="staticEmail2" value="아이디">
			  </div>
			  <div class="form-group mx-sm-3 mb-2">
			    <input type="email" class="form-control" id="id" name="id" value="${ user_info.id }" readonly="readonly">
			  </div>
			  </div>
			  <div class="form-inline">
		 	 	<div class="form-group mb-2">
			    <input type="text" readonly class="form-control-plaintext" id="staticEmail2" value="이름">
			  </div>
			  <div class="form-group mx-sm-3 mb-2">
			    <input type="email" class="form-control" id="name" name="name" value="${ user_info.name }" readonly="readonly">
			  </div>
			  </div>
			  <div class="form-inline">
		 	 	<div class="form-group mb-2">
			    <input type="text" readonly class="form-control-plaintext" id="staticEmail2" value="이메일">
			  </div>
			  <div class="form-group mx-sm-3 mb-2">
			    <input type="email" class="form-control" id="inputPassword2" value="${ user_info.email }"  readonly="readonly">
			  </div>
			  </div>
			  <div class="form-inline">
		 	 	<div class="form-group mb-2">
			    <input type="text" readonly class="form-control-plaintext" id="staticEmail2" value="휴대폰">
			  </div>
			  <div class="form-group mx-sm-3 mb-2">
			    <input type="email" class="form-control" name="phone1" id="phone1" maxlength="3" style="width: 80px"/>&nbsp;-&nbsp;
			    <input type="email" class="form-control" name="phone2" id="phone2" maxlength="4" style="width: 100px"/>&nbsp;-&nbsp;
			    <input type="email" class="form-control" name="phone3" id="phone3" maxlength="4" style="width: 100px"/>
			  </div>
			  </div>
			  <div class="form-row">
		    <div class="form-group col-md-6">
		      <label for="inputPassword4">우편번호</label>
		      <input type="text" class="form-control" name="zipcode" id="zipcode" placeholder="우편번호" readonly="readonly">
		    </div>
		    <input type="button" value="주소검색"  onclick="sample4_execDaumPostcode()" style="height:36px; margin-top: 32px; margin-left: 10px; background-color: white; color: black;" id="zipBtn" name="zipBtn"/>
	  		</div>
	  		<div class="form-row">
			    <div class="form-group col-md-6">
			      <label for="inputPassword4">주소</label>
			      <input type="email" class="form-control" name="addr" id="addr" readonly="readonly">
			    </div>
	  		</div>
	  		<div class="form-row">
		    <div class="form-group col-md-6" style="margin-bottom: 40px">
			      <label for="inputPassword4">상세주소</label>
			      <input type="email" class="form-control" name="addr_detail" id="addr_detail">
			    </div>
		  	</div>
		    </div>
				<div class="modify-btns" style="border-top: 3px solid #333;">
					<input type="button"  class="modify-btn" value="탈퇴하기" id="removeBtn" />
					 <input type="button" class="modify-btn" value="회원정보 수정" id="modifyBtn">
				</div> 
		    </form>
				</div>
			</div>
		</div>
		
	<jsp:include page="../common/footer.jsp" />
	</div>

</body>
</html>	