import Header from '../../components/Header';
import elipseBG from '../../assets/img/elipse-bg.svg';
import salada1 from '../../assets/img/salada.jpg';
import salada2 from '../../assets/img/salada-caesar.png';
import { useState } from 'react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';

export default function Home() {
	const [currentImage, setCurrentImage] = useState(0);
	const images = [salada1, salada2];

	const handlePrev = () => {
		setCurrentImage(prevImage =>
			prevImage === 0 ? images.length - 1 : prevImage - 1,
		);
	};

	const handleNext = () => {
		setCurrentImage(prevImage =>
			prevImage === images.length - 1 ? 0 : prevImage + 1,
		);
	};

	return (
		<>
			<Header />
			<main className="h-full w-full">
				<div className="flex flex-row pt-[4.75rem]">
					<div className="relative flex flex-col w-1/2">
						<div className="flex-shrink-0 text-black font-extrabold text-[200px] leading-none opacity-[0.08] pl-32">
							Receitas
						</div>
						<div className="flex-shrink-0 text-black font-extrabold text-[148px] leading-none opacity-[0.08] pl-32">
							Inovadoras
						</div>
						<div className="flex-shrink-0 text-black font-semibold text-[64px] leading-none pl-32">
							A busca irônica pela
						</div>
						<div className="flex flex-row items-center pl-32 gap-[3.70rem]">
							<div className="flex-shrink-0 text-black font-semibold text-[80px] leading-none">
								receita
							</div>
							<div className="flex-shrink-0 text-black font-semibold text-[80px] leading-none">
								perfeita
							</div>
						</div>
					</div>
					<div className="w-1/2 max-h-[700px] flex flex-col justify-start items-start gap-6 relative pl-36">
						<div className="absolute flex flex-col justify-start items-start gap-6">
							<img src={elipseBG} alt="Ellipse Background 1" />
							<img src={elipseBG} alt="Ellipse Background 2" />
						</div>
						<div className="relative z-10 ml-[6.5rem] mt-5">
							<div className="w-[600px] h-[600px] rounded-3xl border-2 shadow-2xl relative">
								{images.map((image, index) => (
									<div
										key={index}
										className={`w-full h-full bg-cover bg-center absolute transition-opacity rounded-3xl duration-500 ${
											index === currentImage
												? 'opacity-100'
												: 'opacity-0'
										}`}
										style={{
											backgroundImage: `url(${image})`,
										}}
									/>
								))}
								<div className="flex flex-col absolute bottom-0 w-full gap-2 pl-5 pr-5 pb-10 pt-32 bg-gradient-to-t from-black to-transparent text-white text-2xl font-bold rounded-b-3xl">
									<p>Text Over Image</p>
									<div className="flex fler-row justify-center items-center pr-5 pl-5">
										<button onClick={handlePrev}>
											<CaretLeft size={30} />
										</button>
										<button onClick={handleNext}>
											<CaretRight size={30} />
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
