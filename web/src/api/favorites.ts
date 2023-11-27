import axios, { AxiosResponse } from 'axios';
import { getRecipesByUserResponse } from './recipe';

const API_BASE_URL = 'http://localhost:3000';

export type FavoritesResponse = {
	id: string;
	createdAt: string;
	updatedAt: string;
	deletedAt: string;
	receita: getRecipesByUserResponse;
};

export async function getFavorites(userId: string) {
	const response: AxiosResponse<FavoritesResponse[]> = await axios.get(
		`${API_BASE_URL}/favoritos/${userId}`,
	);
	return response.data;
}

export async function addFavorite(recipeId: string, token: string) {
	const response: AxiosResponse<FavoritesResponse[]> = await axios.post(
		`${API_BASE_URL}/favoritos`,
		{
			receitaId: recipeId,
		},
		{
			headers: {
				Authorization: token,
			},
		},
	);
	return response.data;
}
