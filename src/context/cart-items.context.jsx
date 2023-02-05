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

const removeCartItem = (cartItems, itemToRemove) => {};

//Actual value we want to access. - default value
export const CartItemsContext = createContext({
	cartItems: [],
	setCartItems: () => () => {},
	cartDropdownToggle: false,
	setCartDropdownToggle: () => {},
	addItemToCart: () => {},
	totalCartItems: 0,
});

export const CartItemsProvider = ({ children }) => {
	const [cartItems, setCartItems] = useState([]);
	const [cartDropdownToggle, setCartDropdownToggle] = useState(false);
	const [totalCartItems, setTotalCartItems] = useState(false);

	useEffect(() => {
		const newCartCount = cartItems.reduce(
			(total, item) => total + item.quantity,
			0
		);
		setTotalCartItems(newCartCount);
	}, [cartItems]);

	const addItemToCart = (productToAdd) => {
		setCartItems(addCartItem(cartItems, productToAdd));
	};

	const removeItemFromCart = (productToRemove) => {
		if (cartItems.length === 0) return;

		setCartItems(removeCartItem(cartItems, productToRemove));
	};

	const value = {
		cartItems,
		setCartItems,
		cartDropdownToggle,
		setCartDropdownToggle,
		addItemToCart,
		removeItemFromCart,
		totalCartItems,
	};

	return (
		<CartItemsContext.Provider value={value}>
			{children}
		</CartItemsContext.Provider>
	);
};
