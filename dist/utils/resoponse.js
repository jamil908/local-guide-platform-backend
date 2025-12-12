"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
const successResponse = (data, message = 'Success') => {
    return {
        success: true,
        message,
        data,
    };
};
exports.successResponse = successResponse;
const errorResponse = (message, statusCode = 500) => {
    return {
        success: false,
        message,
        statusCode,
    };
};
exports.errorResponse = errorResponse;
