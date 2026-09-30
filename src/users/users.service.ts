import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { db } from '../prisma/db.js'
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UsersService {

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

}
