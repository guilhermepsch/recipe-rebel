import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReceitaDto } from './dto/create-receita.dto';
import { UpdateReceitaDto } from './dto/update-receita.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { AvaliacaoEntity } from '../avaliacao/avaliacao.entity';
import { Repository } from 'typeorm';
import { ReceitaEntity } from './receita.entity';

@Injectable()
export class ReceitasService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
    @InjectRepository(AvaliacaoEntity)
    private readonly avaliacaoRepository: Repository<AvaliacaoEntity>,
    @InjectRepository(ReceitaEntity)
    private readonly receitaRepository: Repository<ReceitaEntity>,
  ) {}

  async create(usuarioId: string, createReceitaDto: CreateReceitaDto) {
    const usuario = await this.buscaUsuario(usuarioId);
    const receita = new ReceitaEntity();

    receita.nome = createReceitaDto.nome;
    receita.ingredientes = createReceitaDto.ingredientes;
    receita.modoPreparo = createReceitaDto.modoPreparo;
    receita.tags = createReceitaDto.tags;
    receita.usuario = usuario;
    receita.imagem = createReceitaDto.imagem;

    return this.receitaRepository.save(receita);
  }

  async findAll() {
    return await this.receitaRepository.find({ loadRelationIds: true });
  }

  async findOne(id: string) {
    return await this.receitaRepository.findOneBy({ id });
  }

  async update(id: string, updateReceitaDto: UpdateReceitaDto) {
    const receita = await this.receitaRepository.findOneBy({ id });
    if (!receita) {
      throw new NotFoundException('A avaliação não foi encontrada');
    }
    receita.nome = updateReceitaDto.nome;
    receita.ingredientes = updateReceitaDto.ingredientes;
    receita.modoPreparo = updateReceitaDto.modoPreparo;
    receita.tags = updateReceitaDto.tags;
    receita.imagem = updateReceitaDto.imagem;

    return this.receitaRepository.save(receita);
  }

  async remove(id: string) {
    return await this.receitaRepository.delete({ id });
  }

  private async buscaUsuario(id: string) {
    const usuario = await this.usuarioRepository.findOneBy({ id });

    if (usuario === null) {
      throw new NotFoundException('O usuário não foi encontrado');
    }

    return usuario;
  }
}
