import { Injectable } from '@nestjs/common';

import { BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new BadRequestException('잘못된 이메일입니다.');
    }

    // verify password
    const isPasswordMatch = await compare(password, user.password);

    if (!isPasswordMatch) {
      throw new BadRequestException('잘못된 비밀번호입니다.');
    }

    return {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async login(user: {
    id: number;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    return {
      accessToken: this.jwtService.sign(user),
    };
  }
}
