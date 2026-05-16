import { addDoc, collection, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'

const pricingCollection = collection(db, 'pricing')

export async function createPricing(data: unknown) {
  return await addDoc(pricingCollection, data)
}

export async function getPricings() {
  const snapshot = await getDocs(pricingCollection)
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
}
