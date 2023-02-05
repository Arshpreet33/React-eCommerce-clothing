import { ReactComponent as ShoppingItem } from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';
import { CartItemsContext } from '../../context/cart-items.context';
import { useContext } from 'react';

const CartIcon = () => {
	const { cartDropdownToggle, setCartDropdownToggle } =
		useContext(CartItemsContext);

	const shoppingIconBtnHandler = () => {
		setCartDropdownToggle(!cartDropdownToggle);
	};

	return (
		<div className='cart-icon-container' onClick={shoppingIconBtnHandler}>
			<ShoppingItem className='shopping-icon' />
			<span className='item-count'>0</span>
		</div>
	);
};

export default CartIcon;
