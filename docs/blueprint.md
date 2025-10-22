# **App Name**: MediLink

## Core Features:

- User Authentication: Allow users to sign up, log in, and manage their accounts using Firebase Authentication, supporting email/password and Google login. Save user role to Firestore.
- Role-Based Dashboards: Implement different dashboard UIs for patients and doctors, providing access to relevant features and information based on their roles. Store profile info in Firestore.
- AI Health Assistant (Medibot): Integrate an AI assistant using OpenAI or Gemini to answer health-related questions and provide information based on user input, using it as a tool to fetch Firestore doctor profiles and respond in Ibibio if selected.
- Doctor Listings and Profiles: Display a list of doctors with their specialties, city, ratings, and contact information fetched from Firestore.
- Wallet Functionality: Simulate basic wallet transactions (deposit, withdraw, send) with toast notifications for success, failure, and pending status.
- Language Toggle: Implement a language toggle to switch between English and Ibibio throughout the application.
- Offline Mode: Cache doctor profiles and chat messages using IndexedDB for offline access. Detect network status and display a banner when offline.

## Style Guidelines:

- Primary color: Deep Blue (#2B6CB0) to evoke trust and professionalism in healthcare.
- Accent color: Emerald Green (#38A169) to represent health, growth, and vitality.
- Background color: Very light blue (#E0F7FA), creating a clean, calming, and trustworthy background.
- Body and headline font: 'Inter', a grotesque-style sans-serif known for its modern and neutral appearance that works well for both headlines and body text.
- Use clear, modern icons from a library like FontAwesome or Material Design to represent different features and actions.
- Implement a mobile-first, responsive layout using Tailwind CSS to ensure the application is accessible and user-friendly on all devices.
- Incorporate smooth transitions and subtle animations to enhance user experience, such as loading spinners, typing indicators, and toast notifications.