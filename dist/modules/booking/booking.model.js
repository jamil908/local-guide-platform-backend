"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePaymentStatus = exports.getAllBookings = exports.getBookingsByGuide = exports.getBookingsByTourist = exports.updateBookingStatus = exports.getBookingById = exports.createBooking = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const createBooking = async (bookingData) => {
    return await prisma_1.default.booking.create({
        data: {
            ...bookingData,
            bookingDate: new Date(bookingData.bookingDate).toISOString(),
        },
        include: {
            listing: true,
            tourist: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    profilePic: true,
                },
            },
            guide: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    profilePic: true,
                },
            },
        },
    });
};
exports.createBooking = createBooking;
const getBookingById = async (id) => {
    return await prisma_1.default.booking.findUnique({
        where: { id },
        include: {
            listing: true,
            tourist: true,
            guide: true,
        },
    });
};
exports.getBookingById = getBookingById;
const updateBookingStatus = async (id, status) => {
    return await prisma_1.default.booking.update({
        where: { id },
        data: { status },
    });
};
exports.updateBookingStatus = updateBookingStatus;
const getBookingsByTourist = async (touristId) => {
    return await prisma_1.default.booking.findMany({
        where: { touristId },
        include: {
            listing: {
                include: {
                    guide: {
                        select: {
                            id: true,
                            name: true,
                            profilePic: true,
                        },
                    },
                },
            },
            review: true,
        },
        orderBy: { createdAt: 'desc' },
    });
};
exports.getBookingsByTourist = getBookingsByTourist;
const getBookingsByGuide = async (guideId) => {
    return await prisma_1.default.booking.findMany({
        where: { guideId },
        include: {
            listing: true,
            tourist: {
                select: {
                    id: true,
                    name: true,
                    profilePic: true,
                },
            },
            review: true,
        },
        orderBy: { createdAt: 'desc' },
    });
};
exports.getBookingsByGuide = getBookingsByGuide;
const getAllBookings = async () => {
    return await prisma_1.default.booking.findMany({
        include: {
            listing: true,
            tourist: true,
            guide: true,
        },
        orderBy: { createdAt: 'desc' },
    });
};
exports.getAllBookings = getAllBookings;
const updatePaymentStatus = async (id, paymentStatus, transactionId) => {
    return await prisma_1.default.booking.update({
        where: { id },
        data: {
            paymentStatus,
            transactionId,
        },
    });
};
exports.updatePaymentStatus = updatePaymentStatus;
