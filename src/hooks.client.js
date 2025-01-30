// @ts-nocheck
export const handle = async ({ event, resolve }) => {
  if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
          .then(reg => console.log('Service Worker Registered!', reg))
          .catch(err => console.log('Service Worker registration failed:', err));
  }
  return resolve(event);
};
