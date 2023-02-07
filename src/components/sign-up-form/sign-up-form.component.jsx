import { useState } from 'react';
import { fieldNames, fieldLabels } from '../../util/constants/constants';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { SignUpContainer } from './sign-up-form.styles';
import { useDispatch } from 'react-redux';
import { signUpStart } from '../../store/user/user.action';

const defaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
};

const SignUpForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;
	const dispatch = useDispatch();

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const onChangeHandler = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	var handleSubmit = async (event) => {
		event.preventDefault();
		if (password !== confirmPassword) {
			alert('Passwords do not match');
			return;
		}
		try {
			dispatch(signUpStart(email, password));
			// const { user } = await createAuthUserWithEmailAndPassword(
			// 	email,
			// 	password
			// );
			resetFormFields();
		} catch (error) {
			if (error.code === 'auth/email-already-in-use') {
				alert(
					'Email already exists. Please sign-in or use different email in sign-up'
				);
			}
			console.log('User creation encountered an error: ', error);
		}
	};

	return (
		<SignUpContainer>
			<h2>Don't have an account?</h2>
			<span>Sign up with your email & password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					required
					label={fieldLabels.displayName}
					type='text'
					name={fieldNames.displayName}
					value={displayName}
					onChange={onChangeHandler}
				/>

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
				<FormInput
					required
					label={fieldLabels.confirmPassword}
					type='password'
					name={fieldNames.confirmPassword}
					value={confirmPassword}
					onChange={onChangeHandler}
				/>

				<Button type='submit'>Sign Up</Button>
			</form>
		</SignUpContainer>
	);
};

export default SignUpForm;
