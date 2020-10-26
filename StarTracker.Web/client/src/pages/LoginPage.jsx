import React from 'react';
import {LoginForm} from '../components/Login/LoginForm';
import {LoginSide} from '../components/Login/LoginSide';

export const LoginPage = () => {
	return (
		<div className="login">
			<LoginSide />
			<LoginForm />
		</div>
	);
};
