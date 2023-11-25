import Header from '../../../components/Header';
import { Heart, WhatsappLogo, FilePdf, Star } from '@phosphor-icons/react';
import ReceitaActionButton from './ReceitaActionButton';
import ReceitaAvaliacao from './ReceitaAvaliacao';
import { useEffect, useState } from 'react';
import { getRecipe, getRecipeResponse } from '../../../api/recipe';

export default function RecipeRead() {
	const [receita, setReceita] = useState<getRecipeResponse | null>(null);
	const [loading, setLoading] = useState(true);
	const recipeId = window.location.pathname.split('/')[2];

	useEffect(() => {
		getRecipe(recipeId).then(response => {
			setReceita(response);
			setLoading(false);
		});
	}, []);

	if (loading) {
		return (
			<>
				<Header />
				<div>Carregando...</div>
			</>
		);
	}
	if (!receita || receita.ativo === 0) {
		return (
			<>
				<Header />
				<div>Receita não encontrada</div>
			</>
		);
	}
	return (
		<>
			<Header />
			<div className="w-full flex flex-row ml-12 mr-12 mt-14">
				<div className="w-3/5 p-5 flex flex-col">
					<div
						className={
							'bg-cover bg-center rounded-3xl w-full h-[28.5625rem] min-w-full min-h-[28.5625rem]'
						}
						style={{
							backgroundImage: `url(${receita.imagem})`,
						}}
					/>
					<div className="flex flex-col">
						<div className="text-4xl font-bold capitalize pt-2 pb-2 flex items-center gap-3 overflow-hidden whitespace-nowrap">
							<span>{receita.nome}</span>
							<ReceitaActionButton
								texto="Favoritar"
								Icone={Heart}
								action={() => {
									alert('clicou');
								}}
							/>
							<ReceitaActionButton
								texto="Compartilhar"
								Icone={WhatsappLogo}
								action={() => {
									alert('clicou');
								}}
							/>
							<ReceitaActionButton
								texto="Exportar"
								Icone={FilePdf}
								action={() => {
									alert('clicou');
								}}
							/>
							<ReceitaActionButton
								texto="Avaliar"
								Icone={Star}
								action={() => {
									alert('clicou');
								}}
							/>
						</div>
						<div>
							Criado por {receita.usuario.nome} - {receita.usuario.email}
						</div>
						<div className="flex flex-row gap-3">
							{receita.tags.map((tag, key) => (
								<span
									key={key}
									className="flex p-4 h-8 rounded-[4rem] bg-black text-white font-bold text-[16px] justify-center items-center">
									{tag}
								</span>
							))}
						</div>
						<div className="py-3">
							<span className="font-bold text-4xl capitalize">
								Ingredientes
							</span>
							<p className="pt-3 font-semibold text-lg opacity-70">
								{receita.ingredientes}
							</p>
						</div>
					</div>
					<div className="py-3">
						<span className="font-bold text-4xl capitalize">
							Modo de Preparo
						</span>
						<p className="pt-3 font-semibold text-lg opacity-70">
							{receita.modoPreparo}
						</p>
					</div>
				</div>
				<ReceitaAvaliacao avaliacoes={receita.avaliacoes} />
			</div>
		</>
	);
}
