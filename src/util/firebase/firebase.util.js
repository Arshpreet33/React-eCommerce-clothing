import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from 'firebase/auth';
import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	collection,
	writeBatch,
	query,
	getDocs,
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

export const addCollectionAndDocuments = async (
	collectionKey,
	objectsToAdd
) => {
	debugger;
	const collectionRef = collection(db, collectionKey);
	const batch = writeBatch(db);

	objectsToAdd.forEach((object) => {
		const docRef = doc(collectionRef, object.title.toLowerCase());
		batch.set(docRef, object);
	});

	await batch.commit();
};

export const getCategoriesAndDocuments = async () => {
	const collectionRef = collection(db, 'categories');
	const q = query(collectionRef);

	const querySnapshot = await getDocs(q);

	return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

export const createUserDocFromAuth = async (userAuth, additionalData = {}) => {
	if (!userAuth) return;

	const userDocRef = doc(db, 'users', userAuth.uid);
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
	return userSnapshot;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserWithEmailAndPassword = async (email, password) => {
	debugger;
	if (!email || !password) return;

	return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
	onAuthStateChanged(auth, callback);

export const getCurrentUser = () => {
	return new Promise((resolve, reject) => {
		const unsubscribe = onAuthStateChanged(
			auth,
			(userAuth) => {
				unsubscribe();
				resolve(userAuth);
			},
			reject
		);
	});
};
