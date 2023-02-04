import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import {
	signInWithGooglePopup,
	createUserDocFromAuth,
} from '../../util/firebase/firebase.util';

const SignIn = () => {
	const logGoogleUser = async () => {
		const { user } = await signInWithGooglePopup();
		const userDocRef = await createUserDocFromAuth(user);
	};

	return (
		<div>
			<h1>This is a sign-in page</h1>
			<button onClick={logGoogleUser}>Sign-in with google popup</button>
			<SignUpForm />
		</div>
	);
};

export default SignIn;
