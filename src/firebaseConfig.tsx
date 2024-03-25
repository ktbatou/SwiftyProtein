import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDEXdBxZ6J5XmWcx43cS_22iJP2TtxMssc",
  authDomain: "swiftyprotein-e5f89.firebaseapp.com",
  projectId: "swiftyprotein-e5f89",
  storageBucket: "swiftyprotein-e5f89.appspot.com",
  messagingSenderId: "239386924398",
  appId: "1:239386924398:web:a769de16d867a2989bdd7f",
  measurementId: "G-NG87ECR291"
};


const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export default { auth }
