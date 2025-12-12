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
exports.getListingsByGuideService = exports.deleteListingService = exports.updateListingService = exports.getListingByIdService = exports.getAllListingsService = exports.createListingService = void 0;
const ListingModel = __importStar(require("./listing.model"));
const createListingService = async (listingData) => {
    return await ListingModel.createListing(listingData);
};
exports.createListingService = createListingService;
const getAllListingsService = async (filters) => {
    const listings = await ListingModel.getAllListings(filters);
    // Calculate average rating
    return listings.map((listing) => {
        const avgRating = listing.reviews.length > 0
            ? listing.reviews.reduce((sum, r) => sum + r.rating, 0) / listing.reviews.length
            : 0;
        return {
            ...listing,
            averageRating: avgRating,
            reviewCount: listing.reviews.length,
        };
    });
};
exports.getAllListingsService = getAllListingsService;
const getListingByIdService = async (id) => {
    const listing = await ListingModel.getListingById(id);
    if (!listing) {
        throw new Error('Listing not found');
    }
    return listing;
};
exports.getListingByIdService = getListingByIdService;
const updateListingService = async (id, data) => {
    return await ListingModel.updateListing(id, data);
};
exports.updateListingService = updateListingService;
const deleteListingService = async (id) => {
    return await ListingModel.deleteListing(id);
};
exports.deleteListingService = deleteListingService;
const getListingsByGuideService = async (guideId) => {
    return await ListingModel.getListingsByGuide(guideId);
};
exports.getListingsByGuideService = getListingsByGuideService;
