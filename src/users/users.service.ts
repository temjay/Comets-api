import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './userInterface';
import { db } from '../prisma/db'


@Injectable()
export class UsersService {

  private users: User[] = []
  


  async create(user: CreateUserDto) {
    return db.orm.public.User.create(user)
  }

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

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, dto: UpdateUserDto) {
    //fetch the user id of the user to be updated
    const userIndex = this.users.findIndex(user => user.id === id);

    if (userIndex === -1) {
      throw new Error(`User with id ${id} not found`);
    }

    //merge the existing user data with the new data from the dto
    const updatedUser: User = {
      ...this.users[userIndex],
      ...dto,
      id // ensure the id remains the same
    }

    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
