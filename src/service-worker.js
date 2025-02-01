/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

const sw = /** @type {ServiceWorkerGlobalScope} */ (/** @type {unknown} */ (self));

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
  if (payload.notification) {
    sw.registration.showNotification("Hi from service worker", {
      body: payload.notification.body,
      icon: "/logo_650.png"
    });
  }
});
