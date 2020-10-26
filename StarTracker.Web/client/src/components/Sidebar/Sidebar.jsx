import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Logo} from './Logo';
import {UserInfo} from './UserInfo';
import {NavigationLinks} from './NavigationLinks';
import {getSidebarInfo} from '../../redux/person/actions';
import UnlockedAchievements from './UnlockedAchievements';

export const Sidebar = () => {
	const dispatch = useDispatch();

	const [offset, setOffset] = useState(0);

	const [openSidebar, setOpenSidebar] = useState(false);
	const [mobNavHide, setMobNavHide] = useState(false);
	const visible = useSelector(state => state.modal.visible);
	const personId = useSelector(state => state.person.user.Id);

	useEffect(() => {

		const {innerWidth: width} = window;
		if (width > 1504) {
			const main = document.querySelector('.main');
			const diff = 46;
			const mainLeftMargin = main.offsetLeft - diff + 'px';
			setOffset(mainLeftMargin);
		}

		let start = window.pageYOffset;

		function handleScroll() {
			if (window.scrollY < start) {
				setMobNavHide(false);
			} else {
				setMobNavHide(true);
			}
			start = window.scrollY;
		}
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};

	}, []);

	useEffect(() => {
		dispatch(getSidebarInfo(personId));
	}, [personId, dispatch]);

	return (
		<div className="side-bar">
			<div className={`overlay ${openSidebar ? 'overlay--active' : ''}`}
				onClick={() => setOpenSidebar(false)} ></div>
			<div className="side-bar__logo-wrap">
				<div className={`side-bar__mob-nav ${ (mobNavHide && !openSidebar) || visible ? 'side-bar__mob-nav--active' : '' }`}>
					<div onClick={() => setOpenSidebar(!openSidebar)}
						className={`side-bar__line-wrap ${openSidebar ? 'side-bar__line-wrap--active' : ''}`}>
						<div className="side-bar__line side-bar__line--1"></div>
						<div className="side-bar__line side-bar__line--2"></div>
						<div className="side-bar__line side-bar__line--3"></div>
					</div>
				</div>
				<div className={`side-bar__wrap ${openSidebar ? 'side-bar__wrap--active' : ''}`} style={{left: offset}}>
					<Logo />
					<UserInfo />
          <UnlockedAchievements />
					<NavigationLinks />
				</div>
			</div>
		</div>
	);
};