import ReceitaAvaliacaoItem from './ReceitaAvaliacaoItem';

export default function ReceitaAvaliacao() {
	return (
		<div className="flex flex-col ml-12 w-[30%] max-h-[48rem] bg-white shadow-2xl rounded-3xl shadow-black">
			<div className="flex justify-center items-center bg-black p-5 rounded-t-3xl">
				<span className="font-bold text-3xl text-white">
					Avaliações
				</span>
			</div>
			<div className="flex flex-col p-5 pt-0 overflow-x-hidden overflow-y-auto">
				<ReceitaAvaliacaoItem />
				<ReceitaAvaliacaoItem />
				<ReceitaAvaliacaoItem />
				<ReceitaAvaliacaoItem />
				<ReceitaAvaliacaoItem />
			</div>
		</div>
	);
}
