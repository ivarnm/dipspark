importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCSkB8k_k8VfEIp-huw_QPhrXcVWjeE-U4",
  authDomain: "dipspark-2fa19.firebaseapp.com",
  projectId: "dipspark-2fa19",
  storageBucket: "dipspark-2fa19.firebasestorage.app",
  messagingSenderId: "884190036925",
  appId: "1:884190036925:web:6dcbc6fe41f1283fbdc8d4",
  measurementId: "G-GZ22LZZ3J0"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message: ", payload);
  console.log(JSON.stringify(payload));
  if (!payload.data) return;
  
  self.registration.showNotification("Hello from service worker", {
    body: payload.data?.body,
    icon: "/logo_maskable.png",
    data: {
      url: 'https://dipspark-git-push-ivarnms-projects.vercel.app/book'
    }
  });
});

self.addEventListener("notificationclick", (event) => {
  console.log("Notification clicked:", event.notification);
  event.notification.close();

  const urlToOpen = event.notification.data?.url || "https://dipspark-git-push-ivarnms-projects.vercel.app";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      // If app is already open, focus the existing tab
      for (let client of clientList) {
        if (client.url === urlToOpen && "focus" in client) {
          return client.focus();
        }
      }
      // If app is not open, open a new tab
      return clients.openWindow(urlToOpen);
    })
  );
});

// interface NotificationOptions {
//   badge?: string;
//   body?: string;
//   data?: any;
//   dir?: NotificationDirection;
//   icon?: string;
//   lang?: string;
//   requireInteraction?: boolean;
//   silent?: boolean | null;
//   tag?: string;
// }