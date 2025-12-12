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
// Define a list of allowed origins
const allowedOrigins = [
    'http://localhost:3000', // Your Next.js frontend running locally
    'https://local-guide-platform-frontend.vercel.app' // Your deployed frontend (if applicable)
    // Add any other domains your frontend might use
];

const corsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        // and requests whose origin is in the allowed list.
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies to be sent (useful for authenticated sessions)
    // IMPORTANT: Allow headers needed for complex requests (like Content-Type, Authorization)
    allowedHeaders: 'Content-Type,Authorization' 
};

// --- CONFIGURATION CHANGES END ---

// Middleware
// 1. Use the configured CORS middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', userRoutes);
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
  res.send("Parcel Delivery API is running 🚀");
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