import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import yoga from '../../assets/icons/yoga.png';
import {getLoginMotivationalQuote} from '../../redux/motivational-quotes/actions';

export const LoginSide = () => {
	const dispatch = useDispatch();

	const motivationalQuote = useSelector(state => state.motivationalQuotes.loginMotivationalQuote);

	useEffect(() => {
		!motivationalQuote && dispatch(getLoginMotivationalQuote());
	}, [dispatch, motivationalQuote]);

	return (
		<div className="login__side-wrap">
			<div className="login__side-inner">
				<img src={yoga} className="login__image" alt="yoga"/>
				<div className="login__title-wrap">
					<div className="login__red-box">
						<h2 className="login__title">{motivationalQuote?.Title}</h2>
					</div>
					<div className="login__orange-box"></div>
				</div>
			</div>
		</div>
	);
};