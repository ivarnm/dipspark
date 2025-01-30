import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

interface ImportMetaEnvVariables {
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_FIREBASE_PROJECT_ID: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET: string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly VITE_FIREBASE_APP_ID: string;
  readonly VITE_FIREBASE_MEASUREMENT_ID: string;
  readonly VITE_VAPID_PUBLIC_KEY: string;
}

interface ImportMetaEnv {
  readonly env: ImportMetaEnvVariables;
}

const env = (import.meta as unknown as ImportMetaEnv)?.env;

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID
};

console.log(firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
getToken(messaging, { vapidKey: env.VITE_VAPID_PUBLIC_KEY })
