import { Column, Entity, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { CommentEntity } from './comment.entity';
import { CommonBigPKEntity } from './common.entity';
import { UserEntity } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('Article')
export class ArticleEntity extends CommonBigPKEntity {
  @ApiProperty({
    example: '게시글 제목',
    description: '게시글 제목입니다.',
    required: true,
  })
  @Column('varchar', { unique: false, nullable: false })
  title: string;

  @ApiProperty({
    example: '게시글 내용',
    description: '게시글 내용입니다.',
    required: true,
  })
  @Column('text', { unique: false, nullable: false })
  content: string;

  @Column('bigint', { unique: false, nullable: false })
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.articles)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.article)
  comments: CommentEntity[];
}
