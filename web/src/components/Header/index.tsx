import { Link } from 'react-router-dom';
import { HeaderListOption } from './HeaderListOption';
import logo from '../../assets/img/logo.svg';
import lupa from '../../assets/img/lupa.png';
import user from '../../assets/img/user.svg';
import { CaretDown } from '@phosphor-icons/react';

export default function Header() {
	return (
		<header className="h-28 w-full flex flex-row">
			<div className="w-5/12 h-full flex flex-row items-center justify-center gap-5">
				<Link to="/">
					<img src={logo}></img>
				</Link>
				<Link to="/">
					<h1 className="font-bold text-[4rem]">Recipe Rebel</h1>
				</Link>
			</div>
			<nav className="h-full w-3/12">
				<ul className="h-full w-full break-normal flex flex-row items-center justify-center gap-10 text-center">
					<HeaderListOption to="/populares">
						Receitas Populares
					</HeaderListOption>
					<HeaderListOption to="/doces">Doces</HeaderListOption>
					<HeaderListOption to="/salgados">Salgados</HeaderListOption>
					<HeaderListOption to="/recentes">
						Receitas Recentes
					</HeaderListOption>
				</ul>
			</nav>
			<div className="w-1/5 h-full flex flex-row justify-center items-center gap-[9px] ml-10">
				<Link to="/busca">
					<img src={lupa} width={42} height={42} />
				</Link>
				<input
					type="text"
					placeholder="Buscar receita"
					className="px-4 py-2 pl-4 rounded-[20px] bg-white shadow-md h-11 w-full"
				/>
			</div>
			<div className='h-full w-2/12 self-end flex flex-row justify-end items-center gap-3 pr-10'>
				<img src={user} />
				User
				<CaretDown />
			</div>
		</header>
	);
}
