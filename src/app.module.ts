import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { EmailModule } from './user/email/email.module';
import * as url from 'url';
import { QuestionOptionModule } from './question-option/question-option.module';
import { QuestionModule } from './question/question.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const databaseUrl = configService.get<string>('DATABASE_URL');
        const parsedUrl = url.parse(databaseUrl);
        const [username, password] = parsedUrl.auth.split(':');

        return {
          type: 'postgres',
          host: parsedUrl.hostname,
          port: +parsedUrl.port,
          username,
          password,
          database: parsedUrl.pathname.substr(1),
          entities: [join(__dirname, '**', '*.entity.{js,ts}')],
          synchronize: true, // Disable synchronization
          migrations: [join(__dirname, '**', '*.migration.{js,ts}')],
          ssl: {
            rejectUnauthorized: true,
          },
        };
      },
      inject: [ConfigService],
    }),

    UserModule,
    EmailModule,
    QuestionOptionModule,
    QuestionModule,
  ],
})
export class AppModule {}
