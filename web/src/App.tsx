import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Doces from './pages/Doces';
import Salgados from './pages/Salgados';
import Populares from './pages/Populares';
import Recentes from './pages/Recentes';
import Login from './pages/Login';
import Register from './pages/Cadastro';
import Profile from './pages/Profile';
import Logout from './pages/Logout';

export default function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/populares" element={<Populares />} />
				<Route path="/doces" element={<Doces />} />
				<Route path="/salgados" element={<Salgados />} />
				<Route path="/recentes" element={<Recentes />} />
				<Route path="/login" element={<Login />} />
				<Route path="/cadastro" element={<Register />} />
				<Route path="/logout" element={<Logout />} />
				<Route path="/profile/:id" element={<Profile />} />
				<Route path="*" element={<h1>Not Found</h1>} />
			</Routes>
		</>
	);
}
