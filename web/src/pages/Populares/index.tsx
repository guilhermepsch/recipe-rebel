import Header from '../../components/Header';
import Receita from '../../components/Receita';
import { useEffect, useState } from 'react';
import { getPopulares, getRecipesByUserResponse } from '../../api/recipe';

export default function Populares() {
	const [receitas, setReceitas] = useState<getRecipesByUserResponse[]>([]);

	useEffect(() => {
		getPopulares().then(response => {
			setReceitas(response);
		});
	}, []);

	return (
		<>
			<Header />
			<div className="flex gap-[30px] ml-[159px] mt-[55px]">
				{receitas.map((receita, index) => (
					<Receita
						key={index}
						receita={receita}
						widthPx={478.314}
						heightPx={407.863}
					/>
				))}
			</div>
		</>
	);
}
