<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javascript">
$(function(){
	
	$("#itemQnaBtn").click(function(){
		if(${ not empty sessionScope.user_info }){
			$("#qnaAddFrm").submit();
		}else{
			alert("로그인 후 작성 가능합니다.");
		}//end else
	})//click
	
});//ready


function qnaMovePage(item_num, cur_page){
  	$.ajax({
		url:"item_qna_move_page.do",
		type:"POST",
		data:"item_num="+item_num+"&current_page="+cur_page,
		dataType:"JSON",
		error:function(xhr){
			alert("에러");
			console.log(xhr.status+" / "+xhr.statusText);
		},
		success:function(jsonObj){
			if(jsonObj.flag=="success"){
				
				var table='<table class="tab">';
				table+='<thead>';
				table+='<tr class="titleTab">';
				table+='<th class="tabTh" style="width: 50px">번호</th>';
				table+='<th class="tabTh">제목</th>';
				table+='<th class="tabTh" style="width: 100px">답변유무</th>';
				table+='<th class="tabTh" style="width: 150px">아이디</th>';
				table+='<th class="tabTh" style="width: 150px">작성일</th>';
				table+='</tr>';
				table+='</thead>';
				table+='<tbody>';
				
				$.each(jsonObj.qna_list,function(i, json){
					table+='<tr id="itemQnaTr'+json.item_qna_num+'" class="tableContent" onclick="qnaToggle('+json.item_qna_num+')">';
					table+='<td class="tabTd">'+json.idx+'</td>';
					table+='<td class="tabTd">'+json.item_qna_subject+'</td>';
					table+='<td class="tabTd">'+json.item_qna_flag+'</td>';
					table+='<td class="tabTd">'+json.id+'</td>';
					table+='<td class="tabTd">'+json.input_date+'</td>';
					table+='</tr>';
				})//each
				table+='</tbody>';
				table+='</table>';
				$("#itemQnaDiv").html(table);
				
				var page='<nav aria-label="Page navigation example">';
				page+='<ul class="pagination justify-content-center">';
				var pre="active";
				var preOnclick='onclick="qnaMovePage('+item_num+','+jsonObj.pre_page+')" ';
				if(jsonObj.pre_page<=0){
					pre="disabled"
					preOnclick="";
				}//end if
				page+='<li class="page-item '+pre+'">';
				page+='<a class="page-link"'+preOnclick+' aria-label="Previous">';
				page+='<span aria-hidden="true">&laquo;</span>';
				page+='</a>';
				page+='</li>';
				
				var curOnclick="";
				for(var i=jsonObj.start_page; i<jsonObj.end_page+1; i++){
					curOnclick='onclick="qnaMovePage('+item_num+','+i+')" ';
					if(jsonObj.current_page==i){
						cur="disabled"
						curOnclick="";
					}//end if
					page+='<li class="page-item">';
					page+='<a class="page-link"'+curOnclick+'>';
					page+=i;
					page+='</a>';
					page+='</li>';
				}//end for
				var next="active";
				var nextOnclick='onclick="qnaMovePage('+item_num+','+jsonObj.next_page+')" ';
				if(cur_page>=jsonObj.total_page){
					next="disabled"
					nextOnclick="";
				}//end if
				page+='<li class="page-item '+next+'">';
				page+='<a class="page-link" '+nextOnclick+'aria-label="Next">';
				page+='<span aria-hidden="true">&raquo;</span>';
				page+='</a>';
				page+='</li>';
				page+='</ul>';
				page+='</nav>';
				$("#pagination").html(page);
				
			}else{
				var table='<table class="tab">';
				table+='<thead>';
				table+='<tr class="titleTab">';
				table+='<th class="tabTh" style="width: 50px">번호</th>';
				table+='<th class="tabTh">제목</th>';
				table+='<th class="tabTh" style="width: 100px">답변유무</th>';
				table+='<th class="tabTh" style="width: 150px">아이디</th>';
				table+='<th class="tabTh" style="width: 150px">작성일</th>';
				table+='</tr>';
				table+='</thead>';
				table+='<tbody>';
				table+='<tr>';
				table+='<td colspan="5">문의 내역이 없습니다.</td>';
				table+='</tr>';
				table+='</tbody>';
				table+='</table>';
				
				$("#itemQnaDiv").html(table);
			}
		}//success
	});//ajax
	
}//qnaMovePage



function qnaToggle(item_qna_num){
	
	if($("#qnaContentTr"+item_qna_num).length==1){
		delReply(item_qna_num);
	}else{
		addReply(item_qna_num);
	}//else
	
}//toggleReply

