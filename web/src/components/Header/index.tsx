import { Link } from 'react-router-dom';
import { useState } from 'react';

import { HeaderListOption } from './HeaderListOption';
import logo from '../../assets/img/logo.svg';
import lupa from '../../assets/img/lupa.png';
import user from '../../assets/img/user.svg';
import { CaretDown } from '@phosphor-icons/react';
import { getToken } from '../../utils/token';
import { useIsAuthenticated } from 'react-auth-kit';

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [search, setSearch] = useState('');
	const isAuthenticated = useIsAuthenticated();
	const token = getToken();

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<header className="h-28 w-full flex flex-row sticky top-0 z-10 bg-[#F2F2F2]">
			<div className="w-5/12 h-full flex flex-row items-center justify-center gap-5">
				<Link to="/">
					<img width={84} height={87} src={logo}></img>
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
					<HeaderListOption to="/recipe/include">
						Incluir Receita
					</HeaderListOption>
				</ul>
			</nav>
			<div
				className={
					'w-1/5 h-full flex flex-row justify-center items-center gap-[9px] ml-10'
				}>
				<Link to={`/search/${search}`}>
					<img src={lupa} width={42} height={42} />
				</Link>
				<input
					type="text"
					placeholder="Buscar receita"
					className={
						'px-4 py-2 pl-4 rounded-[20px] bg-white shadow-md h-11 w-full'
					}
					value={search}
					onChange={e => setSearch(e.target.value)}
				/>
			</div>
			<div
				className={
					'h-full w-2/12 self-end flex flex-row justify-end items-center gap-3 pr-10 relative'
				}>
				{isAuthenticated() && (
					<>
						<div
							onClick={toggleMenu}
							className="cursor-pointer flex items-center gap-3">
							<img src={user} alt="User" />
							<span>{token.nomeUsuario}</span>
							<span
								className={
									'transform ' +
									(isMenuOpen ? 'rotate-180' : 'rotate-0') +
									' transition-transform duration-300'
								}>
								<CaretDown className="h-4 w-4" />
							</span>
						</div>
						{isMenuOpen && (
							<div className="absolute right-12 top-20 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
								<ul className="divide-y divide-gray-300">
									<li>
										<Link
											to={`/profile/${token.sub}`}
											className="block px-4 py-2 hover:bg-gray-100">
											Profile
										</Link>
									</li>
									<li>
										<Link
											to="/logout"
											className="block px-4 py-2 hover:bg-gray-100">
											Logout
										</Link>
									</li>
								</ul>
							</div>
						)}
					</>
				)}
				{!isAuthenticated() && (
					<>
						<Link to="/login">
							<button className="bg-black text-white rounded-[20px] px-4 py-2">
								Login
							</button>
						</Link>
					</>
				)}
			</div>
		</header>
	);
}
