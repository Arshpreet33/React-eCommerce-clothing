import {
	Footer,
	Name,
	Price,
	ProductCartContainer,
} from './product-card.styles';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';

import { CategoryItem } from '../../store/categories/category.types';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { FC } from 'react';

type ProductCardProps = {
	product: CategoryItem;
};

const ProductCard: FC<ProductCardProps> = ({ product }) => {
	const { name, price, imageUrl } = product;

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
			<Button
				buttonType={BUTTON_TYPE_CLASSES.inverted}
				onClick={addToCartBtnHandler}
			>
				Add To Cart
			</Button>
		</ProductCartContainer>
	);
};

export default ProductCard;
