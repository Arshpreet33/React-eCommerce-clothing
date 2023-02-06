import { useContext } from 'react';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import { UserContext } from '../../context/user.context';
import { signOutUser } from '../../util/firebase/firebase.util';
import './navigation.styles';
import { CartItemsContext } from '../../context/cart-items.context';
import {
	LogoContainer,
	NavigationContainer,
	NavLinksContainer,
	NavLink,
} from './navigation.styles';

const Navigation = () => {
	const { currentUser } = useContext(UserContext);
	const { cartDropdownToggle } = useContext(CartItemsContext);

	const signOutHandler = async () => {
		await signOutUser();
	};

	return (
		<>
			<NavigationContainer>
				<LogoContainer to='/'>
					<CrownLogo className='logo' />
				</LogoContainer>
				<NavLinksContainer>
					<NavLink to='/'>Home</NavLink>
					<NavLink to='/shop'>Shop</NavLink>
					{currentUser ? (
						<NavLink as='span' onClick={signOutHandler}>
							SIGN OUT
						</NavLink>
					) : (
						<NavLink to='/auth'>SIGN IN</NavLink>
					)}
					<CartIcon />
				</NavLinksContainer>
				{cartDropdownToggle && <CartDropdown />}
			</NavigationContainer>
			<Outlet />
		</>
	);
};

export default Navigation;
