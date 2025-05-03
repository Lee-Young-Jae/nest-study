import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ArticleService } from './article.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createArticle(@Body() body, @User() user) {
    const userId = user.id;
    const { title, content } = body;

    const article = await this.articleService.createArticle(
      title,
      content,
      userId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async updateArticle(@Param('id') id, @User() user, @Body() body) {
    const userId = user.id;
    const articleId = id;

    const title = body.title;
    const content = body.content;

    const res = await this.articleService.modifyArticle(
      userId,
      articleId,
      title,
      content,
    );

    return res;
  }
}
