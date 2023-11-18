import { IsArray, IsBase64, IsNotEmpty, IsString } from 'class-validator';

export class CreateReceitaDto {
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  @IsString({ message: 'O nome deve ser uma string' })
  nome: string;

  @IsNotEmpty({ message: 'Os ingredientes não podem ser vazios' })
  @IsString({ message: 'Os ingredientes devem ser uma string' })
  ingredientes: string;

  @IsNotEmpty({ message: 'O modo de preparo não pode ser vazio' })
  @IsString({ message: 'O modo de preparo deve ser uma string' })
  modoPreparo: string;

  @IsBase64({ message: 'A imagem deve ser base64' })
  imagem: string;

  @IsNotEmpty({ message: 'As tags não podem ser vazias' })
  @IsArray({ message: 'As tags devem ser um array' })
  tags: string[];
}
