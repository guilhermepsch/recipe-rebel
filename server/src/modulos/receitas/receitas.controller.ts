import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ReceitasService } from './receitas.service';
import { CreateReceitaDto } from './dto/create-receita.dto';
import { UpdateReceitaDto } from './dto/update-receita.dto';
import {
  AutenticacaoGuard,
  RequisicaoComUsuario,
} from '../autenticacao/autenticacao.guard';

@Controller('receitas')
export class ReceitasController {
  constructor(private readonly receitasService: ReceitasService) {}

  @Post()
  @UseGuards(AutenticacaoGuard)
  create(
    @Body() createReceitaDto: CreateReceitaDto,
    @Req() req: RequisicaoComUsuario,
  ) {
    const usuarioId = req.usuario.sub;
    return this.receitasService.create(usuarioId, createReceitaDto);
  }

  @Get()
  findAll() {
    return this.receitasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.receitasService.findOne(id);
  }

  @UseGuards(AutenticacaoGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReceitaDto: UpdateReceitaDto) {
    return this.receitasService.update(id, updateReceitaDto);
  }

  @UseGuards(AutenticacaoGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.receitasService.remove(id);
  }
}
