import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router';
import './categories.styles.scss';
import Checkout from './components/checkout/checkout.component';
import Authentication from './routes/authentication/authentication.component';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Shop from './routes/shop/shop.component';
import { checkUserSession } from './store/user/user.action';

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(checkUserSession());
	}, [dispatch]);

	return (
		<div>
			<Routes>
				<Route path='/' element={<Navigation />}>
					{/*<Route path="home" element={<Home />} />*/}
					<Route index element={<Home />} />
					<Route path='/shop/*' element={<Shop />} />
					<Route path='/auth' element={<Authentication />} />
					<Route path='/checkout' element={<Checkout />} />
				</Route>
			</Routes>
		</div>
	);
};

export default App;
