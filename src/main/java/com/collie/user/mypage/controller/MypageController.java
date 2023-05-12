package com.collie.user.mypage.controller;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.collie.user.member.domain.LoginDomain;
import com.collie.user.mypage.domain.OrderDetailDomain;
import com.collie.user.mypage.domain.OrderListDomain;
import com.collie.user.mypage.service.MypageService;
import com.collie.user.mypage.vo.DeleteMemberVO;
import com.collie.user.mypage.vo.ModifyMemberVO;
import com.collie.user.mypage.vo.MyOrderVO;
import com.collie.user.mypage.vo.PassCheckVO;
import com.collie.user.mypage.vo.QnaVO;
import com.collie.user.mypage.vo.UpdatePassVO;
import com.collie.user.pagination.RangeVO;

@Controller
public class MypageController {
	
	/**
	 * �ֹ����� ����� �ҷ����� ��
	 * @param session
	 * @param id
	 * @param model
	 * @return
	 */
	@RequestMapping(value="/mypage/order_list.do", method = GET)
	public String orderList(HttpSession session, Model model, RangeVO rVO) {
		LoginDomain ld = (LoginDomain)session.getAttribute("user_info");
		if( ld != null ) {
			rVO.setField_name("member_num");
			rVO.setField_value(ld.getMember_num());
			
			MypageService ms = new MypageService();
			List<OrderListDomain> list = ms.getOrderList(rVO);
			model.addAttribute("order_list", list);
			model.addAttribute("paging", rVO);
		}//end if
		return "mypage/order_list";
	}//orderList
	
	
	/**
	 * �ֹ� ���� ���������̼� - ��������ȣ Ŭ�� �� ����
	 * @param session
	 * @param model
	 * @param rVO
	 * @return
	 */
	@RequestMapping(value="/mypage/order_list_page.do", method = GET)
	public String orderListPaging(HttpSession session, Model model, RangeVO rVO) {
		LoginDomain ld = (LoginDomain)session.getAttribute("user_info");
		if( ld != null ) {
			rVO.setField_name("member_num");
			rVO.setField_value(ld.getMember_num());
			
			MypageService ms = new MypageService();
			List<OrderListDomain> list = ms.getOrderList(rVO);
			String json = ms.orderListJson(list, rVO);
			model.addAttribute("json", json);
		}//end if
		
		return "mypage/order_list_json";
	}//orderListPaging
	
	/**
	 * �ֹ� ���� ���������� �ҷ����� ��
	 * @param moVO
	 * @param session
	 * @param model
	 * @return
	 */
	@RequestMapping(value="/mypage/order_detail.do", method=GET)
	public String orderDetail(MyOrderVO moVO, HttpSession session, Model model) {
		LoginDomain ld = (LoginDomain)session.getAttribute("user_info");
		if( ld != null ) {
			moVO.setMember_num(ld.getMember_num());
			
			MypageService ms = new MypageService();
			OrderDetailDomain odd = ms.getOrderDetail(moVO);
			
			model.addAttribute("order_detail", odd);
			model.addAttribute("user_name", ld.getName());
		}//end if
		
		return "mypage/order_detail";
	}//orderDetail
	
	/**
	 * �ֹ������� ����ϴ� ��
	 * @param moVO
	 * @param session
	 * @param model
	 * @return
	 */
	@RequestMapping(value="/mypage/order_cancel.do", method=GET)
	public String cancelOrder(MyOrderVO moVO, HttpSession session) {
		LoginDomain ld = (LoginDomain)session.getAttribute("user_info");
		if( ld != null ) {
			moVO.setMember_num(ld.getMember_num());
			
			MypageService ms = new MypageService();
			boolean flag = ms.cancelOrder(moVO);
		}//end if
		
		return "redirect:order_list.do";
	}//cancelOrder
	
	/**
	 * �����Ȳ ��ȸ ���� �ҷ����� ��
	 * @return
	 */
	@RequestMapping(value="/mypage/tracking_info.do", method=POST)
	public String trackingInfo() {
		return "mypage/tracking_info";
	}//trackingInfo
	
	@RequestMapping(value="/mypage/check_member_form.do", method= GET)
	public String checkMypageForm() {
		
		return "mypage/check_member_form";
	}//checkPassForm
	
