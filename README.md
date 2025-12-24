🏥 **Care.IO**  
Baby Sitting & Elderly Care Service Platform

- Live URL: [care-io-eta.vercel.app](https://care-io-eta.vercel.app/)
- Repo: [github.com/JoyChanda/Care.io](https://github.com/JoyChanda/Care.io)

Care.IO is a modern, responsive web application that helps families find, book, and manage trusted caregiving services (baby, elderly, and sick care) with clear pricing and transparent booking flows. The goal is to make caregiving easy, secure, and accessible for everyone while showcasing professional full-stack practices.

---

## 🌟 Project Purpose
- Simplify booking for caregiving services
- Provide a secure, user-friendly experience
- Emphasize trust, accessibility, and professionalism
- Demonstrate modern full-stack development patterns

## 🚀 Key Features
### General
- Fully responsive (mobile / tablet / desktop)
- Global light & dark mode toggle
- Clean, trustworthy UI

### Authentication
- Email/password auth plus Google login
- Protected routes with session persistence
- Prevents unnecessary redirects on reload

### Services
- Baby Care, Elderly Care, Sick Care
- Individual service detail pages

### Booking System
- Dynamic booking by duration (hours/days) and location (Division, District, City, Area, Address)
- Automatic total cost calculation (duration × service charge)
- Booking statuses: Pending, Confirmed, Completed, Cancelled

### My Bookings
- View and track all bookings
- Inspect booking details
- Cancel when allowed

### Additional
- SEO metadata on Home & Service pages
- Email invoice after successful booking

---

## 🧭 Pages & Routes
| Page | Route |
| --- | --- |
| Home | `/` |
| Service Details | `/service/:service_id` |
| Booking (Private) | `/booking/:service_id` |
| My Bookings (Private) | `/my-bookings` |
| Login | `/login` |
| Register | `/register` |
| Error | `404` |

## 🛠️ Tech Stack
**Frontend**: Next.js (App Router), TypeScript, Tailwind CSS, DaisyUI, Framer Motion, Lucide-React  
**Backend**: Next.js API Routes, MongoDB, Mongoose  
**Auth & Utilities**: NextAuth, next-themes, Nodemailer  
**Optional/Advanced**: Stripe (payments), Admin Dashboard (payments/history)

## 🎨 UI & Design Principles
- Unique, consistent design (typography, spacing, buttons, focus/hover)
- Slightly rounded buttons/cards; equal card sizing; grid-first layout
- Uses new X (Twitter) logo; emojis avoided in UI (Lucide-React icons instead)

## 🌗 Theme System
- Global light/dark mode from a single provider
- DaisyUI theme tokens only (no raw Tailwind colors)
- UI auto-adjusts on theme change

## 🔐 Environment Variables
Store secrets securely. Example:
```
MONGODB_URI=your_mongodb_uri
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
EMAIL_USER=your_email
EMAIL_PASS=your_password
STRIPE_SECRET_KEY=your_stripe_key
```

## ⚙️ Installation & Setup
```bash
# Clone the repository
git clone https://github.com/JoyChanda/Care.io.git

# Navigate to project directory
cd Care.io

# Install dependencies
npm install

# Run development server
npm run dev
```
Open http://localhost:3000 to view the app.
