import { Route, Routes } from 'react-router-dom';
import { RequireAuth } from 'react-auth-kit';
import Home from './pages/Home';
import Doces from './pages/Doces';
import Salgados from './pages/Salgados';
import Populares from './pages/Populares';
import Login from './pages/Login';
import Register from './pages/Cadastro';
import Profile from './pages/Profile';
import Logout from './pages/Logout';
import RecipeRead from './pages/Receita/Read';
import RecipeCreate from './pages/Receita/Create';
import RecipeUpdate from './pages/Receita/Update';
import Search from './pages/Search';
import AvaliacaoInclude from './pages/Avaliacao';

export default function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/populares" element={<Populares />} />
				<Route path="/doces" element={<Doces />} />
				<Route path="/salgados" element={<Salgados />} />
				<Route path="/login" element={<Login />} />
				<Route path="/cadastro" element={<Register />} />
				<Route path="/logout" element={<Logout />} />
				<Route path="/recipe/:id" element={<RecipeRead />} />
				<Route
					path="/recipe/include"
					element={
						<RequireAuth loginPath="/login">
							<RecipeCreate />
						</RequireAuth>
					}
				/>
				<Route
					path="/recipe/edit/:id"
					element={
						<RequireAuth loginPath="/login">
							<RecipeUpdate />
						</RequireAuth>
					}
				/>
				<Route path="/profile/:id" element={<Profile />} />
				<Route path="*" element={<h1>Not Found</h1>} />
				<Route path="/search/:query" element={<Search />} />
				<Route
					path="/avaliacao/:recipeId"
					element={
						<RequireAuth loginPath="/login">
							<AvaliacaoInclude />
						</RequireAuth>
					}
				/>
			</Routes>
		</>
	);
}
