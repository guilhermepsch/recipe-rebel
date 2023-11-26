import Header from '../../components/Header';
import Receita from '../../components/Receita';
import seta from '../../assets/img/seta.svg';

export default function Populares() {
	return (
		<>
			<Header />
			<div className="flex gap-[30px] ml-[159px] mt-[55px]">
				{/* <Receita widthPx={478.314} heightPx={407.863} />
				<Receita widthPx={478.314} heightPx={407.863} />
				<Receita widthPx={478.314} heightPx={407.863} /> */}
			</div>
			<div className="relative">
				<div className="right-4 absolute flex flex-col justify-center items-center">
					<button className="bg-black text-white rounded-full p-4 pr-5 pl-5 shadow-md focus:outline-none">
						<img src={seta} alt="Seta" />
					</button>
					<p className="text-right mt-2">Outras Receitas</p>
				</div>
			</div>
			<div className="flex gap-[30px] ml-[159px] mt-[30px] mb-[55px]">
				{/* <Receita widthPx={478.314} heightPx={407.863} />
				<Receita widthPx={478.314} heightPx={407.863} />
				<Receita widthPx={478.314} heightPx={407.863} /> */}
			</div>
		</>
	);
}
