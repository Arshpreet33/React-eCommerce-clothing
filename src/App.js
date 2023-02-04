import { Route, Routes } from 'react-router';
import './categories.styles.scss';
import Authentication from './routes/authentication/authentication.component';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';

const App = () => {
	return (
		<div>
			<Routes>
				<Route path='/' element={<Navigation />}>
					{/*<Route path="home" element={<Home />} />*/}
					<Route index element={<Home />} />
					<Route path='/sign-in' element={<Authentication />} />
				</Route>
			</Routes>
		</div>
	);
};

export default App;
