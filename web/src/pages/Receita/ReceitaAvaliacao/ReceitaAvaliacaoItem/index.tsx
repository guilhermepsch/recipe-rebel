import { Star } from '@phosphor-icons/react';

export default function ReceitaAvaliacaoItem() {
	return (
		<div className="flex flex-col pt-5">
			<div className="flex flex-row justify-start items-center gap-4 text-4xl capitalize mb-2">
				<span className="font-bold">Lívia</span>
				<div className="flex flex-row gap-2">
					<Star weight="fill" />
					<Star weight="fill" />
					<Star weight="fill" />
					<Star weight="fill" />
					<Star weight="fill" color="gray" />
				</div>
			</div>
			<p className="overflow-hidden text-sm">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
				ut arcu pulvinar, semper eros quis, euismod diam. Suspendisse
				imperdiet mattis auctor. Morbi sed luctus ex. Suspendisse id
				tincidunt felis. Quisque sed mattis nibh, non posuere nunc. Nunc
				at nisi odio. Etiam maximus magna ut arcu lacinia, ut auctor
				lorem faucibus. Fusce elementum ligula eu pretium auctor. Nullam
				pretium, leo eu viverra varius, ligula nibh rhoncus arcu, eget
				scelerisque ipsum urna et turpis. Mauris semper sem sit amet mi
				sollicitudin, sed sagittis magna aliquet. Curabitur et augue
				ornare, fermentum enim vehicula, egestas eros. Etiam dapibus ut
				massa et pretium. Proin consequat libero ut posuere varius.
				Interdum et malesuada fames ac ante ipsum primis in faucibus.
			</p>
      <span className='mt-4 h-[1px] w-full bg-black'></span>
		</div>
	);
}
