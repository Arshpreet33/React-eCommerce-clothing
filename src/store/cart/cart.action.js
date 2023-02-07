import { createAction } from '../../util/reducer/reducer.util';
import { CART_REDUCER_TYPES } from './cart.types';

export const setCartDropdownToggle = (bool) =>
	createAction(CART_REDUCER_TYPES.TOGGLE_CART_DROPDOWN, bool);

export const addItemToCart = (cartItems, productToAdd) => {
	return createAction(
		CART_REDUCER_TYPES.SET_CART_ITEMS,
		addCartItem(cartItems, productToAdd)
	);
};

export const removeItemFromCart = (
	cartItems,
	itemToRemove,
	removeItemCompletely
) => {
	if (cartItems.length === 0) return;
	return createAction(
		CART_REDUCER_TYPES.SET_CART_ITEMS,
		removeCartItem(cartItems, itemToRemove, removeItemCompletely)
	);
};

const addCartItem = (cartItems, productToAdd) => {
	const itemFound = cartItems.find((item) => item.id === productToAdd.id);
	if (itemFound) {
		return cartItems.map((item) =>
			item.id === productToAdd.id
				? { ...item, quantity: item.quantity + 1 }
				: item
		);
	}
	return [
		...cartItems,
		{
			...productToAdd,
			quantity: itemFound ? itemFound.quantity + 1 : 1,
		},
	];
};

const removeCartItem = (cartItems, itemToRemove, removeItemCompletely) => {
	const itemFound = cartItems.find((item) => item.id === itemToRemove.id);
	if (itemFound.quantity === 1 || removeItemCompletely) {
		return cartItems.filter((item) => {
			if (item.id !== itemToRemove.id) return item;
		});
	}
	return cartItems.map((item) =>
		item.id === itemToRemove.id
			? { ...item, quantity: item.quantity - 1 }
			: item
	);
};
