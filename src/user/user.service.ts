import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefreshToken } from './entities/refresh-token.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(RefreshToken)
    private rfRepository: Repository<RefreshToken>,
  ) {}

  async findOneByUserName(userName: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { user_name: userName },
      relations: {
        rf_tokens: true,
      },
    });
    return user ?? undefined;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      select: {
        id: true,
        user_name: true,
      },
    });
  }

  async add(): Promise<User> {
    const user = new User();
    user.user_name = 'hi1';
    user.password = 'pass1';
    return this.userRepository.save(user);
  }

  async addRefreshToken(userId: number, token: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    const rf = new RefreshToken();
    rf.token = token;
    rf.expire_time = new Date();
    rf.user = user;
    return await this.rfRepository.save(rf);
  }

  async findOneByRefreshToken(
    id: number,
    token: string,
  ): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      relations: { rf_tokens: true },
      where: { id: id },
    });

    if (!user) return undefined;

    for (const tokenObject of user.rf_tokens) {
      if (tokenObject.token == token) {
        return user;
      }
    }

    // Return undefined if the user with the specified token is not found.
    return undefined;
  }
}
