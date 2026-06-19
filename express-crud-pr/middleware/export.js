class httpError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode= statusCode;
        this.name="httpError";
    }
}

export default httpError;