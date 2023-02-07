import {
	Arrow,
	BaseSpan,
	CheckoutItemContainer,
	ImageContainer,
	Quantity,
	RemoveButton,
	Value,
} from './checkout-item.styles';
import { useDispatch, useSelector } from 'react-redux';
import {
	addItemToCart,
	removeItemFromCart,
} from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';

const CheckoutItem = ({ cartItem }) => {
	const { name, price, imageUrl, quantity } = cartItem;

	const dispatch = useDispatch();
	const cartItems = useSelector(selectCartItems);

	const changeCartBtnHandler = (direction) => {
		switch (direction) {
			case 0:
				dispatch(removeItemFromCart(cartItems, cartItem, true));
				break;
			case 1:
				dispatch(addItemToCart(cartItems, cartItem));
				break;
			case -1:
				dispatch(removeItemFromCart(cartItems, cartItem));
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
