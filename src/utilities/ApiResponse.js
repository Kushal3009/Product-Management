
export class ApiResponse {
    constructor(status = 200, data = null, message = "Success") {
        this.status = status;
        this.message = message;
        this.data = data;
        this.error = null;
    }
}
