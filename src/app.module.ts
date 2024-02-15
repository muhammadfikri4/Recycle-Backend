import { Module } from '@nestjs/common';
import { RegisterController } from './register/register.controller';
import { RegisterService } from './register/register.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './Model/user.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';

import {JwtModule, JwtModuleOptions} from '@nestjs/jwt'
import { TestingController } from './testing/testing.controller';
import { TestingService } from './testing/testing.service';


@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp-relay.brevo.com',
        auth: {
          user: 'muhtravelofc@gmail.com',
          pass: 'w0MSAvpWbaBtsLOm'

        }
      }
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async(configService:ConfigService):Promise<JwtModuleOptions> => ({
        global: true,
        secret: configService.get<string>('ACCESS_TOKEN'),
        signOptions: {expiresIn: configService.get<string>('expires')}
      }),
      inject: [ConfigService]
    }),
    ConfigModule.forRoot({
      envFilePath: './.env',
      isGlobal: true
    }),
  ],
  controllers: [RegisterController, LoginController, TestingController],
  providers: [RegisterService, LoginService, TestingService],
})
export class AppModule {}
