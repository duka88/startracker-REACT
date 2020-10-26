import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../redux/authentication/actions';
import {Logo} from '../Sidebar/Logo';

export const LoginForm = () => {
	const dispatch = useDispatch();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [isUsernameBlank, setIsUsernameBlank] = useState(false);
	const [isPasswordBlank, setIsPasswordBlank] = useState(false);
	const hasUsernameLoginError = useSelector(state => state.auth.hasUsernameLoginError);
	const hasPasswordLoginError = useSelector(state => state.auth.hasPasswordLoginError);

	const handleChangeUsername = (e) => {
		setUsername(e.target.value);
	};

	const handleChangePassword = (e) => {
		setPassword(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		username ? setIsUsernameBlank(false) : setIsUsernameBlank(true);
		password ? setIsPasswordBlank(false) : setIsPasswordBlank(true);
		if (username && password) {
			dispatch(login(username, password));
		}
	};

	return (
		<div className="login__form-wrap">
			<div className="login__form-inner" onSubmit={onSubmit}>
				<div className="login__logo-wrap">
					<Logo />
				</div>
				<form className="login__form" action="">
					<h2 className="login__form-title">Sign in to your <br/>
						<span className="login__form-title-span">Star Tracker</span> account
					</h2>
					<label className="login__label" htmlFor="username">Username / Email</label>
					<input onChange={handleChangeUsername} className={(isUsernameBlank || hasUsernameLoginError) ? 'login__input invalid' : 'login__input'} type="text" name="username" />
					<span className="login__error">{hasUsernameLoginError ? 'Please enter valid username / email address' : 'Username can’t be blank'}</span>
					<label className="login__label" htmlFor="username">Password</label>
					<input onChange={handleChangePassword} className={(isPasswordBlank || hasPasswordLoginError) ? 'login__input login__input--pass invalid' : 'login__input login__input--pass'} type="password" name="password" />
					<span className="login__error">{isPasswordBlank ? 'Password can’t be blank' : 'Invalid password'}</span>
					<button className="button login__button" type="submit">Sign in</button>
				</form>
			</div>
		</div>
	);
};