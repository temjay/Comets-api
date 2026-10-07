import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { db } from '../prisma/db.js';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto.js';
//import { User } from './userInterface.js';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}
    
    async create(user: CreateUserDto) {
    // check if email already exists
    const existingUser = await db.orm.public.User.where({ email: user.email }).first(); 

    // if user already exists, throw an error
    if (existingUser) {
      throw new BadRequestException(`User with email already exists`);
    }

    //hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(user.password, 10);

    //create user document and save to the database
    return await db.orm.public.User.create({
      ...user,
      password: hashedPassword,
    });

  }

  //login method
  async login(credentials: CreateUserDto) {
    //find the user by email
    const user = await db.orm.public.User.where({ email: credentials.email }).first();

    //if user not found, throw an error
    if (!user) {
      throw new UnauthorizedException(`Invalid credentials`);
    }
    
    //compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

    //if password is invalid, throw an error
    if (!isPasswordValid) {
      throw new UnauthorizedException(`Invalid credentials`);
    }

    //generate jwt token
   const tokens = this.generateToken(user);
   return{
        ...tokens,
        user_id: user.id,
   }
  }

  //generate token method
  async generateToken(user: any) {
    const accesstoken = this.jwtService.sign({ id: user.id }, {expiresIn: '1h'});
    const refreshToken = uuidv4();

    await this.storeRefreshToken(user.id, refreshToken);

    return {
      accesstoken,
      refreshToken
    }
  }

  //store refresh token in the database
  async storeRefreshToken(userId: number, token: string) {
    //calculate expirydate 3 days from now
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 3);

    await db.orm.public.RefreshToken.create({
      userId,
      token,
      expiryDate,
    })
  }

  async refreshToken(token: string) {
    //find the refresh token in the database
    const refreshToken = await db.orm.public.RefreshToken.where({ 
        token,
        expiryDate: { $gt: new Date() } // check if the token is not expired
     }).first();

     if (!refreshToken) {
        throw new UnauthorizedException(`Invalid or expired refresh token`);
     }

     //delete it so it can't be used again
     await db.orm.public.RefreshToken.where({ id: refreshToken.id }).delete();

     //generate a new access token and refresh token
     return this.generateToken({ id: refreshToken.userId });
  }
}
