import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createComment(@Body() body, @User() user) {
    const { parentId, articleId, content } = body;
    const comment = await this.commentService.createComment(
      parentId,
      articleId,
      content,
      user.id,
    );
    return comment;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async modifyComment(@Body() body, @User() user, @Param('id') id) {
    const content = body.content;
    const userId = user.id;
    const commentId = id;

    const res = await this.commentService.modifyComment(
      commentId,
      userId,
      content,
    );

    return res;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeComment(@User() user, @Param('id') id) {
    const userId = user.id;
    const commentId = id;

    const res = await this.commentService.removeComment(commentId, userId);
    return res;
  }
}
