import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { AvaliacaoEntity } from './avaliacao.entity';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';

@Injectable()
export class AvaliacaoService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
    @InjectRepository(AvaliacaoEntity)
    private readonly avaliacaoRepository: Repository<AvaliacaoEntity>,
  ) {}

  private async buscaUsuario(id: string) {
    const usuario = await this.usuarioRepository.findOneBy({ id });

    if (usuario === null) {
      throw new NotFoundException('O usuário não foi encontrado');
    }

    return usuario;
  }

  async create(usuarioId: string, createAvaliacaoDto: CreateAvaliacaoDto) {
    const avaliacaoEntity = new AvaliacaoEntity();
    const usuario = await this.buscaUsuario(usuarioId);

    avaliacaoEntity.comentario = createAvaliacaoDto.comentario;
    avaliacaoEntity.nota = createAvaliacaoDto.nota;
    avaliacaoEntity.usuario = usuario;

    return this.avaliacaoRepository.save(avaliacaoEntity);
  }

  async findAll() {
    return await this.avaliacaoRepository.find({ loadRelationIds: true });
  }

  async findOne(id: string) {
    return await this.avaliacaoRepository.findOneBy({ id });
  }

  async update(id: string, updateAvaliacaoDto: UpdateAvaliacaoDto) {
    const avaliacao = await this.avaliacaoRepository.findOneBy({ id });
    if (!avaliacao) {
      throw new NotFoundException('A avaliação não foi encontrada');
    }
    avaliacao.comentario = updateAvaliacaoDto.comentario;
    avaliacao.nota = updateAvaliacaoDto.nota;
  }

  async remove(id: string) {
    const avaliacao = await this.avaliacaoRepository.findOneBy({ id });
    if (!avaliacao) {
      throw new NotFoundException('A avaliação não foi encontrada');
    }
    return await this.avaliacaoRepository.remove(avaliacao);
  }
}
