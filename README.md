# MediLink
  firebase init hosting
This is a Next.js web app called MediLink, built with Firebase and Genkit. MediLink connects patients and doctors with an AI health assistant (“Medibot”) and supports both Doctor and Patient roles.

## Getting Started

### 1. Set up Environment Variables

Create a file named `.env.local` in the root of your project and add your Firebase project configuration. You can find these values in your Firebase project settings.

```
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID
```

Additionally, to use the Genkit AI features, ensure you have your Google AI API key set up in your environment. One way to do this is to add it to your `.env.local` file:

```
GOOGLE_GENAI_API_KEY=YOUR_GOOGLE_GENAI_API_KEY
```

### 2. Install Dependencies

Install the necessary packages using npm:

```bash
npm install
```

### 3. Run the Development Server

Start the development server:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

### 4. Run the AI Flows (Optional)

To run the Genkit AI flows locally for development and testing, use the following command:

```bash
npm run genkit:dev
```

This will start the Genkit developer UI, where you can inspect and run your AI flows.

## Deploy on Firebase App Hosting (or Netlify/Vercel)

To deploy your application:

1.  **Connect your Git Repository:** Connect your GitHub repository to Firebase App Hosting, Vercel, or Netlify.
2.  **Set Environment Variables:** In your hosting provider's dashboard, set the same environment variables that you defined in your `.env.local` file. Make sure to include both the `NEXT_PUBLIC_` Firebase variables and the `GOOGLE_GENAI_API_KEY`.
3.  **Deploy:** Trigger a deployment. The hosting provider will build and deploy your Next.js application.
