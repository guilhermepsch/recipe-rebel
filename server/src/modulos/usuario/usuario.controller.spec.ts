import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { HashearSenhaPipe } from '../../recursos/pipes/hashear-senha.pipe';
import { UsuarioEntity } from './usuario.entity';
import { ConfigService } from '@nestjs/config';
import { Validator } from 'class-validator';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';

describe('UsuarioController', () => {
  let controller: UsuarioController;
  let service: UsuarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioController],
      providers: [
        {
          provide: UsuarioService,
          useValue: {
            criaUsuario: jest.fn(),
            listUsuarios: jest.fn(),
            getById: jest.fn(),
            atualizaUsuario: jest.fn(),
            deletaUsuario: jest.fn(),
          },
        },
        ConfigService,
      ],
    }).compile();

    controller = module.get<UsuarioController>(UsuarioController);
    service = module.get<UsuarioService>(UsuarioService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createUsuario', () => {
    it('CT001: should not allow creation if email is already in use', async () => {
      jest
        .spyOn(service, 'criaUsuario')
        .mockRejectedValueOnce(new Error('Email already in use'));
      const dto: CriaUsuarioDTO = {
        nome: 'Mariana Lino',
        email: 'mariana@email.com',
        senha: '12345678',
      };

      await expect(controller.criaUsuario(dto, dto.senha)).rejects.toThrow(
        'Email already in use',
      );
    });

    it('CT002: should not allow creation if email is invalid', async () => {
      const dto: CriaUsuarioDTO = {
        nome: 'Mariana Lino',
        email: 'marianaemailldlsd',
        senha: '12345678',
      };

      await expect(controller.criaUsuario(dto, dto.senha)).rejects.toThrow();
    });

    it('CT003: should not allow creation if password is invalid', async () => {
      const dto: CriaUsuarioDTO = {
        nome: 'Mariana Lino',
        email: 'mariana@email.com',
        senha: ' ',
      };

      await expect(controller.criaUsuario(dto, dto.senha)).rejects.toThrow();
    });

    it('CT004: should not allow creation if name is invalid', async () => {
      const dto: CriaUsuarioDTO = {
        nome: ' ',
        email: 'mariana@email.com',
        senha: '12345678',
      };

      await expect(controller.criaUsuario(dto, dto.senha)).rejects.toThrow();
    });

    it('CT005: should allow creation if all data is valid', async () => {
      const dto: CriaUsuarioDTO = {
        nome: 'Mariana Lino',
        email: 'mariana@email.com',
        senha: '12345678',
      };
      const createdUser = { id: '1', nome: dto.nome, senha: 'hashedPassword' };

      jest
        .spyOn(service, 'criaUsuario')
        .mockResolvedValueOnce(createdUser as UsuarioEntity);

      const result = await controller.criaUsuario(dto, 'hashedPassword');

      expect(result).toEqual({
        messagem: 'usuário criado com sucesso',
        usuario: { id: '1', nome: 'Mariana Lino' },
      });
    });
  });

  describe('atualizaUsuario', () => {
    const userId = '1';

    it('CT006: should not allow update if new email is invalid', async () => {
      const dto: AtualizaUsuarioDTO = {
        nome: 'Mariana Lino',
        email: 'mariana@email',
        senha: '12345678',
      };

      jest
        .spyOn(service, 'atualizaUsuario')
        .mockRejectedValueOnce(new Error('Invalid email format'));

      await expect(controller.atualizaUsuario(userId, dto)).rejects.toThrow(
        'Invalid email format',
      );
    });

    it('CT007: should not allow update if new password is invalid', async () => {
      const dto: AtualizaUsuarioDTO = {
        nome: 'Mariana Lino',
        email: 'mariana@email.com',
        senha: ' ',
      };

      jest
        .spyOn(service, 'atualizaUsuario')
        .mockRejectedValueOnce(new Error('Invalid password'));

      await expect(controller.atualizaUsuario(userId, dto)).rejects.toThrow(
        'Invalid password',
      );
    });

    it('CT008: should not allow update if new name is invalid', async () => {
      const dto: AtualizaUsuarioDTO = {
        nome: ' ',
        email: 'mariana@email.com',
        senha: '12345678',
      };

      jest
        .spyOn(service, 'atualizaUsuario')
        .mockRejectedValueOnce(new Error('Invalid name'));

      await expect(controller.atualizaUsuario(userId, dto)).rejects.toThrow(
        'Invalid name',
      );
    });

    it('should allow update if all new data is valid', async () => {
      const dto: AtualizaUsuarioDTO = {
        nome: 'Mariana Lino',
        email: 'mariana@email.com',
        senha: '12345678',
      };
      const updatedUser = {
        id: userId,
        nome: dto.nome,
        email: dto.email,
        senha: 'hashedPassword',
      };

      jest
        .spyOn(service, 'atualizaUsuario')
        .mockResolvedValueOnce(updatedUser as UsuarioEntity);

      const result = await controller.atualizaUsuario(userId, dto);

      expect(result).toEqual({
        messagem: 'usuário atualizado com sucesso',
        usuario: updatedUser,
      });
    });
  });
});
