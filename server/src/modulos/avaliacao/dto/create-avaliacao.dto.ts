import { IsNotEmpty } from 'class-validator';
import { AvaliacaoNota } from '../avaliacao.entity';

export class CreateAvaliacaoDto {
  @IsNotEmpty({ message: 'A nota não pode ser vazia' })
  nota: AvaliacaoNota;
  @IsNotEmpty({ message: 'O comentário não pode ser vazio' })
  comentario: string;
  @IsNotEmpty({ message: 'O usuário não pode ser vazio' })
  usuario: string;
}
