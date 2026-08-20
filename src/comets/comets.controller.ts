import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

@Controller('comets')
export class CometsController {
    // Get /comets

    /**
     * @Get()
    getComets() {
        return {}
    }
     */
    
    //Get /comets?type=fast/slow
    @Get()
    getComets(@Query('type') type: string) {
        return {
            
        }
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
    createComet(@Body() body: any) {
        return{
            body,
        }
    }

    // Put /comets/:id
    @Put(':id')
    updateComet(@Param('id') id: string, @Body() body: any) {
        return{
            id,
            body,
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
