class HttpClientError extends Error {
    statusCode;
    constructor(statusCode , error){
        super(error);
        this.statusCode = statusCode;
    }
}

module.exports.HttpClientError = HttpClientError;