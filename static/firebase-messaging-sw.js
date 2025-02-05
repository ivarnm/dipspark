importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
	apiKey: 'AIzaSyCSkB8k_k8VfEIp-huw_QPhrXcVWjeE-U4',
	authDomain: 'dipspark-2fa19.firebaseapp.com',
	projectId: 'dipspark-2fa19',
	storageBucket: 'dipspark-2fa19.firebasestorage.app',
	messagingSenderId: '884190036925',
	appId: '1:884190036925:web:6dcbc6fe41f1283fbdc8d4',
	measurementId: 'G-GZ22LZZ3J0'
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
	console.log('Received background message: ', payload);
	console.log(JSON.stringify(payload));
	if (!payload.data) return;

	self.registration.showNotification('Hello from service worker', {
		body: payload.data?.body,
		icon: '/logo_maskable.png',
		data: {
			url: 'https://dipspark-git-push-ivarnms-projects.vercel.app/book'
		}
	});
});

self.addEventListener('notificationclick', (event) => {
	console.log('Notification clicked:', event.notification);
	event.notification.close();

	const urlToOpen =
		event.notification.data?.url || 'https://dipspark-git-push-ivarnms-projects.vercel.app/book';

	event.waitUntil(
		clients.matchAll({ type: 'window', includeUncontrolled: true }).then(async (clientList) => {
			const matchingClient = clientList.find((client) =>
				client.url.startsWith('https://dipspark-git-push-ivarnms-projects.vercel.app')
			);

			if (matchingClient) {
				// If the app is already open, focus it and navigate to the correct page
				return matchingClient.focus(); // This does not work in Android 15 https://github.com/firebase/firebase-js-sdk/issues/8668
			}
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
