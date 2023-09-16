import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getHello(): string {
    const db_user = this.configService.get<string>('DATABASE_USER');
    return db_user;
  }
}
