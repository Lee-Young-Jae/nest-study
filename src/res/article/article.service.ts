import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from 'src/entities/article.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}

  async createArticle(title: string, content: string, userId: string) {
    const article = await this.articleRepository.save({
      title,
      content,
      userId,
    });
    return article;
  }

  async getArticle(articleId: string) {
    const article = await this.articleRepository.findOne({
      where: { id: articleId },
    });
    return article;
  }

  async modifyArticle(
    userId: string,
    articleId: string,
    title: string,
    content: string,
  ) {
    const article = await this.articleRepository.findOne({
      where: {
        id: articleId,
        userId: userId,
      },
    });

    if (!article) {
      throw new UnauthorizedException('본인의 게시글이 아닙니다.');
    }

    const updateResult = await this.articleRepository.update(
      { id: articleId },
      {
        title: title,
        content: content,
      },
    );

    return { affected: updateResult?.affected };
  }

  async removeArticle(userId: string, articleId: string) {
    // await this.articleRepository.softDelete({ id: articleId });
    const deleteResult = await this.articleRepository.softDelete({
      id: articleId,
      userId,
    });

    return { affected: deleteResult?.affected };
  }
}
