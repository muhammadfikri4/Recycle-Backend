import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { User, verificationStatus } from '../Model/user.entity';
import { validate } from 'class-validator';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import { database } from '../../firebase-init';

@Injectable()
export class RegisterService {
  private db: FirebaseFirestore.Firestore;
  constructor(private mailerService: MailerService) {
    this.db = database();
  }
  async authRegist(
    authRegist: {
      fullName: string;
      email: string;
      phone_number: string;
      password: string;
    },
    res: Response,
  ): Promise<{ message: string } | { errors: any } | Response> {
    try {
      const { fullName, email, phone_number, password } = authRegist;
      const users = this.db.collection('users');
      const phone = `+62${phone_number}`;
      const id = +new Date();

      const newUser = {
        id,
        fullName,
        email,
        phone_number: phone,
        password,
        otp_code: 0,
        verification_status: 'Not Verified',
        gender: '',
      };

      const getUserByEmail = await users
        .where('email', '==', email)
        .limit(1)
        .get();
      const getUserByPhone = await users
        .where('phone_number', '==', phone)
        .limit(1)
        .get();

      if (!getUserByEmail.empty && !getUserByPhone.empty) {
        const getUser = getUserByEmail.docs[0].data();
        return res.status(500).json({
          message: 'Email and Phone Number is already exist!',
          data: getUser,
        });
      } else if (!getUserByEmail.empty) {
        const getUser = getUserByEmail.docs[0].data();
        return res
          .status(500)
          .json({ message: 'Email is already exist!', data: getUser });
      } else if (!getUserByPhone.empty) {
        const getUser = getUserByPhone.docs[0].data();
        return res
          .status(500)
          .json({ message: 'Number is already exist!', data: getUser });
      }

      const hashPassword = await bcrypt.hash(password, 10);
      newUser.password = hashPassword;

      const random = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

      newUser.otp_code = random;
      this.mailerService.sendMail({
        to: email,
        from: 'recyclinkofficial@gmail.com',
        subject: 'Recyclink OTP Code Verification',
        text: `Your OTP Code Verification is ${random}`,
        html: `
        <p>Hi ${fullName},</p>
        <br/>
        <p>Please use the following One Time Password (OTP) to access the form: <span style="color: #059df0">${random}</span>. Don't share this OTP with anyone.</p>`,
      });

      const data = this.db.collection('users').doc(email).set(newUser);
      return res
        .status(201)
        .json({ message: 'Registration Successfully!', data: { email } });
    } catch (error) {
      return res.json({ message: 'Registration Failed!', errors: error });
    }
  }

  async verifAcc(
    verif: { otp_code: number; email: string },
    res: Response,
  ): Promise<Response> {
    try {
      // const acc = await this.usersRepository.findOne({
      //   where: {
      //     email: verif.email
      //   }
      // });

      //  if(acc.otp_code !== verif.otp_code) {
      //     return res.status(403).json({message: "Your verification OTP Code is Wrong"})
      //   }

      // const updt = await this.usersRepository.update({email: verif.email}, {
      //   status_verification: verificationStatus.verified
      // })
      return res
        .status(201)
        .json({ message: 'You have successfully verified the Account' });
    } catch (error) {
      return res.json({ error });
    }
  }
}
