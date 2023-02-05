import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ProductCard from '../../components/product-card/product-card.component';
import { CategoriesContext } from '../../context/categories.context';
import './category.styles.scss';

const Category = () => {
	const { category } = useParams();
	const { categoriesMap } = useContext(CategoriesContext);
	const [products, setproducts] = useState(categoriesMap[category]);

	useEffect(() => {
		setproducts(categoriesMap[category]);
	}, [category, categoriesMap]);

	return (
		<>
			<h2 className='category-title'>{category.toUpperCase()}</h2>
			<div className='category-container'>
				{products &&
					products.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
			</div>
		</>
	);
};

export default Category;
