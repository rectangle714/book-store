<%@page import="java.util.List"%>
<%@page import="kr.co.collie.user.item.domain.ItemDetailDomain"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>MARKET COLLIE</title>
<style type="text/css">
#wrap{ min-height: 940px; margin: 0px auto; }
#container{ min-height: 600px; border-top: 1px solid #f4f4f4;}
#containerContent{ width: 70%; display: flex; flex-direction:column; margin:0 auto;}
.itemwrap{display: flex; 
		flex-direction:row; 
		align-items: center; 
		margin:0 auto; 
		min-width: 700px;
		padding-bottom: 50px;
    	border-bottom: 1px solid #D5D5D5;
    	padding-top: 10px;}
    	
/* .imgdiv{width:30vw; height:400vh; } */
#infoDiv{float: right;
    width: 660px;
    margin-top: 29px;
    padding: 0px 10px 0px 10px; }
#boder{padding-top: 10px}

.item_description {
	padding: 100px 100px 20px 100px;
	font-size: 18px;
    line-height: 32px;
    color: #373737;
    margin-top: 20px;
    border: 1px;
	
}
.thum{padding: 20px 0px 0px 0px;
}
.thum img{width: 430px}
.goods_name{float: right;
    width: 560px;
}
.item_name{display: block;
    padding-right: 10px;
    font-weight: 700;
    font-size: 24px;
    line-height: 34px;
    word-break: break-all;
    }
.price{
	font-weight: 700;
    font-size: 28px;
    line-height: 50px;
    letter-spacing: -.5px;
    word-break: break-all;
}
.goods_info{
	float: right;
    width: 560px;
    margin-top: 10px;
    padding-bottom: 19px;
    border-top: 1px solid #f4f4f4;}
    
.goods_price .won{
    padding: 0 7px 0 2px;
    font-weight: 700;
    font-size: 18px;
    line-height: 30px;
    vertical-align: 2px;
}
dl {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
}
dd{
word-break: break-all;
}
.tit_item{
	float: left;
    width: 150px;
    font-weight: 400;
    font-size: 14px;
    color: #666;
    line-height: 20px;
    letter-spacing: -.5px
}
.tit{
	float: left;
    width: 150px;
    font-size: 17px;
    color: #666;
    line-height: 25px;
    font-weight: 700;
}

.word{
	margin-top: 28px;
	margin-bottom: 70px;
}
.inp{
	float: left;
    width: 41px;
    height: 24px;
    padding: 0 0 2px;
    border: 0;
    background-color: #fff;
    font-size: 14px;
    color: #000;
    line-height: 18px;
    text-align: center;
}


#addBtn{text-align: right;
		padding-top: 50px;
}
#context h3{    display: block;
    margin: 75px 0 0;
    padding-bottom: 35px;
    font-size: 38px;
    line-height: 46px;
    text-align: center;
    border-bottom: 1px solid #c1c1c1;
    color: #666;}
