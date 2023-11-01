import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';

export default function Login() {
  const navigate = useNavigate();

	const handleCadastroClick = (e: any) => {
		e.preventDefault();
    navigate('/cadastro');
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
							/>
						</div>
						<div className="flex flex-row justify-between gap-10 pt-10 items-center">
							<button className="bg-black shadow-xl rounded-3xl p-4 w-[50%] text-white">
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
