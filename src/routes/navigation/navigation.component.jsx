import { useContext } from 'react';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import { UserContext } from '../../context/user.context';
import { signOutUser } from '../../util/firebase/firebase.util';
import './navigation.styles.scss';

const Navigation = () => {
	const { currentUser } = useContext(UserContext);

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
					<Link className='nav-link' to='/home'>
						Home
					</Link>
					{currentUser ? (
						<span className='nav-link' onClick={signOutHandler}>
							SIGN OUT
						</span>
					) : (
						<Link className='nav-link' to='/sign-in'>
							SIGN IN
						</Link>
					)}
				</div>
			</div>
			<Outlet />
		</>
	);
};

export default Navigation;
