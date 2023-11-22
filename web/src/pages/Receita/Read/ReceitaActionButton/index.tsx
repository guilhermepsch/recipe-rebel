import { Icon } from '@phosphor-icons/react';

type ReceitaActionButtonProps = {
	Icone: Icon;
	texto: string;
	action: () => void;
};

export default function ReceitaActionButton({
	Icone,
	texto,
	action,
}: ReceitaActionButtonProps) {
	return (
		<button className="flex bg-black items-center rounded-3xl p-2 group" onClick={()=>action()}>
			<Icone weight="fill" fill="white" width={24} height={24} />
			<span className="text-white text-base max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-200">
				<span className="pl-2">{texto}</span>
			</span>
		</button>
	);
}
