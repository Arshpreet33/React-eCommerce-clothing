import Button from '../button/button.component';
import './cart-dropdown.styles.scss';
import { CartItemsContext } from '../../context/cart-items.context';
import { useContext } from 'react';

const CartDropdown = () => {
	const { cartItems } = useContext(CartItemsContext);

	return (
		<div className='cart-dropdown-container'>
			<div className='cart-items'>{cartItems}</div>
			<Button>Go To Checkout</Button>
		</div>
	);
};

export default CartDropdown;
