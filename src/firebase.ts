// src/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyD6cPYm0R6sWpI8--XBQ5a-sSPLouXMzBo",
    authDomain: "learn-track-10809.firebaseapp.com",
    projectId: "learn-track-10809",
    storageBucket: "learn-track-10809.appspot.com",
    messagingSenderId: "684507553206",
    appId: "1:684507553206:web:820d7d1b80bf2e9812f517",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
