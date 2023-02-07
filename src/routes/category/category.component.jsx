import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import ProductCard from '../../components/product-card/product-card.component';
import { CategoryContainer, CategoryTitle } from './category.styles';
import { selectCategoriesMap } from '../../store/categories/category.selector.js';

const Category = () => {
	const { category } = useParams();
	const categoriesMap = useSelector(selectCategoriesMap);
	const [products, setproducts] = useState(categoriesMap[category]);

	useEffect(() => {
		setproducts(categoriesMap[category]);
	}, [category, categoriesMap]);

	return (
		<>
			<CategoryTitle>{category.toUpperCase()}</CategoryTitle>
			<CategoryContainer>
				{products &&
					products.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
			</CategoryContainer>
		</>
	);
};

export default Category;
