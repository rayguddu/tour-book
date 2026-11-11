// src/utils/createError.js
// Helper to create an Error with a statusCode attached
const createError = (message, statusCode) => {
    const err = new Error(message);
    err.statusCode = statusCode;
    return err;
};

module.exports = createError;