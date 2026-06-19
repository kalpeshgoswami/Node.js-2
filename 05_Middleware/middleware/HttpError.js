class HttpError extends Error {
    constructor(message, statusCode) {
        super(message);
        statusCode = this.statusCode
    }

}

export default HttpError;