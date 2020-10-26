import Axios from 'axios';
import {API_URL} from '../../url';
import {GET_LOGGED_IN_PERSON_FAIL, GET_LOGGED_IN_PERSON_SUCCESS, LOGIN_SUCCESS, LOGOUT_SUCCESS, PASSWORD_LOGIN_FAIL, SET_INITIAL_LOGIN_SUCCESS, USERNAME_LOGIN_FAIL} from '../actionTypes';
import {secondAction} from '../utils';

export function login(username, password) {

	return (dispatch) => {
		Axios.post(`${API_URL}/account/login`, {Username: username, Password: password})
			.then(resp => {
				setToken(resp.data.Token);
				setAxiosInterceptors();
				dispatch(secondAction(LOGIN_SUCCESS, resp.data.Person));
			})
			.catch(e => {
				if (e.response?.status === 401) {
					dispatch(secondAction(PASSWORD_LOGIN_FAIL));
				}
				if (e.response?.status === 400) {
					dispatch(secondAction(USERNAME_LOGIN_FAIL));
				}
			});
	};

}

export function getLoggedInPerson() {

	return (dispatch) => {
		Axios.get(`${API_URL}/person/logged-in`)
			.then(resp => {
				dispatch(secondAction(GET_LOGGED_IN_PERSON_SUCCESS, resp.data));
			})
			.catch(e => {
				dispatch(secondAction(GET_LOGGED_IN_PERSON_FAIL));
				removeToken();
				window.location.reload();
			});
	};

}

export function logout() {

	return (dispatch) => {
		removeToken();
		dispatch(secondAction(LOGOUT_SUCCESS));
	};

}

export function setAxiosInterceptors() {
	Axios.interceptors.request.use(config => {
		config.headers.Authorization = localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : '';
		return config;
	});
}

export function setInitialLoginSuccess() {
	return dispatch => {
		dispatch(secondAction(SET_INITIAL_LOGIN_SUCCESS));
	};
}

function removeToken() {
	localStorage.removeItem('token');
}

function setToken(token) {
	localStorage.setItem('token', token);
}