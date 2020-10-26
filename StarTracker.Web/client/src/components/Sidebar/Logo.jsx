import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../assets/icons/vega-logo.svg';
export const Logo = () => {
	return (
		<Link to="/">
			<div className="side-bar__logo-wrap">
				<img src={logo} className="side-bar__logo" alt="logo"/>
				<div className="side-bar__devider"></div>
				<h1 className="side-bar__h1">STAR TRACKER</h1>
			</div>
		</Link>
	);
};