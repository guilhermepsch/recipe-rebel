import Header from '../../components/Header';
import Receita from '../../components/Receita';
import { Heart } from '@phosphor-icons/react';

export default function Profile() {
	return (
		<>
			<Header />
			<main className="flex flex-row pt-20 pl-[12.5rem] pr-[12.5rem] gap-20 w-full">
				<div className="flex flex-col gap-12">
					<div className="flex flex-row gap-32 max-w-5xl">
						<div className="flex flex-row gap-10 text-5xl items-center">
							{/* <div
								className={
									'bg-cover bg-center rounded-full w-[12.5rem] h-[12.5rem] min-w-[12.5rem] min-h-[12.5rem]'
								}
								style={{
									backgroundImage: `url(https://www.receitasnestle.com.br/sites/default/files/srh_recipes/c390f7572db6774bd6b3134580c7ea27.jpg)`,
								}}
							/> */}
							<span>User</span>
						</div>
						{/* <div className="flex flex-col w-full h-[12.5rem] bg-white rounded-[1.25rem] text-xl">
							<div className="w-full border-b-[1px] border-black p-5">
								Sobre Mim
							</div>
							<div className="w-full p-5 text-justify overflow-scroll">
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit. Integer varius ipsum metus, in
								efficitur purus dignissim a. Sed convallis,
								ligula at iaculis congue, sapien nibh aliquet
								velit, ac scelerisque urna dui vel lacus. Duis a
								ex vitae ex pretium finibus. Phasellus fermentum
								vulputate neque, et vulputate velit. Aenean sed
								tristique lacus. Sed elementum, nulla id
								hendrerit gravida, justo urna dictum purus,
								vitae scelerisque ipsum mauris in justo.
								Vestibulum interdum, mauris nec ullamcorper
								fermentum, dui orci sodales arcu, a viverra nisi
								metus a ex. Aliquam ultrices dolor vel lacus
								vehicula, eget commodo metus bibendum. Vivamus
								tincidunt massa id venenatis ultricies. Aliquam
								ac dolor vitae arcu pellentesque rutrum. Morbi
								sollicitudin iaculis mauris, ac rutrum neque
								gravida sed. Fusce vitae aliquam elit.
							</div>
						</div> */}
					</div>
					<span className="text-4xl">
						Receitas publicadas por User
					</span>
					<div className="flex flex-col gap-8">
						<Receita heightPx={300} widthPx={900} />
						<Receita heightPx={300} widthPx={900} />
					</div>
				</div>
				<div className="flex flex-col shadow-2xl shadow-black rounded-3xl h-[50rem] w-[30rem]">
					<div className="flex flex-row gap-3 bg-black text-2xl font-bold p-5 text-white rounded-t-3xl">
						<span>Receitas Favoritas</span>
						<Heart size={30} />
					</div>
					<div className="flex flex-col gap-5 p-5 items-center overflow-scroll">
						<Receita heightPx={400} widthPx={400} />
            <Receita heightPx={400} widthPx={400} />
						<Receita heightPx={400} widthPx={400} />
						<Receita heightPx={400} widthPx={400} />
						<Receita heightPx={400} widthPx={400} />
					</div>
				</div>
			</main>
		</>
	);
}
