import * as BookingModel from './booking.model';
import { BookingStatus } from '@prisma/client';

export const createBookingService = async (bookingData: any) => {
  return await BookingModel.createBooking(bookingData);
};

export const getBookingByIdService = async (id: string) => {
  const booking = await BookingModel.getBookingById(id);
  if (!booking) {
    throw new Error('Booking not found');
  }
  return booking;
};

export const updateBookingStatusService = async (
  id: string,
  status: BookingStatus
) => {
  return await BookingModel.updateBookingStatus(id, status);
};

export const getBookingsByTouristService = async (touristId: string) => {
  return await BookingModel.getBookingsByTourist(touristId);
};

export const getBookingsByGuideService = async (guideId: string) => {
  return await BookingModel.getBookingsByGuide(guideId);
};

export const getAllBookingsService = async () => {
  return await BookingModel.getAllBookings();
};

export const updatePaymentStatusService = async (
  id: string,
  paymentStatus: string,
  transactionId: string
) => {
  return await BookingModel.updatePaymentStatus(
    id,
    paymentStatus,
    transactionId
  );
};