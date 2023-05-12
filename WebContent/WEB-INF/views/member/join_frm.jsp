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
	#mainText{ font-family: 고딕,godic,Sans-Serif; font-size:30px; font-weight:bold; width:140px; height:50px; margin:0px auto; padding-top:20px; }
	#naviBar{ width:900px; height:60px; margin-top:10px }
	.join-content{width:900px; margin:0px auto;}
</style>  
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
<link rel="stylesheet" type="text/css" href="http://211.238.142.25/common/css/common.css">

<!-- Google CDN -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script type="text/javascript">
$(function(){
	
	$("#chkId").click(function(){
		var id = $("#id").val();
	  if( id.length > 5 ){
			$.ajax({
				url : "id_chk_ajax.do",
				type : 'get',
				data: "id="+id,
				dataType:"json",
				error : function() {
						console.log("실패"); 
				},
				success : function( json ) {
					
					if ( json.id_dup_result ) {
							// 아이디가 중복되는 문구
							$("#id_check").html("중복된 아이디 입니다.");
							$("#dupId_check").html("<input type='hidden' value='off' id='dupId_chk'/>")
						}else{
 							$("#id_check").html("사용 가능한 아이디 입니다. ");
							$("#dupId_check").html("<input type='hidden' value='on' id='dupId_chk'/>")
						}//end if
					}//success
				});//ajax
				
	}else if( id.length < 6 && id.length > 0 ){
		$("#id_check").html("아이디는 6자 이상만 가능합니다.");
	}else if($("#id").val().trim()==""){
		$("#id_check").html("아이디는 필수 정보입니다.");
	}
	});//click
	
	$("#id").focusout(function(){
		$("#dupId_check").html("<input type='hidden' value='off' id='dupId_chk'/>")
	})//focusout
	
	
	$("#chkEmail").click(function(){
			var email = $("#email").val()+"@"+$("#email2").val();
		if(email.length > 3){
		$.ajax({
			url : "email_chk_ajax.do",
			type : "get",
			data : "email="+email,
			dataType : "json",
			error : function( ){
				alert("errror가 발생했습니다.");
			},
			success : function( jsonObj ){
					if( jsonObj.email_dup_result ){
						$("#email_chk").html(" 중복된 이메일 입니다. ");
						$("#dupEmail_check").html("<input type='hidden' value='off' id='dupEmail_chk'/>");
					}else{
						$("#email_chk").html(" 사용 가능한 이메일 입니다. ");
						$("#dupEmail_check").html("<input type='hidden' value='on' id='dupEmail_chk'/>");
					}//end if
				}//success
			});//ajax
		}else if($("#email").val().trim()==""){
			$("#email_chk").html("이메일은 필수 정보입니다. ");
			$("#dupEmail_check").html("<input type='hidden' value='off' id='dupEmail_chk'/>");
		}else if($("#selectEmail").val().trim()==""){
			$("#email_chk").html("이메일은 필수 정보입니다. ");
			$("#dupEmail_check").html("<input type='hidden' value='off' id='dupEmail_chk'/>");
		}//end if
		});//click
		
		$("#email").focusout(function(){
			$("#dupEmail_check").html("<input type='hidden' value='off' id='dupEmail_chk'/>");
		})//focusout
		
		
		$("#joinBtn").click(function(){
			
			if($("#id").val().trim()==""){
				$("#id_check").html("아이디는 필수 정보입니다.");
				$("#id").focus();
				return;
			}else{
				$("#id_check").html("");
			}//end if
			
			if($("#id").val().length < 6 && $("#id").val().length > 0){
				$("#id_check").html("아이디는 6자 이상만 가능합니다.");
				$("#id").focus();
				return;
			}else{
				$("#id_check").html("");
			}//end if
			
			if($("#pass").val().trim()==""){
				document.getElementById('checkPwd').style.color = "red";
				$("#checkPwd").html("비밀번호는 필수 정보입니다.");
				$("#pass").focus();
				return;
			}else{
				$("#checkPwd").html("");
			}//end if
			
		      if($("#pass").val().replace(/[0-9A-Za-z]/g, "") != ""){
		    	  document.getElementById('checkPwd').style.color = "red";
		    	  $("#checkPwd").html("비밀번호는 숫자 또는 영문(대,소문자)만 가능합니다.");
		          $("#pass").focus();
		          return;
		       }else{
					$("#checkPwd").html("");
				}//end if
		      
		      if($("#passCheck").val().trim()==""){
		    	  document.getElementById('checkPwd').style.color = "red";
		    	  $("#checkPwd").html("비밀번호 확인칸을 입력해주세요");
					$("#passCheck").focus();
					return;
				}else{
					$("#checkPwd").html("");
				}//end if
				
					var pass = ($("#pass").val());
					var passCheck = ($("#passCheck").val());
					
				if(pass!=passCheck){
					 document.getElementById('checkPwd').style.color = "red";
					 document.getElementById('checkPwd').innerHTML = "동일한 비밀번호를 입력하세요.";
					$("#passCheck").focus();
					return;
				}else{
					$("#checkPwd").html("");
				}//end if
		      
		      if($("#name").val().trim()==""){
		    	  $("#nameCheck").html("이름을 입력해주세요");
					$("#name").focus();
					return;
				}else{
					$("#nameCheck").html("");
				}//end if
		      
		      if($("#name").val().replace(/[ㄱ-힣]/g, "") != ""){
		    	  $("#nameCheck").html("이름은 한글만 입력 가능합니다.");
		          $("#name").val("");
		          $("#name").focus();
		          return;
		       }else{
					$("#nameCheck").html("");
				}//end if
		
			if($("#email").val().trim()==""){
				$("#email_chk").html(" 이메일은 필수 정보입니다. ");
				$("#dupEmail_check").html("<input type='hidden' value='off' id='dupEmail_chk'/>");
				$("#email").focus();
				return;
			}else{
				$("#email_chk").html("");
			}//end if
			
			if($("#selectEmail").val().trim() == ""){
				$("#email_chk").html(" 이메일은 필수 정보입니다. ");
				$("#dupEmail_check").html("<input type='hidden' value='off' id='dupEmail_chk'/>");
				$("#email").focus();
				return;
			}else{
				$("#email_chk").html("");
			}//end if
			
			if($("#phone1").val().trim()==""){
				$("#phoneCheck").html("연락처를 입력해주세요.");
				$("#phone1").focus();
				return;
			}else{
				$("#phoneCheck").html("");
			}//end if
			
			if($("#phone2").val().trim()==""){
				$("#phoneCheck").html("연락처를 입력해주세요.");
				$("#phone2").focus();
				return;
			}else{
				$("#phoneCheck").html("");
			}//end if
			
			if($("#phone3").val().trim()==""){
				$("#phoneCheck").html("연락처를 입력해주세요.");
				$("#phone3").focus();
				return;
			}else{
				$("#phoneCheck").html("");
			}//end if
			
			if($("#phone1").val().replace(/[0-9]/g, "") != ""){
				$("#phoneCheck").html("연락처는 숫자만 입력 가능합니다.");
				$("#phone1").focus();
		          $("#phone1").val("");
		          return;
		       }else{
					$("#phoneCheck").html("");
				}//end if
			
			if($("#phone2").val().replace(/[0-9]/g, "") != ""){
				$("#phoneCheck").html("연락처는 숫자만 입력 가능합니다.");
				$("#phone1").focus();
		          $("#phone2").val("");
		          return;
		       }else{
					$("#phoneCheck").html("");
				}//end if
			
			if($("#phone3").val().replace(/[0-9]/g, "") != ""){
				$("#phoneCheck").html("연락처는 숫자만 입력 가능합니다.");
				$("#phone1").focus();
		          $("#phone3").val("");
		          return;
		       }else{
					$("#phoneCheck").html("");
				}//end if
			
			if($("#addr").val().trim()==""){
				$("#addrCheck").html("주소는 필수 정보 입니다.");
				$("#addr").focus();
				return;
			}else{
				$("#addrCheck").html("");
			}//end if
			
			if($("#addr_detail").val().trim()==""){
				$("#addrCheck").html("주소는 필수 정보 입니다.");
				$("#addr_detail").focus();
				return;
			}else{
				$("#addrCheck").html("");
			}//end if
			
			if($("#dupId_chk").val()=="off"){
				alert("아이디 중복확인을 확인해주세요");
				$("#id").focus();
				return;
			}
			
			if($("#dupEmail_chk").val()=="off"){
				alert("이메일 중복확인을 확인해주세요");
				$("#email").focus();
				return;
			}
			
			
			$("#joinFrm").submit();
		});//click
		
});//ready

	function checkPwd(){
		var pass1 = $("#pass").val();
		var pass2 = $("#passCheck").val();
		
		if(pass1 != pass2){
			   document.getElementById('checkPwd').style.color = "red";
			   document.getElementById('checkPwd').innerHTML = "동일한 암호를 입력하세요.";
		 }else{
			   document.getElementById('checkPwd').style.color = "black";
			   document.getElementById('checkPwd').innerHTML = "";
		 }
		 
	}//chkPwd

	function email_change(){
	
		if(document.joinFrm.selectEmail.options[document.joinFrm.selectEmail.selectedIndex].value == '0'){
	
		// document.joinFrm.email2.disabled = true;
		
		 document.joinFrm.email2.readOnly = true;
	
		 document.joinFrm.email2.value = "";
	
		}
	
		if(document.joinFrm.selectEmail.options[document.joinFrm.selectEmail.selectedIndex].value == '9'){
	
		// document.joinFrm.email2.disabled = false;
		
		 document.joinFrm.email2.readOnly = false;
	
		 document.joinFrm.email2.value = "";
	
		 document.joinFrm.email2.focus();
	
		} else{
	
		// document.joinFrm.email2.disabled = true;
		
		 document.joinFrm.email2.readOnly = true;
	
		 document.joinFrm.email2.value = document.joinFrm.selectEmail.options[document.joinFrm.selectEmail.selectedIndex].value;
	
		}
		
		
	}

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

