import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
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
