import { useState, useEffect } from 'react';

export function useToken() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const expAt = localStorage.getItem('expAt');

		if (Date.now() > expAt) {
			localStorage.clear();
		}

		setIsLoggedIn(Date.now() < expAt);
	}, []);

	return isLoggedIn;
}
