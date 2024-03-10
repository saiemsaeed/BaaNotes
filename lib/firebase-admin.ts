import * as admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { getApps, initializeApp } from 'firebase-admin/app';

const cert = admin.credential.cert({
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
});

const getServerApp = () => {
  return admin.apps.length > 0
    ? getApps()[0]
    : initializeApp({ credential: cert });
};

export const serverAuth = getAuth(getServerApp());
