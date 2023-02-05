import { createContext, useState, useEffect } from 'react';
import {
	createUserDocFromAuth,
	onAuthStateChangedListener,
} from '../util/firebase/firebase.util';

//Actual value we want to access. - default value
export const UserContext = createContext({
	currentUser: null,
	setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const value = { currentUser, setCurrentUser };

	useEffect(() => {
		const unsubcribe = onAuthStateChangedListener((user) => {
			if (user) {
				createUserDocFromAuth(user);
			}
			setCurrentUser(user);
		});

		return unsubcribe;
	}, []);

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
