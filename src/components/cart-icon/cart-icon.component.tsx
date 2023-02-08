import { useDispatch, useSelector } from 'react-redux';
import { setCartDropdownToggle } from '../../store/cart/cart.action';
import {
	selectCartDropdownToggle,
	selectCartItemsCount,
} from '../../store/cart/cart.selector';
import { CartIconContainer, ItemCount, ShoppingIcon } from './cart-icon.styles';

const CartIcon = () => {
	const dispatch = useDispatch();

	const cartDropdownToggle = useSelector(selectCartDropdownToggle);
	const totalCartItems = useSelector(selectCartItemsCount);

	const shoppingIconBtnHandler = () => {
		dispatch(setCartDropdownToggle(!cartDropdownToggle));
	};

	return (
		<CartIconContainer onClick={shoppingIconBtnHandler}>
			<ShoppingIcon />
			<ItemCount>{totalCartItems}</ItemCount>
		</CartIconContainer>
	);
};

export default CartIcon;
