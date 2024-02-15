import { Controller, Get, Post, Body, Res, Param, Put } from '@nestjs/common';
import { RegisterService } from './register.service';
import { Response } from 'express';

@Controller('/register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  authRegist(
    @Body()
    authRegist: {
      fullName: string;
      email: string;
      phone_number: string;
      password: string;
    },
    @Res() res: Response,
  ) {
    return this.registerService.authRegist(authRegist, res);
  }
  @Put()
  getCode(
    @Body() verif: { otp_code: number; email: string },
    @Res() res: Response,
  ) {
    return this.registerService.verifAcc(verif, res);
  }
}
