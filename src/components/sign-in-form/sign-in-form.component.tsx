import { useState } from 'react';
import { FormEvent, ChangeEvent } from 'react';
import { fieldNames, fieldLabels } from '../../util/constants/constants';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { ButtonsContainer, SignInContainer } from './sign-in-form.styles';
import { useDispatch } from 'react-redux';
import {
	googleSignInStart,
	emailSignInStart,
} from '../../store/user/user.action';
import { AuthError, AuthErrorCodes } from 'firebase/auth';

const defaultFormFields = {
	email: '',
	password: '',
};

const SignInForm = () => {
	const dispatch = useDispatch();
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	var handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			dispatch(emailSignInStart(email, password));
			resetFormFields();
		} catch (error) {
			console.log('Login failed: ', error);
			switch ((error as AuthError).code) {
				case AuthErrorCodes.INVALID_PASSWORD:
					// 'auth/wrong-password':
					alert('Incorrect password. Please try again');
					break;
				case AuthErrorCodes.INVALID_EMAIL:
					// 'auth/user-not-found':
					alert('Email not found. Please sign up instead');
					break;
				default:
					console.log('Login failed: ', error);
					break;
			}
		}
	};

	const logGoogleUser = async () => {
		dispatch(googleSignInStart());
	};

	return (
		<SignInContainer>
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
				<ButtonsContainer>
					<Button type='submit'>Sign In</Button>
					<Button
						type='button'
						onClick={logGoogleUser}
						buttonType={BUTTON_TYPE_CLASSES.google}
					>
						Google Sign In
					</Button>
				</ButtonsContainer>
			</form>
		</SignInContainer>
	);
};

export default SignInForm;
