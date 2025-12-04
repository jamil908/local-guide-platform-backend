import { Response, NextFunction } from 'express';
import * as PaymentService from './payment.service';
import { AuthRequest } from '../../middlewares/auth.middleware';
import { successResponse } from '../../utils/resoponse';

export const initiatePayment = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const payment = await PaymentService.initiatePayment(req.body);
    res.json(successResponse(payment, 'Payment initiated'));
  } catch (error: any) {
    next(error);
  }
};

export const verifyPayment = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await PaymentService.verifyPayment(req.params.transactionId);
    res.json(successResponse(result, 'Payment verified'));
  } catch (error: any) {
    next(error);
  }
};