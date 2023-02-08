import { CategoryItem } from '../categories/category.types';

export enum CART_ACTION_TYPES {
	TOGGLE_CART_DROPDOWN = 'cart/TOGGLE_CART_DROPDOWN',
	SET_CART_ITEMS = 'cart/SET_CART_ITEMS',
}

export type CartItem = CategoryItem & {
	quantity: number;
};
