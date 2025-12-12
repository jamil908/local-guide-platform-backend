"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refundPayment = exports.handlePaymentCancel = exports.handlePaymentFail = exports.handlePaymentSuccess = exports.validateSSLCommerzPayment = exports.initiateSSLCommerzPayment = void 0;
// backend/src/modules/payment/payment.service.ts
const sslcommerz_lts_1 = __importDefault(require("sslcommerz-lts"));
const prisma_1 = __importDefault(require("../../config/prisma"));
const store_id = process.env.SSLCOMMERZ_STORE_ID;
const store_passwd = process.env.SSLCOMMERZ_STORE_PASSWORD;
const is_live = process.env.SSLCOMMERZ_IS_LIVE === 'true';
const initiateSSLCommerzPayment = async (bookingData) => {
    try {
        // Get booking details
        const booking = await prisma_1.default.booking.findUnique({
            where: { id: bookingData.bookingId },
            include: {
                listing: true,
                tourist: true,
                guide: true,
            },
        });
        if (!booking) {
            throw new Error('Booking not found');
        }
        // Generate unique transaction ID
        const transactionId = `TXN_${Date.now()}_${bookingData.bookingId.slice(0, 8)}`;
        // SSLCommerz payment data
        const data = {
            total_amount: bookingData.amount,
            currency: 'BDT',
            tran_id: transactionId,
            success_url: `${process.env.BACKEND_URL}/api/payments/success`,
            fail_url: `${process.env.BACKEND_URL}/api/payments/fail`,
            cancel_url: `${process.env.BACKEND_URL}/api/payments/cancel`,
            ipn_url: `${process.env.BACKEND_URL}/api/payments/ipn`,
            shipping_method: 'NO',
            product_name: booking.listing.title,
            product_category: booking.listing.category,
            product_profile: 'tour-booking',
            // Customer info
            cus_name: booking.tourist.name,
            cus_email: booking.tourist.email,
            cus_add1: 'N/A',
            cus_city: 'N/A',
            cus_postcode: 'N/A',
            cus_country: 'Bangladesh',
            cus_phone: '01700000000',
            // Additional info
            value_a: bookingData.bookingId,
            value_b: booking.touristId,
            value_c: booking.guideId,
            value_d: booking.listingId,
        };
        // Initialize SSLCommerz
        const sslcz = new sslcommerz_lts_1.default(store_id, store_passwd, is_live);
        const apiResponse = await sslcz.init(data);
        if (apiResponse.status === 'SUCCESS') {
            // Save transaction info
            await prisma_1.default.booking.update({
                where: { id: bookingData.bookingId },
                data: {
                    transactionId: transactionId,
                    paymentStatus: 'PENDING',
                },
            });
            return {
                success: true,
                paymentUrl: apiResponse.GatewayPageURL,
                transactionId: transactionId,
            };
        }
        else {
            throw new Error('Payment initialization failed');
        }
    }
    catch (error) {
        console.error('SSLCommerz Error:', error);
        throw new Error(error.message || 'Payment initialization failed');
    }
};
exports.initiateSSLCommerzPayment = initiateSSLCommerzPayment;
const validateSSLCommerzPayment = async (transactionId) => {
    try {
        const sslcz = new sslcommerz_lts_1.default(store_id, store_passwd, is_live);
        const validation = await sslcz.validate({ val_id: transactionId });
        return validation;
    }
    catch (error) {
        console.error('Validation Error:', error);
        throw new Error('Payment validation failed');
    }
};
exports.validateSSLCommerzPayment = validateSSLCommerzPayment;
const handlePaymentSuccess = async (paymentData) => {
    try {
        const { tran_id, val_id, amount, card_type, store_amount, bank_tran_id } = paymentData;
        const bookingId = paymentData.value_a;
        // Validate payment with SSLCommerz
        const validation = await (0, exports.validateSSLCommerzPayment)(val_id);
        if (validation.status === 'VALID' || validation.status === 'VALIDATED') {
            // Update booking
            await prisma_1.default.booking.update({
                where: { id: bookingId },
                data: {
                    paymentStatus: 'COMPLETED',
                    transactionId: tran_id,
                    status: 'CONFIRMED',
                },
            });
            return {
                success: true,
                message: 'Payment successful',
                bookingId,
                transactionId: tran_id,
            };
        }
        else {
            throw new Error('Payment validation failed');
        }
    }
    catch (error) {
        console.error('Payment Success Handler Error:', error);
        throw error;
    }
};
exports.handlePaymentSuccess = handlePaymentSuccess;
const handlePaymentFail = async (paymentData) => {
    try {
        const bookingId = paymentData.value_a;
        await prisma_1.default.booking.update({
            where: { id: bookingId },
            data: {
                paymentStatus: 'FAILED',
            },
        });
        return {
            success: false,
            message: 'Payment failed',
            bookingId,
        };
    }
    catch (error) {
        console.error('Payment Fail Handler Error:', error);
        throw error;
    }
};
exports.handlePaymentFail = handlePaymentFail;
const handlePaymentCancel = async (paymentData) => {
    try {
        const bookingId = paymentData.value_a;
        await prisma_1.default.booking.update({
            where: { id: bookingId },
            data: {
                paymentStatus: 'CANCELLED',
            },
        });
        return {
            success: false,
            message: 'Payment cancelled',
            bookingId,
        };
    }
    catch (error) {
        console.error('Payment Cancel Handler Error:', error);
        throw error;
    }
};
exports.handlePaymentCancel = handlePaymentCancel;
const refundPayment = async (bankTransactionId) => {
    try {
        const sslcz = new sslcommerz_lts_1.default(store_id, store_passwd, is_live);
        const refundData = {
            bank_tran_id: bankTransactionId,
            refund_amount: 0, // Full refund
            refund_remarks: 'Tour cancellation',
        };
        const refundResponse = await sslcz.refund(refundData);
        return {
            success: true,
            refundResponse,
        };
    }
    catch (error) {
        console.error('Refund Error:', error);
        throw new Error('Refund failed');
    }
};
exports.refundPayment = refundPayment;
