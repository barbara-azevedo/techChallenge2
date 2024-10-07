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

const createPostSchema = z.object({
  titulo: z.string(),
  conteudo: z.string(),
  relationAutorId: z.coerce.string(),
});

const updatePostSchema = z.object({
  titulo: z.string(),
  conteudo: z.string(),
  relationAutorId: z.coerce.string(),
});

type CreatePost = z.infer<typeof createPostSchema>;
type UpdatePost = z.infer<typeof updatePostSchema>;

//@UseInterceptors(LoggingInterceptor)
@Controller('post')
export class EducaOnlineController {
  constructor(
    private readonly autorService: AutorService,
    private readonly postService: EducaOnlineService,
  ) {}

  @Get('all')
  async getAllPost(@Query('limit') limit: number, @Query('page') page: number) {
    return this.postService.getAllPost(limit, page);
  }

  @Get('findOne/:postId')
  async getPost(@Param('postId') postId: string) {
    return this.postService.getPost(postId);
  }

  @Get('findSearch/:search')
  async getPostSearch(@Param('search') search: string) {
    return this.postService.getAllPostSearch(search);
  }

  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(createPostSchema))
  @Post('create')
  async createPost(@Body() { titulo, conteudo, relationAutorId }: CreatePost) {
    const autor = await this.autorService.getAutor(relationAutorId);
    if (!autor) throw new BadRequestException('Autor not exists');

    return this.postService.createPost({ titulo, conteudo, autor });
  }

  @UseGuards(AuthGuard)
  @Put('update/:postId')
  async updatePost(
    @Param('postId') postId: string,
    @Body(new ZodValidationPipe(updatePostSchema))
    { titulo, conteudo, relationAutorId }: UpdatePost,
  ) {
    const autor = await this.autorService.getAutor(relationAutorId);
    if (!autor) throw new BadRequestException('Autor not exists');
    return this.postService.updatePost(postId, {
      titulo,
      conteudo,
      autor,
    });
  }

  @UseGuards(AuthGuard)
  @Delete('remove/:postId')
  async deletePost(@Param('postId') postId: string) {
    return this.postService.deletePost(postId);
  }
}
