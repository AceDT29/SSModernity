import { dbGet, dbRef } from "../firebase/firebaseConfig";
import { fireDb } from "../firebase/firebaseConfig";

export async function userExists(uid) {
  const userRef = dbRef(fireDb, `users/${uid}`);
  const snapshot = await dbGet(userRef);
  const userQueryState = snapshot.exists();
  return userQueryState;
}

export async function itemExists(uid, productName) {
  const prodRef = dbRef(fireDb, `users/${uid}/wishlist`);
  const snapshot = await dbGet(prodRef);
  if (!snapshot.exists()) return false;

  const wishlist = snapshot.val();

  // Si wishlist es un array
  if (Array.isArray(wishlist)) {
    return wishlist.some(item => item && item.name === productName);
  }

  // Si wishlist es un objeto (por ejemplo, guardado como {0: {...}, 1: {...}})
  if (typeof wishlist === "object") {
    return Object.values(wishlist).some(item => item && item.name === productName);
  }

  return false;
}