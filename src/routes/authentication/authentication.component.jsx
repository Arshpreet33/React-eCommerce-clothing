// import { useContext } from 'react';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
// import { UserContext } from '../../context/user.context';
import './authentication.styles.scss';

const Authentication = () => {
	// const { setCurrentUser } = useContext(UserContext);

	// const logInUserContext = (user) => {
	// 	debugger;
	// 	setCurrentUser(user);
	// 	console.log('user logged in');
	// };
	// const logOutUserContext = (user) => {
	// 	setCurrentUser(null);
	// 	console.log('user logged out');
	// };

	return (
		<div className='authentication-container'>
			<SignInForm />
			<SignUpForm />
		</div>
	);
};

export default Authentication;
