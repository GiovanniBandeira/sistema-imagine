// Firebase Firestore utilities
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "./config";

export async function addDocument(collectionName: string, data: any) {
  return await addDoc(collection(db, collectionName), data);
}

export async function getDocuments(collectionName: string, field?: string, value?: any) {
  const colRef = collection(db, collectionName);
  const q = field ? query(colRef, where(field, "==", value)) : query(colRef);
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}
