import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async register(email: string, password: string) {
    const existedUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existedUser) {
      throw new BadRequestException('이미 해당 이메일이 존재합니다.');
    }

    const hashedPassword = await hash(password, 10);
    const user = await this.userRepository.save({
      email,
      password: hashedPassword,
    });

    return user;
  }

  async getMainPage() {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return {
      message: 'User Main Page',
      data: {
        name: 'John Doe',
        age: 20,
        email: 'john.doe@example.com',
      },
    };
  }
}
