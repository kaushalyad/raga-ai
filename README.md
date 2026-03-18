# B2B Healthcare SaaS UI Application

## Tech Stack
- React
- TypeScript
- Redux (for state management)
- Firebase (for authentication)
- Vite (build tool)

## Features
- Authentication (Login with Firebase)
- Home/Dashboard Page
- Analytics Page
- Patient Details Page (Grid/List view toggle)
- Service Worker for notifications
- Responsive UI

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables
Create a `.env` file in the project root and add:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

Enable **Email/Password** in Firebase Console -> Authentication.

## Notifications
The Dashboard includes a button that triggers a local notification via the registered service worker.

## Folder Structure
- `/src/pages` — Application pages
- `/src/components` — Reusable UI components
- `/src/store` — Redux state management
- `/src/services` — Firebase and API integrations

## To Do
- Deploy to Netlify/Vercel
- Add real API integration for patients/analytics

---
Replace placeholder content as you build features.
