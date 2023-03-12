import firebase from "firebase/compat";
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCSa_2xDHzbli_1H2O8IR0K9hMbUQ2N95I",
  authDomain: "control-qr-380300.firebaseapp.com",
  projectId: "control-qr-380300",
  storageBucket: "control-qr-380300.appspot.com",
  messagingSenderId: "911129246688",
  appId: "1:911129246688:web:435b3f17a29660dc650985",
  measurementId: "G-WC849PQ6XB",
};
export const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.auth().languageCode = "es";
const appAuth = getAuth();
if (!appAuth) {
  const auth = initializeAuth(firebaseApp, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

export { appAuth };
