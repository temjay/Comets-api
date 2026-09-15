import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { CreateCometDto } from './dto/create-comet.dto';
import { UpdateCometDto } from './dto/update-comet.dto';
import { CometsService } from './comets.service';

@Controller('comets')
export class CometsController {

    //intstantiate the service class
    constructor(private readonly cometsService: CometsService) {}

    @Get()
    getComets(@Query('speed') speed: string) {
        return this.cometsService.getComets(speed);
    }

    // Get /comets/:id
    @Get(':id')
    getOneComet(@Param('id', ParseIntPipe) id: number) {
        try {
            return this.cometsService.getOneComet(id);
        } catch (err) {
            throw new NotFoundException();
        }
    }

    // Post /comets
    @Post()
    async createComet(@Body() createCometDto: CreateCometDto) {
        return await this.cometsService.createComet(createCometDto);
    }

    // Put /comets/:id
    @Put(':id')
    async updateComet(@Param('id', ParseIntPipe) id: number, @Body() updateCometDto: UpdateCometDto) {
        return await this.cometsService.updateComet(id, updateCometDto);
    }

    // Delete /comets/:id
    @Delete(':id')
    async deleteComet(@Param('id', ParseIntPipe) id: number) {
        return await this.cometsService.deleteComet(id);
    }
}
