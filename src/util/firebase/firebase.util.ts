import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	User,
	NextOrObserver,
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
	QueryDocumentSnapshot,
} from 'firebase/firestore';
import { Category } from '../../store/categories/category.types';

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

export type ObjectToAdd = {
	title: string;
};

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
	collectionKey: string,
	objectsToAdd: T[]
): Promise<void> => {
	const collectionRef = collection(db, collectionKey);
	const batch = writeBatch(db);

	objectsToAdd.forEach((object) => {
		const docRef = doc(collectionRef, object.title.toLowerCase());
		batch.set(docRef, object);
	});

	await batch.commit();
};

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
	const collectionRef = collection(db, 'categories');
	const q = query(collectionRef);

	const querySnapshot = await getDocs(q);

	return querySnapshot.docs.map(
		(docSnapshot) => docSnapshot.data() as Category
	);
};

export type AdditionalInformation = {
	displayName?: string;
};

export type UserData = {
	createdAt: Date;
	displayName: string;
	email: string;
};

export const createUserDocFromAuth = async (
	userAuth: User,
	additionalData = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
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
			console.log('Error creating user doc while Authentication: ', error);
		}
	}
	return userSnapshot as QueryDocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPassword = async (
	email: string,
	password: string
) => {
	if (!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserWithEmailAndPassword = async (
	email: string,
	password: string
) => {
	debugger;
	if (!email || !password) return;

	return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
	onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> => {
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
