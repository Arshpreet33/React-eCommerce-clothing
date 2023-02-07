import { takeLatest, put, all, call } from 'redux-saga/effects';
import USER_ACTION_TYPES from './user.types';
import {
	signInSuccess,
	signInFailed,
	checkUserSession,
	signUpFailed,
	signUpSuccess,
	signOutSuccess,
	sigOutFailed,
} from './user.action';
import {
	createUserDocFromAuth,
	getCurrentUser,
	signInUserWithEmailAndPassword,
	signInWithGooglePopup,
	signOutUser,
} from '../../util/firebase/firebase.util';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
	try {
		const userSnapshot = yield call(
			createUserDocFromAuth,
			userAuth,
			additionalData
		);
		yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
	} catch (error) {
		yield put(signInFailed(error));
	}
}

export function* isUserAuthenticated() {
	try {
		const userAuth = yield call(getCurrentUser);
		if (!userAuth) return;
		yield call(getSnapshotFromUserAuth, userAuth);
	} catch (error) {
		yield put(signInFailed(error));
	}
}

export function* onCheckUserSession() {
	yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* signInUserWithGooglePopup() {
	try {
		const userAuth = yield call(signInWithGooglePopup);
		if (!userAuth) return;
		yield call(getSnapshotFromUserAuth, userAuth.user);
	} catch (error) {
		yield put(signInFailed(error));
	}
}

export function* ongoogleSignInStart() {
	yield takeLatest(
		USER_ACTION_TYPES.GOOGLE_SIGN_IN_START,
		signInUserWithGooglePopup
	);
}

export function* signInUserWithEmail(action) {
	const { payload } = action;
	if (!payload) return;
	try {
		const { email, password } = payload;
		const userAuth = yield call(
			signInUserWithEmailAndPassword,
			email,
			password
		);
		if (!userAuth) return;
		const { user } = userAuth;
		yield call(getSnapshotFromUserAuth, user);
	} catch (error) {
		yield put(signInFailed(error));
	}
}

export function* onEmailSignInStart() {
	yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInUserWithEmail);
}

export function* signUpUser(action) {
	const { payload } = action;
	if (!payload) return;
	try {
		const { email, password, displayName } = payload;
		const userAuth = yield call(
			createUserWithEmailAndPassword,
			email,
			password
		);
		if (!userAuth) return;
		const { user } = userAuth;
		yield put(signUpSuccess(user, { displayName }));
	} catch (error) {
		yield put(signUpFailed(error));
	}
}

export function* onSignUpStart() {
	yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUpUser);
}

export function* signInAfterSignUp(action) {
	const { payload } = action;
	if (!payload) return;
	const { user, additionalData } = payload;
	yield call(getSnapshotFromUserAuth, user, additionalData);
}

export function* onSignUpSuccess() {
	yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* signOut() {
	try {
		yield call(signOutUser);
		yield put(signOutSuccess());
	} catch (error) {
		yield put(sigOutFailed(error));
	}
}

export function* onSignOutStart() {
	yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSagas() {
	yield all([
		call(onCheckUserSession),
		call(ongoogleSignInStart),
		call(onEmailSignInStart),
		call(onSignUpStart),
		call(onSignUpSuccess),
		call(onSignOutStart),
	]);
}
