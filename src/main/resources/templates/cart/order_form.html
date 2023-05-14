
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>MARKET COLLIE</title>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
<link rel="stylesheet" type="text/css" href="http://211.238.142.25/common/css/common.css">

<style type="text/css">
#wrap{ min-height: 1200px; margin: 0px auto; }
 
#container{ min-height: 900px; }

#containerHeader{ height: 250px; display: flex; justify-content: center; align-items: center; flex-direction: column; }
#containerHeaderTitle{ font-size: 30pt; }
#containerHeaderContent{ font-size: 12pt; color: #bebebe }
 
.containerTitleWrap{ display: flex; justify-content: center; }
.containerTitle{ width: 70%; height: 50px; font-size: 20pt; margin-top: 30px}
 
#containerContentWrapper{ display: flex; justify-content: center; align-items: center; flex-direction: column; }
.orderForm{ display: flex; justify-content: center; align-items: center; flex-direction: column; }
#table{ width: 70% }
.tableContent{ height: 120px; }

.paymentWrap{ width: 70%; display: flex; justify-content: space-between; }
.payInfoWrap{ width: 25%; margin-bottom: 10px; border: 1px solid #e0e0e0 ; background-color: #f0f0f0; font-weight: bold; font-size: 13pt }
.payInfo{ height: 60px; display: flex; justify-content: center; align-items: flex-end; }

table td ,table th{
    border-top: 2px solid #17462B !important;
    border-bottom: 2px solid #bebebe !important;
}
a, a:hover{ color: #000000; text-decoration: none }


/* 체크박스 */
.checks input[type="checkbox"] { /* 실제 체크박스는 화면에서 숨김 */ 
display: none; } 
.checks input[type="checkbox"] + label { 
display: inline-block; 
position: relative; 
cursor: pointer; } 
.checks input[type="checkbox"] + label:before { /* 가짜 체크박스 */ 
content: ' '; 
display: inline-block; 
width: 20px; /* 체크박스의 너비를 지정 */ 
height: 20px; /* 체크박스의 높이를 지정 */ 
line-height: 20px; /* 세로정렬을 위해 높이값과 일치 */ 
margin: 0px 0px 0 0; 
text-align: center; 
vertical-align: middle; 
background: #ffffff; 
border: 1px solid #17462B; 
border-radius : 1px; } 
.checks input[type="checkbox"]:checked + label:before { /* 체크박스를 체크했을때 */ 
content: '\2714'; /* 체크표시 유니코드 사용 */ 
color: #ffffff; 
background: #17462B;
border-color: #17462B; }


.collieText{ width: 300px; padding: 5px; font-size: 15px; }
.collieBtn{ border: 1px solid #17462B; padding: 5px; color: #17462B; font-size: 15px; background-color: #fff }
.collieBtnMain{ border: 1px solid #17462B; padding: 10px 40px 10px 40px; margin-top: 5px; margin-bottom: 5px; color: #fff; font-size: 15px; background-color: #17462B }

</style>


<!-- Google CDN -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
<!-- Daum API -->
<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script type="text/javascript">

if(${ empty sessionScope.user_info }){
	alert("로그인 후 이용 가능합니다.");
	location.href="/index.do";
}//end else

$(function(){
	
	var phone="${ user_info.phone }";
	var phoneSplit=phone.split("-");
	for(var i in phoneSplit){
		$("#receive_phone"+i).val(phoneSplit[i]);
	}
	
});//ready


/* 우편번호 Daum API 사용 */
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
           
           document.getElementById('zipcode').value = data.zonecode; //5자리 새우편번호 사용
           document.getElementById('addr').value = fullRoadAddr;
       }
    }).open();
}

function orderItem(){
	
	if($("#receive_name").val().trim()==""){
		alert("받는분을 입력해주세요");
		$("#receive_name").focus();
		return;
	}//end if
	
	if($("#receive_name").val().replace(/[ㄱ-힣A-Za-z]/g, "") != ""){
		alert("받는분은 한글 또는 영문(대,소문자)만 입력 가능합니다.");
		$("#receive_name").val("");
		$("#receive_name").focus();
		return;
	}//end if
	
	if($("#receive_phone0").val().trim()==""){
		alert("전화번호를 입력해주세요");
		$("#receive_phone0").focus();
		return;
	}//end if
	
	if($("#receive_phone0").val().replace(/[0-9]/g, "") != ""){
		alert("전화번호는 숫자만 입력 가능합니다.");
		$("#receive_phone0").val("");
		$("#receive_phone0").focus();
		return;
	}//end if
	
	if($("#receive_phone1").val().trim()==""){
		alert("전화번호를 입력해주세요");
		$("#receive_phone1").focus();
		return;
	}//end if
	
	if($("#receive_phone1").val().replace(/[0-9]/g, "") != ""){
		alert("전화번호는 숫자만 입력 가능합니다.");
		$("#receive_phone1").val("");
		$("#receive_phone1").focus();
		return;
	}//end if
	
	if($("#receive_phone2").val().trim()==""){
		alert("전화번호를 입력해주세요");
		$("#receive_phone2").focus();
		return;
	}//end if
	
	if($("#receive_phone2").val().replace(/[0-9]/g, "") != ""){
		alert("전화번호는 숫자만 입력 가능합니다.");
		$("#receive_phone2").val("");
		$("#receive_phone2").focus();
		return;
	}//end if
	
	if($("#zipcode").val().trim()==""){
		alert("우편번호를 입력해주세요");
		$("#zipcode").focus();
		return;
	}//end if
	
	if($("#zipcode").val().replace(/[0-9]/g, "") != ""){
		alert("우편번호는 숫자만 입력 가능합니다.");
		$("#zipcode").val("");
		$("#zipcode").focus();
		return;
	}//end if
	
	if($("#addr").val().trim()==""){
		alert("주소를 입력해주세요");
		$("#addr").focus();
		return;
	}//end if
	
	if($("#addr_detail").val().trim()==""){
		alert("상세주소를 입력해주세요");
		$("#addr_detail").focus();
		return;
	}//end if
	
	if($("#card_num1").val().trim()==""){
		alert("카드번호를 입력해주세요");
		$("#card_num1").focus();
		return;
	}//end if
	
	if($("#card_num1").val().replace(/[0-9]/g, "") != ""){
		alert("카드번호는 숫자만 입력 가능합니다.");
		$("#card_num1").val("");
		$("#card_num1").focus();
		return;
	}//end if
	
	if($("#card_num2").val().trim()==""){
		alert("카드번호를 입력해주세요");
		$("#card_num2").focus();
		return;
	}//end if
	
	if($("#card_num2").val().replace(/[0-9]/g, "") != ""){
		alert("카드번호는 숫자만 입력 가능합니다.");
		$("#card_num2").val("");
		$("#card_num2").focus();
		return;
	}//end if
	
	if($("#card_num3").val().trim()==""){
		alert("카드번호를 입력해주세요");
		$("#card_num3").focus();
		return;
	}//end if
	
	if($("#card_num3").val().replace(/[0-9]/g, "") != ""){
		alert("카드번호는 숫자만 입력 가능합니다.");
		$("#card_num3").val("");
		$("#card_num3").focus();
		return;
	}//end if
	
	if($("#card_num4").val().trim()==""){
		alert("카드번호를 입력해주세요");
		$("#card_num4").focus();
		return;
	}//end if
	
	if($("#card_num4").val().replace(/[0-9]/g, "") != ""){
		alert("카드번호는 숫자만 입력 가능합니다.");
		$("#card_num4").val("");
		$("#card_num4").focus();
		return;
	}//end if
	
	if($("#cvc").val().trim()==""){
		alert("CVC를 입력해주세요");
		$("#cvc").focus();
		return;
	}//end if
	
	if($("#cvc").val().replace(/[0-9]/g, "") != ""){
		alert("CVC는 숫자만 입력 가능합니다.");
		$("#cvc").val("");
		$("#cvc").focus();
		return;
	}//end if
	
	if($("#card_exp_mm").val().trim()==""){
		alert("카드 유효기간을 입력해주세요");
		$("#card_exp_mm").focus();
		return;
	}//end if
	
	if($("#card_exp_mm").val().replace(/[0-9]/g, "") != ""){
		alert("카드 유효기간은 숫자만 입력 가능합니다.");
		$("#card_exp_mm").val("");
		$("#card_exp_mm").focus();
		return;
	}//end if
	
	if($("#card_exp_yy").val().trim()==""){
		alert("카드 유효기간을 입력해주세요");
		$("#card_exp_yy").focus();
		return;
	}//end if
	
	if($("#card_exp_yy").val().replace(/[0-9]/g, "") != ""){
		alert("카드 유효기간은 숫자만 입력 가능합니다.");
		$("#card_exp_yy").val("");
		$("#card_exp_yy").focus();
		return;
	}//end if
	
	if($("#card_pass").val().trim()==""){
		alert("카드 비밀번호를 입력해주세요");
		$("#card_pass").focus();
		return;
	}//end if
	
	if($("#card_pass").val().replace(/[0-9]/g, "") != ""){
		alert("카드 비밀번호는 숫자만 입력 가능합니다.");
		$("#card_pass").val("");
		$("#card_pass").focus();
		return;
	}//end if
	
	if( !$("#agree").is(":checked") ){
		alert("결제 진행 동의는 필수입니다.");
		return;
	}//end if
	
	var phone=$("#receive_phone0").val()+"-"+$("#receive_phone1").val()+"-"+$("#receive_phone2").val();
	var cardNum=$("#card_num1").val()+"-"+$("#card_num2").val()+"-"+$("#card_num3").val()+"-"+$("#card_num4").val();
	var cardExp=$("#card_exp_mm").val()+"/"+$("#card_exp_yy").val();
	
	var hidParam='<input type="hidden" name="receive_phone" value="'+phone+'">';
	hidParam+='<input type="hidden" name="card_num" value="'+cardNum+'">';
	hidParam+='<input type="hidden" name="card_expiration" value="'+cardExp+'">';
	
	$("#hidDiv").html(hidParam);
	$("#orderForm").submit();
	
}//orderItem

</script>
</head>
<body style="font-family: NanumBarunGothic;">

<div id="wrap">
	
	<c:import url="/header.do" />
	
	<div id="container">
	<div id="containerHeader">
	<a id="containerHeaderTitle">주문서</a><br/>
	<a id="containerHeaderContent">주문하실 상품명 및 수량을 정확히 확인 해주세요</a>
	</div>

	<div>
	<form action="order.do" method="post" id="orderForm" class="orderForm">
	<div id="hidDiv"></div>
	<div class="containerTitle">
	상품정보
	</div>
	<div id="table">
	<table class="table" id="cartTable">
	  <thead>
	    <tr>
	      <th style="width: 150px;"></th>
	      <th style="text-align: center; vertical-align: middle; color: #5e5e5e">상품정보</th>
	      <th style="width: 120px; text-align: center; vertical-align: middle; color: #5e5e5e">상품금액</th>
	    </tr>
	  </thead>
	  <tbody>
		<c:set var="totalCnt"/>
		<c:forEach var="cart" items="${ cart_list }">
		<c:set var="totalCnt" value="${ totalCnt + cart.item_price * cart.item_cnt }"/>
	    <tr id="tableContent${ cart.cart_num }" class="tableContent">
	      <td style="vertical-align: middle; text-align: center;">
	      	<img alt="상품 이미지" src="/common/images/item/${ cart.item_img }" style="width: 80px">
	      	<input type="hidden" name="cart_num" value="${ cart.cart_num }"/>
	      	<input type="hidden" name="item_num" value="${ cart.item_num }"/>
	      	<input type="hidden" name="item_cnt" value="${ cart.item_cnt }"/>
	      </td>
	      <td style="vertical-align: middle;">
	      	<c:out value="${ cart.item_name }"/><br/>
	      	<a style="font-size: 10pt">
	      	<fmt:formatNumber pattern="#,###" value="${ cart.item_cnt }"/>개 / 개 당 <fmt:formatNumber pattern="#,###" value="${ cart.item_price }"/>원
	      	</a>
	      </td>
	      <td style="vertical-align: middle; text-align: center; font-weight: bold">
	      	<fmt:formatNumber pattern="#,###" value="${ cart.item_price * cart.item_cnt }"/>원
	      </td>
	    </tr>
		</c:forEach>
	  </tbody>
	</table>
	</div>
	
	
	
	<div class="containerTitle">
	주문자 정보
	</div>
	<div id="table">
	<table class="table" id="cartTable">
		<tr>
	      <td style="width: 150px;vertical-align: middle;">
	      	<div style="margin: 10px 0px 10px 0px">보내는분</div>
	      	<div style="margin: 10px 0px 10px 0px">휴대폰</div>
	      	<div style="margin: 10px 0px 10px 0px">이메일</div>
	      </td>
	      <td style="vertical-align: middle;">
	      	<div style="margin: 10px 0px 10px 0px"><c:out value="${ user_info.name }"/></div>
	      	<div style="margin: 10px 0px 10px 0px"><c:out value="${ user_info.phone }"/></div>
	      	<div style="margin: 10px 0px 10px 0px"><c:out value="${ user_info.email }"/></div>
	      </td>
	    </tr>
	</table>
	</div>
	
	
	<div class="containerTitle">
	배송 정보
	</div>
	<div id="table">
	<table class="table" id="cartTable">
		<tr>
	      <td style="width: 150px;vertical-align: middle;">
	      	<div style="margin: 12px 0px 18px 0px">받는분</div>
	      	<div style="margin: 12px 0px 18px 0px">휴대폰</div>
	      	<div style="margin: 12px 0px 18px 0px">우편번호</div>
	      	<div style="margin: 12px 0px 18px 0px">주소</div>
	      	<div style="margin: 12px 0px 18px 0px">상세주소</div>
	      </td>
	      <td style="vertical-align: middle;">
	      	<div style="margin: 10px 0px 10px 0px"><input type="text" name="receive_name" id="receive_name" value="${ user_info.name }" class="collieText"/></div>
	      	<div style="margin: 10px 0px 10px 0px; width: 300px; display: flex; justify-content: space-between; align-items: center;">
	      		<input type="text" name="receive_phone0" id="receive_phone0" class="collieText" maxlength="3" style="width: 80px;"/>-
	      		<input type="text" name="receive_phone1" id="receive_phone1" class="collieText" maxlength="4" style="width: 80px;"/>-
	      		<input type="text" name="receive_phone2" id="receive_phone2" class="collieText" maxlength="4" style="width: 80px;"/>
	      	</div>
	      	<div style="margin: 10px 0px 10px 0px">
	      	<input type="text" name="receive_zipcode" id="zipcode" value="${ user_info.zipcode }" class="collieText" readonly="readonly"/>
	      	<input type="button" value="우편번호 검색" class="collieBtn" onclick="sample4_execDaumPostcode()">
	      	</div>
	      	<div style="margin: 10px 0px 10px 0px"><input type="text" name="receive_addr" id="addr" value="${ user_info.addr }"  class="collieText" readonly="readonly"/></div>
	      	<div style="margin: 10px 0px 10px 0px"><input type="text" name="receive_addr_detail" id="addr_detail" value="${ user_info.addr_detail }"  class="collieText"/></div>
	      </td>
	    </tr>
	</table>
	</div>
	
	
	
	<div class="containerTitle">
	결제수단 - 일반결제 (신용카드)
	<input type="hidden" name="payment" value="card"/>
	</div>
	<div class="paymentWrap">
	<div id="table">
	<table class="table" id="cartTable">
		<tr>
	      <td style="width: 150px;vertical-align: middle;">
	      	<div style="margin: 12px 0px 18px 0px">카드사</div>
	      	<div style="margin: 12px 0px 18px 0px">카드번호</div>
	      	<div style="margin: 12px 0px 18px 0px">유효기간</div>
	      	<div style="margin: 12px 0px 18px 0px">비밀번호</div>
	      </td>
	      <td style="vertical-align: middle;">
	      	<div style="margin: 10px 0px 10px 0px">
	      		<select name="card_bank" class="collieText">
	      			<option value="국민" class="collieText">KB국민</option>
	      			<option value="우리" class="collieText">우리</option>
	      			<option value="신한" class="collieText">신한</option>
	      			<option value="삼성" class="collieText">삼성</option>
	      			<option value="롯데" class="collieText">롯데</option>
	      			<option value="현대" class="collieText">현대</option>
	      		</select>
	      	</div>
	      	<div style="margin: 10px 0px 10px 0px; width: 300px; display: flex; justify-content: space-between; align-items: center;">
	      		<input type="text" name="card_num1" id="card_num1" placeholder="4자리" class="collieText" maxlength="4" style="width: 50px;"/>
	      		<input type="text" name="card_num2" id="card_num2" placeholder="4자리" class="collieText" maxlength="4" style="width: 50px;"/>
	      		<input type="text" name="card_num3" id="card_num3" placeholder="4자리" class="collieText" maxlength="4" style="width: 50px;"/>
	      		<input type="text" name="card_num4" id="card_num4" placeholder="4자리" class="collieText" maxlength="4" style="width: 50px;"/>
	      		<input type="text" placeholder="CVC" id="cvc" class="collieText" maxlength="3" style="width: 50px"/>
	      	</div>
	      	<div style="margin: 10px 0px 10px 0px">
	      	<input type="text" name="card_exp_mm" id="card_exp_mm" placeholder="MM" class="collieText" maxlength="2" style="width: 50px; margin-right: 10px"/>
	      	<input type="text" name="card_exp_yy" id="card_exp_yy" placeholder="YY" class="collieText" maxlength="2" style="width: 50px; margin-right: 10px"/>
	      	</div>
	      	<div style="margin: 10px 0px 10px 0px">
	      	<input type="text" id="card_pass" class="collieText" maxlength="2" style="width: 50px; margin-right: 10px"/> **
	      	</div>
	      </td>
	    </tr>
	</table>
	</div>
	<div class="payInfoWrap">
	<div class="payInfo">
	<div style="width: 120px; margin-left: 15px">상품금액</div>
	<div style="width: 120px; text-align: right; margin-right: 15px">
	<fmt:formatNumber pattern="#,###" value="${ totalCnt }"/>원
	</div>
	</div>
	<div class="payInfo">
	<div style="width: 120px; margin-left: 15px">배송비</div>
	<div style="width: 120px; text-align: right; margin-right: 15px">2,500원</div>
	</div>
	<div class="payInfo">
	<div style="width: 120px; margin-left: 15px">최종 결제 금액</div>
	<div style="width: 120px; text-align: right; margin-right: 15px">
	<fmt:formatNumber pattern="#,###" value="${ totalCnt+2500 }"/>원
	<input type="hidden" name="total_price" value="${ totalCnt+2500 }"/>
	</div>
	</div>
	</div>
	</div>
	
	
	
	<div class="containerTitle">
	개인정보 수집/제공
	</div>
	<div id="table">
	<table class="table" id="cartTable">
		<tr>
		<td style="height: 60px; vertical-align: middle;">
		<div class="checks">
			<input type="checkbox" id="agree">
			<label for="agree"><span> 결제 진행 필수 동의</span></label>
		</div>
		</td>
		</tr>
	</table>
	</div>
	
	<input type="button" value="결제하기" class="collieBtnMain" onclick="orderItem()">
	
	
	</form>
	</div>
	
	<div style="height: 200px"></div>
	
	</div>
	
	<jsp:include page="../common/footer.jsp" />
	
</div>

</body>
</html>