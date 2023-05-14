<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>MARKET COLLIE</title>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
<link rel="stylesheet" type="text/css" href="http://211.238.142.25/common/css/common.css">

<style type="text/css">
#container{ width: 70%; margin: 0px auto; min-height: 900px; margin-top:50px; }
#containerMenu{ width: 200px; float: left; }
#menuTitle{ text-align: center; }
.table-bordered{ width: 200px; text-align: left; margin-top: 30px; color: #666666; font-size: 15px; }
.table-bordered td:hover{ background-color: #F7F7F7; color: #17462B }
.table-bordered td{ cursor: pointer; }
#qnaBox{ background-color: #F7F7F7; color: #666666; padding: 10px; font-size: 13px; padding-left: 20px }
#qnaBox:hover{ cursor: pointer; }
#cscBox{ color: #666666; font-size: 14px; margin-top: 70px }
#contentWrap{ margin-left: 240px }
#containerSubTitle{ border-bottom: 1px solid #17462B; margin-top: 40px; padding-bottom: 0px; color: #666666 }
#errorTable{ margin-top: 70px; text-align: center }
#oneGoods{ border-bottom: 1px solid #DCDBDE }
#goodsImg{ width: 100px; padding-left: 30px }
#goodsThm{ width:80px; height: 100px }
#goodsInfo{ vertical-align: middle; font-weight: bold }
#goodsTitle{ font-size: 17px; color:#333 }
#goodsTitle:hover{ font-size: 17px; text-decoration: none; }
#goodsPrice{ font-size: 16px; padding-left: 2px }
#goodsCnt{ color:#666666; font-size: 15px; margin-left: 5px }
#orderStatus{ color: #17462B; font-weight: bold; text-align: right; vertical-align: middle; padding-right: 60px }
.btn-outline-success{ border-color: #17462B !important; color: #17462B !important }
.btn-outline-success:hover, #btn-outline-success:active, #btn-outline-success:focus { border-color: #17462B !important; background-color: #FFFFFF !important; color:#17462B !important }
#orderBtn{ text-align: center; margin-top:50px }
#searchBtn{ width: 250px; padding: 15px }
#cancelBtn{ margin-left:20px; width: 250px; padding: 15px }
#orderMsg{ margin-top: 20px; text-align: center; color: #666666 }
#Info{ margin-top: 90px }
#payInfo, #orderInfo, #receiveInfo{ color:#666666; border-bottom: 2px solid #17462B; padding-left: 0px; padding-bottom: 5px; width: 1100px  }
.infoColumn{ font-size: 15px; font-weight: bold; width: 250px }
.infoValue{ color:#4C4C4C; font-size: 14px }
.lastColumn{ border-bottom: 1px solid #DCDBDE }
#receiveWrap{ margin-bottom: 200px }
</style>
<!-- Google CDN -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
<script type="text/javascript">
$(function(){
	if( ${ empty sessionScope.user_info } ){
		alert("로그인이 필요한 서비스입니다.");
		location.href = "/login_form.do";
		return;
	}//end if
	if( '${ order_detail.shipping_flag }' == 'Y' ){
		$("#cancelBtn").attr('disabled', true);
	}//end if
});//ready

function trackingInfo(){
	$("#trackingForm").submit();
}//trackingInfo

function cancelOrder(order_num){
	if( confirm("해당 주문을 취소하시겠습니까?") ){
		location.href = "order_cancel.do?order_num="+order_num;
	}//end if
}//cancelOrder

</script>
</head>
<body style="font-family: nanumbarungothic">

<div id="wrap">
	
	<c:import url="/header.do" />
	
	<div id="container">
		<jsp:include page="../common/mypage_menu.jsp"/>
		<div id="contentWrap">
		<div id="containerTitle">
			<h4><strong>주문 내역</strong></h4>
		</div>
			<div id="containerSubTitle">
				<h5><strong>주문번호 ${ param.order_num }</strong></h5>
			</div>
			<c:if test="${ empty order_detail }">
				<table class="table table-borderless" id="errorTable">
					<tr><td>주문내역이 없습니다.</td></tr>
				</table>
			</c:if>
			<c:if test="${ not empty order_detail }">
			<div id="containerContent">
			<div id="foreachWrap">
			<c:forEach var="odd" items="${ order_detail.getOrderItemList() }">
				<div id="orderGoods">
				    <table class="table table-borderless">
					    <tr id="oneGoods">
					      	<td id="goodsImg">
					      		<a href="http://211.238.142.25/item/item_detail.do?item_num=${ odd.item_num }"><img src="http://211.238.142.25/common/images/item/${ odd.item_img }" id="goodsThm" /></a>
					      	</td>
					      	<td id="goodsInfo">
					      		<div><a href="http://211.238.142.25/item/item_detail.do?item_num=${ odd.item_num }" id="goodsTitle">${ odd.item_name }</a></div>
					      		<span id="goodsPrice"><fmt:formatNumber value="${ odd.item_price }" pattern="#,###"/>원</span>
					      		<span id="goodsCnt">${ odd.item_cnt }개 구매</span>
					      	</td>
					      	<td id="orderStatus">
					      		<c:if test="${ order_detail.shipping_flag eq 'N' }">발송대기</c:if>
					      		<c:if test="${ order_detail.shipping_flag eq 'Y' }">발송완료</c:if>
					      	</td>
					      </tr>
					</table>
				</div>
			</c:forEach>
				</div>
				
				<form id="trackingForm" method="POST" action="/mypage/tracking_info.do">
					<input type="hidden" value="${ order_detail.company }" name="company"/>
					<input type="hidden" value="${ order_detail.invoice_no }" name="invoice_no"/>
				</form>
				
				<div id="orderBtn">
					<button id="searchBtn" type="button" class="btn btn-outline-success" onclick="trackingInfo();">배송 현황 조회</button>
					<button id="cancelBtn" type="button" class="btn btn-outline-success" onclick="cancelOrder(${ param.order_num });">전체 상품 주문 취소</button>
				</div>
				<div id="orderMsg">직접 주문 취소는 <strong>'발송대기'</strong> 상태일 경우에만 가능합니다</div>
				<div id="Info">
				<div id="payWrap">
				<table class="table table-borderless">
				    <tr><td colspan="2" id="payInfo"><h5><strong>결제 정보</strong></h5></td></tr>	
				    <tr>
				      <td class="infoColumn">총 상품금액</td>
				      <td class="infoValue"><fmt:formatNumber value="${ order_detail.total_price - 2500 }" pattern="#,###"/>원</td>
					</tr>	
				    <tr>
				      <td class="infoColumn">배송비</td>
				      <td class="infoValue">2,500원</td>
					</tr>	
				    <tr>
				      <td class="infoColumn">결제금액</td>
				      <td class="infoValue">
				      <c:set var="order_price" value="${ order_detail.total_price }"/>
				      <fmt:formatNumber value="${ order_price }" pattern="#,###"/>원
				      </td>
					</tr>	
				    <tr class="lastColumn">
				      <td class="infoColumn">결제방법</td>
				      <td class="infoValue">신용카드<td>
					</tr>	
				</table>		
				</div>
				<div id="orderWrap">
				<table class="table table-borderless">
				    <tr><td colspan="2" id="orderInfo"><h5><strong>주문 정보</strong></h5></td></tr>	
				    <tr>
				      <td class="infoColumn">주문번호</td>
				      <td class="infoValue">${ param.order_num }</td>
					</tr>	
				    <tr>
				      <td class="infoColumn">주문자명</td>
				      <td class="infoValue">${ user_name }</td>
					</tr>	
				    <tr class="lastColumn">
				      <td class="infoColumn">주문일시</td>
				      <td class="infoValue">${ fn:substring(order_detail.input_date, 0, 19) }</td>
					</tr>	
				</table>		
				</div>
				<div id="receiveWrap">
				<table class="table table-borderless">
				    <tr><td colspan="2" id="receiveInfo"><h5><strong>배송 정보</strong></h5></td></tr>	
				    <tr>
				      <td class="infoColumn">받는 분</td>
				      <td class="infoValue">${ order_detail.receive_name }</td>
					</tr>	
				    <tr>
				      <td class="infoColumn">받는 분 핸드폰</td>
				      <td class="infoValue">
				      ${ fn:substring(order_detail.receive_phone, 0, 3) }-****-${ fn:substring(order_detail.receive_phone, 9, 13) }
				      </td>
					</tr>	
				    <tr>
				      <td class="infoColumn">우편번호</td>
				      <td class="infoValue">${ order_detail.receive_zipcode }</td>
					</tr>	
				    <tr class="lastColumn">
				      <td class="infoColumn">주소</td>
				      <td class="infoValue">${ order_detail.receive_addr }&nbsp;${ order_detail.receive_addr_detail }</td>
					</tr>	
				</table>		
				</div>
				</div>
			</div>
			</c:if>
		</div>
	</div>
	
	<jsp:include page="../common/footer.jsp" />
	
</div>

</body>
</html>	