import {
	BaseButton,
	GoogleSigninButton,
	InvertedButton,
	LoadingSpinner,
} from './button.styles';

export const BUTTON_TYPE_CLASSES = {
	base: 'base',
	google: 'google-sign-in',
	inverted: 'inverted',
};

const getButton = (buttonType = 'base') =>
	({
		[BUTTON_TYPE_CLASSES.base]: BaseButton,
		[BUTTON_TYPE_CLASSES.google]: GoogleSigninButton,
		[BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
	}[buttonType]);

const Button = ({ children, buttonType, isLoading, ...otherProps }) => {
	const CustomButton = getButton(buttonType);
	return (
		<CustomButton disabled={isLoading} {...otherProps}>
			{isLoading ? <LoadingSpinner /> : children}
		</CustomButton>
	);
};

export default Button;
