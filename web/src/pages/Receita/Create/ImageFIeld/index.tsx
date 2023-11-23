import { Plus, X } from '@phosphor-icons/react';
import React, { useState } from 'react';
import { ReceitaProps } from '..';

type ImageUpload = {
  receita: ReceitaProps;
  handler: (e: ReceitaProps) => void;
}

export default function ImageUpload ({ receita, handler }: ImageUpload) {
	const [image, setImage] = useState<string | null>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files && event.target.files[0];

		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
        const img = reader.result as string;
				setImage(img);
        handler({
          ...receita,
          imagem: btoa(img)
        })
			};
			reader.readAsDataURL(file);
		}
	};

	const handleRemoveImage = () => {
		setImage(null);
	};

	return (
		<div className="w-full bg-[#D9D9D9] rounded-3xl overflow-hidden relative">
			{image ? (
				<>
					<div
						className="w-full h-64 min-h-64 bg-cover bg-center"
						style={{ backgroundImage: `url(${image})` }}
					/>
					<button
						className="absolute top-2 right-2 bg-transparent border-none cursor-pointer"
						onClick={handleRemoveImage}>
						<X size={50} />
					</button>
				</>
			) : (
				<label
					htmlFor="fileInput"
					className="cursor-pointer w-full h-64 min-h-64 flex items-center justify-center">
					<input
						type="file"
						id="fileInput"
						accept="image/*"
						className="hidden"
						onChange={handleFileChange}
					/>
					<Plus size={50} />
				</label>
			)}
		</div>
	);
};