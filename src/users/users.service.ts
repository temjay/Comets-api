import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { User } from './userInterface.js';
import { db } from '../prisma/db.js'


@Injectable()
export class UsersService {

  async create(user: CreateUserDto) {
    return await db.orm.public.User.create({
      ...user,
    })
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
