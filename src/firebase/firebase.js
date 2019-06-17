// This import loads the firebase namespace along with all its type information.
import * as firebase from 'firebase/app';
 
// These imports load individual services into the firebase namespace.
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};


firebase.initializeApp(config);

const firestore = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { googleAuthProvider, firebase, firestore as default };