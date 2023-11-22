import Header from '../../../components/Header';
import { Heart, WhatsappLogo, FilePdf, Star } from '@phosphor-icons/react';
import ReceitaActionButton from './ReceitaActionButton';
import ReceitaAvaliacao from './ReceitaAvaliacao';

export default function RecipeRead() {
	return (
		<>
			<Header />
			<div className="w-full flex flex-row ml-12 mr-12 mt-14">
				<div className="w-3/5 p-5 flex flex-col">
					<div
						className={
							'bg-cover bg-center rounded-3xl w-full h-[28.5625rem] min-w-full min-h-[28.5625rem]'
						}
						style={{
							backgroundImage: `url(https://www.receitasnestle.com.br/sites/default/files/srh_recipes/c390f7572db6774bd6b3134580c7ea27.jpg)`,
						}}
					/>
					<div className="flex flex-col">
						<div className="text-4xl font-bold capitalize pt-2 pb-2 flex items-center gap-3 overflow-hidden whitespace-nowrap">
							<span>Rocambole de doce de leite perfeito</span>
							<ReceitaActionButton
								texto="Favoritar"
								Icone={Heart}
								action={() => {
									alert('clicou');
								}}
							/>
							<ReceitaActionButton
								texto="Compartilhar"
								Icone={WhatsappLogo}
								action={() => {
									alert('clicou');
								}}
							/>
							<ReceitaActionButton
								texto="Exportar"
								Icone={FilePdf}
								action={() => {
									alert('clicou');
								}}
							/>
							<ReceitaActionButton
								texto="Avaliar"
								Icone={Star}
								action={() => {
									alert('clicou');
								}}
							/>
						</div>
						<div className="flex flex-row">
							<span className="flex w-16 h-8 rounded-[4rem] bg-black text-white font-bold text-[16px] justify-center items-center">
								Doce
							</span>
						</div>
						<div className="py-3">
							<span className="font-bold text-4xl capitalize">
								Ingredientes
							</span>
							<p className="pt-3 font-semibold text-lg opacity-70">
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit. Donec ut arcu pulvinar, semper
								eros quis, euismod diam. Suspendisse imperdiet
								mattis auctor. Morbi sed luctus ex. Suspendisse
								id tincidunt felis. Quisque sed mattis nibh, non
								posuere nunc. Nunc at nisi odio. Etiam maximus
								magna ut arcu lacinia, ut auctor lorem faucibus.
								Fusce elementum ligula eu pretium auctor. Nullam
								pretium, leo eu viverra varius, ligula nibh
								rhoncus arcu, eget scelerisque ipsum urna et
								turpis. Mauris semper sem sit amet mi
								sollicitudin, sed sagittis magna aliquet.
								Curabitur et augue ornare, fermentum enim
								vehicula, egestas eros. Etiam dapibus ut massa
								et pretium. Proin consequat libero ut posuere
								varius. Interdum et malesuada fames ac ante
								ipsum primis in faucibus.
							</p>
						</div>
					</div>
					<div className="py-3">
						<span className="font-bold text-4xl capitalize">
							Modo de Preparo
						</span>
						<p className="pt-3 font-semibold text-lg opacity-70">
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit. Donec ut arcu pulvinar, semper eros quis,
							euismod diam. Suspendisse imperdiet mattis auctor.
							Morbi sed luctus ex. Suspendisse id tincidunt felis.
							Quisque sed mattis nibh, non posuere nunc. Nunc at
							nisi odio. Etiam maximus magna ut arcu lacinia, ut
							auctor lorem faucibus. Fusce elementum ligula eu
							pretium auctor. Nullam pretium, leo eu viverra
							varius, ligula nibh rhoncus arcu, eget scelerisque
							ipsum urna et turpis. Mauris semper sem sit amet mi
							sollicitudin, sed sagittis magna aliquet. Curabitur
							et augue ornare, fermentum enim vehicula, egestas
							eros. Etiam dapibus ut massa et pretium. Proin
							consequat libero ut posuere varius. Interdum et
							malesuada fames ac ante ipsum primis in faucibus.
						</p>
					</div>
				</div>
				<ReceitaAvaliacao />
			</div>
		</>
	);
}
