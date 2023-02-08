import { takeLatest, put, all, call } from 'typed-redux-saga/macro';
import { USER_ACTION_TYPES } from './user.types';
import {
	signInSuccess,
	signInFailed,
	signUpFailed,
	signUpSuccess,
	signOutSuccess,
	sigOutFailed,
	EmailSignInStart,
	SignUpStart,
	SignUpSuccess,
} from './user.action';
import {
	createUserDocFromAuth,
	getCurrentUser,
	signInUserWithEmailAndPassword,
	signInWithGooglePopup,
	signOutUser,
	AdditionalInformation,
	createAuthUserWithEmailAndPassword,
} from '../../util/firebase/firebase.util';
import { User } from 'firebase/auth';

export function* getSnapshotFromUserAuth(
	userAuth: User,
	additionalData?: AdditionalInformation
) {
	try {
		const userSnapshot = yield* call(
			createUserDocFromAuth,
			userAuth,
			additionalData
		);
		if (userSnapshot)
			yield* put(
				signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
			);
	} catch (error) {
		yield* put(signInFailed(error as Error));
	}
}

export function* isUserAuthenticated() {
	try {
		const userAuth = yield* call(getCurrentUser);
		if (!userAuth) return;
		yield* call(getSnapshotFromUserAuth, userAuth);
	} catch (error) {
		yield* put(signInFailed(error as Error));
	}
}

export function* onCheckUserSession() {
	yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* signInUserWithGooglePopup() {
	try {
		const userAuth = yield* call(signInWithGooglePopup);
		if (!userAuth) return;
		yield* call(getSnapshotFromUserAuth, userAuth.user);
	} catch (error) {
		yield* put(signInFailed(error as Error));
	}
}

export function* ongoogleSignInStart() {
	yield* takeLatest(
		USER_ACTION_TYPES.GOOGLE_SIGN_IN_START,
		signInUserWithGooglePopup
	);
}

export function* signInUserWithEmail(action: EmailSignInStart) {
	const { payload } = action;
	if (!payload) return;
	try {
		const { email, password } = payload;
		const userAuth = yield* call(
			signInUserWithEmailAndPassword,
			email,
			password
		);
		if (!userAuth) return;
		const { user } = userAuth;
		yield* call(getSnapshotFromUserAuth, user);
	} catch (error) {
		yield* put(signInFailed(error as Error));
	}
}

export function* onEmailSignInStart() {
	yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInUserWithEmail);
}

export function* signUpUser(action: SignUpStart) {
	const { payload } = action;
	if (!payload) return;
	try {
		const { email, password, displayName } = payload;
		const userAuth = yield* call(
			createAuthUserWithEmailAndPassword,
			email,
			password
		);
		if (!userAuth) return;
		const { user } = userAuth;
		yield* put(signUpSuccess(user, { displayName }));
	} catch (error) {
		yield* put(signUpFailed(error as Error));
	}
}

export function* onSignUpStart() {
	yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUpUser);
}

export function* signInAfterSignUp(action: SignUpSuccess) {
	const { payload } = action;
	if (!payload) return;
	const { user, additionalData } = payload;
	yield* call(getSnapshotFromUserAuth, user, additionalData);
}

export function* onSignUpSuccess() {
	yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* signOut() {
	try {
		yield* call(signOutUser);
		yield* put(signOutSuccess());
	} catch (error) {
		yield* put(sigOutFailed(error as Error));
	}
}

export function* onSignOutStart() {
	yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSagas() {
	yield* all([
		call(onCheckUserSession),
		call(ongoogleSignInStart),
		call(onEmailSignInStart),
		call(onSignUpStart),
		call(onSignUpSuccess),
		call(onSignOutStart),
	]);
}
