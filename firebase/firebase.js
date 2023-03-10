import { app, db } from "./firebase-config.js";
import { FirebaseError } from "firebase/app";
import {
  ref,
  set,
  update,
  onValue,
  get,
  remove,
  child,
  getDatabase,
  goOffline,
} from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  listAll,
  getDownloadURL,
  getBytes,
  getStream,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";

export const getContent = (setContentCallback) => {
  let data = {};

  let reference = ref(db, "content/");
  onValue(
    reference,
    (snapshot) => {
      if (snapshot) {
        data = snapshot.val();
        setContentCallback(data);
      }
    },
    (error) => console.log("Error: " + error.code)
  );
};

export const getContentOnce = async () => {
  let data = {};
  const reference = ref(db, "content/");
  return await get(reference)
    .then((snapshot) => {
      if (snapshot.exists()) {
        data = snapshot.val();
        return data;
      } else {
        console.log("No data available");
        return {};
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const updateContent = (path, value) => {
  let reference = ref(db, "content/");
  let updatedContent = {
    [path]: value,
  };

  update(reference, updatedContent)
    .then(() => {
      console.log("Content updated successfully");
    })
    .catch((error) => {
      console.log("Unable to update content: " + error);
    });
};
