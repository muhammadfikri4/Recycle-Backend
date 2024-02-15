import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, IsStrongPassword, Length, Max, MinLength, Matches, min} from 'class-validator';

export enum verificationStatus {
    verified = "Verified",
    notVerified = "Not Verified"
}



export enum gender {
    man = "Man",
    woman = "Woman",
    unknown = "Unknown"
}
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    @IsNotEmpty({message: "Name cannot be empty. Enter your Name!"})
    name: string;

    @Column({nullable: false})
    @IsNotEmpty({message: "Email cannot be empty. Enter your Email!"})
    @IsEmail({}, {message: "Email must be an email!"})
    email: string;

    @Column({nullable: false})
    @IsPhoneNumber("ID", {message: "Phone Number must be a valid phone number!"})
    phone_number: string;

    @Column({nullable: false})
    @IsNotEmpty({message: "Password cannot be empty. Enter your Password!"})
    @MinLength(8, {message: "Password cannot be less than 8 digits!"})
    @IsStrongPassword({minUppercase: 1, minSymbols: 1, minNumbers: 1}, {message: "The password must contain at least 1 uppercase letter, 1 number and 1 symbol!"})
    password: string;
    
    @Column()
    otp_code: number;

    @Column({type: 'enum', enum: verificationStatus, default: verificationStatus.notVerified})
    status_verification: verificationStatus

    @Column({type: 'enum', enum: gender, default: gender.unknown})
    gender: gender

    @Column()
    date_birth: string

    @Column({nullable: true})
    access_token: string

    @Column()
    isActive: boolean;
}
