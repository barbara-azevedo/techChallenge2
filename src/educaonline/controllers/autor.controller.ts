import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { z } from 'zod';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { ZodValidationPipe } from '../../shared/pipe/zod-validation.pipe';
import { AutorService } from '../services/autor.service';
import { EducaOnlineService } from '../services/educaonline.service';

const createAutorSchema = z.object({
  nome: z.string(),
});

const updateAutorSchema = z.object({
  nome: z.string(),
});

type CreateAutor = z.infer<typeof createAutorSchema>;
type UpdateAutor = z.infer<typeof updateAutorSchema>;

//@UseInterceptors(LoggingInterceptor)
@Controller('autor')
export class AutorController {
  constructor(
    private readonly autorService: AutorService,
    private readonly postService: EducaOnlineService,
  ) {}

  @Get('all')
  async getAllAutor(
    @Query('limit') limit: number,
    @Query('page') page: number,
  ) {
    return this.autorService.getAllAutor(limit, page);
  }

  @Get('findOne/:id')
  async getAutor(@Param('id') id: string) {
    return this.autorService.getAutor(id);
  }

  @Get('findSearch/:search')
  async getAutorSearch(@Param('search') search: string) {
    return this.autorService.getAllAutorSearch(search);
  }

  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(createAutorSchema))
  @Post('create')
  async createAutor(@Body() { nome }: CreateAutor) {
    const autor = await this.autorService.getFindAutorSearch(nome);

    if (autor && autor.length > 0)
      throw new BadRequestException('Autor exists');

    return this.autorService.createAutor({ nome });
  }

  @UseGuards(AuthGuard)
  @Put('update/:id')
  async updateAutor(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateAutorSchema))
    { nome }: UpdateAutor,
  ) {
    const autor = await this.autorService.getAutor(id);

    if (!autor) throw new BadRequestException('Autor not exists');
    autor.nome = nome;

    return this.autorService.updateAutor(id, autor);
  }

  @UseGuards(AuthGuard)
  @Delete('remove/:id')
  async deleteAutor(@Param('id') id: string) {
    const autor = await this.autorService.getAutor(id);
    if (!autor) throw new BadRequestException('Autor not exists');

    const post = await this.postService.getPostAndAutor(autor);

    if (post[0]) throw new BadRequestException('Autor exist in post');

    return this.autorService.deleteAutor(id);
  }
}
