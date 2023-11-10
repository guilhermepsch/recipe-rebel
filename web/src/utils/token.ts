import { useAuthHeader } from 'react-auth-kit';

export const getToken = () => {
	const auth = useAuthHeader();
	const token = auth() ? auth().replace('Bearer ', '') : '';
	const splittedToken = token.split('.');
	const payload = splittedToken[1];
	const decodedPayload = atob(payload);
	const parsedPayload = JSON.parse(decodedPayload);
	return parsedPayload;
};
