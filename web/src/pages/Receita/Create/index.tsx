import { useState } from 'react';
import Header from '../../../components/Header';
import ReceitaTextField from './ReceitaTextField';
import ImageUpload from './ImageFIeld';
import TagsField from './TagsField';

export type ReceitaProps = {
	nome: string;
	ingredientes: string;
	modoPreparo: string;
	imagem: string;
	tags: string[];
	descricao: string;
};

export default function RecipeCreate() {
	const [receita, setReceita] = useState<ReceitaProps>({
		nome: '',
		ingredientes: '',
		modoPreparo: '',
		imagem: '',
		tags: [],
		descricao: ''
	});

	return (
		<>
			<Header />
			<div className="my-9 mx-32">
				<h1 className="font-bold text-5xl mb-16">Nova receita</h1>
				<form className="flex flex-row gap-16" action="" method="">
					<div className="flex flex-col gap-8 w-5/12">
						<ReceitaTextField
							label="Nome"
							name="nome"
							value={receita.nome}
							handler={setReceita}
							receita={receita}
						/>
						<ReceitaTextField
							label="Ingredientes"
							name="ingredientes"
							value={receita.ingredientes}
							handler={setReceita}
							receita={receita}
							heightRem={10}
						/>
						<ReceitaTextField
							label="Modo de preparo"
							name="modoPreparo"
							value={receita.modoPreparo}
							handler={setReceita}
							receita={receita}
							heightRem={10}
						/>
					</div>
					<div className="flex flex-col w-5/12">
						<div className="flex flex-col w-full gap-3 ">
							<label className="font-semibold text-4xl">
								Imagem
							</label>
							<ImageUpload
								receita={receita}
								handler={setReceita}
							/>
						</div>
						<div className="flex flex-row gap-3 pt-4">
							<TagsField receita={receita} handler={setReceita} />
							<ReceitaTextField
								label='Descrição'
								name='descricao'
								value={receita.descricao}
								handler={setReceita}
								receita={receita}
								heightRem={10}
							/>
						</div>
					</div>
				</form>
				<div className="flex flex-row justify-start gap-5 mt-10">
					<button className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-500 transition-colors duration-300 ease-linear">
						Cancelar
					</button>
					<button className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-500 transition-colors duration-300 ease-linear">
						Salvar
					</button>
				</div>
			</div>
		</>
	);
}
