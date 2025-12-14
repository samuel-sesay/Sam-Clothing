import { initializeApp } from 'firebase/app';
import {
    getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider,
    createUserWithEmailAndPassword, signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import {  doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDfGrGMeQfTXnJAxhu0Qb-t71WCVhro-Mc",
    authDomain: "sam-clothing-db-d5eca.firebaseapp.com",
    projectId: "sam-clothing-db-d5eca",
    storageBucket: "sam-clothing-db-d5eca.firebasestorage.app",
    messagingSenderId: "1077761323906",
    appId: "1:1077761323906:web:845eb97916d081efa4159b"
  };
  
  // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
  
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt:'select_account'
  
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation={}) => {
    if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);


    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch (error) {
            console.log('Error creating the account', error.message);
        }
            
        
    }

    return userDocRef;
    
};

export const createAuthUserWithEmailandPassword = async (email, password) => {
    if (!email || !password) return;


    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailandPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);
export const onAuthStateChangedListener = (callback) =>
    onAuthStateChanged(auth, callback);

