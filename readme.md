🗺️ LocalGuide Platform - Backend API
RESTful API for LocalGuide Platform built with Node.js, Express.js, and Prisma ORM.
🔗 Live API
Base URL: https://your-backend-api.railway.app/api
API Documentation: Available at /health endpoint
🛠️ Technology Stack

Runtime: Node.js v18+
Framework: Express.js
Database: PostgreSQL
ORM: Prisma
Authentication: JWT (JSON Web Tokens)
File Upload: Cloudinary
Payment: SSLCommerz
Language: TypeScript

📁 Project Structure
backend/
├── src/
│   ├── config/
│   │   ├── prisma.ts          # Prisma client configuration
│   │   ├── cloudinary.ts      # Cloudinary setup
│   │   └── multer.ts          # File upload configuration
│   ├── modules/
│   │   ├── user/              # User management
│   │   │   ├── user.model.ts
│   │   │   ├── user.service.ts
│   │   │   ├── user.controller.ts
│   │   │   └── user.routes.ts
│   │   ├── listing/           # Tour listings
│   │   ├── booking/           # Booking management
│   │   ├── review/            # Review system
│   │   ├── payment/           # Payment integration
│   │   └── upload/            # File upload
│   ├── middlewares/
│   │   ├── auth.middleware.ts # JWT authentication
│   │   └── errorHandler.ts   # Global error handler
│   ├── utils/
│   │   ├── jwt.ts             # JWT utilities
│   │   ├── bcrypt.ts          # Password hashing
│   │   └── response.ts        # Response formatter
│   ├── app.ts                 # Express app setup
│   └── server.ts              # Server entry point
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Database migrations
├── .env.example               # Environment variables template
├── package.json
└── README.md
🚀 Getting Started
Prerequisites

Node.js (v18 or higher)
PostgreSQL (v14 or higher)
npm or yarn

Installation

Clone the repository

bashgit clone https://github.com/yourusername/localguide-backend.git
cd localguide-backend

Install dependencies

bashnpm install

Environment Setup

Create a .env file in the root directory:
env# Server Configuration
PORT=5000
NODE_ENV=development

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/localguide?schema=public"

# JWT
JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long
JWT_EXPIRES_IN=7d

# Cloudinary (Image Upload)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# SSLCommerz (Payment Gateway)
SSLCOMMERZ_STORE_ID=testbox
SSLCOMMERZ_STORE_PASSWORD=qwerty
SSLCOMMERZ_IS_LIVE=false

# URLs
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:5000

Database Setup

Run Prisma migrations:
bashnpx prisma migrate dev --name init
npx prisma generate

Seed Database (Optional)

Create admin and test accounts:
bashnpx prisma db seed

Start Development Server

bashnpm run dev
Server will start at http://localhost:5000
📋 API Endpoints
Authentication
MethodEndpointDescriptionPOST/api/auth/registerRegister new userPOST/api/auth/loginLogin user
Users
MethodEndpointDescriptionAuthGET/api/users/:idGet user profile✅PATCH/api/users/:idUpdate profile✅GET/api/usersGet all users (Admin)✅ AdminDELETE/api/users/:idDelete user (Admin)✅ Admin
Listings (Tours)
MethodEndpointDescriptionAuthGET/api/listingsGet all listings❌GET/api/listings/:idGet listing details❌POST/api/listingsCreate listing✅ GuidePATCH/api/listings/:idUpdate listing✅ GuideDELETE/api/listings/:idDelete listing✅ Guide
Bookings
MethodEndpointDescriptionAuthPOST/api/bookingsCreate booking✅ TouristGET/api/bookings/my-bookingsGet my bookings✅PATCH/api/bookings/:idUpdate booking status✅ GuideGET/api/bookingsGet all bookings✅ Admin
Reviews
MethodEndpointDescriptionAuthPOST/api/reviewsCreate review✅ TouristGET/api/reviews/listing/:idGet listing reviews❌PATCH/api/reviews/:idUpdate review✅ TouristDELETE/api/reviews/:idDelete review✅ Tourist
File Upload
MethodEndpointDescriptionAuthPOST/api/upload/singleUpload single image✅POST/api/upload/multipleUpload multiple images✅
Payments
MethodEndpointDescriptionAuthPOST/api/payments/initiateInitiate payment✅ TouristPOST/api/payments/successPayment callback❌POST/api/payments/failPayment callback❌
🔐 Authentication
The API uses JWT (JSON Web Tokens) for authentication.
Include token in requests:
Authorization: Bearer YOUR_JWT_TOKEN
Token is returned on:

Registration: /api/auth/register
Login: /api/auth/login

🗄️ Database Schema
prismaUser (id, email, password, name, role, profilePic, bio, languages, expertise, dailyRate)
Listing (id, title, description, tourFee, duration, city, category, images, guideId)
Booking (id, bookingDate, status, totalAmount, touristId, guideId, listingId)
Review (id, rating, comment, touristId, listingId, bookingId)
🧪 Testing
Using Postman

Import the Postman collection (if provided)
Set base URL: http://localhost:5000/api
Register/Login to get JWT token
Add token to Authorization header

Test Accounts
Admin:
Email: admin@localguide.com
Password: admin123

Guide:
Email: guide@test.com
Password: guide123

Tourist:
Email: tourist@test.com
Password: tourist123
🚀 Deployment
Railway Deployment

Install Railway CLI:

bashnpm install -g railway

Login and deploy:

bashrailway login
railway init
railway up

Add environment variables in Railway dashboard
Add PostgreSQL plugin
Run migrations:

bashrailway run npx prisma migrate deploy
Render Deployment

Connect GitHub repository
Select Node.js environment
Build command: npm install && npx prisma generate
Start command: npm start
Add environment variables
Add PostgreSQL database

📝 Scripts
bashnpm run dev          # Start development server
npm run build        # Build TypeScript
npm start            # Start production server
npx prisma studio    # Open Prisma Studio
npx prisma migrate dev  # Run migrations
npx prisma generate  # Generate Prisma Client
🐛 Common Issues
Issue: Prisma Client not generated
bashnpx prisma generate
Issue: Database connection failed

Check DATABASE_URL in .env
Ensure PostgreSQL is running

Issue: JWT token expired

Token expires after 7 days
Login again to get new token

📧 Contact
Developer: Your Name
Email: your.email@example.com
GitHub: github.com/yourusername
📄 License
MIT License - feel free to use for learning purposes.