import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import './cart-dropdown.styles.scss';
import { CartItemsContext } from '../../context/cart-items.context';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const CartDropdown = () => {
	const { cartItems } = useContext(CartItemsContext);
	const navigate = useNavigate();

	const goToCheckOutBtnHandler = () => {
		navigate('/checkout');
	};

	return (
		<div className='cart-dropdown-container'>
			<div className='cart-items'>
				{cartItems.map((item) => (
					<CartItem key={item.id} cartItem={item} />
				))}
			</div>
			<Button onClick={goToCheckOutBtnHandler}>Go To Checkout</Button>
		</div>
	);
};

export default CartDropdown;
