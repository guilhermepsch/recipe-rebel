import { useState } from 'react';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';
import { useAuthHeader } from 'react-auth-kit';
import { CreateAvaliacaoProps, createAvaliacao } from '../../api/ratings';
import { AxiosError } from 'axios';

export default function AvaliacaoInclude() {
	const recipeId = window.location.pathname.split('/')[2];
	const [nota, setNota] = useState<number>(0);
	const [comentario, setComentario] = useState<string>('');
	const navigation = useNavigate();
	const auth = useAuthHeader();
	const token = auth();

	const handleAvaliacaoSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (nota < 0) {
			alert('Nota não pode ser menor que 0');
			return;
		}
		if (nota > 5) {
			alert('Nota não pode ser maior que 5');
			return;
		}
		if (comentario.length < 10) {
			alert('Comentario deve ter no mínimo 10 caracteres');
			return;
		}
		const formData: CreateAvaliacaoProps = {
			receitaId: String(recipeId),
			nota: Number(nota),
			comentario: String(comentario),
		};
		createAvaliacao(formData, token)
			.then(response => {
				navigation(`/recipe/${recipeId}`);
			})
			.catch((error: AxiosError) => {
				if (error.response?.status === 401) {
					alert('Você não tem permissão para avaliar essa receita');
					return;
				}
				alert('Erro ao criar avaliação');
			});
	};

	return (
		<>
			<Header />
			<div className="flex justify-center items-center w-full h-[80vh]">
				<div className="p-12 rounded-3xl w-1/2 h-[50vh] max-w-[848px] max-h-[567px] shadow-md border border-black">
					<form
						className="flex flex-col gap-4 text-4xl"
						onSubmit={handleAvaliacaoSubmit}>
						<div className="flex flex-col gap-2">
							<label htmlFor="nota" className="font-bold">
								Nota
							</label>
							<input
								type="number"
								name="nota"
								id="nota"
								placeholder="Nota"
								min={0}
								max={5}
								maxLength={1}
								className="shadow-xl bg-[#D9D9D9] rounded-3xl p-4"
								value={nota}
								onChange={e => {
									if (Number(e.target.value) > 5) {
										setNota(5);
										return;
									}
									if (Number(e.target.value) < 0) {
										setNota(0);
										return;
									}
									setNota(Number(e.target.value));
								}}
							/>
						</div>
						<div className="flex flex-col gap-2">
							<label htmlFor="comentario" className="font-bold">
								Comentario
							</label>
							<textarea
								name="comentario"
								id="comentario"
								placeholder="Comentario"
								className="shadow-xl bg-[#D9D9D9] rounded-3xl p-4"
								value={comentario}
								onChange={e => setComentario(e.target.value)}
							/>
						</div>
						<button
							className="bg-black shadow-xl rounded-3xl p-4 w-full text-white"
							type="submit">
							Enviar Avaliação
						</button>
					</form>
				</div>
			</div>
		</>
	);
}
