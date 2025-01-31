import { env } from '$env/dynamic/private';
import admin from 'firebase-admin';

export async function sendNotification(tokens: string[], title: string, body: string) {
	admin.initializeApp({
		credential: admin.credential.cert({
			projectId: env.FIREBASE_PROJECT_ID,
			clientEmail: env.FIREBASE_CLIENT_EMAIL,
			privateKey: env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
		})
	});

	const message = {
		tokens,
		notification: { title, body },
		apns: { payload: { aps: { contentAvailable: true } } }
	};

	const response = await admin.messaging().sendEachForMulticast(message);
  console.log("Sent notications to ", response.successCount, " devices");
  console.log("Failed to send notications to ", response.failureCount, " devices");
}
