// // backend/src/modules/payment/payment.service.ts
// import SSLCommerzPayment from 'sslcommerz-lts';
// import prisma from '../../config/prisma';

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
import prisma from '../../config/prisma';

const store_id = process.env.SSLCOMMERZ_STORE_ID!;
const store_passwd = process.env.SSLCOMMERZ_STORE_PASSWORD!;
const is_live = process.env.SSLCOMMERZ_IS_LIVE === 'true';

// Use v3 API as specified in your registration email
const API_URL = is_live 
  ? 'https://securepay.sslcommerz.com/gwprocess/v3/api.php'
  : 'https://sandbox.sslcommerz.com/gwprocess/v3/api.php';

const VALIDATION_URL = is_live
  ? 'https://securepay.sslcommerz.com/validator/api/validationserverAPI.php'
  : 'https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php';

export const initiateSSLCommerzPayment = async (bookingData: {
  bookingId: string;
  amount: number;
  touristId: string;
}) => {
  try {
    // Validate environment variables
    if (!store_id || !store_passwd) {
      throw new Error('SSLCommerz credentials not configured');
    }

    console.log('SSLCommerz Config:', { store_id, is_live, api_url: API_URL });

    // Get booking details
    const booking = await prisma.booking.findUnique({
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

    // Prepare form data for SSLCommerz
    const formData = new URLSearchParams({
      store_id: store_id,
      store_passwd: store_passwd,
      total_amount: bookingData.amount.toString(),
      currency: 'BDT',
      tran_id: transactionId,
      success_url: `${process.env.BACKEND_URL}/api/payments/success`,
      fail_url: `${process.env.BACKEND_URL}/api/payments/fail`,
      cancel_url: `${process.env.BACKEND_URL}/api/payments/cancel`,
      ipn_url: `${process.env.BACKEND_URL}/api/payments/ipn`,
      
      // Product info
      product_name: booking.listing.title.substring(0, 50),
      product_category: booking.listing.category,
      product_profile: 'general',
      
      // Customer info
      cus_name: booking.tourist.name || 'Guest',
      cus_email: booking.tourist.email,
      cus_add1: 'Dhaka',
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: '1000',
      cus_country: 'Bangladesh',
      cus_phone: '01700000000',
      cus_fax: '01700000000',
      
      // Shipping info
      ship_name: booking.tourist.name || 'Guest',
      ship_add1: 'Dhaka',
      ship_city: 'Dhaka',
      ship_state: 'Dhaka',
      ship_postcode: '1000',
      ship_country: 'Bangladesh',
      
      shipping_method: 'NO',
      num_of_item: '1',
      
      // Additional data
      value_a: bookingData.bookingId,
      value_b: booking.touristId,
      value_c: booking.guideId,
      value_d: booking.listingId,
    });

    console.log('Sending request to SSLCommerz:', API_URL);
    console.log('Transaction ID:', transactionId);

    // Make request to SSLCommerz
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    const responseText = await response.text();
    console.log('Raw SSLCommerz Response:', responseText.substring(0, 500));

    let apiResponse;
    try {
      apiResponse = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse SSLCommerz response:', responseText.substring(0, 200));
      throw new Error('SSLCommerz returned invalid response. Please check your credentials.');
    }

    console.log('Parsed SSLCommerz Response:', apiResponse);

    if (apiResponse.status === 'SUCCESS') {
      // Save transaction info
      await prisma.booking.update({
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
    } else {
      console.error('Payment initialization failed:', apiResponse);
      const errorMsg = apiResponse.failedreason || 'Payment initialization failed';
      throw new Error(errorMsg);
    }
  } catch (error: any) {
    console.error('SSLCommerz Error Details:', {
      message: error.message,
      stack: error.stack,
    });
    throw new Error(error.message || 'Payment initialization failed');
  }
};

export const validateSSLCommerzPayment = async (val_id: string) => {
  try {
    const formData = new URLSearchParams({
      val_id: val_id,
      store_id: store_id,
      store_passwd: store_passwd,
      format: 'json',
    });

    const response = await fetch(VALIDATION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    const validation = await response.json();
    return validation;
  } catch (error: any) {
    console.error('Validation Error:', error);
    throw new Error('Payment validation failed');
  }
};

export const handlePaymentSuccess = async (paymentData: any) => {
  try {
    const { tran_id, val_id, amount, card_type, store_amount, bank_tran_id } = paymentData;
    const bookingId = paymentData.value_a;

    if (!bookingId) {
      throw new Error('Booking ID not found in payment data');
    }

    console.log('Processing payment success for booking:', bookingId);

    // Validate payment with SSLCommerz
    const validation = await validateSSLCommerzPayment(val_id);

    if (validation.status === 'VALID' || validation.status === 'VALIDATED') {
      // Update booking
      await prisma.booking.update({
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
    } else {
      throw new Error(`Payment validation failed with status: ${validation.status}`);
    }
  } catch (error: any) {
    console.error('Payment Success Handler Error:', error);
    throw error;
  }
};

export const handlePaymentFail = async (paymentData: any) => {
  try {
    const bookingId = paymentData.value_a;

    if (bookingId) {
      await prisma.booking.update({
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
  } catch (error: any) {
    console.error('Payment Fail Handler Error:', error);
    throw error;
  }
};

export const handlePaymentCancel = async (paymentData: any) => {
  try {
    const bookingId = paymentData.value_a;

    if (bookingId) {
      await prisma.booking.update({
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
  } catch (error: any) {
    console.error('Payment Cancel Handler Error:', error);
    throw error;
  }
};

export const refundPayment = async (bankTransactionId: string) => {
  try {
    if (!bankTransactionId) {
      throw new Error('Bank transaction ID is required for refund');
    }

    const refundUrl = is_live
      ? 'https://securepay.sslcommerz.com/validator/api/merchantTransIDvalidationAPI.php'
      : 'https://sandbox.sslcommerz.com/validator/api/merchantTransIDvalidationAPI.php';

    const formData = new URLSearchParams({
      refund_amount: '0', // Full refund
      refund_remarks: 'Tour cancellation',
      bank_tran_id: bankTransactionId,
      store_id: store_id,
      store_passwd: store_passwd,
    });

    const response = await fetch(refundUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    const refundResponse = await response.json();

    return {
      success: true,
      refundResponse,
    };
  } catch (error: any) {
    console.error('Refund Error:', error);
    throw new Error(error.message || 'Refund failed');
  }
};