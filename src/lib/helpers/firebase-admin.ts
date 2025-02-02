import { env } from '$env/dynamic/private';
import admin from 'firebase-admin';
import type { MulticastMessage } from 'firebase-admin/messaging';

export async function sendNotification(tokens: string[], title: string, body: string) {
	if (!tokens.length) return;
	initialize();

	const message: MulticastMessage = {
		tokens,
		data: { title, body },
	};

	const response = await admin.messaging().sendEachForMulticast(message);
	console.log('Notification response:', response);
}

export async function sendAvailableParkingNotification(tokens: string[], date: Date) {
  const title = 'Ledig parkering';
  const body = createAvailableParkingMessage(date);
  await sendNotification(tokens, title, body);
}

const initialize = () => {
	if (!admin.apps.length) {
		admin.initializeApp({
			credential: admin.credential.cert({
				projectId: env.FIREBASE_PROJECT_ID,
				clientEmail: env.FIREBASE_CLIENT_EMAIL,
				privateKey: env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
			})
		});
	}
};

const createAvailableParkingMessage = (date: Date): string => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);

  const daysDifference = Math.round((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  const norwegianDays = [
      "søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"
  ];

  if (daysDifference === 0) {
      return "Det er en ledig parkeringsplass i dag";
  } else if (daysDifference === 1) {
      return "Det er en ledig parkeringsplass i morgen";
  } else if (daysDifference > 1 && daysDifference < 7) {
      return `Det er en ledig parkeringsplass på ${norwegianDays[targetDate.getDay()]}`;
  } else {
      return `Det er ledig en parkeringsplass den ${targetDate.getDate().toString().padStart(2, '0')}.${(targetDate.getMonth() + 1).toString().padStart(2, '0')}.${targetDate.getFullYear()}`;
  }
};
