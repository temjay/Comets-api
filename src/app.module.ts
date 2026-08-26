import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CometsModule } from './comets/comets.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CometsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