	@RequestMapping(value="/mypage/check_member.do", method=POST)
	public String checkMember(PassCheckVO pcVO, HttpSession session, Model model) {
		LoginDomain ld = (LoginDomain) session.getAttribute("user_info");
		pcVO.setMember_num(ld.getMember_num());
	
		MypageService ms = new MypageService();
		
		boolean flag = false;
		
		try {
			flag = ms.getMemberPass(pcVO);
		} catch(NullPointerException npe) {
//			model.addAttribute("msg", "��й�ȣ�� ��ġ���� �ʽ��ϴ�.");
			flag = false;
		}//end catch
		
		if(!flag) {
			model.addAttribute("msg", "��й�ȣ�� ��ġ���� �ʽ��ϴ�.");
		}
		
		return "forward:/mypage/memberInfo_form.do";
	}//checkPassForm
	
	@RequestMapping(value="/mypage/memberInfo_form.do" , method=POST)
	public String memberInfoForm(HttpSession session) {	
		return "mypage/modify_member_form";
	}//memberInfoForm
	
	
	@RequestMapping(value="/mypage/update_member.do", method=POST)
	public String modifyMemberInfo(ModifyMemberVO mmVO, HttpSession session, Model model, HttpServletRequest request) {
		boolean flag = false;
		
		MypageService ms = new MypageService();
		mmVO.setPhone(request.getParameter("phone1")+"-"+request.getParameter("phone2")+"-"+request.getParameter("phone3"));
		flag = ms.modifyMemberInfo(mmVO);
		
		LoginDomain ld = (LoginDomain)session.getAttribute("user_info");
		ld.setPhone(mmVO.getPhone());
		ld.setZipcode(mmVO.getZipcode());
		ld.setAddr(mmVO.getAddr());
		ld.setAddr_detail(mmVO.getAddr_detail());
		session.setAttribute("user_info", ld);
		
		if(!flag) {
			model.addAttribute("msg", "��й�ȣ�� ��ġ���� �ʽ��ϴ�.");
		}
		return "mypage/modify_member_result";
	}//modifyMemberInfo
	
	/** ȸ�� Ż�� ���� ��
	 * @param pcVO
	 * @param session
	 * @param model
	 * @return
	 */
	@RequestMapping( value="/mypage/remove_member_form.do", method=GET )
	public String removeMemberInfoForm( ) {
		return"mypage/remove_member_form";
	}//removeMemberInfo
	
	/** ȸ�� Ż��
	 * @param pcVO
	 * @param session
	 * @param model
	 * @return
	 */
	@RequestMapping(value="/mypage/remove_member.do", method = POST)
	public String removeMemberInfo(DeleteMemberVO dmVO, HttpSession session, Model model) {
		LoginDomain ld = (LoginDomain)session.getAttribute("user_info");
		dmVO.setMember_num(ld.getMember_num());
		
		MypageService ms = new MypageService();
		
		// ��й�ȣ ��ġ�ϴ��� Ȯ���ϴ� �ڵ�
		// ���� �������� ��й�ȣ üũ�ϱ� ���� PassCheckVO �����ؼ� �־���
		PassCheckVO pcVO = new PassCheckVO();
		pcVO.setMember_num(dmVO.getMember_num());
		pcVO.setPass(dmVO.getPass());
		boolean passFlag = ms.getMemberPass(pcVO);
		
		//��й�ȣ�� ��ġ�ϸ� ȸ�� ���� ����
		if(passFlag) {
			boolean deleteFlag = ms.removeMember(dmVO);
			if(!deleteFlag) {
				model.addAttribute("msg", "ȸ�� Ż�� �� �� �����ϴ�. ��� �� �ٽ� �õ����ּ���.");
			} else {
				//ȸ�� Ż�� �����ϸ� ���� ����
				session.removeAttribute("user_info");
			}
		} else {
			model.addAttribute("msg", "��й�ȣ�� ��ġ���� �ʽ��ϴ�.");
		}
		
		
		return "mypage/remove_member_result";
	}
	
	
	
