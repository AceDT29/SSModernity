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
  if (Array.isArray(wishlist)) {
    return wishlist.some(item => item && item.id === productId);
  }
  return false;
}


export async function updateWishlistOnDb(uid, item, action) {
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
  switch (action) {
    case "ADD":
      if (wishlist.some(prod => prod && prod.id === item.id) || wishlist.length > 6) {
        return false;
      }
      wishlist.push(item);
      await dbSet(wishlistRef, wishlist);
      return true;
    case "DELETE":
      wishlist = wishlist.filter(prod => prod && prod.id !== item.id);
      await dbSet(wishlistRef, wishlist);
      return true;
    default:
      console.warn("Acción no reconocida:", action);
      return false;
  }
}