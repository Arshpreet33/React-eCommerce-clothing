import { createContext, useReducer } from 'react';
import { createAction } from '../util/reducer/reducer.util';

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

const calculateCartCount = (cartItems) => {
	return cartItems.reduce((total, item) => total + item.quantity, 0);
};

const calculateCartTotalPrice = (cartItems) => {
	return cartItems.reduce(
		(total, item) => total + item.quantity * item.price,
		0
	);
};

//Actual value we want to access. - default value
export const CartItemsContext = createContext({
	cartItems: [],
	cartDropdownToggle: false,
	setCartDropdownToggle: () => {},
	addItemToCart: () => {},
	removeItemFromCart: () => {},
	totalCartItems: 0,
	totalCheckoutPrice: 0,
});

const INITIAL_STATE = {
	cartItems: [],
	cartDropdownToggle: false,
	totalCartItems: 0,
	totalCheckoutPrice: 0,
};

const CART_REDUCER_TYPES = {
	TOGGLE_CART_DROPDOWN: 'TOGGLE_CART_DROPDOWN',
	SET_CART_ITEMS: 'SET_CART_ITEMS',
};

const cartReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case CART_REDUCER_TYPES.SET_CART_ITEMS:
			return {
				...state,
				...payload,
			};
		case CART_REDUCER_TYPES.TOGGLE_CART_DROPDOWN:
			return { ...state, cartDropdownToggle: payload };
		default:
			throw new Error('Unexpected type encountered in Cart Reducer: ', type);
	}
};

export const CartItemsProvider = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
	const { cartItems, cartDropdownToggle, totalCartItems, totalCheckoutPrice } =
		state;

	const setCartDropdownToggle = () => {
		dispatch(
			createAction(CART_REDUCER_TYPES.TOGGLE_CART_DROPDOWN, !cartDropdownToggle)
		);
	};

	const updateCartItemsReducer = (newCartItems) => {
		const newCartCount = calculateCartCount(newCartItems);
		const newCartTotalPrice = calculateCartTotalPrice(newCartItems);
		dispatch(
			createAction(CART_REDUCER_TYPES.SET_CART_ITEMS, {
				cartItems: newCartItems,
				totalCartItems: newCartCount,
				totalCheckoutPrice: newCartTotalPrice,
			})
		);
	};

	const addItemToCart = (productToAdd) => {
		updateCartItemsReducer(addCartItem(cartItems, productToAdd));
	};

	const removeItemFromCart = (itemToRemove, removeItemCompletely) => {
		if (cartItems.length === 0) return;

		updateCartItemsReducer(
			removeCartItem(cartItems, itemToRemove, removeItemCompletely)
		);
	};

	const value = {
		cartItems,
		cartDropdownToggle,
		setCartDropdownToggle,
		addItemToCart,
		removeItemFromCart,
		totalCartItems,
		totalCheckoutPrice,
	};

	return (
		<CartItemsContext.Provider value={value}>
			{children}
		</CartItemsContext.Provider>
	);
};
