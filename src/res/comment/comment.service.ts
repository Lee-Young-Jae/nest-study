import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from 'src/entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
  ) {}

  async createComment(
    parentId: string,
    articleId: string,
    content: string,
    userId: string,
  ) {
    const comment = await this.commentRepository.create({
      parentId,
      articleId,
      content,
      userId,
    });

    return comment;
  }
}
