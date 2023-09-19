import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getHello(): string {
    const db_host = this.configService.get<string>('DB_HOST');
    return db_host ?? 'not found';
  }
}
