<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<script type="text/javascript">
function writeReview(item_num) {
	if( ${ empty sessionScope.user_info } ){
		alert("로그인이 필요한 서비스입니다.");
		location.href = "/login_form.do";
		return;
	}//end if	
	var buyFlag = '<c:out value="${ buyFlag }"/>';
	if( buyFlag == 'false' || buyFlag == ''){
		alert("상품을 구입하신 분만 후기 작성이 가능합니다.");
		return;
	}//end if
	location.href="review_form.do?item_num="+item_num;
}//writeReview
</script>

<div id="reviewTitleWrap">
	<div id="reviewTitleColumn">
		<hr>
		상품후기
	</div>
	<div id="reviewTitleValue">
		상품에 대한 후기를 남기는 공간입니다. 해당 게시판의 성격과 다른 글은 사전동의 없이 담당 게시판으로 이동될 수 있습니다.<br/>
		배송관련, 주문(취소/교환/환불)관련 문의 및 요청사항은 1:1문의에 남겨주세요.
	</div>
</div>

<div id="reviewDiv">
	 <table class="tab">
	  <thead>
		<tr class="titleTab">
			<th class="tabTh" style="width: 50px">번호</th>
			<th class="tabTh">제목</th>
			<th class="tabTh" style="width: 150px">아이디</th>
			<th class="tabTh" style="width: 150px">작성일</th>
		</tr>
	 </thead>
	<tbody>
		<c:if test="${ empty review_list }">
		<tr>
			<td colspan="4" style="text-align: center; padding-top: 30px">상품 후기가 없습니다.</td>
		</tr>
		</c:if>
		<c:forEach var="review" items="${ review_list }">
			<input type="hidden" name="review_num" value="${ review.review_num }"/>
			<tr id="reviewTr${ review.review_num }" class="tableContent" onclick="reviewToggle(${ review.review_num });" style="cursor: pointer">
				<td class="tabTd">${ review.idx }</td>
				<td class="tabTd">${ review.review_subject }</td>
				<td class="tabTd">${ review.id }</td>
				<td class="tabTd">${ fn:substring(review.input_date,0,10) }</td>
			</tr>
		</c:forEach>
	 </tbody>
	</table>
</div>
<div id="reviewBtnWrap">
	<input type="button" value="후기쓰기"  class="collieBtnMain"  onclick="writeReview(${ param.item_num });" />
</div>
<div id="reviewPaginationWrap">
	<c:if test="${ not empty review_list }">
	<div id="reviewPagination">
		<nav aria-label="Page navigation example">
		  <ul class="pagination justify-content-center">
		    <li class="page-item ${paging.pre_page eq '0' ? 'disabled':'active'}">
			 	<a class="page-link" onclick="moveReviewPage(${paging.field_value}, ${paging.pre_page});" aria-label="Previous">
		        	<span aria-hidden="true">&laquo;</span>
		      	</a>
		    </li>
		    <c:forEach begin="${paging.start_page}" end="${paging.end_page}" step="1" var="cnt" >
			    <li class="page-item">
			    	<a class="page-link" onclick="moveReviewPage(${paging.field_value}, ${cnt});">
			    		<c:out value="${cnt}" />
			    	</a>
			    </li>
		    </c:forEach>
		    <li class="page-item ${paging.current_page eq paging.end_page ? 'disabled':'active'}">
		      <a class="page-link"  onclick="moveReviewPage(${paging.field_value}, ${paging.next_page});" aria-label="Next">
		        <span aria-hidden="true">&raquo;</span>
		      </a>
		    </li>
		  </ul>
		</nav>
	</div>
	</c:if>
</div>