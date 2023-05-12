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

#containerHeader{ display: flex; justify-content: center; align-items: center; flex-direction: column; }
#containerContentWrapper{ display: flex; justify-content: center; align-items: center; flex-direction: column; }
#table{ width: 70% }
.tableContent{ height: 120px; }


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
margin: 5px 0px 0 0; 
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



.quantityWrap{ display: flex; justify-content: center; }
.quantity{ width: 80% ;border: 0.5px solid #ddd; display: flex; justify-content: space-between; align-items: center; }
.icoBtn{ border: 0px; }
.btn_reduce { border-right: 1px solid #ddd;  }
.btn_rise{ border-left: 1px solid #ddd; }

.collieBtn{ border: 1px solid #17462B; padding: 10px; margin-top: 5px; margin-bottom: 5px; color: #17462B; font-size: 15px; background-color: #fff }
.collieBtnMain{ border: 1px solid #17462B; padding: 10px 40px 10px 40px; margin-top: 5px; margin-bottom: 5px; color: #fff; font-size: 15px; background-color: #17462B }

.priceWrapper{ width: 700px; margin: 80px 0px 50px 0px; display: flex; justify-content: space-between; align-items: center; }
.priceDiv{ width: 150px; height:150px;border: 1px solid #17462B; text-align: center; display: flex; justify-content: center; align-items: center; flex-direction: column; }
.priceDivLabel{ color: #404040 }
.priceDivPrice{ margin-top: 10px; font-size: 17pt; font-weight: bold  }
</style>


<!-- Google CDN -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
<script type="text/javascript">

if(${ empty sessionScope.user_info }){
	alert("로그인 후 이용 가능합니다.");
	location.href="/index.do";
}//end else

$(function(){
	
	$("#selectAll").click(function(){ 
		if($("#selectAll").prop("checked")) { 
			$("[name='cart_num']").prop("checked",true); 
		}else{ 
			$("[name='cart_num']").prop("checked",false); 
		} 
		modifyTotalPrice();
	})
	
	$("[name='cart_num']").click(function(){ 
		var len=$("[name='cart_num']").length;
		if($("[name='cart_num']:checked").length==len){
			$("#selectAll").prop("checked",true);
		}else{
			$("#selectAll").prop("checked",false);
		}//end else
		modifyTotalPrice();
	});//click

	
	$("#delSelectedItem").click(function(){
		var chkCnt=$("[name='cart_num']:checked").length;
		if( chkCnt > 0){
			var param="";
			$("[name='cart_num']:checked").each(function(){
				param+="cart_num="+this.value+"&";
			})
			$.ajax({
				url:"remove_Item.do",
				type:"POST",
				data:param,
				dataType:"JSON",
				error:function(xhr){
					alert("에러");
					console.log(xhr.status+" / "+xhr.statusText);
				},
				success:function(jsonObj){
			      	if(jsonObj.flag=="success"){
						$("[name='cart_num']:checked").each(function(){
							$("#tableContent"+this.value).remove();
						})
			      	}//end if
			      	if($("#cartTable tr").length==1){
			      		var empty='<tr>';
			      		empty+='<td colspan="6" style="height: 80px; text-align: center; vertical-align: middle;">장바구니에 담긴 상품이 없습니다.</td>';
			      		empty+='</tr>';
			      		$("#cartTable tbody").html(empty);
			      	}//end if
			      	modifyTotalPrice();
				}//success
			});//ajax
		}else{
			alert("삭제할 상품을 선택해주세요.")
		}
	});//click
	
	$("#orderBtn").click(function() {
		var chkCnt=$("[name='cart_num']:checked").length;
		if( chkCnt > 0){
			$("#cartListFrm").submit();
		}else{
			alert("주문할 상품을 선택해주세요.")
		}
	});//click
	
});//ready

function modifyCnt(cart_num, item_cnt, item_price,flag){
	
 	$.ajax({
		url:"modify_cnt.do",
		type:"POST",
		data:"cart_num="+cart_num+"&flag="+flag,
		dataType:"JSON",
		error:function(xhr){
			alert("에러");
			console.log(xhr.status+" / "+xhr.statusText);
		},
		success:function(jsonObj){
			if(jsonObj.flag=="success"){
				if(flag=="plus"){
					item_cnt+=2;
				}//end if
				item_cnt-=1;
				
				var output="<button type='button' class='icoBtn'";
				if(item_cnt > 1){
					output+=' onclick="modifyCnt('+cart_num+','+item_cnt+','+item_price+',\'minus\')"';
				}//end if
				output+='>';
				output+='<img src="http://211.238.142.25/cart/ico_minus.png" class="btn_reduce" style="width: 10px">';
				output+='</button>';
				
				output+=item_cnt;
				
				output+='<button type="button" class="icoBtn" onclick="modifyCnt('+cart_num+','+item_cnt+','+item_price+',\'plus\')">';
				output+='<img src="http://211.238.142.25/cart/ico_plus.png" class="btn_rise" style="width: 10px">';
				output+='</button>';
				$("#quantity"+cart_num).html(output);
				var totalPrice=item_cnt*item_price;
				
				var priceDiv='<input type="hidden" id="perItemPrice'+cart_num+'" value="'+totalPrice+'"/>';
				priceDiv+=totalPrice.toLocaleString()+"원";
				$("#perItemTotalPrice"+cart_num).html(priceDiv);
				
				modifyTotalPrice();
			}//end if
	      	
		}//success
	});//ajax
	
}//modifyCnt

function delItem(cart_num){
  	$.ajax({
		url:"remove_Item.do",
		type:"POST",
		data:"cart_num="+cart_num,
		dataType:"JSON",
		error:function(xhr){
			alert("에러");
			console.log(xhr.status+" / "+xhr.statusText);
		},
		success:function(jsonObj){
	      	if(jsonObj.flag=="success"){
				$("#tableContent"+cart_num).remove();
	      	}//end if
	      	if($("#cartTable tr").length==1){
	      		var empty='<tr>';
	      		empty+='<td colspan="6" style="height: 80px; text-align: center; vertical-align: middle;">장바구니에 담긴 상품이 없습니다.</td>';
	      		empty+='</tr>';
	      		$("#cartTable tbody").html(empty);
	      	}//end if
	      	modifyTotalPrice();
		}//success
	});//ajax
	
}//delItem

function modifyTotalPrice(){
	var itemTotalPrice=0;
	$("[name='cart_num']:checked").each(function(){
		itemTotalPrice+= ($("#perItemPrice"+this.value).val())*1;
	})

	$("#itemTotalPrice").html(itemTotalPrice.toLocaleString()+"원");
	$("#totalPayPrice").html((itemTotalPrice+2500).toLocaleString()+"원");
}//modifyTotalPrice

</script>
</head>
<body style="font-family: NanumBarunGothic;">

<div id="wrap">
	
	<c:import url="/header.do" />
	
	<div id="container">
	<div id="containerHeader">
	<a id="containerHeaderTitle">장바구니</a><br/>
	<a id="containerHeaderContent">주문하실 상품명 및 수량을 정확히 확인 해주세요</a>
	</div>
	
	<div id="containerContentWrapper">
	
	<div id="table">
	<form id="cartListFrm" action="order_form.do" method="post">
	<table class="table" id="cartTable">
	  <thead>
	    <tr>
	      <th style="width: 50px; text-align: center; vertical-align: middle; color: #5e5e5e">
	      <div class="checks">
	      <input type="checkbox" id="selectAll" checked="checked">
	      <label for="selectAll"><span></span></label>
	      </div>
	      </th>
	      <th style="width: 100px; vertical-align: middle; color: #5e5e5e">전체선택</th>
	      <th style="text-align: center; vertical-align: middle; color: #5e5e5e">상품정보</th>
	      <th style="width: 120px; text-align: center; vertical-align: middle; color: #5e5e5e">수량</th>
	      <th style="width: 120px; text-align: center; vertical-align: middle; color: #5e5e5e">상품금액</th>
	      <th style="width: 50px;"></th>
	    </tr>
	  </thead>
	  <tbody>
	  	<c:if test="${ empty cart_list }">
	  	<tr>
	  	<td colspan="6" style="height: 80px; text-align: center; vertical-align: middle;">장바구니에 담긴 상품이 없습니다.</td>
	  	</tr>
	  	</c:if>
	  	<c:set var="totalCnt" value="0"/>
		<c:forEach var="cart" items="${ cart_list }">
		<c:set var="totalCnt" value="${ totalCnt + cart.item_price * cart.item_cnt }"/>
	    <tr id="tableContent${ cart.cart_num }" class="tableContent">
	      <td style="vertical-align: middle; text-align: center;">
	      <div class="checks">
	      	<input type="checkbox" name="cart_num" value="${ cart.cart_num }" id="select${ cart.cart_num }" checked="checked">
		    <label for="select${ cart.cart_num }"><span></span></label>
	      </div>
	      </td>
	      <td style="vertical-align: middle; text-align: center;">
	      	<img alt="상품 이미지" src="/common/images/item/${ cart.item_img }" style="width: 80px"/>
	      </td>
	      <td style="vertical-align: middle;">
	      	<a href="/item/item_detail.do?item_num=${ cart.item_num }" style="font-weight: bold;">
	      	<c:out value="${ cart.item_name }"/>
	      	</a>
	      	<br/>
	      	<a style="font-size: 10pt"><fmt:formatNumber pattern="#,###" value="${ cart.item_price }"/>원</a>
	      </td>
	      <td style="vertical-align: middle; text-align: center;">
	      	<div class="quantityWrap">
	      	<div class="quantity" id="quantity${ cart.cart_num }">
 	      	<button type="button" class="icoBtn"<c:if test="${ cart.item_cnt>1 }"> onclick="modifyCnt(${cart.cart_num},${ cart.item_cnt },${ cart.item_price },'minus')"</c:if>>
	      	<img src="http://211.238.142.25/cart/ico_minus.png" class="btn_reduce" style="width: 10px">
	      	</button>
	      	<c:out value="${ cart.item_cnt }"/>
	      	<button type="button" class="icoBtn" onclick="modifyCnt(${cart.cart_num},${ cart.item_cnt },${ cart.item_price },'plus')">
	      	<img src="http://211.238.142.25/cart/ico_plus.png" class="btn_rise" style="width: 10px">
	      	</button>
	      	</div>
	      	</div>
	      </td>
	      <td id="perItemTotalPrice${ cart.cart_num }"style="vertical-align: middle; text-align: center; font-weight: bold">
	      	<input type="hidden" id="perItemPrice${ cart.cart_num }" value="${ cart.item_price * cart.item_cnt }"/>
	      	<fmt:formatNumber pattern="#,###" value="${ cart.item_price * cart.item_cnt }"/>원
	      </td>
	      <td style="vertical-align: middle; text-align: center;">
	      	<img src="http://211.238.142.25/cart/cart_x.png" onclick="delItem(${cart.cart_num})" style="width: 10px; cursor: pointer;">
	      </td>
	    </tr>
		</c:forEach>
	  </tbody>
	</table>
	</form>
	<input type="button" class="collieBtn" value="선택삭제" id="delSelectedItem">
	</div>
	
	<div class="priceWrapper">
	
	<div class="priceDiv">
	<div class="priceDivLabel">상품금액</div>
	<div class="priceDivPrice" id="itemTotalPrice">
	<fmt:formatNumber pattern="#,###" value="${ totalCnt }"/>원
	</div>
	</div>
	+
	<div class="priceDiv">
	<div class="priceDivLabel">배송비</div>
	<div class="priceDivPrice">
	2,500원
	</div>
	</div>
	=
	<div class="priceDiv">
	<div class="priceDivLabel">결제예정금액</div>
	<div class="priceDivPrice" id="totalPayPrice">
	<fmt:formatNumber pattern="#,###" value="${ totalCnt+2500 }"/>원
	</div>
	</div>
	</div>
	
	<input type="button" value="주문하기" id="orderBtn" class="collieBtnMain">
	
	</div>
	
	<div style="height: 200px"></div>
	
	</div>
	
	<jsp:include page="../common/footer.jsp" />
	
</div>

</body>
</html>