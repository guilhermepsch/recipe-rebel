import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
	baseURL: API_BASE_URL,
});

export type CreateAvaliacaoProps = {
	nota: number;
	comentario: string;
	receitaId: string;
};

export const createAvaliacao = async (
	{ nota, comentario, receitaId }: CreateAvaliacaoProps,
	token: string,
) => {
	const response: AxiosResponse = await api.post(
		'/avaliacao',
		{ nota, comentario, receitaId },
		{
			headers: {
				Authorization: token,
			},
		},
	);
	return response.data;
};
