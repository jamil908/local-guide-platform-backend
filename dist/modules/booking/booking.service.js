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
exports.updatePaymentStatusService = exports.getAllBookingsService = exports.getBookingsByGuideService = exports.getBookingsByTouristService = exports.updateBookingStatusService = exports.getBookingByIdService = exports.createBookingService = void 0;
const BookingModel = __importStar(require("./booking.model"));
const createBookingService = async (bookingData) => {
    return await BookingModel.createBooking(bookingData);
};
exports.createBookingService = createBookingService;
const getBookingByIdService = async (id) => {
    const booking = await BookingModel.getBookingById(id);
    if (!booking) {
        throw new Error('Booking not found');
    }
    return booking;
};
exports.getBookingByIdService = getBookingByIdService;
const updateBookingStatusService = async (id, status) => {
    return await BookingModel.updateBookingStatus(id, status);
};
exports.updateBookingStatusService = updateBookingStatusService;
const getBookingsByTouristService = async (touristId) => {
    return await BookingModel.getBookingsByTourist(touristId);
};
exports.getBookingsByTouristService = getBookingsByTouristService;
const getBookingsByGuideService = async (guideId) => {
    return await BookingModel.getBookingsByGuide(guideId);
};
exports.getBookingsByGuideService = getBookingsByGuideService;
const getAllBookingsService = async () => {
    return await BookingModel.getAllBookings();
};
exports.getAllBookingsService = getAllBookingsService;
const updatePaymentStatusService = async (id, paymentStatus, transactionId) => {
    return await BookingModel.updatePaymentStatus(id, paymentStatus, transactionId);
};
exports.updatePaymentStatusService = updatePaymentStatusService;
