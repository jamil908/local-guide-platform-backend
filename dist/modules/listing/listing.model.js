"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getListingsByGuide = exports.deleteListing = exports.updateListing = exports.getListingById = exports.getAllListings = exports.createListing = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const createListing = async (listingData) => {
    return await prisma_1.default.listing.create({
        data: listingData,
        include: {
            guide: {
                select: {
                    id: true,
                    name: true,
                    profilePic: true,
                    expertise: true,
                },
            },
        },
    });
};
exports.createListing = createListing;
const getAllListings = async (filters) => {
    const where = { isActive: true };
    if (filters?.city) {
        where.city = { contains: filters.city, mode: 'insensitive' };
    }
    if (filters?.category) {
        where.category = filters.category;
    }
    if (filters?.minPrice || filters?.maxPrice) {
        where.tourFee = {
            ...(filters.minPrice && { gte: parseFloat(filters.minPrice) }),
            ...(filters.maxPrice && { lte: parseFloat(filters.maxPrice) }),
        };
    }
    return await prisma_1.default.listing.findMany({
        where,
        include: {
            guide: {
                select: {
                    id: true,
                    name: true,
                    profilePic: true,
                    expertise: true,
                    languages: true,
                },
            },
            reviews: {
                select: {
                    rating: true,
                },
            },
        },
    });
};
exports.getAllListings = getAllListings;
const getListingById = async (id) => {
    return await prisma_1.default.listing.findUnique({
        where: { id },
        include: {
            guide: {
                select: {
                    id: true,
                    name: true,
                    profilePic: true,
                    bio: true,
                    expertise: true,
                    languages: true,
                    dailyRate: true,
                },
            },
            reviews: {
                include: {
                    tourist: {
                        select: {
                            id: true,
                            name: true,
                            profilePic: true,
                        },
                    },
                },
            },
        },
    });
};
exports.getListingById = getListingById;
const updateListing = async (id, data) => {
    return await prisma_1.default.listing.update({
        where: { id },
        data,
    });
};
exports.updateListing = updateListing;
const deleteListing = async (id) => {
    return await prisma_1.default.listing.delete({
        where: { id },
    });
};
exports.deleteListing = deleteListing;
const getListingsByGuide = async (guideId) => {
    return await prisma_1.default.listing.findMany({
        where: { guideId },
        include: {
            reviews: {
                select: {
                    rating: true,
                },
            },
        },
    });
};
exports.getListingsByGuide = getListingsByGuide;
