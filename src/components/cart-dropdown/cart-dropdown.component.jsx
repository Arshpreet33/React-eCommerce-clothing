import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { CartItemsContext } from '../../context/cart-items.context';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	CartDropdownContainer,
	CartItems,
	EmptyMessage,
} from './cart-dropdown.styles';

const CartDropdown = () => {
	const { cartItems } = useContext(CartItemsContext);
	const navigate = useNavigate();

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
