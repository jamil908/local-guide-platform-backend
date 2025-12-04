import { Response, NextFunction } from 'express';
import * as ReviewService from './review.service';
import { AuthRequest } from '../../middlewares/auth.middleware';
import { successResponse } from '../../utils/resoponse';

export const createReview = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const review = await ReviewService.createReviewService({
      ...req.body,
      touristId: req.user.id,
    });
    res.status(201).json(
      successResponse(review, 'Review submitted successfully')
    );
  } catch (error: any) {
    next(error);
  }
};

export const getReviewsByListing = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const reviews = await ReviewService.getReviewsByListingService(
      req.params.listingId
    );
    res.json(successResponse(reviews, 'Reviews fetched successfully'));
  } catch (error: any) {
    next(error);
  }
};