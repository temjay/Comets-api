import { Test, TestingModule } from '@nestjs/testing';
import { CometsService } from './comets.service';

describe('CometsService', () => {
  let service: CometsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CometsService],
    }).compile();

    service = module.get<CometsService>(CometsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
