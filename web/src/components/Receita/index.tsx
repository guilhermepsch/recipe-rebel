interface ReceitaProps {
	widthPx: number;
	heightPx: number;
}

function Receita({ widthPx, heightPx }: ReceitaProps) {
	return (
		<div
			className={'relative'}
			style={{
				width: `${widthPx}px`,
				height: `${heightPx}px`,
			}}>
			<div
				className={'bg-cover bg-center rounded-[20px]'}
				style={{
					width: `${widthPx}px`,
					height: `${heightPx}px`,
					backgroundImage: `url(https://www.receitasnestle.com.br/sites/default/files/srh_recipes/c390f7572db6774bd6b3134580c7ea27.jpg)`,
				}}
			/>
			<div className="absolute bottom-0 left-0 w-full h-2/6 flex-shrink-0 rounded-b-[20px] bg-black bg-opacity-70">
				<div className="h-full flex flex-col mt-5 ml-5 mr-5">
					<p className="text-white font-bold text-xl">
						<span className="flex flex-col justify-center">
							Rocambole De Doce De Leite Perfeito
						</span>
					</p>
					<p className="text-white text-[14px] mt-2">
						Essa receita funciona e é a melhor receita de rocambole
						do mundo!
					</p>
				</div>
			</div>
		</div>
	);
}

export default Receita;
