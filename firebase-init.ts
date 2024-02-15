import * as admin from 'firebase-admin';
import { serviceAccount } from './serviceAccount';

const database = () => {
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert({
        privateKey: serviceAccount.private_key,
        clientEmail: serviceAccount.client_email,
        projectId: serviceAccount.project_id,
      }),
    });
  }
  const db = admin.firestore();
  return db;
};

export { database };
