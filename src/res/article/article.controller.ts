import { Body, Controller, Post, UseGuards } from '@nestjs/common';
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
}
