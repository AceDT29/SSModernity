import { dbGet, dbRef } from "../firebase/firebaseConfig";
import { fireDb } from "../firebase/firebaseConfig";

export async function userExists(uid) {
  const userRef = dbRef(fireDb, `users/${uid}`);
  const snapshot = await dbGet(userRef);
  const userQueryState = snapshot.exists();
  return userQueryState;
}