import { browser } from "$app/environment";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage, type Messaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCSkB8k_k8VfEIp-huw_QPhrXcVWjeE-U4",
  authDomain: "dipspark-2fa19.firebaseapp.com",
  projectId: "dipspark-2fa19",
  storageBucket: "dipspark-2fa19.firebasestorage.app",
  messagingSenderId: "884190036925",
  appId: "1:884190036925:web:6dcbc6fe41f1283fbdc8d4",
};

let messaging: Messaging | null = null;
if (browser) {
  const app = initializeApp(firebaseConfig);
  messaging = getMessaging(app);
}

export async function requestNotificationPermission() {
  if (!browser || !messaging) return null;
  
  console.log("Requesting permission...");
  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    console.log("Notification permission granted.");
    return getToken(messaging, {
      vapidKey: "BHrIJ-qElU3pIeg5SMnSjr5Q3uYn4exMcbeLrpD4DZ9hxu-lNlLNN4VGIQFtef1YrjKOE-Mqt5T3TTFJ1ZmGUd8"
    })
      .then((currentToken) => {
        if (currentToken) {
          console.log("FCM Token:", currentToken);
          return currentToken;
        } else {
          console.log("No registration token available.");
          return null;
        }
      })
      .catch((err) => {
        console.error("An error occurred while retrieving token.", err);
      });
  } else {
    console.log("Notification permission denied.");
    return null;
  }
}
