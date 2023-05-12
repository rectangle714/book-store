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
#containerSubTitle{ border-bottom: 1px solid #17462B; margin-top: 30px; padding-bottom: 0px; color: #666666 }
#emptyTable{ text-align: center; margin-top: 30px; border-bottom: 1px solid #dee2e6 }
#emptyOrder{ font-weight: bold; font-size: 17px; height: 75px }
#containerContent{ margin-top: 30px }
#orderTime{ color:#666666; font-weight: bold; }
.table-borderless{ margin:0px }
#orderGoods{ border: 1px solid #dee2e6; margin-top: 10px; padding: 10px; padding-left: 20px; padding-right: 20px;}
#goodsTitle{ border-bottom: 1px solid #dee2e6; padding: 0px; padding-top: 10px; padding-bottom: 10px; font-weight: bold }
.btn-outline-success{ border-color: #17462B !important; color: #17462B !important }
.btn-outline-success:hover, #btn-outline-success:active, #btn-outline-success:focus { border-color: #17462B !important; background-color: #17462B !important; color:#FFFFFF !important }
#goodsImg{ padding-left: 10px; width: 10px; padding-top: 20px; padding-right: 0px }
#goodsThm{ width:60px; height: 75px }
#orderNumColumn{ padding-top: 25px; width: 10%; vertical-align: middle; font-size: 14px; padding-bottom: 0px; }
#orderNumValue{ padding-top: 25px; vertical-align: middle; font-size: 14px; padding-bottom: 0px; padding-left: 0px;}
#orderPriceColumn{ font-size: 14px; width:10%; padding-top: 0px; }
#orderPriceValue{ font-size: 14px; padding-top: 0px; padding-left: 0px }
#goodsBtn{ vertical-align: middle; width: 15%; padding-right: 0px; padding-left: 30px }
#btn{ font-size: 14px }
#pagination{ margin-left: 240px; margin-top: 100px; margin-bottom: 200px }
.active {cursor:pointer;}
.page-item.active .page-link {background-color:#17462B !important; border-color:#17462B !important;}
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
});//ready

function getOrderDetail(order_num) {
	if( ${ empty sessionScope.user_info } ){
		alert("로그인이 필요한 서비스입니다.");
		location.href = "/login_form.do";
		return;
	}//end if	
	location.href="order_detail.do?order_num="+order_num;
}//getOrderDetail

