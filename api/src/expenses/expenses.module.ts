import { Module } from '@nestjs/common';
import { ExpensesService } from './expenses.service.js';
import { ExpensesController } from './expenses.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expenses } from './entities/expense.entity.js';
import { Users } from '../users/entities/users.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Expenses]), TypeOrmModule.forFeature([Users])],
  controllers: [ExpensesController],
  providers: [ExpensesService],
})
export class ExpensesModule {}
