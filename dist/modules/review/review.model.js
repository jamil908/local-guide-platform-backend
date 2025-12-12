"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReviewsByListing = exports.createReview = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const createReview = async (reviewData) => {
    return await prisma_1.default.review.create({
        data: reviewData,
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
};
exports.createReview = createReview;
const getReviewsByListing = async (listingId) => {
    return await prisma_1.default.review.findMany({
        where: { listingId },
        include: {
            tourist: {
                select: {
                    id: true,
                    name: true,
                    profilePic: true,
                },
            },
        },
        orderBy: { createdAt: 'desc' },
    });
};
exports.getReviewsByListing = getReviewsByListing;
