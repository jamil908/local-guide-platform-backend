import { Response, NextFunction } from 'express';
import * as ListingService from './listing.service';
import { AuthRequest } from '../../middlewares/auth.middleware';
import { successResponse } from '../../utils/resoponse';

export const createListing = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const listing = await ListingService.createListingService({
      ...req.body,
      guideId: req.user.id,
    });
    res.status(201).json(
      successResponse(listing, 'Listing created successfully')
    );
  } catch (error: any) {
    next(error);
  }
};

export const getAllListings = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const listings = await ListingService.getAllListingsService(req.query);
    res.json(successResponse(listings, 'Listings fetched successfully'));
  } catch (error: any) {
    next(error);
  }
};

export const getListingById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const listing = await ListingService.getListingByIdService(req.params.id);
    res.json(successResponse(listing, 'Listing fetched successfully'));
  } catch (error: any) {
    next(error);
  }
};

export const updateListing = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const listing = await ListingService.updateListingService(
      req.params.id,
      req.body
    );
    res.json(successResponse(listing, 'Listing updated successfully'));
  } catch (error: any) {
    next(error);
  }
};

export const deleteListing = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    await ListingService.deleteListingService(req.params.id);
    res.json(successResponse(null, 'Listing deleted successfully'));
  } catch (error: any) {
    next(error);
  }
};

export const getMyListings = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const listings = await ListingService.getListingsByGuideService(req.user.id);
    res.json(successResponse(listings, 'Your listings fetched successfully'));
  } catch (error: any) {
    next(error);
  }
};