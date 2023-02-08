import {
	createAction,
	ActionWithPayload,
	withMatcher,
} from '../../util/reducer/reducer.util';
import { CartItem, CART_ACTION_TYPES } from './cart.types';
import { CategoryItem } from '../categories/category.types';

export type SetCartDropdownToggle = ActionWithPayload<
	CART_ACTION_TYPES.TOGGLE_CART_DROPDOWN,
	boolean
>;

export type SetCartItems = ActionWithPayload<
	CART_ACTION_TYPES.SET_CART_ITEMS,
	CartItem[]
>;

export const setCartDropdownToggle = withMatcher(
	(bool: boolean): SetCartDropdownToggle =>
		createAction(CART_ACTION_TYPES.TOGGLE_CART_DROPDOWN, bool)
);

export const setCartItems = withMatcher(
	(cartItems: CartItem[]): SetCartItems =>
		createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

export const addItemToCart = (
	cartItems: CartItem[],
	productToAdd: CategoryItem
) => {
	return setCartItems(addCartItem(cartItems, productToAdd));
};

export const removeItemFromCart = (
	cartItems: CartItem[],
	itemToRemove: CategoryItem,
	removeItemCompletely: boolean
) => {
	return setCartItems(
		removeCartItem(cartItems, itemToRemove, removeItemCompletely)
	);
};

const addCartItem = (
	cartItems: CartItem[],
	productToAdd: CategoryItem
): CartItem[] => {
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
			quantity: 1,
		},
	];
};

const removeCartItem = (
	cartItems: CartItem[],
	itemToRemove: CategoryItem,
	removeItemCompletely: boolean
) => {
	const itemFound = cartItems.find((item) => item.id === itemToRemove.id);
	if ((itemFound && itemFound.quantity === 1) || removeItemCompletely) {
		return cartItems.filter((item) => item.id !== itemToRemove.id);
	}
	return cartItems.map((item) =>
		item.id === itemToRemove.id
			? { ...item, quantity: item.quantity - 1 }
			: item
	);
};
