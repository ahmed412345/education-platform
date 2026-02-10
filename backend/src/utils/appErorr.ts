class AppError extends Error {
	public statusCode: number;
	//if error is expected or no
	public isExpected: boolean;
	public fieldName: string;

	constructor(message: string, statusCode = 500, isExpected = true, fieldName = "") {
		super(message);
		this.statusCode = statusCode;
		this.isExpected = isExpected;
		this.fieldName = fieldName;
	}
}

export { AppError };
