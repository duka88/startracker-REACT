import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getMostActiveUsers, setInitialMostActiveUsers} from '../../redux/users/actions';
import {UserRow} from './UserRow';

export const MostActiveUsers = () => {
	const dispatch = useDispatch();
	const users = useSelector(state => state.users.mostActiveUsers);

	useEffect(() => {
		!users && dispatch(getMostActiveUsers());
	});

	useEffect(() => {
		return () => {
			dispatch(setInitialMostActiveUsers());
		};
	}, [dispatch]);

	return (
		<div className="active-users">
			<h2 className="active-users__title">Most Active Users</h2>
			{ users?.map(((item, index) =>
				<UserRow key= {index} user= {item}/>
			))}
		</div>
	);
};