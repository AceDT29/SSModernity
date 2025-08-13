import { dbGet, dbRef, dbSet } from "../firebase/firebaseConfig";
import { fireDb } from "../firebase/firebaseConfig";

export async function userExists(uid) {
  const userRef = dbRef(fireDb, `users/${uid}`);
  const snapshot = await dbGet(userRef);
  const userQueryState = snapshot.exists();
  return userQueryState;
}

export async function itemExists(uid, productId) {
  const prodRef = dbRef(fireDb, `users/${uid}/wishlist`);
  const snapshot = await dbGet(prodRef);
  if (!snapshot.exists()) return false;

  const wishlist = snapshot.val();

  // Si wishlist es un array
  if (Array.isArray(wishlist)) {
    return wishlist.some(item => item && item.id === productId);
  }

  // Si wishlist es un objeto (por ejemplo, guardado como {0: {...}, 1: {...}})
  if (typeof wishlist === "object") {
    return Object.values(wishlist).some(item => item && item.id === productId);
  }

  return false;
}

export async function addToWishlistOnDb(uid, item) {
  const wishlistRef = dbRef(fireDb, `users/${uid}/wishlist`);
  const snapshot = await dbGet(wishlistRef);
  let wishlist = [];
  if (snapshot.exists()) {
    const data = snapshot.val();
    if (Array.isArray(data)) {
      wishlist = data;
    } else if (typeof data === "object") {
      wishlist = Object.values(data);
    } else if (typeof data === "string") {
      wishlist = [data];
    }
  }
  if (wishlist.some(prod => prod && prod.id === item.id)) {
    console.log("This item is already in the wishlist:");
    return false;
  }
  wishlist.push(item);
  await dbSet(wishlistRef, wishlist);
  return true;
}