import { useAuthHeader } from 'react-auth-kit';

type TokenPayload = {
	sub: string;
	exp: number;
	iat: number;
	nomeUsuario: string;
};

export const getToken = (): TokenPayload => {
	const auth = useAuthHeader();
	const token = auth() ? auth().replace('Bearer ', '') : '';
	if (!token) {
		return {
			sub: '',
			exp: 0,
			iat: 0,
			nomeUsuario: '',
		};
	}
	const splittedToken = token.split('.');
	const payload = splittedToken[1];
	const decodedPayload = atob(payload);
	const parsedPayload = JSON.parse(decodedPayload);
	return parsedPayload as TokenPayload;
};
