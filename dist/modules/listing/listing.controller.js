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
exports.getMyListings = exports.deleteListing = exports.updateListing = exports.getListingById = exports.getAllListings = exports.createListing = void 0;
const ListingService = __importStar(require("./listing.service"));
const resoponse_1 = require("../../utils/resoponse");
const createListing = async (req, res, next) => {
    try {
        const listing = await ListingService.createListingService({
            ...req.body,
            guideId: req.user.id,
        });
        res.status(201).json((0, resoponse_1.successResponse)(listing, 'Listing created successfully'));
    }
    catch (error) {
        next(error);
    }
};
exports.createListing = createListing;
const getAllListings = async (req, res, next) => {
    try {
        const listings = await ListingService.getAllListingsService(req.query);
        res.json((0, resoponse_1.successResponse)(listings, 'Listings fetched successfully'));
    }
    catch (error) {
        next(error);
    }
};
exports.getAllListings = getAllListings;
const getListingById = async (req, res, next) => {
    try {
        const listing = await ListingService.getListingByIdService(req.params.id);
        res.json((0, resoponse_1.successResponse)(listing, 'Listing fetched successfully'));
    }
    catch (error) {
        next(error);
    }
};
exports.getListingById = getListingById;
const updateListing = async (req, res, next) => {
    try {
        // Check if user is guide or admin
        const listing = await ListingService.getListingByIdService(req.params.id);
        if (!listing) {
            return res.status(404).json({
                success: false,
                message: 'Listing not found',
            });
        }
        // Check ownership (guides can only edit their own listings)
        if (req.user.role === 'GUIDE' && listing.guideId !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'You can only edit your own listings',
            });
        }
        const updatedListing = await ListingService.updateListingService(req.params.id, req.body);
        res.json((0, resoponse_1.successResponse)(updatedListing, 'Listing updated successfully'));
    }
    catch (error) {
        next(error);
    }
};
exports.updateListing = updateListing;
const deleteListing = async (req, res, next) => {
    try {
        await ListingService.deleteListingService(req.params.id);
        res.json((0, resoponse_1.successResponse)(null, 'Listing deleted successfully'));
    }
    catch (error) {
        next(error);
    }
};
exports.deleteListing = deleteListing;
const getMyListings = async (req, res, next) => {
    try {
        const listings = await ListingService.getListingsByGuideService(req.user.id);
        res.json((0, resoponse_1.successResponse)(listings, 'Your listings fetched successfully'));
    }
    catch (error) {
        next(error);
    }
};
exports.getMyListings = getMyListings;
