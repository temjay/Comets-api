import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './userInterface';

@Injectable()
export class UsersService {

  private users:User[] = []

  create(dto: CreateUserDto) {
    //generate id for the new user
     const id = Date.now();

     // create a new user object with the generated id and the data from the dto
     const newUser: User = {
        id,
        ...dto
     }

     // add the new user to the users array
     this.users.push(newUser);

     //return the new user object
     return newUser;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, dto: UpdateUserDto) {
    //fetch the user id of the user to be updated
    const userIndex = this.users.findIndex(user => user.id === id);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
