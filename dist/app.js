"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/app.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const errorHandler_1 = require("./middlewares/errorHandler");
// Import Routes
const user_routes_1 = __importDefault(require("./modules/user/user.routes"));
const listing_routes_1 = __importDefault(require("./modules/listing/listing.routes"));
const booking_routes_1 = __importDefault(require("./modules/booking/booking.routes"));
const review_routes_1 = __importDefault(require("./modules/review/review.routes"));
const payment_routes_1 = __importDefault(require("./modules/payment/payment.routes"));
const upload_route_1 = __importDefault(require("./modules/upload/upload.route"));
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use('/api/auth', user_routes_1.default);
app.use('/api/users', user_routes_1.default);
app.use('/api/listings', listing_routes_1.default);
app.use('/api/bookings', booking_routes_1.default);
app.use('/api/reviews', review_routes_1.default);
app.use('/api/payments', payment_routes_1.default);
app.use('/api/upload', upload_route_1.default); // ← NEW ROUTE ADDED
// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
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
app.use(errorHandler_1.errorHandler);
exports.default = app;
