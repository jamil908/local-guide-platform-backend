import { Router } from 'express';
import * as ReviewController from './review.controller';
import { authenticate, authorize } from '../../middlewares/auth.middleware';

const router = Router();

router.post(
  '/',
  authenticate,
  authorize('TOURIST'),
  ReviewController.createReview
);

router.get('/listing/:listingId', ReviewController.getReviewsByListing);

export default router;