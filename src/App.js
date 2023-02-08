import { useEffect, lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router';
import './categories.styles.scss';
import { checkUserSession } from './store/user/user.action';
import Spinner from './components/spinner/spinner.component';

// import Navigation from './routes/navigation/navigation.component';
// import Checkout from './components/checkout/checkout.component';
// import Authentication from './routes/authentication/authentication.component';
// import Home from './routes/home/home.component';
// import Shop from './routes/shop/shop.component';

const Navigation = lazy(() =>
	import('./routes/navigation/navigation.component')
);
const Home = lazy(() => import('./routes/home/home.component'));
const Shop = lazy(() => import('./routes/shop/shop.component'));
const Authentication = lazy(() =>
	import('./routes/authentication/authentication.component')
);
const Checkout = lazy(() => import('./components/checkout/checkout.component'));

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(checkUserSession());
	}, [dispatch]);

	return (
		<Suspense fallback={<Spinner />}>
			<Routes>
				<Route path='/' element={<Navigation />}>
					{/*<Route path="home" element={<Home />} />*/}
					<Route index element={<Home />} />
					<Route path='/shop/*' element={<Shop />} />
					<Route path='/auth' element={<Authentication />} />
					<Route path='/checkout' element={<Checkout />} />
				</Route>
			</Routes>
		</Suspense>
	);
};

export default App;
