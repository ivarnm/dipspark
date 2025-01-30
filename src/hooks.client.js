// @ts-nocheck
export const handle = async ({ event, resolve }) => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/firebase-messaging-sw.js")
      .then((registration) => {
        console.log("Service Worker registered:", registration);
      })
      .catch((err) => console.log("Service Worker registration failed:", err));
  }
  return resolve(event);
};