.priceDivLabel{font-size: 17pt;}
.imgC { margin-bottom: 20px; max-width: 100% }
.imgDiv{  text-align:center;  width: 100%!important;}
.priceDivPrice{text-align:right; margin-top: 10px; font-size: 20pt; font-weight: bold  }
.quantityWrap{ display: flex; justify-content: center; }
.quantity{ width: 80% ;border: 0.5px solid #ddd; display: flex; justify-content: space-between; align-items: center; }
.icoBtn{ border: 0px; }
.btn_reduce { border-right: 1px solid #ddd;  }
.btn_rise{ border-left: 1px solid #ddd; }
/* ==================리뷰=================== */
#reviewTitleWrap{ margin-top: 100px; margin-bottom: 20px; display: flex; justify-content: center; flex-direction: column; align-items: center }
#reviewTitleColumn{ width: 70%; font-weight: bold; font-size: 20pt }
#reviewTitleValue{ width: 70%; margin-top: 20px; color: #bebebe; font-size: 9pt }
#reviewDiv{ display: flex; justify-content: center }
/* #reviewBtn{ background-color: #17462B !important; border-color: #17462B !important; margin-top: 20px; width: 100px; padding: 5px !important; font-size: 14px } */
/* #reviewBtn:hover, #reviewBtn:active, #reviewBtn:focus{ background-color: #17462B !important; font-size: 14px } */
#reviewBtnWrap{ width: 70%; margin:0px auto; display: flex; justify-content: flex-end; }
#reviewPagination{ margin-top: 80px; clear: both; }
.active {cursor:pointer;}
.page-item.active .page-link {background-color:#17462B !important; border-color:#17462B !important;}
/* ==================리뷰=================== */

/* ==================아이템문의=================== */
.itemQnaDiv{ display: flex; justify-content: center }

.tab{ width: 70% }
.tableContent{ text-align: center; }
.titleTab{height: 50px; text-align: center;}

.tabTh{
    border-top: 2px solid #17462B !important;
    border-bottom: 2px solid #bebebe !important;
    font-size: 14px;
}
.tabTd{
    border-top: 2px solid #17462B !important;
    border-bottom: 2px solid #bebebe !important;
    padding: 20px 0px 20px 0px;
    font-size: 14px
}


.itemQnaBtnDivWrap{ display: flex; justify-content: center; }
.itemQnaBtnDiv{ width: 70%; display: flex; justify-content: flex-end; }
.collieBtnMain{ width: 240px; height:50px; border: 1px solid #17462B; padding: 10px 0px 10px 0px; margin-top: 20px; margin-bottom: 5px; color: #fff; font-size: 15px; background-color: #17462B }
.paginationDiv{ margin-top: 50px }
/* ==================아이템문의=================== */

</style>

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">

<link rel="stylesheet" type="text/css" href="http://211.238.142.25/common/css/common.css">

<!-- Google CDN -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
<script type="text/javascript">
$(function(){
	$("#addCartBtn").click(function(){
		if( ${ empty sessionScope.user_info } ){
			alert("로그인이 필요한 서비스입니다.");
			location.href = "/login_form.do";
			return;
		}//end if
		var param = $("form[name=addCartForm]").serialize();
		$.ajax({
			url : "cart.do",
			type : "POST",
			data : param,
			error : function(xhr){
				alert("error : " + xhr.status + " / " + xhr.statusText);
			},
			success : function(data){
				if( confirm("상품을 장바구니에 담았습니다. 장바구니로 이동하시겠습니까?") ){
					location.href = "../cart/view.do";
				}//end if
			}//success
		});//ajax
	});//click		
});//ready

/* ===============================리뷰================================= */
function reviewToggle(review_num){
	if($("#reviewTr"+review_num).length == 1 && $("#reviewContentTr"+review_num).length == 0 ){
		openReview(review_num);
	}else{
		closeReview(review_num);
	}//end else
}//reviewToggle

function openReview(review_num){
	var item_num = location.search.slice(-1);
  	$.ajax({
		url:"review_detail.do",
		type:"GET",
		data:"item_num="+item_num+"&review_num="+review_num,
		dataType:"JSON",
		error:function(xhr){
			alert("error : " + xhr.status + " / " + xhr.statusText);
		},
		success:function(jsonObj){
				var contentTr ='<tr id="reviewContentTr'+review_num+'" class="tableContent">';
				contentTr += '<td class="tabTd"></td>';
				contentTr += '<td colspan="3" class="tabTd" style="text-align: left">';
				contentTr+='<strong>'
				contentTr += jsonObj.review_content;
				contentTr+='</strong>'
				contentTr += '</td>';
				contentTr += '</tr>';
				$("#reviewTr"+review_num).after(contentTr);
		}//success
	});//ajax
}//openReview

function closeReview(review_num){
	$("#reviewContentTr"+review_num).remove();
}//closeReview

function moveReviewPage(field_value, target_page){
	var param = "field_name=item_num&field_value="+field_value+"&current_page="+target_page;
	var item_num = location.search.slice(-1);
	$.ajax({
		url : "review_list_page.do?"+param,
		type : "GET",
		dataType : "JSON",
		error : function(xhr){
			alert("error : " + xhr.status + " / " + xhr.statusText);
		},
		success : function(jo){
			//리뷰 목록 표시 HTML
			var output = '<table class="tab">';
			output += '<thead>';
			output += '<tr class="titleTab">';
			output += '<th class="tabTh" style="width: 50px">번호</th>';
			output += '<th class="tabTh">제목</th>';
			output += '<th class="tabTh" style="width: 150px">아이디</th>';
			output += '<th class="tabTh" style="width: 150px">작성일</th></tr>';
			output += '</thead>';
			output += '<tbody>';
			$.each(jo.review_list, function(idx, list){
				output += '<tr id="reviewTr'+list.review_num+'" class="tableContent" onclick="reviewToggle('+list.review_num+')" style="cursor:pointer">';
				output += '<td class="tabTd">' + list.idx + '</td>';
				output += '<td class="tabTd">' + list.review_subject + '</td>';
				output += '<td class="tabTd">' + list.id + '</td>';
				output += '<td class="tabTd">';
				output += list.input_date.substring(0,10);
				output += '</td></tr>';
			});//each
			output += '</tbody></table>';
			$("#reviewDiv").html(output);

			//페이지네이션 표시 HTML
			output = '<nav aria-label="Page navigation example">';
			output += '<ul class="pagination justify-content-center">';
	
			var disableOption = 'disabled';
			if(jo.pre_page > 0) {
				disableOption = 'active';
			}
			output += '<li class="page-item '+disableOption+'">';
			output += '<a class="page-link" onclick="moveReviewPage('+item_num+','+jo.pre_page+');" aria-label="Previous">';
			output += '<span aria-hidden="true">&laquo;</span>';
			output += '</a>';
			output += '</li>';
			for(var i = jo.start_page; i <= jo.end_page; i++) {
				output +='<li class="page-item">';
				output += '<a class="page-link" onclick="moveReviewPage('+item_num+','+i+');">';
				output += (i+'</a>');
				output += '</li>';
			}
			
			var disableOption = 'active';
			if(target_page == jo.end_page) {
				disableOption = 'disabled';
			}
			output += '<li class="page-item '+disableOption+'">';
			output += '<a class="page-link"  onclick="moveReviewPage('+item_num+','+jo.next_page+');"aria-label="Next">';
			output += '<span aria-hidden="true">&raquo;</span>';
			output += '</a>';
			output += '</li>';
			output += '</ul>';
			output += '</nav>';
			$("#reviewPagination").html(output);			
		}//success
	});//ajax
}//moveReviewPage
/* ===============================리뷰================================= */

 	function modifyCnt(cnt, flag){
	
		if(flag=='minus'){
			$("#itemCnt").html(cnt-1);
			$("#cntM").removeAttr("onclick");
			if(cnt-1>1){
				$("#cntM").attr("onclick","modifyCnt("+ (cnt-1) +", 'minus')");
			}
			$("#cntP").removeAttr("onclick");
			$("#cntP").attr("onclick","modifyCnt("+ (cnt-1) +", 'plus')");
			
			$("#item_cnt").val(cnt-1);
			modifyPrice(cnt-1);
		}else{
			$("#itemCnt").html(cnt+1);
			$("#cntM").removeAttr("onclick");
			$("#cntM").attr("onclick","modifyCnt("+ (cnt+1) +", 'minus')");
			$("#cntP").removeAttr("onclick");
			$("#cntP").attr("onclick","modifyCnt("+ (cnt+1) +", 'plus')");
			
			$("#item_cnt").val(cnt+1);
			modifyPrice(cnt+1);
		}//end else
		
	}//modifyCnt

	function modifyPrice(cnt) {
	
	var itemPrice = $("#finalPrice").val();
	var cntPrice = itemPrice*cnt;
	
	//alert($("[name='itemCnt']").val())


	$("#totalPrice").html(cntPrice.toLocaleString()+"원");	
	}//modifyPrice
	

</script>
</head>
<body style="font-family: nanumbarungothic">

<div id="wrap">
	
	<c:import url="/header.do" />
	<div id="container">
	
		<div id="containerContent">
			<div id="itemwrap" class="itemwrap">
				<c:set var="item" value="${item_detail}"/>	
				<div class="thum">
					<img src="/common/images/item/${item.item_img }">
				</div> 
				<!-- 우측의 설명 -->
				<div id="infoDiv"> 
					<p class="goods_name">
						<span class="item_name"><c:out value="${item.item_name}"/></span>
					</p>
					<p class="goods_name">
						<span class="price"><fmt:formatNumber pattern="#,###" value="${ item.item_price }"/></span>
						<span class="won">원</span>
					</p>
					
					<div class="goods_info">
						<dl id="boder">
							<dt class="tit">판매단위 </dt>
							<dd><c:out value="${item.item_unit}"/></dd>
						</dl>
						<dl>
							<dt class="tit">중량/용량</dt>
							<dd><c:out value="${item.item_weight}"/></dd>
						</dl>
						<dl>
							<dt class="tit">안내사항 </dt>
							<dd><c:out value="${item.item_guide}"/><br/></dd>
						</dl>
						<dl>
							<dt class="tit">재고</dt>
							<dd><c:out value="${item.item_stock}"/>개<br/></dd>
						</dl>
					
						<span class="tit tit_item">구매수량</span>
				      	<c:set var="cnt" value="1"/>
						<span class="count" >
 							<button type="button" id="cntM" class="icoBtn"<c:if test="${ cnt>1 }"> onclick="modifyCnt(${ cnt },'minus')"</c:if>>
	      						<img src="/cart/ico_minus.png" class="btn_reduce" style="width: 10px">
	      					</button>
						</span>
 				      	<a id="itemCnt" name="itemCnt"><c:out value="${ cnt }"/></a>
				      	<!-- <span id="itemCnt" name="itemCnt">1</span> -->
 				      	<button type="button" id="cntP" class="icoBtn" onclick="modifyCnt(${ cnt },'plus')">
				      		<img src="/cart/ico_plus.png" class="btn_rise" style="width: 10px">
				      	</button>
				      	
				      	<!-- 장바구니 담기 : item_cnt의 value에 구매하려는 상품 개수의 값을 넣어주세요!! -->
					<div id="addBtn">
					
					<div class="priceWrapper">
					
					<div class="priceDiv">
					<span class="priceDivLabel">총 상품금액  : </span>
					<c:set var="totaPrice" value="${item.item_price}"/>
					<input type="hidden" id="finalPrice" value="${ item.item_price}">
					<span class="priceDivPrice" name="totalPrice" id="totalPrice">
						<%-- <fmt:formatNumber pattern="#,###" value="${item.item_price * cnt }"/> --%>
						<fmt:formatNumber pattern="#,###" value="${item.item_price}"/>
					</span>
					</div>
					</div>
					
					
					<form id="addCartForm" name="addCartForm">
						<input type="hidden" name="item_num" value="${ param.item_num }"/>
						<input type="hidden" name="item_cnt" id="item_cnt" value="1"/>
					</form>
					<input type="button" id="addCartBtn" value="장바구니 담기" class="collieBtnMain"/>
					</div>	
				      	
				      	</div>
				      	</div>
							</div>	
							
			<!-- 하단의 설명 -->
			<div class="item_description">
				<div id="imgWrap">
					<%
					ItemDetailDomain itemDetail=(ItemDetailDomain)request.getAttribute("item_detail");
					 List<String> imgList= itemDetail.getDetailImgList();
					 List<String> tabList= itemDetail.getTabImgList();
					  
						 for(int i=0; i < imgList.size() ; i++){
					%>
					<div class="imgDiv">
					<img class="imgC" alt="상품 상세이미지" src="/common/images/item/<%= imgList.get(i)%>"/>
					</div>
					<% }//end for%>	
					
					<div id="context">
						<h3 style="text-align: center"><small><c:out value="${item.item_title}"/><br/></small>
								<c:out value="${item.item_subtitle}"/><br/>
						</h3>
						<p class="word">
							<c:out value="${item.item_detail}"/><br/>
						</p>
					</div>
			    	
			    	<div id="carouselExampleIndicators" class="carousel carousel-fade" data-ride="carousel">
					  <ol class="carousel-indicators">
					  <% for(int j= 0 ; j < tabList.size() ;j++){ 
					  	if(j==0){%>
					    <li data-target="#carouselExampleIndicators" data-slide-to="<%=j %>" class="active"></li>
					    <%} else {%>
					    <li data-target="#carouselExampleIndicators" data-slide-to="<%=j%>"></li>
					   <%}
					  	} %>
					  </ol>
					  <div class="carousel-inner">
					    <% for(int j= 0 ; j < tabList.size() ;j++){ 
					    	if(j==0) { %>
					      		<div class="carousel-item active">
					    <%} else {%>
					    		<div class="carousel-item">
					    <%} %>
					      <img class="d-block w-100" src="/common/images/item/<%= tabList.get(j)%>" alt="상품 탭이미지">
					    		  </div>
					    <%}//end for %>
					  </div>
					  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
					    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
					    <span class="sr-only">Previous</span>
					  </a>
					  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
					    <span class="carousel-control-next-icon" aria-hidden="true"></span>
					    <span class="sr-only">Next</span>
					  </a>
					</div>
				</div>
			</div>
		</div>
		
		<div id="reviewWrap">
		<c:import url="/item/review_list.do"/>
		</div>
		
		<div id="itemQnaWrap">
		<c:import url="/item/item_qna_list.do"/>
		</div>
		
		
	</div> <!-- container end -->

	
	<jsp:include page="../common/footer.jsp" />
	
</div>

</body>
</html>