import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { useNavigate } from 'react-router-dom';
import {
	CartDropdownContainer,
	CartItems,
	EmptyMessage,
} from './cart-dropdown.styles';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';

const CartDropdown = () => {
	const navigate = useNavigate();
	const cartItems = useSelector(selectCartItems);

	const goToCheckOutBtnHandler = () => {
		navigate('/checkout');
	};

	return (
		<CartDropdownContainer>
			<CartItems>
				{cartItems.length ? (
					cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
				) : (
					<EmptyMessage>Your Cart is empty</EmptyMessage>
				)}
			</CartItems>
			<Button onClick={goToCheckOutBtnHandler}>Go To Checkout</Button>
		</CartDropdownContainer>
	);
};

export default CartDropdown;
