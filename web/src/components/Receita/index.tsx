import { useNavigate } from "react-router-dom";
import { getRecipesByUserResponse } from "../../api/recipe";

interface ReceitaProps {
	widthPx: number;
	heightPx: number;
	receita: getRecipesByUserResponse;
}

function Receita({ widthPx, heightPx, receita }: ReceitaProps) {

	const navigate = useNavigate();

	function receitaClickHandler() {
		navigate(`/recipe/${receita.id}`);
	}

	return (
		<div
			onClick={receitaClickHandler}
			className={'relative hover:cursor-pointer'}
			style={{
				width: `${widthPx}px`,
				height: `${heightPx}px`,
			}}>
			<div
				className={'bg-cover bg-center rounded-[20px]'}
				style={{
					width: `${widthPx}px`,
					height: `${heightPx}px`,
					backgroundImage: `url(${receita.imagem})`,
				}}
			/>
			<div className="absolute bottom-0 left-0 w-full h-2/6 flex-shrink-0 rounded-b-[20px] bg-black bg-opacity-70">
				<div className="h-full flex flex-col mt-5 ml-5 mr-5">
					<p className="text-white font-bold text-xl">
						<span className="flex flex-col justify-center">
							{receita.nome}
						</span>
					</p>
					<p className="text-white text-[14px] mt-2">
						{receita.descricao}
					</p>
				</div>
			</div>
		</div>
	);
}

export default Receita;
