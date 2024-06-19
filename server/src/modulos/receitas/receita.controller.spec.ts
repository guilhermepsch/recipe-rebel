import { Test, TestingModule } from '@nestjs/testing';
import { ReceitasController } from './receitas.controller';
import { ReceitasService } from './receitas.service';
import { CreateReceitaDto } from './dto/create-receita.dto';
import { UpdateReceitaDto } from './dto/update-receita.dto';
import { ReceitaEntity } from './receita.entity';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

describe('ReceitasController', () => {
  let controller: ReceitasController;
  let service: ReceitasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReceitasController],
      providers: [
        {
          provide: ReceitasService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            findByUser: jest.fn(),
            findRandom: jest.fn(),
            findByName: jest.fn(),
            visualized: jest.fn(),
          },
        },
        JwtService,
      ],
    }).compile();

    controller = module.get<ReceitasController>(ReceitasController);
    service = module.get<ReceitasService>(ReceitasService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    const usuarioId = '1';
    const validCreateDto: CreateReceitaDto = {
      nome: 'Bolo Simples',
      descricao: 'Um bolo simples saboroso.',
      ingredientes: '2 xícaras (chá) de açúcar, 3 xícaras (chá) de farinha de trigo, 4 colheres (sopa) de margarina, 3 ovos, 1 e 1/2 xícara (chá) de leite, 1 colher (sopa) bem cheia de fermento em pó',
      modoPreparo: 'Bata as claras em neve e reserve. Misture as gemas, a margarina e o açúcar até obter uma massa homogênea. Acrescente o leite e a farinha de trigo aos poucos, sem parar de bater. Por último, adicione as claras em neve e o fermento. Despeje a massa em uma forma grande de furo central untada e enfarinhada. Asse em forno médio 180 °C, preaquecido, por aproximadamente 40 minutos ou ao furar o bolo com um garfo, este saia limpo.',
      imagem: 'https://example.com/image.jpg',
      tags: ['bolo', 'doce'],
    };

    it('CT009: should not allow create if name is invalid', async () => {
      const dto = plainToInstance(CreateReceitaDto,  { ...validCreateDto, nome: '' });
      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      /* @ts-ignore */
      expect(errors[0].constraints.isNotEmpty).toBeDefined();
    });

    it('CT010: should not allow create if user already has a recipe with the same name', async () => {
      jest.spyOn(service, 'create').mockRejectedValueOnce(new Error('Usuário já possui uma receita com esse nome'));
      await expect(controller.create(validCreateDto, { usuario: { sub: usuarioId } } as any))
        .rejects.toThrow('Usuário já possui uma receita com esse nome');
    });

    it('CT011: should not allow create if description is invalid', async () => {
      const dto = plainToInstance(CreateReceitaDto,  { ...validCreateDto, descricao: '' });
      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      /* @ts-ignore */
      expect(errors[0].constraints.isNotEmpty).toBeDefined();
    });

    it('CT012: should not allow create if ingredients are invalid', async () => {
      const dto = plainToInstance(CreateReceitaDto,  { ...validCreateDto, ingredientes: '' });
      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      /* @ts-ignore */
      expect(errors[0].constraints.isNotEmpty).toBeDefined();
    });

    it('CT013: should not allow create if modoPreparo is invalid', async () => {
      const dto = plainToInstance(CreateReceitaDto,  { ...validCreateDto, modoPreparo: '' });
      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      /* @ts-ignore */
      expect(errors[0].constraints.isNotEmpty).toBeDefined();
    });

    it('CT014: should allow create if all data is valid', async () => {
      const expectedResult = { id: '1', ...validCreateDto, usuarioId };
      jest.spyOn(service, 'create').mockResolvedValueOnce(expectedResult as unknown as ReceitaEntity);

      const result = await controller.create(validCreateDto, { usuario: { sub: usuarioId } } as any);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('update', () => {
    const receitaId = '1';
    const validUpdateDto: UpdateReceitaDto = {
      nome: 'Bolo Simples Atualizado',
      descricao: 'Um bolo simples e atualizado.',
      ingredientes: '3 xícaras (chá) de açúcar, 4 xícaras (chá) de farinha de trigo, 5 colheres (sopa) de margarina, 4 ovos, 2 xícaras (chá) de leite, 2 colheres (sopa) bem cheia de fermento em pó',
      modoPreparo: 'Bata as claras em neve e reserve. Misture as gemas, a margarina e o açúcar até obter uma massa homogênea. Acrescente o leite e a farinha de trigo aos poucos, sem parar de bater. Por último, adicione as claras em neve e o fermento. Despeje a massa em uma forma grande de furo central untada e enfarinhada. Asse em forno médio 180 °C, preaquecido, por aproximadamente 45 minutos ou ao furar o bolo com um garfo, este saia limpo.',
      imagem: 'https://example.com/image_updated.jpg',
      tags: ['bolo', 'doce', 'atualizado'],
    };

    it('CT015: should not allow update if new name is invalid', async () => {
      const invalidUpdateDto = { ...validUpdateDto, nome: '' };
      const dto = plainToInstance(CreateReceitaDto,  { ...invalidUpdateDto, nome: '' });
      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      /* @ts-ignore */
      expect(errors[0].constraints.isNotEmpty).toBeDefined();
    });

    it('CT016: should not allow update if new description is invalid', async () => {
      const invalidUpdateDto = { ...validUpdateDto, descricao: '' };
      const dto = plainToInstance(CreateReceitaDto,  invalidUpdateDto);
      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      /* @ts-ignore */
      expect(errors[0].constraints.isNotEmpty).toBeDefined();
    });

    it('CT017: should not allow update if new ingredients are invalid', async () => {
      const invalidUpdateDto = { ...validUpdateDto, ingredientes: '' };
      const dto = plainToInstance(CreateReceitaDto,  invalidUpdateDto);
      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      /* @ts-ignore */
      expect(errors[0].constraints.isNotEmpty).toBeDefined();
    });

    it('CT018: should not allow update if new modoPreparo is invalid', async () => {
      const invalidUpdateDto = { ...validUpdateDto, modoPreparo: '' };
      const dto = plainToInstance(CreateReceitaDto,  invalidUpdateDto);
      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      /* @ts-ignore */
      expect(errors[0].constraints.isNotEmpty).toBeDefined();
    });

    it('should allow update if all new data is valid', async () => {
      const expectedResult = { id: receitaId, ...validUpdateDto };
      jest.spyOn(service, 'update').mockResolvedValueOnce(expectedResult as ReceitaEntity);

      const result = await controller.update(receitaId, validUpdateDto);
      expect(result).toEqual(expectedResult);
    });
  });
});
