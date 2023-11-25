import { Star } from '@phosphor-icons/react';
import { AvaliacaoProps } from '../../../../../api/recipe';

type ReceitaAvaliacaoItemProps = {
	avaliacao: AvaliacaoProps;
};

export default function ReceitaAvaliacaoItem({
	avaliacao,
}: ReceitaAvaliacaoItemProps) {
	let stars = [];
	for (let i = 0; i < avaliacao.nota; i++) {
		stars.push(<Star weight="fill" />);
	}
	for (let i = avaliacao.nota; i < 5; i++) {
		stars.push(<Star weight="fill" color="gray" />);
	}
	return (
		<div className="flex flex-col pt-5">
			<div className="flex flex-row justify-start items-center gap-4 text-4xl capitalize mb-2">
				<span className="font-bold">{avaliacao.usuario.nome}</span>
				<div className="flex flex-row gap-2">
					{stars.map((star, key) => (
						<span key={key}>{star}</span>
					))}
				</div>
			</div>
			<p className="overflow-hidden text-sm">{avaliacao.comentario}</p>
			<span className="mt-4 h-[1px] w-full bg-black"></span>
		</div>
	);
}
