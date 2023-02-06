import { createContext, useEffect, useState } from 'react';
import SHOP_DATA from '../shop-data';
import {
	addCollectionAndDocuments,
	getCategoriesAndDocuments,
} from '../util/firebase/firebase.util';

//Actual value we want to access. - default value
export const CategoriesContext = createContext({
	categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
	const [categoriesMap, setCategoriesMap] = useState({});
	const value = { categoriesMap };

	// useEffect(() => {
	// 	addCollectionAndDocuments('categories', SHOP_DATA);
	// }, []);

	useEffect(() => {
		const getCategoryMap = async () => {
			const categoryMap = await getCategoriesAndDocuments();
			setCategoriesMap(categoryMap);
		};

		getCategoryMap();
	}, []);

	return (
		<CategoriesContext.Provider value={value}>
			{children}
		</CategoriesContext.Provider>
	);
};
