import Header from '../../../components/Header';
import {
	Heart,
	WhatsappLogo,
	FilePdf,
	Star,
	Pencil,
	Eye,
} from '@phosphor-icons/react';
import ReceitaActionButton from './ReceitaActionButton';
import ReceitaAvaliacao from './ReceitaAvaliacao';
import { useEffect, useState } from 'react';
import {
	getRecipe,
	getRecipeResponse,
	visualizeReceta,
} from '../../../api/recipe';
import { useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import { getToken } from '../../../utils/token';

export default function RecipeRead() {
	const [receita, setReceita] = useState<getRecipeResponse | null>(null);
	const [loading, setLoading] = useState(true);
	const recipeId = window.location.pathname.split('/')[2];
	const token = getToken();
	const navigation = useNavigate();

	useEffect(() => {
		getRecipe(recipeId).then(response => {
			setReceita(response);
			setLoading(false);
			visualizeReceta(recipeId);
		});
	}, []);

	const clickUserHandler = () => {
		navigation(`/profile/${receita?.usuario.id}`);
	};

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
				<div className="w-3/5 p-5 flex flex-col gap-1">
					<div
						className={
							'bg-cover bg-center rounded-3xl w-full h-[28.5625rem] min-w-full min-h-[28.5625rem]'
						}
						style={{
							backgroundImage: `url(${receita.imagem})`,
						}}
					/>
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
								const currentUrl = window.location.href;
								window.open(
									'https://api.whatsapp.com/send?text=https://www.code2night.com/?data-action=share/whatsapp/share&text=' +
										currentUrl,
									'_blank',
								);
							}}
						/>
						<ReceitaActionButton
							texto="Exportar"
							Icone={FilePdf}
							action={() => {
								html2pdf(document.getElementById('pdf'), {
									filename:
										String(receita.nome).replace(' ', '_') +
										'.pdf',
								});
							}}
						/>
						<ReceitaActionButton
							texto="Avaliar"
							Icone={Star}
							action={() => {
								alert('clicou');
							}}
						/>
						{receita.usuario.id === token.sub && (
							<ReceitaActionButton
								texto="Editar"
								Icone={Pencil}
								action={() => {
									navigation(`/recipe/edit/${receita.id}`);
								}}
							/>
						)}
					</div>
					<div id="pdf" className="flex flex-col gap-5">
						<div>
							Criado por{' '}
							<span
								className="text-red-500 hover:text-red-900 hover:cursor-pointer transition-colors duration-100 ease-linear"
								onClick={clickUserHandler}>
								{receita.usuario.nome} - {receita.usuario.email}
							</span>
							<div>
								<span>
									<Eye className="inline-block" />
									{' ' + receita.visualizacoes}
								</span>
							</div>
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
						<div className="py-3">
							<span className="font-bold text-4xl capitalize">
								Modo de Preparo
							</span>
							<p className="pt-3 font-semibold text-lg opacity-70">
								{receita.modoPreparo}
							</p>
						</div>
					</div>
				</div>
				<ReceitaAvaliacao avaliacoes={receita.avaliacoes} />
			</div>
		</>
	);
}
