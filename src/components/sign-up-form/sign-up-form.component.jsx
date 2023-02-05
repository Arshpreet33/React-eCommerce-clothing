import { useContext, useState } from 'react';
import { fieldNames, fieldLabels } from '../../util/constants/constants';
import {
	createAuthUserWithEmailAndPassword,
	createUserDocFromAuth,
} from '../../util/firebase/firebase.util';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import './sign-up-form.styles.scss';
import { UserContext } from '../../context/user.context';

const defaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
};

const SignUpForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

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
			const { user } = await createAuthUserWithEmailAndPassword(
				email,
				password
			);
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
		<div className='sign-up-container'>
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
		</div>
	);
};

export default SignUpForm;
