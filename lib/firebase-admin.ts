import * as admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { getApps, initializeApp } from 'firebase-admin/app';

const getServerApp = () => {
  try {
    if (admin.apps.length > 0) {
      return getApps()[0];
    }

    const cert = admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: JSON.parse(process.env.FIREBASE_PRIVATE_KEY)?.key,
    });

    return initializeApp({ credential: cert });
  } catch (e) {
    console.log(e);
  }
};

export const serverAuth = () => getAuth(getServerApp());
