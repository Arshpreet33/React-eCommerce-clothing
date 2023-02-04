import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';
import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	Firestore,
} from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyCf4A6FBpFB65z911rV0EntU4F-5Lkzy7A',
	authDomain: 'crwn-clothing-db-9fd1e.firebaseapp.com',
	projectId: 'crwn-clothing-db-9fd1e',
	storageBucket: 'crwn-clothing-db-9fd1e.appspot.com',
	messagingSenderId: '73411032599',
	appId: '1:73411032599:web:171d61334a950bf5adce52',
};

const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
	prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => {
	return signInWithPopup(auth, googleProvider);
};

export const db = getFirestore();

export const createUserDocFromAuth = async (userAuth, additionalData = {}) => {
	if (!userAuth) return;

	const userDocRef = doc(db, 'users', userAuth.uid);
	console.log(userDocRef);
	const userSnapshot = await getDoc(userDocRef);

	//if user logs in via Google Auth for the first time/ or Signs Up - then create an id for the user.
	if (!userSnapshot.exists()) {
		const { email, displayName } = userAuth;
		const createdDate = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdDate,
				...additionalData,
			});
		} catch (error) {
			console.log(
				'Error creating user doc while Authentication: ',
				error.message
			);
		}
	}
	return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);
