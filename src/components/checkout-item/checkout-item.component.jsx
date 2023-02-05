import { useContext } from 'react';
import { CartItemsContext } from '../../context/cart-items.context';
import Button from '../button/button.component';
import './checkout-item.styles.scss';

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
		<div className='checkout-item-container'>
			<span className='image-container'>
				<img src={imageUrl} alt={name} />
			</span>
			<span className='name'>{name}</span>
			<span className='quantity'>
				<span className='arrow' onClick={() => changeCartBtnHandler(-1)}>
					&#10094;
				</span>
				<span className='value'> {quantity} </span>
				<span className='arrow' onClick={() => changeCartBtnHandler(1)}>
					&#10095;
				</span>
			</span>
			<span className='price'>${price}</span>
			<span className='remove-button' onClick={() => changeCartBtnHandler(0)}>
				&#10005;
			</span>
		</div>
	);
};

export default CheckoutItem;
