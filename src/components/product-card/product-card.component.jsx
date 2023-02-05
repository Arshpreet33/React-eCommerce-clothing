import Button from '../button/button.component';
import './product-card.styles.scss';
import { CartItemsContext } from '../../context/cart-items.context';
import { useContext } from 'react';

const ProductCard = ({ product }) => {
	const { id, name, price, imageUrl } = product;
	const { addItemToCart } = useContext(CartItemsContext);

	const addToCartBtnHandler = () => addItemToCart(product);

	return (
		<div className='product-card-container'>
			<img src={imageUrl} alt={name} />
			<div className='footer'>
				<span className='name'>{name}</span>
				<span className='price'>{price}</span>
			</div>
			<Button buttonType='inverted' onClick={addToCartBtnHandler}>
				Add To Cart
			</Button>
		</div>
	);
};

export default ProductCard;
