import { Body, Controller, Get , Post, Req, Res, Headers, Delete} from '@nestjs/common';
import { LoginService } from './login.service';
import { Response, Request } from 'express';

@Controller('/login')
export class LoginController {
    constructor(private readonly loginService: LoginService){}

    @Post() 
    authLogin (@Res() res:Response, @Body() authLogin:{email:string, password:string} ) {
      return this.loginService.authLogin(res, authLogin)
    }

    @Get()
    getToken(@Req() req:Request) {
      try {
        const accessToken = req.cookies.accessToken;
        return {accessToken}
      } catch (error) {
        return {error}
      }
    }
    
    @Delete()
    logout() {

    }
}
