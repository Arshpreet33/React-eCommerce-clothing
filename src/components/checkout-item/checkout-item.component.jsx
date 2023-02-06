import { useContext } from 'react';
import { Value } from 'sass';
import { CartItemsContext } from '../../context/cart-items.context';
import {
	Arrow,
	BaseSpan,
	CheckoutItemContainer,
	ImageContainer,
	Quantity,
	RemoveButton,
} from './checkout-item.styles';

const CheckoutItem = ({ cartItem }) => {
	const { name, price, imageUrl, quantity } = cartItem;
	const { addItemToCart, removeItemFromCart } = useContext(CartItemsContext);

	const changeCartBtnHandler = (direction) => {
		switch (direction) {
			case 0:
				removeItemFromCart(cartItem, true);
				break;
			case 1:
				addItemToCart(cartItem);
				break;
			case -1:
				removeItemFromCart(cartItem);
				break;
			default:
				break;
		}
	};

	return (
		<CheckoutItemContainer>
			<ImageContainer>
				<img src={imageUrl} alt={name} />
			</ImageContainer>
			<BaseSpan>{name}</BaseSpan>
			<Quantity>
				<Arrow onClick={() => changeCartBtnHandler(-1)}>&#10094;</Arrow>
				<Value> {quantity} </Value>
				<Arrow onClick={() => changeCartBtnHandler(1)}>&#10095;</Arrow>
			</Quantity>
			<BaseSpan>${price}</BaseSpan>
			<RemoveButton onClick={() => changeCartBtnHandler(0)}>
				&#10005;
			</RemoveButton>
		</CheckoutItemContainer>
	);
};

export default CheckoutItem;
