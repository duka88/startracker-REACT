import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Sidebar} from './components/Sidebar/Sidebar';
import Routes from './components/Routes/Routes';
import {Footer} from './components/Footer/Footer';
import {Modal} from './components/Modal/Modal';
import {LoginPage} from './pages/LoginPage';
import {getLoggedInPerson, setAxiosInterceptors, setInitialLoginSuccess} from './redux/authentication/actions';
import {Spinner} from './components/Spinner/Spinner';
import {useLocation} from 'react-router';
import {MvpConfirmation} from './pages/MvpConfirmationPage';
import PopupNotification from './components/PopupNotification/PopupNotification';

const LOADER_TIMEOUT = 1820;

function App() {
	const dispatch = useDispatch();

	const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
	const user = useSelector(state => state.person.user);

	const showLoader = useSelector(state => state.auth.loginSuccess);

	useEffect(() => {
		isLoggedIn && !user && dispatch(getLoggedInPerson());
	}, [dispatch, isLoggedIn, user]);

	useEffect(() => {
		showLoader && setTimeout(() => dispatch(setInitialLoginSuccess()), LOADER_TIMEOUT);
	}, [showLoader, dispatch]);

	const token = localStorage.getItem('token');
	token && isLoggedIn && setAxiosInterceptors(token);

	const location = useLocation();
	const isOnConfirmationPage = location.pathname.includes('/confirmation');

	const mainContent = (isUserValid) => {
		let content;
		if (isUserValid) {
			content = !showLoader ?
				<div className="main">
					<Sidebar />
					<Routes />
					<Footer />
					<Modal />
					<PopupNotification />
				</div>
				:
				<Spinner />;
		} else {
			content = <Spinner />;
		}
		return !isOnConfirmationPage ? content : <MvpConfirmation />;
	};

	const noLayoutContent = () => !isOnConfirmationPage ? <LoginPage /> : <MvpConfirmation />;

	return (
		<>
			{
				!isLoggedIn ?
					noLayoutContent()
					:
					mainContent(!!user)
			}
		</>
	);
}

export default App;
