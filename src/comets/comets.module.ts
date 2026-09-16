import { Module } from '@nestjs/common';
import { CometsController } from './comets.controller.js';
import { CometsService } from './comets.service.js';

@Module({
  controllers: [CometsController],
  providers: [CometsService]
})
export class CometsModule {}
