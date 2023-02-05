import './cart-item.styles.scss';
// import { CartItemsContext } from '../../context/cart-items.context';
// import { useContext } from 'react';

const CartItem = ({ cartItem }) => {
	// const { cartItems, setCartItems } = useContext(CartItemsContext);
	const { name, price, imageUrl, quantity } = cartItem;

	return (
		<div className='cart-item-container'>
			<img src={imageUrl} alt={name} />
			<div className='item-details'>
				<span className='name'>{name}</span>
				<span className='price'>
					{quantity} x {price}
				</span>
			</div>
			<span>{quantity}</span>
		</div>
	);
};

export default CartItem;
