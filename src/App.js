import { Route, Routes } from 'react-router';
import './categories.styles.scss';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import SignIn from './routes/sign-in/sign-in.component';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigation />}>
          {/*<Route path="home" element={<Home />} />*/}
          <Route index element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
