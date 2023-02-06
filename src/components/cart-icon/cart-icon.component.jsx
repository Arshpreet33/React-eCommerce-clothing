import { CartItemsContext } from '../../context/cart-items.context';
import { useContext } from 'react';
import { CartIconContainer, ItemCount, ShoppingIcon } from './cart-icon.styles';

const CartIcon = () => {
	const { cartDropdownToggle, setCartDropdownToggle, totalCartItems } =
		useContext(CartItemsContext);

	const shoppingIconBtnHandler = () => {
		setCartDropdownToggle(!cartDropdownToggle);
	};

	return (
		<CartIconContainer onClick={shoppingIconBtnHandler}>
			<ShoppingIcon />
			<ItemCount>{totalCartItems}</ItemCount>
		</CartIconContainer>
	);
};

export default CartIcon;
