<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>MARKET COLLIE - 회원가입</title>
<style type="text/css">
	#wrap{ width:900px; height:800px; margin:0px auto; }
	#mainText{ font-family: 고딕,godic,Sans-Serif; font-size:30px; font-weight:bold; width:140px; height:50px; margin:0px auto; padding-top:20px; }
	#naviBar{ width:900px; height:60px; margin-top:10px }
	#container{ width: 900px; height:800px; position:relative; margin-top: 30px}
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
	  if( id.length > 6 ){
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
							$("#id_check").html("중복된아이디");
						}else{
							// 아이디가 중복되는 문구
							$("#id_check").html("사용 가능한 아이디 입니다. ");
						}//end if
					}//success
				});//ajax
	}//end if
	});//click
	
	$("#chkEmail").click(function(){
			var email = $("#email").val();
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
					}else{
						$("#email_chk").html(" 사용 가능한 이메일 입니다. ")
					}//end if
				}//success
			});//ajax
		}//end if
		});//click
		
		$("#joinBtn").click(function(){
			
			if($("#id").val().trim()==""){
				alert("아이디를 입력해 주세요");
				$("#id").focus();
				return;
			}
			
			if($("#pass").val().trim()==""){
				alert("비밀번호를 입력해주세요");
				$("#pass").focus();
				return;
			}
			
		      if($("#pass").val().replace(/[0-9A-Za-z]/g, "") != ""){
		          alert("비밀번호는 숫자 또는 영문(대,소문자)만 가능합니다.");
		          $("#pass").val("");
		          return;
		       }
		      
		      if($("#passCheck").val().trim()==""){
					alert("비밀번호 확인칸을 입력해주세요");
					$("#passCheck").focus();
					return;
				}
				
					var pass = ($("#pass").val());
					var passCheck = ($("#passCheck").val());
					
				if(pass!=passCheck){
					alert("비밀번호화 비밀번호확인이 일치하지 않습니다.");
					return;
				}
		      
		      if($("#name").val().trim()==""){
					alert("이름을 입력해주세요");
					$("#name").focus();
					return;
				}
		      
		      if($("#name").val().replace(/[ㄱ-힣]/g, "") != ""){
		          alert("이름은 한글만 가능합니다");
		          $("#name").val("");
		          return;
		       }
		
			if($("#email").val().trim()==""){
				alert("이메일을 입력해주세요");
				$("#email").focus();
				return;
			}
			
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
			
			
			$("#joinFrm").submit();
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

	

</script>
</head>
<body>
<div id="wrap">
	<c:import url="/header.do" />
	
	<div id="container">
		<div id="contentWrap">
		<div id="containerTitle" style="text-align: center; border-bottom: 3px solid #333">
			<h4><strong>회원가입 완료</strong></h4>
		</div>
			<div id="containerSubTitle">
			</div>
			<div id="containerContent" >
				<div style="text-align: center; height:500px; margin-top: 150px; font-size: 40px">
				<strong>회원가입을 축하드립니다!</strong>
				<div style="margin-top: 150px">
				<button type="button" class="btn btn-primary" onclick="location.href='/login_form.do'" style="background-color: white; color: black; border-color: black; height: 70px; width: 180px">로그인</button>
				<button type="button" class="btn btn-primary" onclick="location.href='/index.do'" style="background-color: white; color: black; border-color: black; height: 70px; width: 180px">메인으로</button>
				</div>
				</div>
				<div id="btnDiv">
					
				</div>
			</div>
		</div>
	</div>
</div>

	<jsp:include page="../common/footer.jsp" />
	
</body>
</html>