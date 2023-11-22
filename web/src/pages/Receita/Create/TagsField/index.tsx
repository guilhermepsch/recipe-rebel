import { useState } from 'react';
import { ReceitaProps } from '..';
import { Plus, X } from '@phosphor-icons/react';

type TagsField = {
	receita: ReceitaProps;
	handler: (e: ReceitaProps) => void;
};

export default function TagsField({ receita, handler }: TagsField) {
	const [tags, setTags] = useState<string[]>([]);
	const [tag, setTag] = useState<string>('');

	const handleClickAddTag = () => {
		const arrayTags = [...tags];
		const singleTag = tag as string;
		arrayTags.find(t => t === singleTag) ? null : arrayTags.push(singleTag);
		setTags(arrayTags);
		handler({ ...receita, tags: arrayTags });
		setTag('');
	};

	return (
		<div className="flex flex-col gap-5 w-1/2">
			<label htmlFor="tags" className="font-semibold text-4xl">
				Tags
			</label>
			<div className="flex flex-row items-center justify-start gap-2">
				<input
					type="text"
					name="tags"
					id="tags"
					placeholder="Tag"
					className={
						'shadow-xl bg-[#D9D9D9] rounded-3xl p-4 resize-none max-w-[10rem]'
					}
					value={tag}
					onChange={e => setTag(e.target.value)}
				/>
				<span
					className="p-2 rounded-full bg-black"
					onClick={() => handleClickAddTag()}>
					<Plus color="white" size="24" />
				</span>
			</div>
			<div className="flex flex-row gap-3 w-full flex-wrap">
				{tags.map((t, i) => (
					<span
						key={i}
						className="flex flex-row px-3 py-2 rounded-full bg-black text-white text-center">
						{t}
						<X
							color="white"
							size="24"
							className="ml-2 cursor-pointer"
							onClick={() => {
								const arrayTags = [...tags];
								arrayTags.splice(i, 1);
								setTags(arrayTags);
								handler({ ...receita, tags: arrayTags });
							}}
						/>
					</span>
				))}
			</div>
		</div>
	);
}
