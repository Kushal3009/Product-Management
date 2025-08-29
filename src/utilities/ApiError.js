
export class ApiError extends Error {
    constructor(status = 500, message = "Internal Server Error", error = null) {
        super(message);
        this.statusCode = status;
        this.name = "AppError";
        if (error) {
            this.originalError = error;
        }
        Error.captureStackTrace(this, this.constructor);
    }
}
