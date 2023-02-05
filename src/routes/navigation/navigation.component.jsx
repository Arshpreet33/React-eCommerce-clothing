import { useContext } from 'react';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import { UserContext } from '../../context/user.context';
import { signOutUser } from '../../util/firebase/firebase.util';
import './navigation.styles.scss';
import { CartItemsContext } from '../../context/cart-items.context';

const Navigation = () => {
	const { currentUser } = useContext(UserContext);
	const { cartDropdownToggle } = useContext(CartItemsContext);

	const signOutHandler = async () => {
		await signOutUser();
	};

	return (
		<>
			<div className='navigation'>
				<Link className='logo-container' to='/'>
					<CrownLogo className='logo' />
				</Link>
				<div className='nav-links-container'>
					<Link className='nav-link' to='/'>
						Home
					</Link>
					<Link className='nav-link' to='/shop'>
						Shop
					</Link>
					{currentUser ? (
						<span className='nav-link' onClick={signOutHandler}>
							SIGN OUT
						</span>
					) : (
						<Link className='nav-link' to='/auth'>
							SIGN IN
						</Link>
					)}
					<CartIcon />
				</div>
				{cartDropdownToggle && <CartDropdown />}
			</div>
			<Outlet />
		</>
	);
};

export default Navigation;