	/**
	 * ���������� - ��й�ȣ ���� : ���� ��й�ȣ Ȯ���ϴ� ��
	 * @return
	 */
	@RequestMapping(value="/mypage/check_pass_form.do", method=GET)
	public String checkPassForm() {
		return "mypage/check_pass_form";
	}//checkPassForm
	
	/**
	 * ���������� - ��й�ȣ ���� : ���� ��й�ȣ Ȯ���ϴ� ��
	 * @param pcVO
	 * @param session
	 * @return
	 */
	@RequestMapping(value="/mypage/check_pass.do", method=POST)
	public String checkPass(PassCheckVO pcVO, HttpSession session, RedirectAttributes ra) {
		LoginDomain ld = (LoginDomain) session.getAttribute("user_info");
		if( ld != null) {
			pcVO.setMember_num(ld.getMember_num());
			MypageService ms = new MypageService();
			boolean flag = false;
			try {
				flag = ms.getMemberPass(pcVO);
			} catch(NullPointerException npe) {
//				ra.addFlashAttribute("msg", "��й�ȣ�� ��ġ���� �ʽ��ϴ�.");
				flag = false;
			}//end catch
			
			if(!flag) {
				ra.addFlashAttribute("msg", "��й�ȣ�� ��ġ���� �ʽ��ϴ�.");
			}
		}//end if
		
		return "redirect:modify_pass_form.do";
	}//checkPassForm
	
	/**
	 * ��й�ȣ �����ϱ� ���� ��
	 * @return
	 */
	@RequestMapping(value="/mypage/modify_pass_form.do", method=GET)
	public String modifyPassForm() {
		return "mypage/modify_pass_form";
	}//modifyPassForm
	
	/**
	 * ��й�ȣ �����ϴ� ��
	 * @param upVO
	 * @return
	 */
	@RequestMapping(value="/mypage/modify_pass.do", method=POST)
	public String modifyPass(UpdatePassVO upVO, HttpSession session, Model model) {
		LoginDomain ld = (LoginDomain) session.getAttribute("user_info");
		if( ld != null ) {
			upVO.setMember_num(ld.getMember_num());
			MypageService ms = new MypageService();
			boolean flag = ms.modifyPass(upVO);
		}//end if
		
		return "mypage/modify_pass_result";
	}//checkPassForm
	
	/**
	 * ���� ������ ó�� �Ҹ��� ȣ��Ǵ� method
	 * @param model
	 * @param ss
	 * @return
	 */
	@RequestMapping(value = "/mypage/qna_list.do",method = {GET,POST})
	public String qnaList(Model model,HttpSession ss) {
		LoginDomain ldd = (LoginDomain)ss.getAttribute("user_info");
		int member_num=ldd.getMember_num();
		MypageService ms = new MypageService();
		
		RangeVO rVO=new RangeVO();
		rVO.setField_name("member_num");
		rVO.setField_value(member_num);
		rVO.setTotal_cnt(ms.getQnaTotalCnt(member_num));
		rVO.calcPaging();
		
		model.addAttribute("qna_list",ms.getQnaList(rVO));
		model.addAttribute("paging", rVO);
		
		return "mypage/qna_list";
	}
	
	/**
	 * �������� �������� ȣ��Ǵ� method
	 * @param model
	 * @param ss
	 * @return
	 */
	@RequestMapping(value = "/mypage/qna_list_move_page.do",method = POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String moveQnaListPage(int current_page, Model model,HttpSession ss) throws NumberFormatException {
		String json=null;
		
		LoginDomain ldd = (LoginDomain)ss.getAttribute("user_info");
		int member_num=ldd.getMember_num();
		
		MypageService ms = new MypageService();
		json=ms.moveQnaListPage(member_num, current_page);
		
		return json;
	}
	
	@RequestMapping(value = "/mypage/qna_detail.do",method = GET, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String qnaDetail(QnaVO qVO, HttpSession session) throws NumberFormatException {
		String json="";
		
		LoginDomain lDomain=(LoginDomain)session.getAttribute("user_info");
		qVO.setMember_num(lDomain.getMember_num());
		
		MypageService ms = new MypageService();
		json=ms.getQnaDetail(qVO);
		
		return json;
		
	}
	
}//MypageController
