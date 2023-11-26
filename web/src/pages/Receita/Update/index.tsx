import { useEffect, useState } from 'react';
import Header from '../../../components/Header';
import ReceitaTextField from '../Create/ReceitaTextField';
import TagsField from '../Create/TagsField';
import { useNavigate } from 'react-router-dom';
import { getRecipe, updateRecipe } from '../../../api/recipe';
import { getToken } from '../../../utils/token';
import { useAuthHeader } from 'react-auth-kit';
import { ReceitaProps } from '../Create';

export default function RecipeUpdate() {
	const [receita, setReceita] = useState<ReceitaProps>({
		nome: '',
		ingredientes: '',
		modoPreparo: '',
		imagem: '',
		tags: [],
		descricao: '',
	});
	const navigate = useNavigate();
	const auth = useAuthHeader();
	const token = auth();
	const parsedToken = getToken();
	const recipeId = window.location.pathname.split('/')[3];

	useEffect(() => {
		getRecipe(recipeId).then(response => {
			if (parsedToken.sub !== response.usuario.id) {
				navigate('/');
			}
			setReceita(response as ReceitaProps);
		});
	}, []);

	const saveButtonHandler = () => {
		if (!receita) {
			return;
		}
		if (receita.nome === '') {
			alert('Nome da receita não pode ser vazio!');
			return;
		}
		if (receita.ingredientes === '') {
			alert('Ingredientes da receita não pode ser vazio!');
			return;
		}
		if (receita.modoPreparo === '') {
			alert('Modo de preparo da receita não pode ser vazio!');
			return;
		}
		if (receita.imagem === '') {
			alert('Imagem da receita não pode ser vazio!');
			return;
		}
		if (receita.tags.length === 0) {
			alert('Tags da receita não pode ser vazio!');
			return;
		}
		if (receita.descricao === '') {
			alert('Descrição da receita não pode ser vazio!');
			return;
		}
		updateRecipe(receita, token, recipeId).then(response => {
			console.log(response);
			alert('Receita salva com sucesso!');
			navigate('/');
		});
	};

	const cancelButtonHandler = () => {
		navigate('/');
	};
	if (receita.nome === '') {
		return (
			<>
				<Header />
				<span>Carregando...</span>
			</>
		);
	}
	return (
		<>
			<Header />
			<div className="my-9 mx-32">
				<h1 className="font-bold text-5xl mb-16">Nova receita</h1>
				<form className="flex flex-row gap-16" action="" method="">
					<div className="flex flex-col gap-8 w-5/12">
						<ReceitaTextField
							label="Nome"
							name="nome"
							value={receita.nome}
							handler={setReceita}
							receita={receita}
						/>
						<ReceitaTextField
							label="Ingredientes"
							name="ingredientes"
							value={receita.ingredientes}
							handler={setReceita}
							receita={receita}
							heightRem={10}
						/>
						<ReceitaTextField
							label="Modo de preparo"
							name="modoPreparo"
							value={receita.modoPreparo}
							handler={setReceita}
							receita={receita}
							heightRem={10}
						/>
					</div>
					<div className="flex flex-col w-5/12 gap-3">
						<div className="flex flex-col w-full gap-3 ">
							<ReceitaTextField
								receita={receita}
								handler={setReceita}
								label="URL da imagem"
								name="imagem"
								value={receita.imagem}
							/>
						</div>
						<ReceitaTextField
							label="Descrição"
							name="descricao"
							value={receita.descricao}
							handler={setReceita}
							receita={receita}
							heightRem={10}
						/>
						<TagsField receita={receita} handler={setReceita} />
					</div>
				</form>
				<div className="flex flex-row justify-start gap-5 mt-10">
					<button
						id="cancel"
						className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-500 transition-colors duration-300 ease-linear"
						onClick={cancelButtonHandler}>
						Cancelar
					</button>
					<button
						id="save"
						className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-500 transition-colors duration-300 ease-linear"
						onClick={saveButtonHandler}>
						Salvar
					</button>
				</div>
			</div>
		</>
	);
}
