import { USER_ACTION_TYPES } from './user.types';
import {
	signInFailed,
	signInSuccess,
	signOutSuccess,
	signUpFailed,
	sigOutFailed,
} from './user.action';
import { AnyAction } from 'redux';
import { UserData } from '../../util/firebase/firebase.util';

export type UserState = {
	readonly currentUser: UserData | null;
	readonly isLoading: boolean;
	readonly error: Error | null;
};

const INITIAL_STATE: UserState = {
	currentUser: null,
	isLoading: false,
	error: null,
};

export const userReducer = (
	state = INITIAL_STATE,
	action: AnyAction
): UserState => {
	if (signInSuccess.match(action))
		return { ...state, currentUser: action.payload };
	if (signOutSuccess.match(action)) return { ...state, currentUser: null };
	if (
		signInFailed.match(action) ||
		signUpFailed.match(action) ||
		sigOutFailed.match(action)
	)
		return { ...state, error: action.payload };
	return state;
};
