import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from 'src/entities/article.entity';
import { UserEntity } from 'src/entities/user.entity';
import { ArticleService } from 'src/res/article/article.service';
import { ArticleController } from 'src/res/article/article.controller';
import { CommentEntity } from 'src/entities/comment.entity';

describe('Article Spec', () => {
  let controller: ArticleController;
  let service: ArticleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: `.env.${process.env.NODE_ENV}`,
          isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            retryAttempts: configService.get('NODE_ENV') === 'prod' ? 10 : 1,
            type: 'mysql',
            host: configService.get('DB_HOST'),
            port: Number(configService.get('DB_PORT')),
            database: configService.get('DB_NAME'),
            username: configService.get('DB_USER'),
            password: configService.get('DB_PASSWORD'),
            entities: [ArticleEntity, CommentEntity, UserEntity],
            synchronize: false,
            logging: true,
            timezone: 'local',
          }),
        }),
        TypeOrmModule.forFeature([ArticleEntity]),
      ],
      controllers: [ArticleController],
      providers: [ArticleService],
    }).compile();

    controller = module.get<ArticleController>(ArticleController);
    service = module.get<ArticleService>(ArticleService);
  });

  test('0. ArticleTest Setting', async () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('게시글 생성과 삭제', () => {
    let article;
    test('createArticle Spec ', async () => {
      const res = await controller.createArticle(
        {
          content: 'test content',
          title: 'test title',
        },
        { id: 1 },
      );

      console.log(res);

      article = res;

      expect(res).toBeInstanceOf(Object);
    });

    test('deleteArticle Spec', async () => {
      if (article) {
        const res = await controller.deleteArticle(article.id, { id: 1 });

        expect(res).toStrictEqual({
          affected: 1,
        });
      }
    });
  });
});
