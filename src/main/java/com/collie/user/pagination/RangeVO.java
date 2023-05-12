package com.collie.user.pagination;

public class RangeVO {
	
	private String field_name; //�˻� �÷���
	
	private Object field_value; //�˻� ��
	
	private int total_cnt;
	
	private int current_page = 1;
	
	private int start_num = 1; //�� ������ �Խù� ���� ��ȣ
	
	private int end_num = 999;  //�� ������ �Խù� �� ��ȣ
	
	private int total_page; // �� ������ ��
	
	private int page_scale = 5; // ���������� �� �� �ִ� �Խñ� ��

	private int page_range = 5; //��ȸ�� ������ ���� ����
	
	private int start_page; //���� ������ ��ȣ
	private int end_page; //�� ������ ��ȣ
	private int pre_page; //"����"�� ������ �� ���� ������
	private int next_page; //"����"�� ������ �� ���� ������
	 
	
	public String getField_name() {
		return field_name;
	}

	public void setField_name(String field_name) {
		this.field_name = field_name;
	}

	public Object getField_value() {
		return field_value;
	}

	public void setField_value(Object field_value) {
		this.field_value = field_value;
	}

	public int getCurrent_page() {
		return current_page;
	}


	public void setCurrent_page(int current_page) {
		this.current_page = current_page;
	}

	public void setPage_scale(int page_scale) {
		this.page_scale = page_scale;
	}
	
	public int getTotal_cnt() {
		return total_cnt;
	}

	public void setTotal_cnt(int total_cnt) {
		this.total_cnt = total_cnt;
		
		if(total_cnt < end_num) {
			end_num = total_cnt;
		}
	}

	public int getStart_num() {
		return start_num;
	}

	public void setStart_num(int start_num) {
		this.start_num = start_num;
	}

	public int getEnd_num() {
		return end_num;
	}

	public void setEnd_num(int end_num) {
		this.end_num = end_num;
	}

	public int getPage_scale() {
		return page_scale;
	}
	
	public int getPage_range() {
		return page_range;
	}

	public void setPage_range(int page_range) {
		this.page_range = page_range;
	}

	public int getStart_page() {
		return start_page;
	}

	public void setStart_page(int start_page) {
		this.start_page = start_page;
	}

	public int getEnd_page() {
		return end_page;
	}

	public void setEnd_page(int end_page) {
		this.end_page = end_page;
	}

	public int getPre_page() {
		return pre_page;
	}

	public void setPre_page(int pre_page) {
		this.pre_page = pre_page;
	}

	public int getNext_page() {
		return next_page;
	}

	public void setNext_page(int next_page) {
		this.next_page = next_page;
	}
	
	public int getTotal_page() {
		return total_page;
	}

	public void setTotal_page(int total_page) {
		this.total_page = total_page;
	}

	public void calcPaging() {
		total_page = (int)Math.ceil((double)total_cnt/page_scale);
		
		if(current_page > total_page) {
			current_page = total_page;
		}
		
		start_num = (current_page-1)*page_scale+1;
		end_num=start_num+page_scale-1;
		
		if(end_num > total_cnt){
			end_num = total_cnt;
		}
		
		start_page=((current_page-1)/page_range)*page_range+1;
		end_page=start_page+page_range-1;
		if(total_page < end_page) {
			end_page = total_page;
		}
		
		if( current_page > page_range ) {
			pre_page=((current_page-1)/page_range)*page_range;
		} else {
			pre_page = current_page - 1;
		}
		
		// ���� �������� ���� ���������� ũ��, ���� �������� ��ü ���������� Ŭ �� ��Ȱ��ȭ �ȴ�.
		next_page = current_page + 1;
		
		if(current_page < end_page) {
			next_page = pre_page + 1 + page_range;
		}
		
		start_num=(current_page-1)*page_scale+1; //�� ������ �Խù� ���۹�ȣ
		end_num=start_num+page_scale-1; //�� ������ �Խù� ����ȣ
		if(end_num>total_cnt){
			end_num=total_cnt;
		}
		
	}

	@Override
	public String toString() {
		return "RangeVO [field_name=" + field_name + ", field_value=" + field_value + ", total_cnt=" + total_cnt
				+ ", current_page=" + current_page + ", start_num=" + start_num + ", end_num=" + end_num
				+ ", total_page=" + total_page + ", page_scale=" + page_scale + ", page_range=" + page_range
				+ ", start_page=" + start_page + ", end_page=" + end_page + ", pre_page=" + pre_page + ", next_page="
				+ next_page + "]";
	}
	
	

	
}
