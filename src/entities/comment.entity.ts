import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ArticleEntity } from './article.entity';
import { CommonBigPKEntity } from './common.entity';
import { UserEntity } from './user.entity';

@Entity('Comment')
export class CommentEntity extends CommonBigPKEntity {
  @Column('text', { unique: false, nullable: false })
  content: string;

  @Column('bigint', { unique: false, nullable: true })
  parentId: string | null;

  @Column('bigint', { unique: false, nullable: false })
  articleId: string;

  @Column('bigint', { unique: false, nullable: false })
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.comments)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: UserEntity;

  @ManyToOne(() => ArticleEntity, (article) => article.comments)
  @JoinColumn({ name: 'articleId', referencedColumnName: 'id' })
  article: ArticleEntity;
}
