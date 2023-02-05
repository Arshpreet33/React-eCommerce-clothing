import { createContext, useState } from 'react';

//Actual value we want to access. - default value
export const CartItemsContext = createContext({
	cartItems: [],
	setCartItems: () => null,
	cartDropdownToggle: false,
	setCartDropdownToggle: () => {},
});

export const CartItemsProvider = ({ children }) => {
	const [cartItems, setCartItems] = useState([]);
	const [cartDropdownToggle, setCartDropdownToggle] = useState(false);
	const value = {
		cartItems,
		setCartItems,
		cartDropdownToggle,
		setCartDropdownToggle,
	};

	return (
		<CartItemsContext.Provider value={value}>
			{children}
		</CartItemsContext.Provider>
	);
};
