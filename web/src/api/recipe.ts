import axios, { AxiosResponse } from 'axios';
import { ReceitaProps } from '../pages/Receita/Create';

const API_BASE_URL = 'http://localhost:3000';

type CreateRecipeResponse = {
	nome: string;
	ingredientes: string;
	modoPreparo: string;
	tags: string[];
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
};

export async function createRecipe({
	nome,
	ingredientes,
	modoPreparo,
	tags,
	descricao,
	imagem,
}: ReceitaProps, token: string) {
  console.log(token);
	const response: AxiosResponse<CreateRecipeResponse> = await axios.post(
		`${API_BASE_URL}/receitas`,
		{
			nome,
      ingredientes,
      modoPreparo,
      imagem,
      tags,
      descricao
		},
    {
      headers: {
        Authorization: token,
      },
    }
	);
	return response.data;
}
