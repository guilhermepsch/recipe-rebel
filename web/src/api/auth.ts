import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
	baseURL: API_BASE_URL,
});

interface LoginProps {
	email: string;
	password: string;
}

interface doLoginResponse {
	token_acesso: string;
}

export const doLogin = async ({ email, password }: LoginProps): Promise<string> => {
	const response: AxiosResponse<doLoginResponse> = await api.post(
		'/autenticacao/login',
		{ email, senha: password },
	);
	return response.data.token_acesso;
};
