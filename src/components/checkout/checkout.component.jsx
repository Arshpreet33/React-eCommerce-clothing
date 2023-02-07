import CheckoutItem from '../checkout-item/checkout-item.component';
import {
	CheckoutContainer,
	CheckoutHeader,
	HeaderBlock,
	TotalStyle,
} from './checkout.styles';
import { useSelector } from 'react-redux';
import {
	selectCartItems,
	selectCartTotalPrice,
} from '../../store/cart/cart.selector';

const Checkout = () => {
	const cartItems = useSelector(selectCartItems);
	const totalCheckoutPrice = useSelector(selectCartTotalPrice);

	const headerBlockItems = [
		'Product',
		'Description',
		'Quantity',
		'Price',
		'Remove',
	];

	return (
		<CheckoutContainer>
			<CheckoutHeader>
				{headerBlockItems.map((item, index) => (
					<HeaderBlock key={index}>{item}</HeaderBlock>
				))}
			</CheckoutHeader>
			{cartItems.map((item) => (
				<CheckoutItem key={item.id} cartItem={item} />
			))}
			{cartItems.length > 0 && (
				<TotalStyle>Total: ${totalCheckoutPrice}</TotalStyle>
			)}
		</CheckoutContainer>
	);
};

export default Checkout;
