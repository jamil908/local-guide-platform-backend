export const initiatePayment = async (bookingData: any) => {
  // Simulate payment gateway
  const paymentUrl = `https://payment-gateway.example.com/pay?amount=${bookingData.totalAmount}&ref=${bookingData.bookingId}`;
  
  return {
    paymentUrl,
    transactionId: `TXN_${Date.now()}`,
  };
};

export const verifyPayment = async (transactionId: string) => {
  // Simulate payment verification
  return {
    success: true,
    transactionId,
    status: 'COMPLETED',
  };
};