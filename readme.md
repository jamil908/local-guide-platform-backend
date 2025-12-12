# 🗺️ LocalGuide Platform - Backend API

RESTful API for the LocalGuide Platform built with Node.js, Express, Prisma, and PostgreSQL.

## 🚀 Live API
**Production:** https://your-backend.onrender.com
**Health Check:** https://your-backend.onrender.com/health

## 🛠️ Tech Stack
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Database:** PostgreSQL (Prisma ORM)
- **Authentication:** JWT
- **File Upload:** Cloudinary
- **Payment:** SSLCommerz
- **Language:** TypeScript

## 📦 Installation

### Prerequisites
- Node.js 18 or higher
- PostgreSQL database
- Cloudinary account
- SSLCommerz account (Sandbox for testing)

### Setup Steps

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/localguide-backend.git
cd localguide-backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Configuration**
```bash
cp .env.example .env
```

Edit `.env` with your credentials:
```env
# Server
PORT=5000
NODE_ENV=development

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/localguide?schema=public"

# JWT
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
JWT_EXPIRES_IN=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# SSLCommerz
SSLCOMMERZ_STORE_ID=testbox
SSLCOMMERZ_STORE_PASSWORD=qwerty
SSLCOMMERZ_IS_LIVE=false

# URLs
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:5000
```

4. **Database Setup**
```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# (Optional) Seed database
npx prisma db seed
```

5. **Start Development Server**
```bash
npm run dev
```

Server will run on: `http://localhost:5000`

## 📚 API Documentation

### Base URL
```
Development: http://localhost:5000/api
Production: https://your-backend.onrender.com/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "role": "TOURIST" // or "GUIDE", "ADMIN"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### User Endpoints
```http
GET    /api/users/:id              # Get user profile
PATCH  /api/users/:id              # Update profile (Auth)
GET    /api/users                  # Get all users (Admin)
DELETE /api/users/:id              # Delete user (Admin)
```

### Listing Endpoints
```http
GET    /api/listings               # Get all listings
GET    /api/listings/:id           # Get single listing
POST   /api/listings               # Create listing (Guide)
PATCH  /api/listings/:id           # Update listing (Guide)
DELETE /api/listings/:id           # Delete listing (Guide/Admin)
GET    /api/listings/my/listings   # Get my listings (Guide)
```

### Booking Endpoints
```http
POST   /api/bookings               # Create booking (Tourist)
GET    /api/bookings/my-bookings   # Get my bookings
PATCH  /api/bookings/:id           # Update booking status (Guide)
GET    /api/bookings               # Get all bookings (Admin)
```

### Review Endpoints
```http
POST   /api/reviews                # Create review (Tourist)
GET    /api/reviews/listing/:id    # Get reviews for listing
PATCH  /api/reviews/:id            # Update review (Tourist)
DELETE /api/reviews/:id            # Delete review (Tourist/Admin)
```

### Upload Endpoints
```http
POST   /api/upload/single          # Upload single image
POST   /api/upload/multiple        # Upload multiple images
```

### Payment Endpoints
```http
POST   /api/payments/initiate      # Initiate payment (SSLCommerz)
POST   /api/payments/success       # Payment success callback
POST   /api/payments/fail          # Payment fail callback
POST   /api/payments/cancel        # Payment cancel callback
```

## 🗄️ Database Schema

### Models
- **User** - Users with roles (Tourist, Guide, Admin)
- **Listing** - Tour listings created by guides
- **Booking** - Tour bookings with status tracking
- **Review** - Reviews and ratings for tours

### Key Relationships
```
User (Guide) → has many → Listings
User (Tourist) → has many → Bookings
Booking → belongs to → Listing
Review → belongs to → Booking (one-to-one)
```

## 🧪 Testing

### Health Check
```bash
curl http://localhost:5000/health
```

### Test Admin Registration
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@localguide.com",
    "password": "admin123",
    "name": "Admin User",
    "role": "ADMIN"
  }'
```

## 📁 Project Structure
```
backend/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Migration files
├── src/
│   ├── config/
│   │   ├── prisma.ts         # Prisma client
│   │   ├── cloudinary.ts     # Cloudinary config
│   │   └── multer.ts         # File upload config
│   ├── modules/
│   │   ├── user/
│   │   │   ├── user.model.ts
│   │   │   ├── user.service.ts
│   │   │   ├── user.controller.ts
│   │   │   └── user.routes.ts
│   │   ├── listing/          # Tour listings
│   │   ├── booking/          # Booking system
│   │   ├── review/           # Review system
│   │   ├── payment/          # Payment integration
│   │   └── upload/           # File upload
│   ├── middlewares/
│   │   ├── auth.middleware.ts
│   │   └── errorHandler.ts
│   ├── utils/
│   │   ├── jwt.ts
│   │   ├── bcrypt.ts
│   │   └── response.ts
│   ├── app.ts                # Express app setup
│   └── server.ts             # Server entry point
├── .env.example              # Environment template
├── package.json
└── tsconfig.json
```

## 🚀 Deployment (Render)

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

Quick steps:
1. Push code to GitHub
2. Create new Web Service on Render
3. Connect GitHub repository
4. Set environment variables
5. Deploy!

## 🔐 Default Credentials

### Admin
- Email: `admin@localguide.com`
- Password: `admin123`

### Test Tourist
- Email: `tourist@test.com`
- Password: `tourist123`

### Test Guide
- Email: `guide@test.com`
- Password: `guide123`

## 🐛 Common Issues

### Prisma Client Error
```bash
npx prisma generate
```

### Migration Error
```bash
npx prisma migrate reset
npx prisma migrate dev
```

### Port Already in Use
```bash
# Change PORT in .env or kill process
lsof -ti:5000 | xargs kill
```

## 📄 License
MIT

## 👨‍💻 Author
**Your Name**
- GitHub: [@Jamil hossain](https://github.com/yourusername)
- Email: your.email@example.com