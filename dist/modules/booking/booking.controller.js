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
exports.getAllBookings = exports.updateBookingStatus = exports.getMyBookings = exports.createBooking = void 0;
const BookingService = __importStar(require("./booking.service"));
const resoponse_1 = require("../../utils/resoponse");
const createBooking = async (req, res, next) => {
    try {
        const booking = await BookingService.createBookingService({
            ...req.body,
            touristId: req.user.id,
        });
        res.status(201).json((0, resoponse_1.successResponse)(booking, 'Booking created successfully'));
    }
    catch (error) {
        next(error);
    }
};
exports.createBooking = createBooking;
const getMyBookings = async (req, res, next) => {
    try {
        const bookings = req.user.role === 'GUIDE'
            ? await BookingService.getBookingsByGuideService(req.user.id)
            : await BookingService.getBookingsByTouristService(req.user.id);
        res.json((0, resoponse_1.successResponse)(bookings, 'Bookings fetched successfully'));
    }
    catch (error) {
        next(error);
    }
};
exports.getMyBookings = getMyBookings;
const updateBookingStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        const booking = await BookingService.updateBookingStatusService(req.params.id, status);
        res.json((0, resoponse_1.successResponse)(booking, 'Booking status updated'));
    }
    catch (error) {
        next(error);
    }
};
exports.updateBookingStatus = updateBookingStatus;
const getAllBookings = async (req, res, next) => {
    try {
        const bookings = await BookingService.getAllBookingsService();
        res.json((0, resoponse_1.successResponse)(bookings, 'All bookings fetched'));
    }
    catch (error) {
        next(error);
    }
};
exports.getAllBookings = getAllBookings;
