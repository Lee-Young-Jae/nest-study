import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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
    const comment = await this.commentRepository.save({
      parentId,
      articleId,
      content,
      userId,
    });

    return comment;
  }

  async modifyComment(commentId: string, userId: string, content: string) {
    const existComment = await this.commentRepository.findOne({
      where: { id: commentId, userId },
    });

    if (!existComment) {
      throw new UnauthorizedException('본인의 댓글이 아닙니다.');
    }

    const updateResult = await this.commentRepository.update(
      {
        id: commentId,
      },
      {
        content,
      },
    );

    return {
      affected: updateResult.affected,
    };
  }

  async removeComment(commentId: string, userId: string) {
    const existComment = await this.commentRepository.findOne({
      where: { id: commentId, userId },
    });

    if (!existComment) {
      throw new UnauthorizedException('본인의 댓글이 아닙니다.');
    }

    const deleteResult = await this.commentRepository.softDelete(commentId);

    return {
      affected: deleteResult.affected,
    };
  }
}
