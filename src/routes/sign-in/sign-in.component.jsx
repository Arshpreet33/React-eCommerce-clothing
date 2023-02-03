import {
  signInWithGooglePopup,
  createUserDocFromAuth,
} from '../../util/firebase/firebase.util';

const SignIn = () => {
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    const userDocRef = await createUserDocFromAuth(response.user);
  };

  return (
    <div>
      <h1>This is a sign-in page</h1>
      <button onClick={logGoogleUser}>Sign-in with google popup</button>
    </div>
  );
};

export default SignIn;
