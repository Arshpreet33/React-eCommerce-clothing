import { createContext, useEffect, useState } from 'react';

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

//Actual value we want to access. - default value
export const CartItemsContext = createContext({
	cartItems: [],
	setCartItems: () => () => {},
	cartDropdownToggle: false,
	setCartDropdownToggle: () => {},
	addItemToCart: () => {},
	removeItemFromCart: () => {},
	totalCartItems: 0,
	totalCheckoutPrice: 0,
});

export const CartItemsProvider = ({ children }) => {
	const [cartItems, setCartItems] = useState([]);
	const [cartDropdownToggle, setCartDropdownToggle] = useState(false);
	const [totalCartItems, setTotalCartItems] = useState(false);
	const [totalCheckoutPrice, setTotalCheckoutPrice] = useState(false);

	useEffect(() => {
		const newCartCount = cartItems.reduce(
			(total, item) => total + item.quantity,
			0
		);
		setTotalCartItems(newCartCount);
	}, [cartItems]);

	useEffect(() => {
		const newCheckoutTotal = cartItems.reduce(
			(total, item) => total + item.quantity * item.price,
			0
		);
		setTotalCheckoutPrice(newCheckoutTotal);
	}, [cartItems]);

	const addItemToCart = (productToAdd) => {
		setCartItems(addCartItem(cartItems, productToAdd));
	};

	const removeItemFromCart = (itemToRemove, removeItemCompletely) => {
		if (cartItems.length === 0) return;

		setCartItems(removeCartItem(cartItems, itemToRemove, removeItemCompletely));
	};

	const value = {
		cartItems,
		setCartItems,
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
