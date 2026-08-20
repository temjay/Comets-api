import { Module } from '@nestjs/common';
import { CometsController } from './comets.controller';
import { CometsService } from './comets.service';

@Module({
  controllers: [CometsController],
  providers: [CometsService]
})
export class CometsModule {}
