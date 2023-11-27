import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import { useState, useEffect } from 'react';
import { doLogin } from '../../api/auth';
import { useIsAuthenticated, useSignIn } from 'react-auth-kit';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const signIn = useSignIn();
	const isAuthenticated = useIsAuthenticated();
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated()) {
			navigate('/');
		}
	}, []);

	const handleCadastroClick = async (e: any) => {
		e.preventDefault();
		navigate('/cadastro');
	};

	const handleLoginClick = async (e: any) => {
		e.preventDefault();
		try {
			const token = await doLogin({ email, password });
			signIn({
				token: token,
				expiresIn: 3600 * 24,
				tokenType: 'Bearer',
				authState: { email },
			});
			navigate('/');
		} catch (error) {
			alert('Email ou senha incorretos!');
		}
	};

	return (
		<>
			<Header />
			<main className="flex justify-center items-center w-full h-[75vh] text-black">
				<div className="p-12 rounded-3xl w-1/2 h-[50vh] max-w-[848px] max-h-[567px] shadow-md border border-black">
					<form
						className="flex flex-col gap-4 text-4xl"
						action=""
						method="">
						<div className="flex flex-col gap-2">
							<label htmlFor="email" className="font-bold">
								Email
							</label>
							<input
								type="email"
								name="email"
								id="email"
								placeholder="Email"
								className="shadow-xl bg-[#D9D9D9] rounded-3xl p-4"
								value={email}
								onChange={e => setEmail(e.target.value)}
							/>
						</div>
						<div className="flex flex-col gap-2">
							<label htmlFor="password" className="font-bold">
								Senha
							</label>
							<input
								type="password"
								name="password"
								id="password"
								placeholder="Senha"
								className="shadow-xl bg-[#D9D9D9] rounded-3xl p-4"
								value={password}
								onChange={e => setPassword(e.target.value)}
							/>
						</div>
						<div className="flex flex-row justify-between gap-10 pt-10 items-center">
							<button
								className="bg-black shadow-xl rounded-3xl p-4 w-[50%] text-white"
								onClick={handleLoginClick}>
								Entrar
							</button>
							<button
								className="bg-white shadow-xl rounded-3xl p-4 w-[50%] text-black"
								onClick={handleCadastroClick}>
								Cadastrar
							</button>
						</div>
					</form>
				</div>
			</main>
		</>
	);
}
