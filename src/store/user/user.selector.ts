import { UserState } from './user.reducer';
import { createSelector } from 'reselect';
import { RootState } from '../store';

const selectUserReducer = (state: RootState): UserState => state.user;

export const selectCurrentUser = createSelector(
	[selectUserReducer],
	(userSlice) => userSlice.currentUser
);
