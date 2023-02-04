import { useContext, useState } from 'react';
import { fieldNames, fieldLabels } from '../../util/constants/constants';
import {
	createUserDocFromAuth,
	signInUserWithEmailAndPassword,
	signInWithGooglePopup,
} from '../../util/firebase/firebase.util';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import './sign-in-form.styles.scss';
import { UserContext } from '../../context/user.context';

const defaultFormFields = {
	email: '',
	password: '',
};

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;
	const { setCurrentUser } = useContext(UserContext);

	const logInUser = (user) => {
		setCurrentUser(user);
		console.log('user logged in');
	};

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const onChangeHandler = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	var handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const { user } = await signInUserWithEmailAndPassword(email, password);
			// const userDocRef = await createUserDocFromAuth(user);
			console.log(user);
			if (user) logInUser(user);
			resetFormFields();
		} catch (error) {
			switch (error.code) {
				case 'auth/wrong-password':
					alert('Incorrect password. Please try again');
					break;
				case 'auth/user-not-found':
					alert('Email not found. Please sign up instead');
					break;
				default:
					debugger;
					alert('Login failed: ', error);
					break;
			}
		}
	};

	const logGoogleUser = async () => {
		const { user } = await signInWithGooglePopup();
		const userDocRef = await createUserDocFromAuth(user);
		if (userDocRef) logInUser(user);
	};

	return (
		<div className='sign-in-container'>
			<h2>Already have an account?</h2>
			<span>Sign in with your email & password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					required
					label={fieldLabels.email}
					type='email'
					name={fieldNames.email}
					value={email}
					onChange={onChangeHandler}
				/>
				<FormInput
					required
					label={fieldLabels.password}
					type='password'
					name={fieldNames.password}
					value={password}
					onChange={onChangeHandler}
				/>
				<div className='buttons-container'>
					<Button type='submit'>Sign In</Button>
					<Button type='button' onClick={logGoogleUser} buttonType='google'>
						Google Sign In
					</Button>
				</div>
			</form>
		</div>
	);
};

export default SignInForm;
