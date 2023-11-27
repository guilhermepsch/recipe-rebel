import axios, { AxiosResponse } from 'axios';
import { ReceitaProps } from '../pages/Receita/Create';
import { getUserResponse } from './user';

const API_BASE_URL = 'http://localhost:3000';

interface CreateRecipeResponse {
	nome: string;
	ingredientes: string;
	modoPreparo: string;
	tags: string[];
	imagem: string;
	descricao: string;
	usuario: {
		id: string;
		nome: string;
		email: string;
		createdAt: string;
		updatedAt: string;
		deletedAt: string;
	};
	id: string;
	ativo: number;
	createdAt: string;
	updatedAt: string;
}

export async function createRecipe(
	{ nome, ingredientes, modoPreparo, tags, descricao, imagem }: ReceitaProps,
	token: string,
) {
	console.log(token);
	const response: AxiosResponse<CreateRecipeResponse> = await axios.post(
		`${API_BASE_URL}/receitas`,
		{
			nome,
			ingredientes,
			modoPreparo,
			imagem,
			tags,
			descricao,
		},
		{
			headers: {
				Authorization: token,
			},
		},
	);
	return response.data;
}

export async function updateRecipe(
	{ nome, ingredientes, modoPreparo, tags, descricao, imagem }: ReceitaProps,
	token: string,
	id: string,
) {
	const response: AxiosResponse<CreateRecipeResponse> = await axios.patch(
		`${API_BASE_URL}/receitas/${id}`,
		{
			nome,
			ingredientes,
			modoPreparo,
			imagem,
			tags,
			descricao,
		},
		{
			headers: {
				Authorization: token,
			},
		},
	);
	return response.data;
}

export interface getRecipeResponse extends CreateRecipeResponse {
	avaliacoes: AvaliacaoProps[];
	visualizacoes: number;
}

export type AvaliacaoProps = {
	id: string;
	nota: number;
	comentario: string;
	createAt: string;
	updatedAt: string;
	deletedAt: string;
	usuario: getUserResponse;
};

export async function getRecipe(id: string) {
	const response: AxiosResponse<getRecipeResponse> = await axios.get(
		`${API_BASE_URL}/receitas/${id}`,
	);
	return response.data;
}

export type getRecipesByUserResponse = {
	id: string;
	nome: string;
	ingredientes: string;
	modoPreparo: string;
	descricao: string;
	tags: string[];
	imagem: string;
	createdAt: string;
	updatedAt: string;
	deletedAt: string;
};

export async function getRecipesByUser(
	userId: string,
): Promise<getRecipesByUserResponse[]> {
	const response: AxiosResponse<getRecipesByUserResponse[]> = await axios.get(
		`${API_BASE_URL}/receitas/usuario/${userId}`,
	);
	return response.data;
}

export async function getRandomRecipes() {
	const response: AxiosResponse<getRecipesByUserResponse[]> = await axios.get(
		`${API_BASE_URL}/receitas/home/random`,
	);
	return response.data;
}

export async function visualizeReceta(id: string) {
	const response: AxiosResponse<getRecipesByUserResponse[]> = await axios.put(
		`${API_BASE_URL}/receitas/${id}/visualize`,
	);
	return response.data;
}