function addReply(item_qna_num){
	
  	$.ajax({
		url:"item_qna_detail.do",
		type:"POST",
		data:"item_qna_num="+item_qna_num,
		dataType:"JSON",
		error:function(xhr){
			alert("에러");
			console.log(xhr.status+" / "+xhr.statusText);
		},
		success:function(jsonObj){
			if(jsonObj.flag=="success"){
				
				var contentTr='<tr id="qnaContentTr'+item_qna_num+'" class="tableContent">';
				contentTr+='<td class="tabTd"></td>';
				contentTr+='<td colspan="3" class="tabTd" style="text-align: left">';
				contentTr+='<strong>'
				contentTr+=jsonObj.item_qna_content;
				contentTr+='</strong>'
				contentTr+='</td>';
				contentTr+='<td class="tabTd"></td>';
				contentTr+='</tr>';
				$("#itemQnaTr"+item_qna_num).after(contentTr);
				
				if(jsonObj.item_qna_reply!=null){
					var replyTr='<tr id="qnaReplyTr'+item_qna_num+'" class="tableContent">';
					replyTr+='<td class="tabTd"></td>';
					replyTr+='<td colspan="3" class="tabTd" style="text-align: left">';
					replyTr+=' RE : ';
					replyTr+=jsonObj.item_qna_reply;
					replyTr+='</td>';
					replyTr+='<td class="tabTd">';
					replyTr+=jsonObj.reply_date;
					replyTr+='</td>';
					replyTr+='</tr>';
					$("#qnaContentTr"+item_qna_num).after(replyTr);
				}//end if
				
			}//end if
		}//success
	});//ajax
	
}//addReply

function delReply(item_qna_num){
	$("#qnaContentTr"+item_qna_num).remove();
	
	if( $("#qnaReplyTr"+item_qna_num).length==1 ){
		$("#qnaReplyTr"+item_qna_num).remove();
	}//end if
}


</script>
<div style="margin-top: 100px; margin-bottom: 20px; display: flex; justify-content: center; flex-direction: column; align-items: center">
<div style="width: 70%; font-weight: bold; font-size: 20pt; ">
<hr>
상품문의
</div>

<div style="width: 70%; margin-top: 20px; color: #bebebe; font-size: 9pt; ">
상품에 대한 문의를 남기는 공간입니다. 해당 게시판의 성격과 다른 글은 사전동의 없이 담당 게시판으로 이동될 수 있습니다.<br/>
배송관련, 주문(취소/교환/환불)관련 문의 및 요청사항은 1:1문의에 남겨주세요.
</div>

</div>

<div id="itemQnaDiv" class="itemQnaDiv">
	 <table class="tab">
	  <thead>
		<tr class="titleTab">
			<th class="tabTh" style="width: 50px">번호</th>
			<th class="tabTh">제목</th>
			<th class="tabTh" style="width: 100px">답변유무</th>
			<th class="tabTh" style="width: 150px">아이디</th>
			<th class="tabTh" style="width: 150px">작성일</th>
		</tr>
	 </thead>
	<tbody>
		<c:if test="${ empty qna_list }">
		<tr>
		<td colspan="5" style="text-align: center; padding-top: 30px">문의 내역이 없습니다.</td>
		</tr>
		</c:if>
		<c:forEach var="item_qna" items="${ qna_list }">
			<tr id="itemQnaTr${ item_qna.item_qna_num }" class="tableContent" onclick="qnaToggle(${ item_qna.item_qna_num })">
				<td class="tabTd"><c:out value="${ item_qna.idx }"/>
				<td class="tabTd"><c:out value="${ item_qna.item_qna_subject }"/></td>
				<td class="tabTd"><c:out value="${ item_qna.item_qna_flag }"/></td>
				<td class="tabTd"><c:out value="${ item_qna.id }"/></td>
				<td class="tabTd"><c:out value="${ item_qna.input_date }"/></td>
			</tr>
		</c:forEach>
	 </tbody>
	</table>
</div>

<form id="qnaAddFrm" action="item_qna_add_form.do" method="post">
<input type="hidden" name="user_info" id="user_info" value="${ user_info }"/>
<input type="hidden" name="item_num" value="${ param.item_num }"/>
</form>
<div class="itemQnaBtnDivWrap">
<div class="itemQnaBtnDiv">
	<input type="button" id="itemQnaBtn" value="상품문의" class="collieBtnMain"/>
</div>
</div>

<div class="paginationDiv">
<c:if test="${ not empty qna_list }">
<div id="pagination">
	<nav aria-label="Page navigation example">
	  <ul class="pagination justify-content-center">
	    <li class="page-item ${paging.pre_page <= 0 ? 'disabled':'active'}">
		 	<a class="page-link"<c:if test="${ paging.pre_page ne '0'}">onclick="qnaMovePage(${ param.item_num },${paging.pre_page})"</c:if> aria-label="Previous">
	        	<span aria-hidden="true">&laquo;</span>
	      	</a>
	    </li>
	    <c:forEach begin="${paging.start_page}" end="${paging.end_page}" step="1" var="cur_page" >
		    <li class="page-item">
		    	<a class="page-link"<c:if test="${paging.current_page ne cur_page}"> onclick="qnaMovePage(${ param.item_num },${cur_page})"</c:if>>
		    		<c:out value="${cur_page}" />
		    	</a>
		    </li>
	    </c:forEach>
	    <li class="page-item ${paging.current_page >= paging.total_page ? 'disabled':'active'}">
	      <a class="page-link"<c:if test="${paging.current_page < paging.total_page}"> onclick="qnaMovePage(${ param.item_num },${paging.next_page})"</c:if> aria-label="Next">
	        <span aria-hidden="true">&raquo;</span>
	      </a>
	    </li>
	  </ul>
	</nav>
</div>
</c:if>
</div>