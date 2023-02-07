import Button from '../button/button.component';
import {
	Footer,
	Name,
	Price,
	ProductCartContainer,
} from './product-card.styles';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';

const ProductCard = ({ product }) => {
	const { id, name, price, imageUrl } = product;

	const dispatch = useDispatch();
	const cartItems = useSelector(selectCartItems);

	const addToCartBtnHandler = () => dispatch(addItemToCart(cartItems, product));

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
