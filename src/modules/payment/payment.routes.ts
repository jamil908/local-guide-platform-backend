import { Router } from 'express';
import * as PaymentController from './payment.controller';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();

router.post('/initiate', authenticate, PaymentController.initiatePayment);
router.get('/verify/:transactionId', authenticate, PaymentController.verifyPayment);

export default router;