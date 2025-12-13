// backend/src/app.ts
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler';

// Import Routes
import userRoutes from './modules/user/user.routes';
import listingRoutes from './modules/listing/listing.routes';
import bookingRoutes from './modules/booking/booking.routes';
import reviewRoutes from './modules/review/review.routes';
import paymentRoutes from './modules/payment/payment.routes';
import uploadRoutes from './modules/upload/upload.route';

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
// app.use('/api/auth', userRoutes);
app.use('/api/users', userRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/upload', uploadRoutes); // ← NEW ROUTE ADDED

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});
app.get("/", (req: Request, res: Response) => {
  res.send("Local guide  API is running 🚀");
});
// Test upload endpoint
app.get('/api/upload/test', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Upload endpoint is working',
    cloudinary: process.env.CLOUDINARY_CLOUD_NAME ? 'Configured' : 'Not configured'
  });
});

// Error handler (must be last)
app.use(errorHandler);

export default app;