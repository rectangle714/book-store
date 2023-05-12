package com.collie.user.member.vo;

public class UpdatePassVO {

	private String id, new_pass;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getNew_pass() {
		return new_pass;
	}

	public void setNew_pass(String new_pass) {
		this.new_pass = new_pass;
	}

	@Override
	public String toString() {
		return "UpdatePassVO [id=" + id + ", new_pass=" + new_pass + "]";
	}

	
	
	
	
}
