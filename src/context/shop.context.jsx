import { createContext, useState } from 'react';
import SHOP_DATA from '../shop-data.json';

//Actual value we want to access. - default value
export const ProductContext = createContext({
	products: [],
});

export const ProductProvider = ({ children }) => {
	const [currentProduct, setCurrentProduct] = useState(SHOP_DATA);
	const value = { currentProduct, setCurrentProduct };

	return (
		<ProductContext.Provider value={value}>{children}</ProductContext.Provider>
	);
};
