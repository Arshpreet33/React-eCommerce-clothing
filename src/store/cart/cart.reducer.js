import { CART_REDUCER_TYPES } from './cart.types';

const CART_INITIAL_STATE = {
	cartItems: [],
	cartDropdownToggle: false,
};

export const cartReducer = (state = CART_INITIAL_STATE, action = {}) => {
	const { type, payload } = action;

	switch (type) {
		case CART_REDUCER_TYPES.SET_CART_ITEMS:
			return {
				...state,
				cartItems: payload,
			};
		case CART_REDUCER_TYPES.TOGGLE_CART_DROPDOWN:
			return { ...state, cartDropdownToggle: payload };
		default:
			return state;
	}
};
