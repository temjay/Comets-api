import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../auth/dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { User } from './userInterface.js';
import { db } from '../prisma/db.js'
import bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UsersService {
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

    // return await db.orm.public.User.create({
    //   ...user,
    // })
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
    return this.generateToken(user);
  }

  //generate token method
  async generateToken(user) {
    const accesstoken = this.jwtService.sign({ id: user.id }, {expiresIn: '1h'});

    return {
      accesstoken,
    }
  }

  async findAll() {
    return await db.orm.public.User.all();
  }

  async findOne(id: number) {
    return await db.orm.public.User.where({ id }).first();
  }

  async update(id: number, dto: UpdateUserDto) {
    return await db.orm.public.User.where({ id }).update({
      ...dto,
    });
  }

  async remove(id: number) {
    return await db.orm.public.User.where({ id }).delete();
  }

  // private users: User[] = []

  // create(dto: CreateUserDto) {
  //   //generate id for the new user
  //   const id = Date.now();

  //   // create a new user object with the generated id and the data from the dto
  //   const newUser: User = {
  //     id,
  //     ...dto
  //   }

  //   // add the new user to the users array
  //   this.users.push(newUser);

  //   //return the new user object
  //   return newUser;
  // }


  // update(id: number, dto: UpdateUserDto) {
  //   //fetch the user id of the user to be updated
  //   const userIndex = this.users.findIndex(user => user.id === id);

  //   if (userIndex === -1) {
  //     throw new Error(`User with id ${id} not found`);
  //   }

  //   //merge the existing user data with the new data from the dto
  //   const updatedUser: User = {
  //     ...this.users[userIndex],
  //     ...dto,
  //     id // ensure the id remains the same
  //   }

  //   this.users[userIndex] = updatedUser;
  //   return updatedUser;
  // }

}
