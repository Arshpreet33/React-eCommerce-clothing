import { useContext } from 'react';
import { CartItemsContext } from '../../context/cart-items.context';
import CheckoutItem from '../checkout-item/checkout-item.component';
import './checkout.styles.scss';

const Checkout = () => {
	const { cartItems, totalCheckoutPrice } = useContext(CartItemsContext);

	const headerBlockItems = [
		'Product',
		'Description',
		'Quantity',
		'Price',
		'Remove',
	];

	return (
		<div className='checkout-container'>
			<div className='checkout-header'>
				{headerBlockItems.map((item, index) => (
					<div className='header-block' key={index}>
						{item}
					</div>
				))}
			</div>
			{cartItems.map((item) => (
				<CheckoutItem key={item.id} cartItem={item} />
			))}
			{cartItems.length > 0 && (
				<div className='total'>Total: ${totalCheckoutPrice}</div>
			)}
		</div>
	);
};

export default Checkout;
