const RequestError = require('./request-error');

const createBadDataError = (message) => new RequestError({ message, statusCode: 400 });
const createNotFoundError = (message) => new RequestError({ message, statusCode: 404 });

const sendErrorResponse = (err) => {
    let message;
    let status = 400;

    if(typeof err === 'string') {
        message = err;
    } else if(err instanceof RequestError) {
        message = err.message;
        status = err.statusCode;
    } else if(err instanceof Error) {
        message = err.message;
    } else {
        message = 'Request handler error';
    }
}

module.exports = {
    createBadDataError,
    createNotFoundError,
    sendErrorResponse,
    RequestError
}