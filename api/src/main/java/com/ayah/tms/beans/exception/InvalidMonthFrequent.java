package com.ayah.tms.beans.exception;

public class InvalidMonthFrequent extends TMSException {
	private static final long serialVersionUID = 1L;

	public InvalidMonthFrequent(String message) {
		super(message, "TMS:8");
	}
}

