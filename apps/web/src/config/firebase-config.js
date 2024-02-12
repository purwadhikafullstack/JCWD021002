import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from 'firebase/firestore';
import { setUser, loginSuccess } from '../redux/reducer/authReducer';
// import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyCqi8CdD1waBbI3O3m0G1rnboKqZyMyWy0',
  authDomain: 'jcwd021002-c7e48.firebaseapp.com',
  projectId: 'jcwd021002-c7e48',
  storageBucket: 'jcwd021002-c7e48.appspot.com',
  messagingSenderId: '961865586539',
  appId: '1:961865586539:web:443e508a8995094a989e2e',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// const messaging = getMessaging(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async (dispatch) => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
      });
    }
    
    // const payload = {
    //   username: user.displayName,
    //   email: user.email,
    //   fullname: user.fullname,
    //   avatar: user.avatar
    // }
    // dispatch(setUser(payload))
    dispatch(loginSuccess());
    return {user: user, message: 'signin with google success'};
  } catch (err) {
    console.error("config",err);
  }
};

const signUpWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
      });
    }
    // const payload = {
    //   username: user.displayName,
    //   email: user.email,
    // }
    // dispatch(setUser(payload))
    return {user: user, message: 'signup with google success'};
  } catch (err) {
    console.error(err);
  }
};

// Log out
const logout = () => {
  signOut(auth);
  localStorage.removeItem("token")
  return 'logout success';
};

export {
  auth,
  db,
  signInWithGoogle,
  signUpWithGoogle,
  logout
};
