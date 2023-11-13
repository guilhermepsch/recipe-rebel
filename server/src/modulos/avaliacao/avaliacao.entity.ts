import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';

export enum AvaliacaoNota {
  UM = 1,
  DOIS = 2,
  TRES = 3,
  QUATRO = 4,
  CINCO = 5,
}

@Entity({ name: 'avaliacoes' })
export class AvaliacaoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nota', type: 'enum', enum: AvaliacaoNota, nullable: false })
  nota: AvaliacaoNota;

  @Column({ name: 'comentario', length: 255, nullable: true })
  comentario: string;

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.avaliacoes)
  usuario: UsuarioEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
