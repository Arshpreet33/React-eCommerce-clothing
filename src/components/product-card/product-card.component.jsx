import Button from '../button/button.component';
import { CartItemsContext } from '../../context/cart-items.context';
import { useContext } from 'react';
import {
	Footer,
	Name,
	Price,
	ProductCartContainer,
} from './product-card.styles';

const ProductCard = ({ product }) => {
	const { id, name, price, imageUrl } = product;
	const { addItemToCart } = useContext(CartItemsContext);

	const addToCartBtnHandler = () => addItemToCart(product);

	return (
		<ProductCartContainer>
			<img src={imageUrl} alt={name} />
			<Footer>
				<Name>{name}</Name>
				<Price>{price}</Price>
			</Footer>
			<Button buttonType='inverted' onClick={addToCartBtnHandler}>
				Add To Cart
			</Button>
		</ProductCartContainer>
	);
};

export default ProductCard;
