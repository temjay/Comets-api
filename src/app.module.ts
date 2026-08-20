import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CometsModule } from './comets/comets.module';

@Module({
  imports: [CometsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
