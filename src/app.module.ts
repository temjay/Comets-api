import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { CometsModule } from './comets/comets.module.js';
import { UsersModule } from './users/users.module.js';

@Module({
  imports: [CometsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
