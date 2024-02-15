import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Model/user.entity';
import { Repository } from 'typeorm';
import {Response} from 'express';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
    constructor(
        private jwtService:JwtService,
    ){}

    async authLogin(res:Response, authLogin:{email:string, password: string}):Promise<any> {
       try {
        // const user = await this.UsersRepository.findOne({
        //     where: {
        //         email: authLogin.email,
        //     }
        // });

        // const match = await bcrypt.compare(authLogin.password, user.password);
        // if(!match) {
        //     return res.status(400).json({message: "The password you entered is incorrect!"})
        // }
        // const payload:{name: string, email: string, gender: string, date_birth: string} = {
        //     name: user.name,
        //     email: user.email,
        //     gender: user.gender,
        //     date_birth: user.date_birth
        // }
        // const access_token = await this.jwtService.signAsync(payload);
        // await this.UsersRepository.update(
        //     {
        //         email: user.email
        //     },
        //     {
        //         access_token,
        //         isActive: true
        //     });

        // res.cookie("accessToken", access_token, {httpOnly: true, secure: true});
        // return res.status(200).json({message: "You have successfully logged in!", access_token})
       } catch (error) {
        if(error) {
            // console.log(error)
           return res.status(400).json({message: "Your email was not found!"});
        }
       }
    }
}
