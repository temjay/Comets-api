import { Injectable } from '@nestjs/common';
import { Comet } from './cometInterface';
import { db } from 'src/prisma/db';

@Injectable()
export class CometsService {
    private comets: Comet[] = []

    async getComets(speed: string) {
        if (speed) {
            return await db.orm.public.Comet.where({ speed }).all();
        }
        else
        {
            return await db.orm.public.Comet.all();
        }
    }

    async getOneComet(id: number) {
       return await db.orm.public.Comet.where({ id }).first();
    }

    async createComet(createCometDto) {
        return await db.orm.public.Comet.create({
            ...createCometDto,
        });
    }

    async updateComet(id: number, updateCometDto) {
        return await db.orm.public.Comet.where({ id }).update({
            ...updateCometDto,
        });
    }

    async deleteComet(id: number) {
        return await db.orm.public.Comet.where({ id }).delete();
    }
}
