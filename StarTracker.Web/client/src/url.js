import moment from 'moment';

// let API_URL_ = '';
// let PROFILE_IMAGES_URL_ = '';

// if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
// 	API_URL_ = 'http://localhost:62536/api';
// 	PROFILE_IMAGES_URL_ = 'http://localhost:62536/assets/profileImages/';
// } else {
// 	API_URL_ = 'http://api.startracker.sitesstage.com/api';
// 	PROFILE_IMAGES_URL_ = 'http://api.startracker.sitesstage.com/assets/profileImages/';
// }

export const API_URL = 'http://api.startracker.sitesstage.com/api';
// export const API_URL = 'http://localhost:62536/api';

export const PROFILE_IMAGES_URL = 'http://api.startracker.sitesstage.com/assets/profileImages/';

export function getImageUrlFromAvatar(name) {
	return PROFILE_IMAGES_URL + name + `?t=${moment().toISOString()}`;
}

export const imageExists = (url, callback) => {
	const img = new Image();
	img.onload = () => { callback(true); };
	img.onerror = () => { callback(false); };
	img.src = url;
};