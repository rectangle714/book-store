<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>MARKET COLLIE</title>
<style type="text/css">
#wrap{ min-height: 940px; margin: 0px auto; }
#container{ min-height: 600px;}
#containerContentWrap{ margin-top: 50px; margin-bottom: 50px; display: flex; justify-content: center; }
#containerContent{ width: 70%; align-items: center; }
.contentSubtitle{ margin-top: 50px; margin-bottom: 50px; display: flex; justify-content: center; color:#17462B; font-size:4rem; font-weight: bold;}
.controls-top {text-align: right;}
.bi {margin-bottom:10px}
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

function showDetailImage(item_num) { 
	   location.href="item/item_detail.do?item_num="+item_num;
}

</script>
</head>
<body style="font-family: nanumbarungothic">

<div id="wrap">
	
	<c:import url="/header.do" /> 
	<div id="container">
	
	<div id="mainImg" class="carousel slide" data-ride="carousel">
	  <div class="carousel-inner">
	    <div class="carousel-item active" data-interval="3000">
	      <img src="/common/images/main_img1.jpg" class="d-block w-100">
	    </div>
	    <div class="carousel-item" data-interval="3000">
	      <img src="/common/images/main_img2.jpg" class="d-block w-100">
	    </div>
	    <div class="carousel-item" data-interval="3000">
	      <img src="/common/images/main_img3.jpg" class="d-block w-100">
	    </div>
	  </div>
	  <a class="carousel-control-prev" href="#mainImg" role="button" data-slide="prev">
	    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
	    <span class="sr-only">Previous</span>
	  </a>
	  <a class="carousel-control-next" href="#mainImg" role="button" data-slide="next">
	    <span class="carousel-control-next-icon" aria-hidden="true"></span>
	    <span class="sr-only">Next</span>
	  </a>
	</div>
	<div class="contentSubtitle">NEW!</div> 
	<div id="containerContentWrap">
	<div id="containerContent">
	
	
		<!--Controls-->
		<div class="controls-top">
			<a href="#multi-item-example" data-slide="prev">
			    <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-caret-left-fill" fill="#17462B" xmlns="http://www.w3.org/2000/svg">
				  <path d="M3.86 8.753l5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
				</svg>
		    </a>
		    <a href="#multi-item-example" data-slide="next">
			    <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-caret-right-fill" fill="#17462B" xmlns="http://www.w3.org/2000/svg">
				  <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
				</svg>
			</a>
		</div>
		<!--/.Controls-->
	
		<!--Carousel Wrapper-->
		<div id="multi-item-example" class="carousel slide carousel-multi-item" data-ride="carousel">
		


		
		  <!--Slides-->
		  <div class="carousel-inner" role="listbox">
		    <div class="carousel-item active">
		    <c:forEach items="${new_item_list }" var="newItemList" varStatus="status">
		    	<c:if test="${status.index > 0 and status.index mod 4 eq 0}">
		    		</div><div class="carousel-item">
		    	</c:if>
				<div class="col-md-3" style="float:left">
					<div class="card mb-2" onclick="showDetailImage(${newItemList.item_num});" style="cursor:pointer;">
						<img src="common/images/item/${newItemList.item_img}" class="card-img-top">
		        		<div class="card-body">
							<h6 class="card-title">${newItemList.item_name}</h6>
							<p class="card-text">${newItemList.item_price}원</p>
						</div>
		        	</div>
				</div>
		     </c:forEach>
			</div>
		  </div>
		
		</div>
		
	</div>
	</div>
	</div>
	
	<div id="containerFooterWrap">
	<div id="containerFooter">
	<img alt="" src="common/images/main_img4.jpg" style="width: 100%">
	</div>
	</div>
	
	<jsp:include page="common/footer.jsp" />
	
</div>

</body>
</html>