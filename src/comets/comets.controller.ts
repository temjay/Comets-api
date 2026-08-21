import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateCometDto } from './dto/create-comet.dto';
import { UpdateCometDto } from './dto/update-comet.dto';
import { CometsService } from './comets.service';

@Controller('comets')
export class CometsController {

    //intstantiate the service class
    constructor(private readonly cometsService: CometsService) {}

    // Get /comets
    // @Get()
    // getComets() {
    //     const service = new CometsService();

    //     return service.getComets();
    // }
    
   // Get /comets?type=fast/slow
    @Get()
    getQueriedComets(@Query('type') type: string) {
        return this.cometsService.getQueriedComets(type);
    }

    // Get /comets/:id
    @Get(':id')
    getOneComet(@Param('id') id: string) {

        return this.cometsService.getOneComet(Number(id))
    }

    // Post /comets
    @Post()
    createComet(@Body() createCometDto: CreateCometDto) {
        return this.cometsService.createComet(createCometDto);
    }

    // Put /comets/:id
    @Put(':id')
    updateComet(@Param('id') id: string, @Body() updateCometDto: UpdateCometDto) {
        return this.cometsService.updateComet(Number(id), updateCometDto);
    }

    // Delete /comets/:id
    @Delete(':id')
    deleteComet(@Param('id') id: string) {
        return this.cometsService.deleteComet(Number(id));
    }
}
