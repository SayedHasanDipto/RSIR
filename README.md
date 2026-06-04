# RSIR - Robiul Islam Educational Platform 🎓

A premium, dynamic, and full-stack educational platform built for students to learn English and Islamic History & Culture (IHC). Features a robust Admin Dashboard for zero-code content management, a secure Resource Bank for downloadable study materials, and an interactive learning interface.

---

## ✨ Key Features
- **Dynamic Notice Board:** Live tracking of upcoming classes and available seats.
- **Video Lesson Hub:** Organized curriculum of English Hub and IHC Chronicles video lectures.
- **Article Archive:** Research articles and blog posts with categorized filtering and an immersive reading mode.
- **Resource Bank (Secure PDF Downloads):** Downloadable study materials locked behind a secure authentication wall for lead generation.
- **Admin Dashboard:** A fully protected CMS to Add, Edit, and Delete live classes, video lessons, articles, and PDF resources directly from the UI.
- **Premium UI/UX:** Built with TailwindCSS, GSAP, and Framer Motion for glassmorphism, micro-animations, and smooth scrolling.

---

## 💻 Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Frontend Library:** React 19
- **Styling:** Tailwind CSS v4, HeroUI, Radix UI Primitives
- **Animations:** Framer Motion, GSAP, Lenis (Smooth Scroll)
- **Database:** MongoDB (via custom helpers in `lib/content.js`)
- **Authentication:** Better Auth (Supports Email/Password, Google, and Facebook)
- **Icons:** Lucide React, Gravity UI Icons, React Icons

---

## 📂 Project Structure
```text
📦 RSIR
 ┣ 📂 app/                # Next.js App Router (Pages & API)
 ┃ ┣ 📂 admin/            # Secure Admin Dashboard & CMS
 ┃ ┣ 📂 api/              # API Route Handlers (Auth, Admin APIs)
 ┃ ┣ 📂 articles/         # Public Articles & Reading Mode
 ┃ ┣ 📂 lessons/          # Public Video Lessons
 ┃ ┣ 📂 resources/        # Public Resource Bank (PDFs)
 ┃ ┣ 📂 login/            # Authentication Pages
 ┃ ┗ 📜 layout.jsx        # Global App Layout (Fonts, Analytics)
 ┣ 📂 components/         # Reusable React Components (Hero, Navbar, etc.)
 ┣ 📂 lib/                # Core Utilities (DB Connection, Auth, Data Fetching)
 ┃ ┣ 📜 auth.js           # Better Auth Configuration
 ┃ ┣ 📜 db.js             # MongoDB Client Initialization
 ┃ ┣ 📜 models.js         # MongoDB Schema/Collection References
 ┃ ┗ 📜 content.js        # Public Data Fetching Helpers
 ┗ 📜 .env                # Environment Variables
```

---

## 🚀 Getting Started (Local Development)

### 1. Clone the repository
Make sure you have Node.js (v18 or higher) installed on your local machine.

### 2. Install dependencies
```bash
npm install
```

### 3. Set up Environment Variables
Create a `.env` file in the root directory and add the following keys. Make sure to replace the placeholder values with your actual API keys and MongoDB connection string.

```env
# Database
MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/rsir_db?retryWrites=true&w=majority"

# Better Auth Configuration
BETTER_AUTH_SECRET="your-super-secret-key-for-auth"
BETTER_AUTH_URL="http://localhost:3000"

# Social Logins (Optional, required if enabling Google/Facebook login)
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
FACEBOOK_CLIENT_ID="your_facebook_client_id"
FACEBOOK_CLIENT_SECRET="your_facebook_client_secret"
```

### 4. Run the Development Server
```bash
npm run dev
```
The application will be available at [http://localhost:3000](http://localhost:3000).

---

## 🛠️ Build for Production
To create an optimized production build, run:
```bash
npm run build
```
Once the build is successful, start the production server:
```bash
npm start
```

---

## 🔐 Admin Access
To access the Admin Panel, navigate to `/admin`.
**Note:** By default, the admin routes and APIs are protected. Make sure the user you are logging in with has the necessary admin roles defined in your database or via your Better Auth configuration.

---

## 🎨 Customization
- **Theme & Colors:** The primary branding colors (Gold, Primary Navy) are configured in `tailwind.config.js` or `globals.css`.
- **Fonts:** The project uses `Geist` and `Geist Mono` configured in `app/layout.jsx`.

---
*Documentation generated for RSIR Project.*
