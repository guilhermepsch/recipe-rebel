import { ReceitaProps } from '..';

type ReceitaField = {
	label: string;
	name: string;
	value: string;
	handler: (e: ReceitaProps) => void;
	receita: ReceitaProps;
	heightRem?: number;
};

export default function ReceitaTextField(field: ReceitaField) {
	return (
		<div className="flex flex-col w-full gap-3 ">
			<label htmlFor={field.name} className="font-semibold text-4xl">
				{field.label}
			</label>
			<textarea
				name={field.name}
				id={field.name}
				placeholder={field.label}
				className={'shadow-xl bg-[#D9D9D9] rounded-3xl p-4 resize-none'}
				style={{
					height: field.heightRem
						? `${field.heightRem}rem`
						: 'auto',
				}}
				value={field.value}
				onChange={e =>
					field.handler({
						...field.receita,
						[field.name]: e.target.value,
					})
				}
			/>
		</div>
	);
}
