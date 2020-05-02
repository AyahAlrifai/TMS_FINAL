package com.ayah.tms.beans.exception;

public class TMSException extends RuntimeException {

	private static final long serialVersionUID = 1L;
	private String errorCode;

	public TMSException(String message, String errorCode) {
		super(message);
		this.errorCode = errorCode;
	}

	public String getErrorCode() {
		return this.errorCode;
	}

}
