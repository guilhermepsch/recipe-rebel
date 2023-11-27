import Header from '../../components/Header';
import Receita from '../../components/Receita';
import { useEffect, useState } from 'react';
import { getRecipesByName, getRecipesByUserResponse } from '../../api/recipe';

export default function Search() {
	const [receitas, setReceitas] = useState<getRecipesByUserResponse[]>([]);
  const query = window.location.pathname.split('/')[2];

	useEffect(() => {
		getRecipesByName(query).then(response => {
      setReceitas(response);
    });
	}, []);

	return (
		<>
			<Header />
			<h1 className="text-[36px] font-bold ml-[159px] mt-[55px]">
				Receitas encontradas para "{String(query).replace('%20', ' ')}"
			</h1>
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
