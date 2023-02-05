import { useContext } from 'react';
import ProductCard from '../../components/product-card/product-card.component';
import { ProductContext } from '../../context/shop.context';
import './shop.styles.scss';

const Shop = () => {
	const { currentProduct } = useContext(ProductContext);

	return (
		<div className='products-container'>
			{currentProduct.map((product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</div>
	);
};

export default Shop;