</script>
</head>
<body>
<div id="wrap">
	<c:import url="/header.do" />
	
	<div id="container">
	<div class="join-content">
	<div style="border-bottom: 3px solid #333; text-align: center; font-size: 35px">회원가입</div>
	<div></div>
	
	<div class="join-frm">
	
	<form action="join_process.do" method="post" id="joinFrm" name="joinFrm">
		<div class="form-row" style="margin-top: 20px">
		    <div class="form-group col-md-6">
		      <label for="inputEmail4">아이디</label>
		      <input type="email" class="form-control" name="id" id="id" maxlength="20" placeholder="6자이상의 영문 혹은 영문 숫자를 조합">
		    </div>
		    <input type="button" style="height:36px; margin-top: 32px; margin-left: 10px; background-color: white; color: black; " id="chkId" value="중복확인"/>
	    </div>
	    <div id="id_check" style="color: red;"> </div>
	    <div id="dupId_check"></div>
	    <div class="form-row">
		    <div class="form-group col-md-6">
		      <label for="inputPassword4">비밀번호</label>
		      <input type="password" class="form-control" id="pass" name="pass" maxlength="20" placeholder="비밀번호를 입력해주세요">
		    </div>
	  	</div>
	    <div class="form-row">
		    <div class="form-group col-md-6">
		      <label for="inputPassword4">비밀번호 확인</label>
		      <input type="password" class="form-control" id="passCheck" name="passCheck" onchange="checkPwd()" placeholder="비밀번호를 한번 더 입력해주세요" maxlength="20" />
		    </div>
	  	</div>
	  	 <div id="checkPwd"></div>
	    <div class="form-row">
		    <div class="form-group col-md-6">
		      <label for="inputPassword4">이름</label>
		      <input type="email" class="form-control" name="name" id="name" placeholder="이름을 입력해주세요">
		    </div>
	  	</div>
	  	<div id="nameCheck" style="color: red;"> </div>
		 <label for="inputPassword4">이메일</label><br/>
		    <div class="form-inline">
		   	 <div class="form-group">
		      <input type="text" class="form-control" name="email" id="email" placeholder="이메일을 입력해주세요">&nbsp;@&nbsp;
		     </div>
		     <div class="form-group">
		      <input type="text" class="form-control" name="email2" id="email2" readonly="readonly" >
		     </div>
		     <div class="form-group">
			<select id="selectEmail" name="selectEmail" class="form-control" onchange="email_change()">
			    <option value="0">메일선택</option>
			    <option value="naver.com">naver.com</option>
			    <option value="daum.net">daum.com</option>
			    <option value="gmail.com">gmail.com</option>
			    <option value="nate.com">nate.com</option>
			    <option value="9">직접입력</option>
			</select>
		    </div>
		    <div class="form-group">
		   	 <input type="button" style="height:36px; margin-left: 10px; background-color: white; color: black;" id="chkEmail" value="중복확인"/>
		    </div>
	  	</div>
	  	<div id="email_chk" style="color: red"></div>
	  	<div id="dupEmail_check"></div>
	  	
		 <label for="inputPassword4">휴대전화</label><br/>
	  	<div class="form-inline">
		  	<div class="form-group">
				<input type="email" class="form-control" style="width: 80px" maxlength="3"  id="phone1" name="phone1">
			</div>
		  	<div class="form-group">
				<label for="email">&nbsp;-&nbsp;</label>
				<input type="email" class="form-control"  style="width: 100px" id="phone2" maxlength="4" name="phone2">
			</div>
		  	<div class="form-group">
				<label for="email">&nbsp;-&nbsp;</label>
				<input type="email" class="form-control" style="width: 100px"  id="phone3" maxlength="4" name="phone3">
			</div>
	  	</div>
	  	<div id="phoneCheck" style="color: red;"> </div>
	  	<br/>
	  	<div class="form-row">
		    <div class="form-group col-md-6">
		      <label for="inputPassword4">우편번호</label>
		      <input type="email" class="form-control" name="zipcode" id="zipcode" placeholder="우편번호" readonly="readonly">
		    </div>
		    <input type="button" value="주소검색"  onclick="sample4_execDaumPostcode()" style="height:36px; margin-top: 32px; margin-left: 10px; background-color: white; color: black;" id="zipBtn" name="zipBtn"/>
	  	</div>
		<div class="form-row">
		    <div class="form-group col-md-6">
		      <label for="inputPassword4">주소</label>
		      <input type="email" class="form-control" name="addr" id="addr" readonly="readonly">
		    </div>
	  	</div>
	  	<div class="form-row" style="border-bottom: 3px solid #333">
		    <div class="form-group col-md-6">
		      <label for="inputPassword4">상세주소</label>
		      <input type="email" class="form-control" name="addr_detail" id="addr_detail">
		    </div>
	  	</div>
	  	<div id="addrCheck" style="color: red;"> </div>
	    <div style="text-align: center ; margin-top: 30px"><button type="button" class="btn btn-primary" style="zoom:1.2; background-color: white; color: black; border-color: black;" value="회원가입" id="joinBtn">회원가입</button></div>
	  </form>
	  </div>
  	</div>
	</div>
</div>

<jsp:include page="../common/footer.jsp" />
	
</body>
</html>