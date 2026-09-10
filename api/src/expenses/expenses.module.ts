import { Module } from '@nestjs/common';
import { ExpensesService } from './expenses.service.js';
import { ExpensesController } from './expenses.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expenses } from './entities/expense.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Expenses])],
  controllers: [ExpensesController],
  providers: [ExpensesService],
})
export class ExpensesModule {}
