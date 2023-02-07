import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import { getCategoriesAndDocuments } from '../../util/firebase/firebase.util';
import { setCategories } from '../../store/categories/category.action';

const Shop = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const getCategoryMap = async () => {
			const categoriesArray = await getCategoriesAndDocuments();
			dispatch(setCategories(categoriesArray));
		};

		getCategoryMap();
	}, []);

	return (
		<Routes>
			<Route index element={<CategoriesPreview />} />
			<Route path=':category' element={<Category />} />
		</Routes>
	);
};

export default Shop;
