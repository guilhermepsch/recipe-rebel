import { Test, TestingModule } from '@nestjs/testing';
import { AvaliacaoController } from './avaliacao.controller';
import { AvaliacaoService } from './avaliacao.service';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';
import { AvaliacaoNota } from './avaliacao.entity';
import { RequisicaoComUsuario } from '../autenticacao/autenticacao.guard';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

describe('AvaliacaoController', () => {
  let controller: AvaliacaoController;
  let service: AvaliacaoService;

  const mockAvaliacaoService = {
    create: jest.fn((usuarioId, dto) => {
      if (dto.nota < 1 || dto.nota > 5) {
        throw new Error('Invalid rating');
      }
      return {
        id: '1',
        ...dto,
        usuarioId,
      };
    }),
    findAll: jest.fn(() => [
      {
        id: '1',
        nota: 3,
        comentario: 'Excelente bolo!',
        receitaId: '1',
      },
    ]),
    findOne: jest.fn((id) => ({
      id,
      nota: 3,
      comentario: 'Excelente bolo!',
      receitaId: '1',
    })),
    update: jest.fn((id, dto) => {
      if (dto.nota < 1 || dto.nota > 5 || !dto.comentario.trim()) {
        throw new Error('Invalid data');
      }
      return {
        id,
        ...dto,
      };
    }),
    remove: jest.fn((id) => ({
      id,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AvaliacaoController],
      providers: [
        {
          provide: AvaliacaoService,
          useValue: mockAvaliacaoService,
        },
        ConfigService,
        JwtService,
      ],
    }).compile();

    controller = module.get<AvaliacaoController>(AvaliacaoController);
    service = module.get<AvaliacaoService>(AvaliacaoService);
  });

  describe('create', () => {
    it('CT033: Verificar se o sistema insere uma avaliação negativa', async () => {
      const createAvaliacaoDto: CreateAvaliacaoDto = {
        nota: -5 as any,
        comentario: 'Excelente bolo!',
        receitaId: '1',
      };
      const req: RequisicaoComUsuario = { usuario: { sub: 'user1' } } as any;
      await expect(controller.create(createAvaliacaoDto, req)).rejects.toThrow(
        'Invalid rating',
      );
    });

    it('CT034: Verificar se o sistema insere uma avaliação zerada', async () => {
      const createAvaliacaoDto: CreateAvaliacaoDto = {
        nota: AvaliacaoNota.ZERO,
        comentario: 'Excelente bolo!',
        receitaId: '1',
      };
      const req: RequisicaoComUsuario = { usuario: { sub: 'user1' } } as any;
      await expect(controller.create(createAvaliacaoDto, req)).rejects.toThrow(
        'Invalid rating',
      );
    });

    it('CT035: Verificar se o sistema aceita uma avaliação positiva dentro do padrão esperado', async () => {
      const createAvaliacaoDto: CreateAvaliacaoDto = {
        nota: AvaliacaoNota.TRES,
        comentario: 'Excelente bolo!',
        receitaId: '1',
      };
      const req: RequisicaoComUsuario = { usuario: { sub: 'user1' } } as any;
      expect(await controller.create(createAvaliacaoDto, req)).toEqual({
        id: '1',
        ...createAvaliacaoDto,
        usuarioId: req.usuario.sub,
      });
    });

    it('CT036: Verificar se o sistema aceita uma avaliação positiva e acima do padrão esperado', async () => {
      const createAvaliacaoDto: CreateAvaliacaoDto = {
        nota: 10 as any,
        comentario: 'Excelente bolo!',
        receitaId: '1',
      };
      const req: RequisicaoComUsuario = { usuario: { sub: 'user1' } } as any;
      await expect(controller.create(createAvaliacaoDto, req)).rejects.toThrow(
        'Invalid rating',
      );
    });
  });

  describe('update', () => {
    it('CT039: Verificar se o sistema valida os dados com comentário inválido', async () => {
      const updateAvaliacaoDto: UpdateAvaliacaoDto = {
        nota: AvaliacaoNota.CINCO,
        comentario: ' ',
      };
      await expect(controller.update('1', updateAvaliacaoDto)).rejects.toThrow(
        'Invalid data',
      );
    });

    it('CT040: Verificar se o sistema valida os dados de uma avaliação inválida', async () => {
      const updateAvaliacaoDto: UpdateAvaliacaoDto = {
        nota: -5,
        comentario: 'Excelente bolo!',
      };
      await expect(controller.update('1', updateAvaliacaoDto)).rejects.toThrow(
        'Invalid data',
      );
    });

    it('CT041: Verificar se o sistema valida ambos dados inválidos', async () => {
      const updateAvaliacaoDto: UpdateAvaliacaoDto = {
        nota: -5,
        comentario: ' ',
      };
      await expect(controller.update('1', updateAvaliacaoDto)).rejects.toThrow(
        'Invalid data',
      );
    });

    it('CT042: Verificar se o sistema valida os dados de uma atualização válida', async () => {
      const updateAvaliacaoDto: UpdateAvaliacaoDto = {
        nota: AvaliacaoNota.CINCO,
        comentario: 'Excelente bolo!',
      };
      expect(await controller.update('1', updateAvaliacaoDto)).toEqual({
        id: '1',
        ...updateAvaliacaoDto,
      });
    });
  });
});
