import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
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
  
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt:'select_account'
  
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

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
                createdAt
            });
        } catch (error) {
            console.log('Error creating the account', error.message);
        }
            
        
    }

    return userDocRef;
    
}