function movePage(target_page){
	if( ${ empty sessionScope.user_info } ){
		alert("로그인이 필요한 서비스입니다.");
		location.href = "/login_form.do";
		return;
	}//end if	
	$.ajax({
		url : "order_list_page.do",
		type : "GET",
		data : "current_page="+target_page,
		dataType : "JSON",
		error : function(xhr){
			alert("error : " + xhr.status + " / " + xhr.statusText);
		},
		success : function(jo){
			//주문 목록 표시 HTML
			var output = '';
			$.each(jo.order_list, function(idx, list){
				output += '<div id="containerContent">';
				output += '<div id="orderTime">';
				
				var year = list.input_date.substr(0,4);
				var month = list.input_date.substr(5,2);
				var day = list.input_date.substr(8,2);
				var hour = list.input_date.substr(11,2);
				var minute = list.input_date.substr(14,2);
				output += year + '.' + month + '.' + day + ' (' + hour + '시 ' + minute + '분)';
					
				output += '</div>';
				output += '<div id="orderGoods">';
				output += '<table class="table table-borderless">';
				
				if( list.item_name.search(',') > 0 ){
					var otherOrder = list.item_name.split(',').length-1;
					output += '<tr><td colspan="4" id="goodsTitle">'+ list.item_name.split(',')[0] + ' 외 ' + otherOrder +'건</td></tr>';
				}else{
					output += '<tr><td colspan="4" id="goodsTitle">'+ list.item_name + '</td></tr>';
				}//end else
				
				output += '<tr id="orderNum">';
				output += '<td rowspan="2" id="goodsImg">';
				
				if( list.item_name.search(',') > 0 ){
					output += '<img src="http://211.238.142.25/common/images/item/'+list.item_img.split(',')[0]+'" id="goodsThm"/></td>';
				}else{
					output += '<img src="http://211.238.142.25/common/images/item/'+list.item_img+'" id="goodsThm"/></td>';
				}//end else
				
				output += '<td id="orderNumColumn">주문번호</td>';
				output += '<td id="orderNumValue"><strong>' + list.order_num + '</strong></td>';
				output += '<td rowspan="2" id="goodsBtn">';
				output += '<button type="button" class="btn btn-outline-success" id="btn" onclick="getOrderDetail(' + list.order_num + ');">상세보기</button></td></tr>';
				output += '<tr id="orderPrice">';
				output += '<td id="orderPriceColumn">결제금액</td>';
				output += '<td id="orderPriceValue"><strong>';
				
				var total_price = list.total_price + 2500;
				output += total_price.toLocaleString();
				
				output += '원</strong></td>';
				output += '</tr></table></div></div>';
			});//each
			$("#forEachWrap").html(output);
			
			//페이지네이션 표시 HTML
			output = '<nav aria-label="Page navigation example">';
			output += '<ul class="pagination justify-content-center">';
	
			var disableOption = 'disabled';
			if(jo.pre_page > 1 && jo.pre_page < jo.start_page) {
				disableOption = 'active';
			}
			output += '<li class="page-item '+disableOption+'">';
			output += '<a class="page-link" onclick="movePage('+jo.pre_page+');" aria-label="Previous">';
			output += '<span aria-hidden="true">&laquo;</span>';
			output += '</a>';
			output += '</li>';
			for(var i = jo.start_page; i <= jo.end_page; i++) {
				output +='<li class="page-item">';
				output += '<a class="page-link" onclick="movePage('+i+');">';
				output += (i+'</a>');
				output += '</li>';
			}
			
			var disableOption = 'active';
			if(jo.current_page >= jo.total_page) {
				disableOption = 'disabled';
			}
			output += '<li class="page-item '+disableOption+'">';
			output += '<a class="page-link"  onclick="movePage('+jo.next_page+');"aria-label="Next">';
			output += '<span aria-hidden="true">&raquo;</span>';
			output += '</a>';
			output += '</li>';
			output += '</ul>';
			output += '</nav>';
			$("#pagination").html(output);			
		}//success
	});//ajax
}//movePage

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
			<div id="containerSubTitle"></div>
			<c:if test="${ empty order_list }">
				<table class="table table-borderless" id="emptyTable">
					<tr><td id="emptyOrder">주문 내역이 없습니다.</td></tr>
				</table>
			</c:if>
			
			<div id="forEachWrap">
			<c:forEach var="old" items="${ order_list }">
			<div id="containerContent">
				<div id="orderTime">
					<fmt:parseDate var="originalFmt" value="${ old.input_date }" pattern="yyyy-MM-dd HH:mm:ss.SSS"/>
					<fmt:formatDate var="newFmt" value="${ originalFmt }" pattern="yyyy.MM.dd (HH시 mm분)"/>
					${ newFmt }
				</div>
				<div id="orderGoods">
				<table class="table table-borderless">
					<c:if test="${ not fn:contains(old.item_name, ',') }">
					    <tr><td colspan="4" id="goodsTitle">${ old.item_name }</td></tr>
					</c:if>
					<c:if test="${ fn:contains(old.item_name, ',') }">
					    <tr><td colspan="4" id="goodsTitle">${ fn:split(old.item_name, ',')[0] } 외 ${ fn:length(fn:split(old.item_name, ','))-1 }건</td></tr>
					</c:if>
				    <tr id="orderNum">
				      <td rowspan="2" id="goodsImg">
						<c:if test="${ not fn:contains(old.item_name, ',') }">
					      	<img src="http://211.238.142.25/common/images/item/${ old.item_img }" id="goodsThm"/>
						</c:if>
						<c:if test="${ fn:contains(old.item_name, ',') }">
					      	<img src="http://211.238.142.25/common/images/item/${ fn:split(old.item_img, ',')[0] }" id="goodsThm"/>
						</c:if>
				      </td>
				      <td id="orderNumColumn">주문번호</td>
				      <td id="orderNumValue"><strong>${ old.order_num }</strong></td>
				      <td rowspan="2" id="goodsBtn">
				      	<button type="button" class="btn btn-outline-success" id="btn" onclick="getOrderDetail(${ old.order_num });">상세보기</button>
				      </td>
				    </tr>
				    <tr id="orderPrice">
				      <td id="orderPriceColumn">결제금액</td>
				      <td id="orderPriceValue"><strong><fmt:formatNumber value="${ old.total_price + 2500 }" pattern="#,###"/>원</strong></td>
				    </tr>
				</table>
				</div>
			</div>
			</c:forEach>
			</div>
		</div>
		<c:if test="${ not empty order_list }">
		<div id="pagination">
			<nav aria-label="Page navigation example">
			  <ul class="pagination justify-content-center">
			    <li class="page-item ${paging.pre_page eq '0' ? 'disabled':'active'}">
				 	<a class="page-link" onclick="movePage(${paging.pre_page});" aria-label="Previous">
			        	<span aria-hidden="true">&laquo;</span>
			      	</a>
			    </li>
			    <c:forEach begin="${paging.start_page}" end="${paging.end_page}" step="1" var="cnt" >
				    <li class="page-item">
				    	<a class="page-link" onclick="movePage(${cnt});">
				    		<c:out value="${cnt}" />
				    	</a>
				    </li>
			    </c:forEach>
			    <li class="page-item ${paging.current_page >= paging.total_page ? 'disabled':'active'}">
			      <a class="page-link"  onclick="movePage(${paging.next_page});"aria-label="Next">
			        <span aria-hidden="true">&raquo;</span>
			      </a>
			    </li>
			  </ul>
			</nav>
		</div>
		</c:if>
		</div>
	</div>
	
	<jsp:include page="../common/footer.jsp" />
	
</body>
</html>	