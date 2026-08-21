import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateCometDto } from './dto/create-comet.dto';
import { UpdateCometDto } from './dto/update-comet.dto';
import { CometsService } from './comets.service';

@Controller('comets')
export class CometsController {
    // Get /comets
    // @Get()
    // getComets() {
    //     const service = new CometsService();

    //     return service.getComets();
    // }
     
    
   // Get /comets?type=fast/slow
    @Get()
    getQueriedComets(@Query('type') type: string) {

        const service = new CometsService();

        return service.getQueriedComets(type);
    }

    // Get /comets/:id
    @Get(':id')
    getOneComet(@Param('id') id: string) {
        return{
            id,
        }
    }

    // Post /comets
    @Post()
    createComet(@Body() createCometDto: CreateCometDto) {
        return{
            name: createCometDto.name,
        }
    }

    // Put /comets/:id
    @Put(':id')
    updateComet(@Param('id') id: string, @Body() updateCometDto: UpdateCometDto) {
        return{
            id,
            name: updateCometDto.name,
        }
    }

    // Delete /comets/:id
    @Delete(':id')
    deleteComet(@Param('id') id: string) {
        return{
            id,
        }
    }
}
