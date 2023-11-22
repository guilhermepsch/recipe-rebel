import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = 'http://localhost:3000';

type RegisterProps = {
	username: string;
	email: string;
	password: string;
};

type RegisterResponse = {
  mensagem: string;
  usuario: {
    id: string;
    nome: string;
  }
}

export async function doRegister({
	username,
	email,
	password,
}: RegisterProps) {
	const response: AxiosResponse<RegisterResponse> = await axios.post(`${API_BASE_URL}/usuarios`, {
		nome: username,
		email: email,
		senha: password,
	});
  return response.data;
}

type getUserProps = {
	userId: string
}

export type getUserResponse = {
	id: string;
	nome: string;
	email: string;
}

export async function getUser({
	userId
}: getUserProps): Promise<getUserResponse> {
	const response: AxiosResponse<getUserResponse> = await axios.get(`${API_BASE_URL}/usuarios/${userId}`);
  return response.data;
}