import { CartItem } from './cart.types';
import { AnyAction } from 'redux';
import { setCartDropdownToggle, setCartItems } from './cart.action';

export type CartState = {
	readonly cartItems: CartItem[];
	readonly cartDropdownToggle: boolean;
};

const CART_INITIAL_STATE: CartState = {
	cartItems: [],
	cartDropdownToggle: false,
};

export const cartReducer = (
	state = CART_INITIAL_STATE,
	action: AnyAction
): CartState => {
	if (setCartDropdownToggle.match(action))
		return {
			...state,
			cartDropdownToggle: action.payload,
		};
	if (setCartItems.match(action))
		return {
			...state,
			cartItems: action.payload,
		};

	return state;
};
