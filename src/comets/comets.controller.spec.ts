import { Test, TestingModule } from '@nestjs/testing';
import { CometsController } from './comets.controller';

describe('CometsController', () => {
  let controller: CometsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CometsController],
    }).compile();

    controller = module.get<CometsController>(CometsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
