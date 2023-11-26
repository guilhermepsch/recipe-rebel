import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Receita from '../../components/Receita';
import { Heart } from '@phosphor-icons/react';
import { getUser, getUserResponse } from '../../api/user';
import { getRecipesByUser, getRecipesByUserResponse } from '../../api/recipe';

export default function Profile() {
	const [user, setUser] = useState<getUserResponse | null>(null);
	const [receitas, setReceitas] = useState<getRecipesByUserResponse[] | null>(
		null,
	);
	const userId = window.location.pathname.split('/')[2];
	useEffect(() => {
		getUser({ userId }).then(response => {
			setUser(response);
			getRecipesByUser(userId).then(response => {
				setReceitas(response);
			});
		});
	}, []);

	return (
		<>
			<Header />
			<main className="flex flex-row pt-20 pl-[12.5rem] pr-[12.5rem] gap-20 w-full">
				<div className="flex flex-col gap-12">
					<div className="flex flex-row gap-32 max-w-5xl">
						<div className="flex flex-row gap-10 text-5xl items-center">
							<span>{user?.nome}</span>
						</div>
					</div>
					<span className="text-4xl">
						Receitas publicadas por {user?.nome}
					</span>
					<div className="flex flex-col gap-8">
						{receitas?.map(receita => (
							<Receita
								key={receita.id}
								heightPx={300}
								widthPx={900}
								receita={receita}
							/>
						))}
					</div>
				</div>
				<div className="flex flex-col shadow-2xl shadow-black rounded-3xl h-[50rem] w-[30rem]">
					<div className="flex flex-row gap-3 bg-black text-2xl font-bold p-5 text-white rounded-t-3xl">
						<span>Receitas Favoritas</span>
						<Heart size={30} />
					</div>
					<div className="flex flex-col gap-5 p-5 items-center overflow-scroll">
						{receitas?.map(receita => (
							<Receita
								heightPx={400}
								widthPx={400}
								key={receita.id}
								receita={receita}
							/>
						))}
					</div>
				</div>
			</main>
		</>
	);
}
