"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestRefund = exports.verifyPayment = exports.paymentIPN = exports.paymentCancel = exports.paymentFail = exports.paymentSuccess = exports.initiatePayment = void 0;
const PaymentService = __importStar(require("./payment.service"));
const resoponse_1 = require("../../utils/resoponse");
const initiatePayment = async (req, res, next) => {
    try {
        const { bookingId, amount } = req.body;
        const touristId = req.user.id;
        const payment = await PaymentService.initiateSSLCommerzPayment({
            bookingId,
            amount,
            touristId,
        });
        res.json((0, resoponse_1.successResponse)(payment, 'Payment initiated successfully'));
    }
    catch (error) {
        next(error);
    }
};
exports.initiatePayment = initiatePayment;
const paymentSuccess = async (req, res, next) => {
    try {
        const paymentData = req.body;
        const result = await PaymentService.handlePaymentSuccess(paymentData);
        // Redirect to frontend success page
        res.redirect(`${process.env.FRONTEND_URL}/payment/success?bookingId=${result.bookingId}&transactionId=${result.transactionId}`);
    }
    catch (error) {
        console.error('Payment Success Error:', error);
        res.redirect(`${process.env.FRONTEND_URL}/payment/failed`);
    }
};
exports.paymentSuccess = paymentSuccess;
const paymentFail = async (req, res, next) => {
    try {
        const paymentData = req.body;
        const result = await PaymentService.handlePaymentFail(paymentData);
        res.redirect(`${process.env.FRONTEND_URL}/payment/failed?bookingId=${result.bookingId}`);
    }
    catch (error) {
        res.redirect(`${process.env.FRONTEND_URL}/payment/failed`);
    }
};
exports.paymentFail = paymentFail;
const paymentCancel = async (req, res, next) => {
    try {
        const paymentData = req.body;
        const result = await PaymentService.handlePaymentCancel(paymentData);
        res.redirect(`${process.env.FRONTEND_URL}/payment/cancelled?bookingId=${result.bookingId}`);
    }
    catch (error) {
        res.redirect(`${process.env.FRONTEND_URL}/payment/cancelled`);
    }
};
exports.paymentCancel = paymentCancel;
const paymentIPN = async (req, res, next) => {
    try {
        // Instant Payment Notification handler
        const paymentData = req.body;
        await PaymentService.handlePaymentSuccess(paymentData);
        res.status(200).send('IPN Received');
    }
    catch (error) {
        console.error('IPN Error:', error);
        res.status(500).send('IPN Failed');
    }
};
exports.paymentIPN = paymentIPN;
const verifyPayment = async (req, res, next) => {
    try {
        const { transactionId } = req.params;
        const validation = await PaymentService.validateSSLCommerzPayment(transactionId);
        res.json((0, resoponse_1.successResponse)(validation, 'Payment verification completed'));
    }
    catch (error) {
        next(error);
    }
};
exports.verifyPayment = verifyPayment;
const requestRefund = async (req, res, next) => {
    try {
        const { bankTransactionId } = req.body;
        const refund = await PaymentService.refundPayment(bankTransactionId);
        res.json((0, resoponse_1.successResponse)(refund, 'Refund processed successfully'));
    }
    catch (error) {
        next(error);
    }
};
exports.requestRefund = requestRefund;
