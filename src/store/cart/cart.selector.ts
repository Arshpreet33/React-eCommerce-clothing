import { createSelector } from 'reselect';
import { RootState } from '../store';
import { CartState } from './cart.reducer';

const selectCartReducer = (state: RootState): CartState => state.cart;

export const selectCartItems = createSelector(
	[selectCartReducer],
	(cart) => cart.cartItems
);

export const selectCartDropdownToggle = createSelector(
	[selectCartReducer],
	(cart) => cart.cartDropdownToggle
);

export const selectCartItemsCount = createSelector(
	[selectCartReducer],
	(cart) => cart.cartItems.reduce((total, item) => total + item.quantity, 0)
);

export const selectCartTotalPrice = createSelector(
	[selectCartReducer],
	(cart) =>
		cart.cartItems.reduce(
			(total, item) => total + item.quantity * item.price,
			0
		)
);
