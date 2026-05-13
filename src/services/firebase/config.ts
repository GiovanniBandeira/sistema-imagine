import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDd3QmGXP_AsnA8-OL0soQCqzkW3K-b0Kg",
  authDomain: "orcamento-imagine3d-42624.firebaseapp.com",
  projectId: "orcamento-imagine3d-42624",
  storageBucket: "orcamento-imagine3d-42624.firebasestorage.app",
  messagingSenderId: "1052118049511",
  appId: "1:1052118049511:web:3a75310a81bbee477b7842",
  measurementId: "G-LTRPH6TPM2"
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

