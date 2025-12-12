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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyReviews = exports.deleteReview = exports.updateReview = exports.getReviewsByListing = exports.createReview = void 0;
const ReviewService = __importStar(require("./review.service"));
const resoponse_1 = require("../../utils/resoponse");
const prisma_1 = __importDefault(require("../../config/prisma"));
const createReview = async (req, res, next) => {
    try {
        const { listingId, bookingId, rating, comment } = req.body;
        const touristId = req.user.id;
        // Check if booking exists
        const booking = await prisma_1.default.booking.findUnique({
            where: { id: bookingId },
            include: { review: true },
        });
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found',
            });
        }
        // Check if booking belongs to user
        if (booking.touristId !== touristId) {
            return res.status(403).json({
                success: false,
                message: 'You can only review your own bookings',
            });
        }
        // Check if already reviewed
        if (booking.review) {
            return res.status(400).json({
                success: false,
                message: 'You have already reviewed this booking',
            });
        }
        // Create review
        const review = await ReviewService.createReviewService({
            listingId,
            bookingId,
            touristId,
            rating,
            comment,
        });
        res.status(201).json((0, resoponse_1.successResponse)(review, 'Review submitted successfully'));
    }
    catch (error) {
        next(error);
    }
};
exports.createReview = createReview;
const getReviewsByListing = async (req, res, next) => {
    try {
        const reviews = await ReviewService.getReviewsByListingService(req.params.listingId);
        res.json((0, resoponse_1.successResponse)(reviews, 'Reviews fetched successfully'));
    }
    catch (error) {
        next(error);
    }
};
exports.getReviewsByListing = getReviewsByListing;
// ✅ ADD THIS - Update Review
const updateReview = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { rating, comment } = req.body;
        // Check if review exists and belongs to user
        const review = await prisma_1.default.review.findUnique({
            where: { id },
        });
        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found',
            });
        }
        if (review.touristId !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'You can only update your own reviews',
            });
        }
        // Update review
        const updatedReview = await prisma_1.default.review.update({
            where: { id },
            data: { rating, comment },
            include: {
                tourist: {
                    select: {
                        id: true,
                        name: true,
                        profilePic: true,
                    },
                },
            },
        });
        res.json((0, resoponse_1.successResponse)(updatedReview, 'Review updated successfully'));
    }
    catch (error) {
        next(error);
    }
};
exports.updateReview = updateReview;
// ✅ ADD THIS - Delete Review
const deleteReview = async (req, res, next) => {
    try {
        const { id } = req.params;
        // Check if review exists and belongs to user
        const review = await prisma_1.default.review.findUnique({
            where: { id },
        });
        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found',
            });
        }
        if (review.touristId !== req.user.id && req.user.role !== 'ADMIN') {
            return res.status(403).json({
                success: false,
                message: 'You can only delete your own reviews',
            });
        }
        // Delete review
        await prisma_1.default.review.delete({
            where: { id },
        });
        res.json((0, resoponse_1.successResponse)(null, 'Review deleted successfully'));
    }
    catch (error) {
        next(error);
    }
};
exports.deleteReview = deleteReview;
// ✅ ADD THIS - Get My Reviews
const getMyReviews = async (req, res, next) => {
    try {
        const reviews = await prisma_1.default.review.findMany({
            where: { touristId: req.user.id },
            include: {
                listing: {
                    select: {
                        id: true,
                        title: true,
                        images: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
        res.json((0, resoponse_1.successResponse)(reviews, 'Your reviews fetched successfully'));
    }
    catch (error) {
        next(error);
    }
};
exports.getMyReviews = getMyReviews;
