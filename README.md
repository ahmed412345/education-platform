# 📚 Noura Sensei - Online Education Platform

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=google-chrome)](https://noura.sbs/)

## 🔐 Demo Accounts

To explore the platform without registration, you can use the following test accounts:

#### 👨‍💼 Admin Access (To view Dashboard & Management)

- **Email:** `admintest@noura.sbs`
- **Password:** `admin123456`

#### 🎓 Student Access (To view Courses & Learning)

- **Email:** `studenttest@noura.sbs`
- **Password:** `student123456`

> **Note:** Please do not delete existing data so others can test the platform.

A comprehensive, full-stack online education platform built with modern technologies. This platform allows users to learn from curated courses, watch video lessons, access learning materials, and admins to manage the entire ecosystem.

---

## ✨ Key Features

### 🎓 Student Features

- **User Registration & Authentication**
    - Secure registration with email & phone verification
    - OTP-based account activation (2FA)
    - JWT token-based authentication
    - Session management with secure HTTP-only cookies

- **Course Management**
    - Browse free and paid courses
    - Enroll in premium courses
    - Track learning progress
    - Access course materials (videos & books)

- **Learning Experience**
    - Watch video lessons with integrated player
    - Download and preview PDF materials
    - Preview lessons before purchasing
    - Organized lesson structure with thumbnails and duration

- **User Dashboard**
    - View enrolled courses
    - Track learning history
    - Manage personal profile

### 👨‍💼 Admin Features

- **User Management**
    - View all registered users
    - Block/unblock user accounts
    - Manage user enrollments
    - Update user information

- **Course Management**
    - Create courses manually
    - Import entire YouTube playlists automatically (game-changer!)
    - Update course details (title, description, price)
    - Delete courses with cascade operations
    - Manage course visibility (active/inactive)

- **Content Management**
    - Create lessons and assign videos
    - Upload and manage PDF materials
    - Organize courses by order
    - Set course pricing

### 🌐 Global Support

- **Multi-language Support**
    - Arabic & English localization
    - Support for additional languages (easily extensible)
    - Automatic language detection

---

## 🛠️ Technologies Used

### Backend

| Technology             | Purpose                        |
| ---------------------- | ------------------------------ |
| **Node.js**            | JavaScript runtime environment |
| **Express.js v5**      | Web framework & REST API       |
| **TypeScript**         | Type-safe JavaScript           |
| **MongoDB**            | NoSQL database                 |
| **Mongoose**           | MongoDB ODM                    |
| **JWT (jsonwebtoken)** | Token-based authentication     |
| **Bcrypt**             | Password hashing               |
| **Supabase**           | Cloud file storage             |
| **Multer**             | File upload handling           |
| **Zod**                | Schema validation library      |
| **Nodemailer**         | Email sending                  |
| **Google APIs**        | YouTube playlist integration   |
| **Cookie Parser**      | HTTP cookie parsing            |
| **CORS**               | Cross-origin request handling  |

### Frontend

| Technology          | Purpose                               |
| ------------------- | ------------------------------------- |
| **React 19**        | UI library                            |
| **TypeScript**      | Type-safe JavaScript                  |
| **Vite**            | Frontend build tool (lightning fast!) |
| **React Router v7** | Client-side routing                   |
| **Tailwind CSS v4** | Utility-first CSS framework           |
| **Axios**           | HTTP client                           |
| **Zod**             | Client-side validation                |
| **i18next**         | Internationalization (i18n)           |
| **React-i18next**   | React i18n integration                |
| **Sonner**          | Toast notifications                   |
| **GSAP**            | Animation library                     |
| **Lottie-react**    | Animations (JSON-based)               |
| **Lucide-react**    | Icon library                          |
| **Plyr**            | Video player                          |

---

## 📋 Project Architecture

### Backend Structure

```
backend/
├── src/
│   ├── config/              # Configuration files
│   │   ├── connectDB.ts     # MongoDB connection
│   │   └── connectSupabase.ts # Supabase initialization
│   ├── controllers/         # Business logic
│   ├── models/              # Database schemas
│   ├── routes/              # API endpoints
│   ├── middleware/          # Custom middleware
│   ├── validation/          # Zod validation schemas
│   ├── types/               # TypeScript types
│   └── utils/               # Helper functions
├── dist/                    # Compiled JavaScript
└── server.js                # Entry point
```

### Frontend Structure

```
frontend/
├── src/
│   ├── components/          # Reusable React components
│   ├── pages/               # Page components
│   ├── services/            # API service layer
│   ├── validation/          # Zod schemas
│   ├── util/                # Utilities
│   ├── lang/                # i18n configuration
│   ├── layouts/             # Layout components
│   ├── assets/              # Images, animations, fonts
│   └── App.tsx              # Root component
├── index.html               # Entry HTML
└── vite.config.ts           # Vite configuration
```

---

## 🔐 Security Features

✅ **Authentication & Authorization**

- JWT tokens with 2-day expiration
- HTTP-only, Secure cookies (production-ready)
- Role-based access control (RBAC)
- OTP-based email verification

✅ **Data Protection**

- Password hashing with bcrypt (salt rounds: 12)
- MongoDB injection prevention
- CORS protection
- Zod schema validation (Frontend & Backend)

✅ **Rate Limiting**

- OTP request cooldown (2 minutes)
- Spam prevention middleware

✅ **File Security**

- Multer memory storage (no disk exposure)
- Supabase secure URLs
- File type validation

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- MongoDB instance (local or cloud)
- Supabase account
- Brevo account (for email services)
- Google API key (for YouTube integration)

### Environment Variables

#### Backend (.env)

```env
# Database
MONGO_URI=mongodb://username:password@host:port/education

# Authentication
JWT_SECRET=your-super-secret-key-min-32-chars

# Email Service
BREVO_USER=your-brevo-email
BREVO_PASS=your-brevo-api-key

# File Storage
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-supabase-api-key
BUCKET_NAME=your-bucket-name

# YouTube Integration
YOT_KEY=your-google-youtube-api-key

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# Server
PORT=3000
NODE_ENV=development
```

#### Frontend (.env)

```env
VITE_API_URL=http://localhost:3000/api
```

### Installation

#### Backend

```bash
cd backend
npm install
npm run build    # Compile TypeScript
npm start        # Start server
```

#### Frontend

```bash
cd frontend
npm install
npm run dev      # Development mode
npm run build    # Production build
npm run preview  # Preview production build
```

---

## 📡 API Endpoints

### Authentication

```
POST   /api/users/register              - Register new user
POST   /api/users/login                 - Login
POST   /api/users/logout                - Logout
GET    /api/users/register/activate     - Request OTP
POST   /api/users/register/activate     - Verify OTP
GET    /api/me                          - Get current user info
```

### Courses

```
GET    /api/courses                     - Get all courses
GET    /api/courses/:id                 - Get specific course
POST   /api/courses                     - Create course (Admin)
PATCH  /api/courses/:id                 - Update course (Admin)
DELETE /api/courses/:id                 - Delete course (Admin)
POST   /api/asyncYoutube                - Import YouTube playlist (Admin)
```

### Lessons

```
GET    /api/courses/:id/lessons         - Get course lessons
GET    /api/lessons/:lessonId           - Get lesson details
POST   /api/courses/:id/lessons         - Create lesson (Admin)
PATCH  /api/lessons/:lessonId           - Update lesson (Admin)
DELETE /api/lessons/:lessonId           - Delete lesson (Admin)
```

### Books (PDF Materials)

```
GET    /api/courses/:id/books           - Get course books
GET    /api/books/:bookId               - Get book (with direct download)
POST   /api/courses/:id/books           - Upload book (Admin)
PATCH  /api/books/:bookId               - Update book (Admin)
DELETE /api/books/:bookId               - Delete book (Admin)
```

### User Management

```
GET    /api/users                       - Get all users (Admin)
PATCH  /api/users/:id                   - Update user profile
PATCH  /api/users/block/:id             - Block user (Admin)
PATCH  /api/users/unblock/:id           - Unblock user (Admin)
POST   /api/updateUserCourses           - Enroll user in courses (Admin)
```

---

## 📊 Data Models

### User Model

```typescript
{
  fullName: String (required),
  email: String (unique, lowercase),
  phoneNumber: String,
  password: String (hashed),
  role: "student" | "admin" (default: "student"),
  isActive: Boolean (default: false),
  isBlocked: Boolean (default: false),
  courses: [ObjectId], // Course references
  timestamps: true
}
```

### Course Model

```typescript
{
  title: String (unique),
  playlistId: String (YouTube playlist ID),
  description: String,
  order: Number,
  price: Number (0 for free),
  isActive: Boolean,
  thumbnail: String (URL),
  timestamps: true
}
```

### Lesson Model

```typescript
{
  title: String,
  course: ObjectId (Course reference),
  order: Number,
  videoUrl: String,
  thumbnail: String,
  duration: Number (seconds),
  isActive: Boolean,
  timestamps: true
}
```

### Book Model

```typescript
{
  originalName: String,
  storageName: String,
  course: ObjectId (Course reference),
  fileUrl: String (Supabase URL),
  timestamps: true
}
```

### OTP Model

```typescript
{
  userId: ObjectId (User reference),
  otpCode: String,
  createdAt: Date (TTL: 15 minutes auto-delete)
}
```

---

## 🎯 Advanced Features

### 1️⃣ YouTube Integration

Admins can import entire YouTube playlists as courses in one click!

- Fetches playlist metadata (title, description, thumbnail)
- Automatically creates lessons from all videos
- Generates lesson thumbnail and duration
- Implements pagination for large playlists

### 2️⃣ Access Control

- **Free Courses**: Available to all authenticated users
- **Paid Courses**: Only enrolled students can access
- **Preview Lessons**: Non-subscribers can preview one lesson per course
- **Admin Bypass**: Admins see all content

### 3️⃣ Email Verification

- OTP-based verification using Brevo SMTP
- 15-minute expiration for security
- 2-minute cooldown between requests (spam prevention)
- HTML-formatted emails

### 4️⃣ File Management

- PDF upload with Multer (memory storage)
- Supabase deployment with public URLs
- Automatic cleanup on course deletion
- Support for multiple file formats

### 5️⃣ Error Handling

- Centralized error middleware
- Custom `AppError` class with HTTP status codes
- User-friendly error messages
- Detailed logging for debugging

---

## 🧪 Validation

### Backend Validation (Zod)

```typescript
registerSchema = {
  fullName: string (min 3 chars),
  email: string (valid email),
  phoneNumber: string (international format),
  password: string (min 6 chars)
}

loginSchema = {
  email: string (valid email),
  password: string (min 6 chars)
}

createCourseSchema = {
  title, description, order, price, isActive, thumbnail
}

createLessonSchema = {
  title, order, videoUrl, thumbnail, duration
}
```

### Frontend Validation

All schemas validated client-side before submission with user-friendly error messages.

---

## 📱 User Experience

- **Responsive Design** - Mobile, Tablet, Desktop
- **Dark Mode** - Toggle-able theme support
- **Smooth Animations** - GSAP & Lottie
- **Toast Notifications** - Non-intrusive feedback
- **Loading States** - Visual progress indicators
- **Error Handling** - Clear error messages with field highlighting

---

## 🔄 Authentication Flow

```
1. User Registration
   ├─ Validate input (Zod)
   ├─ Check email uniqueness
   ├─ Hash password (bcrypt)
   ├─ Create user (isActive: false)
   └─ Issue JWT token

2. User Activation
   ├─ Request OTP (rate limited)
   ├─ Send email with OTP
   ├─ User submits OTP code
   ├─ Verify OTP match
   ├─ Update isActive: true
   └─ Issue new JWT token

3. Login
   ├─ Validate input
   ├─ Find user by email
   ├─ Compare passwords (bcrypt)
   ├─ Check if blocked
   ├─ Issue JWT token
   └─ Set secure cookie

4. Protected Routes
   ├─ Check JWT token in cookie
   ├─ Verify token signature
   ├─ Extract user data
   └─ Attach to request object
```

---

## 📈 Performance Optimizations

✅ **Database**

- `.lean()` queries for read-only operations
- Indexed fields for fast lookups
- TTL indexes for automatic cleanup

✅ **Frontend**

- Vite bundling (extremely fast)
- Code splitting for lazy loading
- Tailwind CSS purging
- Image optimization

✅ **API**

- RESTful design principles
- Efficient query parameters
- Response caching strategies

---

## 🛡️ Best Practices Implemented

✅ Type safety with TypeScript (strict mode)  
✅ Environment variable management  
✅ Centralized error handling  
✅ Middleware composition pattern  
✅ Async/await with proper error catching  
✅ Separation of concerns (Controllers, Services, Utils)  
✅ Input validation on both client and server  
✅ Secure password hashing  
✅ CORS configuration  
✅ Optional chaining for safe property access

---

## 📝 Future Enhancements

- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Discussion forums for courses
- [ ] Student progress tracking dashboard
- [ ] Certificate generation
- [ ] Video analytics (watch time, completion rate)
- [ ] Email notifications
- [ ] API rate limiting (Redis)
- [ ] Database caching (Redis)
- [ ] CDN integration
- [ ] Mobile app (React Native)

---

## 📄 License

This project is licensed under the ISC License.

---

## 👨‍💻 Development Team

Built with ❤️ for online education.

---

## 📞 Contact & Support

For issues, questions, or suggestions, please reach out to: support@noura.sbs

---

## 📦 Dependencies Summary

### Backend

- **Runtime**: node, express
- **Database**: mongoose
- **Security**: jsonwebtoken, bcrypt, cookie-parser
- **Validation**: zod
- **File Upload**: multer
- **Cloud Storage**: @supabase/supabase-js
- **Email**: nodemailer
- **External APIs**: googleapis
- **Dev Tools**: typescript, rollup, esbuild

### Frontend

- **UI**: react, react-dom, react-router-dom
- **Styling**: tailwindcss
- **HTTP**: axios
- **Validation**: zod
- **i18n**: i18next, react-i18next
- **Notifications**: sonner
- **Animations**: gsap, lottie-react
- **Icons**: lucide-react
- **Video Player**: plyr, react-player
- **Build Tool**: vite
- **Dev Tools**: typescript, eslint

---

**Last Updated**: February 2026  
**Status**: ✅ Active Development
