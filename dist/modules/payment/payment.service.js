"use strict";
// // backend/src/modules/payment/payment.service.ts
// import SSLCommerzPayment from 'sslcommerz-lts';
// import prisma from '../../config/prisma';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refundPayment = exports.handlePaymentCancel = exports.handlePaymentFail = exports.handlePaymentSuccess = exports.validateSSLCommerzPayment = exports.initiateSSLCommerzPayment = void 0;
// const store_id = process.env.SSLCOMMERZ_STORE_ID!;
// const store_passwd = process.env.SSLCOMMERZ_STORE_PASSWORD!;
// const is_live = process.env.SSLCOMMERZ_IS_LIVE !;
// export const initiateSSLCommerzPayment = async (bookingData: {
//   bookingId: string;
//   amount: number;
//   touristId: string;
// }) => {
//   try {
//     // Get booking details
//     const booking = await prisma.booking.findUnique({
//       where: { id: bookingData.bookingId },
//       include: {
//         listing: true,
//         tourist: true,
//         guide: true,
//       },
//     });
//     if (!booking) {
//       throw new Error('Booking not found');
//     }
//     // Generate unique transaction ID
//     const transactionId = `TXN_${Date.now()}_${bookingData.bookingId.slice(0, 8)}`;
//     // SSLCommerz payment data
//     const data = {
//       total_amount: bookingData.amount,
//       currency: 'BDT',
//       tran_id: transactionId,
//       success_url: `${process.env.BACKEND_URL}/api/payments/success`,
//       fail_url: `${process.env.BACKEND_URL}/api/payments/fail`,
//       cancel_url: `${process.env.BACKEND_URL}/api/payments/cancel`,
//       ipn_url: `${process.env.BACKEND_URL}/api/payments/ipn`,
//       shipping_method: 'NO',
//       product_name: booking.listing.title,
//       product_category: booking.listing.category,
//       product_profile: 'tour-booking',
//       // Customer info
//       cus_name: booking.tourist.name,
//       cus_email: booking.tourist.email,
//       cus_add1: 'N/A',
//       cus_city: 'N/A',
//       cus_postcode: 'N/A',
//       cus_country: 'Bangladesh',
//       cus_phone: '01700000000',
//       // Additional info
//       value_a: bookingData.bookingId,
//       value_b: booking.touristId,
//       value_c: booking.guideId,
//       value_d: booking.listingId,
//     };
//     // Initialize SSLCommerz
//     const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
//     const apiResponse = await sslcz.init(data);
//     if (apiResponse.status === 'SUCCESS') {
//       // Save transaction info
//       await prisma.booking.update({
//         where: { id: bookingData.bookingId },
//         data: {
//           transactionId: transactionId,
//           paymentStatus: 'PENDING',
//         },
//       });
//       return {
//         success: true,
//         paymentUrl: apiResponse.GatewayPageURL,
//         transactionId: transactionId,
//       };
//     } else {
//       console.log('Payment Data:', data);
//       const apiResponse = await sslcz.init(data);
// console.log('SSLCommerz Full Response:', apiResponse);
//       throw new Error('Payment initialization failed');
//     }
//   } catch (error: any) {
//     console.error('SSLCommerz Error:', error);
//     throw new Error(error.message || 'Payment initialization failed');
//   }
// };
// export const validateSSLCommerzPayment = async (transactionId: string) => {
//   try {
//     const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
//     const validation = await sslcz.validate({ val_id: transactionId });
//     return validation;
//   } catch (error) {
//     console.error('Validation Error:', error);
//     throw new Error('Payment validation failed');
//   }
// };
// export const handlePaymentSuccess = async (paymentData: any) => {
//   try {
//     const { tran_id, val_id, amount, card_type, store_amount, bank_tran_id } = paymentData;
//     const bookingId = paymentData.value_a;
//     // Validate payment with SSLCommerz
//     const validation = await validateSSLCommerzPayment(val_id);
//     if (validation.status === 'VALID' || validation.status === 'VALIDATED') {
//       // Update booking
//       await prisma.booking.update({
//         where: { id: bookingId },
//         data: {
//           paymentStatus: 'COMPLETED',
//           transactionId: tran_id,
//           status: 'CONFIRMED',
//         },
//       });
//       return {
//         success: true,
//         message: 'Payment successful',
//         bookingId,
//         transactionId: tran_id,
//       };
//     } else {
//       throw new Error('Payment validation failed');
//     }
//   } catch (error: any) {
//     console.error('Payment Success Handler Error:', error);
//     throw error;
//   }
// };
// export const handlePaymentFail = async (paymentData: any) => {
//   try {
//     const bookingId = paymentData.value_a;
//     await prisma.booking.update({
//       where: { id: bookingId },
//       data: {
//         paymentStatus: 'FAILED',
//       },
//     });
//     return {
//       success: false,
//       message: 'Payment failed',
//       bookingId,
//     };
//   } catch (error) {
//     console.error('Payment Fail Handler Error:', error);
//     throw error;
//   }
// };
// export const handlePaymentCancel = async (paymentData: any) => {
//   try {
//     const bookingId = paymentData.value_a;
//     await prisma.booking.update({
//       where: { id: bookingId },
//       data: {
//         paymentStatus: 'CANCELLED',
//       },
//     });
//     return {
//       success: false,
//       message: 'Payment cancelled',
//       bookingId,
//     };
//   } catch (error) {
//     console.error('Payment Cancel Handler Error:', error);
//     throw error;
//   }
// };
// export const refundPayment = async (bankTransactionId: string) => {
//   try {
//     const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
//     const refundData = {
//       bank_tran_id: bankTransactionId,
//       refund_amount: 0, // Full refund
//       refund_remarks: 'Tour cancellation',
//     };
//     const refundResponse = await sslcz.refund(refundData);
//     return {
//       success: true,
//       refundResponse,
//     };
//   } catch (error) {
//     console.error('Refund Error:', error);
//     throw new Error('Refund failed');
//   }
// };
// backend/src/modules/payment/payment.service.ts
const sslcommerz_lts_1 = __importDefault(require("sslcommerz-lts"));
const prisma_1 = __importDefault(require("../../config/prisma"));
const store_id = process.env.SSLCOMMERZ_STORE_ID;
const store_passwd = process.env.SSLCOMMERZ_STORE_PASSWORD;
const is_live = process.env.SSLCOMMERZ_IS_LIVE === 'true';
// SSLCommerz API endpoints
const SANDBOX_API_V3 = 'https://sandbox.sslcommerz.com/gwprocess/v3/api.php';
const SANDBOX_API_V4 = 'https://sandbox.sslcommerz.com/gwprocess/v4/api.php';
const initiateSSLCommerzPayment = async (bookingData) => {
    try {
        // Validate environment variables
        if (!store_id || !store_passwd) {
            throw new Error('SSLCommerz credentials not configured');
        }
        console.log('SSLCommerz Config:', { store_id, is_live });
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
        // Verify the tourist making payment is the booking owner
        if (booking.touristId !== bookingData.touristId) {
            throw new Error('Unauthorized: You can only pay for your own bookings');
        }
        // Generate unique transaction ID
        const transactionId = `TXN_${Date.now()}_${bookingData.bookingId.slice(0, 8)}`;
        // SSLCommerz payment data with ALL required fields properly formatted
        const data = {
            total_amount: parseFloat(bookingData.amount.toString()),
            currency: 'BDT',
            tran_id: transactionId,
            success_url: `${process.env.BACKEND_URL}/api/payments/success`,
            fail_url: `${process.env.BACKEND_URL}/api/payments/fail`,
            cancel_url: `${process.env.BACKEND_URL}/api/payments/cancel`,
            ipn_url: `${process.env.BACKEND_URL}/api/payments/ipn`,
            shipping_method: 'NO',
            product_name: booking.listing.title.substring(0, 50),
            product_category: booking.listing.category,
            product_profile: 'general',
            // Customer info - REQUIRED fields
            cus_name: booking.tourist.name || 'Guest',
            cus_email: booking.tourist.email,
            cus_add1: 'Dhaka',
            cus_city: 'Dhaka',
            cus_postcode: '1000',
            cus_country: 'Bangladesh',
            cus_phone: '01700000000',
            // Shipping info
            ship_name: booking.tourist.name || 'Guest',
            ship_add1: 'Dhaka',
            ship_city: 'Dhaka',
            ship_postcode: '1000',
            ship_country: 'Bangladesh',
            // Additional info
            value_a: bookingData.bookingId,
            value_b: booking.touristId,
            value_c: booking.guideId,
            value_d: booking.listingId,
        };
        console.log('Initiating SSLCommerz payment with data:', {
            ...data,
            store_id,
            is_live,
        });
        // Initialize SSLCommerz
        const sslcz = new sslcommerz_lts_1.default(store_id, store_passwd, is_live);
        // For newly registered sandbox accounts, SSLCommerz uses v3 API
        // Override the default v4 endpoint if in sandbox mode
        if (!is_live) {
            sslcz.sslc_submit_url = SANDBOX_API_V3;
            console.log('Using SSLCommerz v3 API for sandbox:', SANDBOX_API_V3);
        }
        let apiResponse;
        try {
            apiResponse = await sslcz.init(data);
            console.log('SSLCommerz API Response:', JSON.stringify(apiResponse, null, 2));
        }
        catch (initError) {
            console.error('SSLCommerz Init Error:', {
                message: initError.message,
                type: initError.type,
                response: initError.response,
            });
            // If v3 fails, try v4 as fallback
            if (initError.type === 'invalid-json' && !is_live) {
                console.log('Retrying with v4 API...');
                sslcz.sslc_submit_url = SANDBOX_API_V4;
                try {
                    apiResponse = await sslcz.init(data);
                    console.log('SSLCommerz v4 API Response:', JSON.stringify(apiResponse, null, 2));
                }
                catch (v4Error) {
                    console.error('Both v3 and v4 failed');
                    throw new Error('SSLCommerz API error. Please verify your credentials at https://sandbox.sslcommerz.com/manage/');
                }
            }
            else {
                throw initError;
            }
        }
        if (apiResponse?.status === 'SUCCESS') {
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
            console.error('Payment initialization failed:', apiResponse);
            const errorMsg = apiResponse?.failedreason || apiResponse?.status || 'Payment initialization failed';
            throw new Error(errorMsg);
        }
    }
    catch (error) {
        console.error('SSLCommerz Error Details:', {
            message: error.message,
            stack: error.stack,
            response: error.response?.data
        });
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
        if (!bookingId) {
            throw new Error('Booking ID not found in payment data');
        }
        console.log('Processing payment success for booking:', bookingId);
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
            console.log('Payment successful for booking:', bookingId);
            return {
                success: true,
                message: 'Payment successful',
                bookingId,
                transactionId: tran_id,
            };
        }
        else {
            throw new Error(`Payment validation failed with status: ${validation.status}`);
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
        if (bookingId) {
            await prisma_1.default.booking.update({
                where: { id: bookingId },
                data: {
                    paymentStatus: 'FAILED',
                },
            });
        }
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
        if (bookingId) {
            await prisma_1.default.booking.update({
                where: { id: bookingId },
                data: {
                    paymentStatus: 'CANCELLED',
                },
            });
        }
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
        if (!bankTransactionId) {
            throw new Error('Bank transaction ID is required for refund');
        }
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
        throw new Error(error.message || 'Refund failed');
    }
};
exports.refundPayment = refundPayment;
