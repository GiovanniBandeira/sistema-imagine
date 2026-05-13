// Firebase authentication utilities
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./config";

export async function login(email: string, password: string) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

export async function logout() {
  await signOut(auth);
}
