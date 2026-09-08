import { Test, TestingModule } from '@nestjs/testing';
import { ExpensesController } from './expenses.controller.js';
import { ExpensesService } from './expenses.service.js';

describe('ExpensesController', () => {
  let controller: ExpensesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpensesController],
      providers: [ExpensesService],
    }).compile();

    controller = module.get<ExpensesController>(ExpensesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
