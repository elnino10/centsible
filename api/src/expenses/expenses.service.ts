import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { RegisterExpenseDto } from './dto/register-expense.dto.js';
import { UpdateExpenseDto } from './dto/update-expense.dto.js';
import { Expenses } from './entities/expense.entity.js';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import type { RequestUserDto } from '../auth/dto/request-user.dto.js';
import { Users } from '../users/entities/users.entity.js';

@Injectable()
export class ExpensesService {

  constructor(
    @InjectRepository(Expenses) private readonly expensesRepository: Repository<Expenses>,
  ) { }

  async registerExpense(user: RequestUserDto, registerExpenseDto: RegisterExpenseDto) {
    const newExpense = this.expensesRepository.create({
      ...registerExpenseDto,
      userId: user.userId,
    });

    return this.expensesRepository.save(newExpense);
  }

  getExpenseById(id: string) {
    const expense = this.expensesRepository.findOne({
      where: { id }, relations: { user: true }
    });

    if (!expense) {
      throw new NotFoundException('Expense not found');
    }

    return expense;
  }

  getExpenses(query: string) {
    return query;
  }

  // update(id: number, updateExpenseDto: UpdateExpenseDto) {
  //   return `This action updates a #${id} expense`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} expense`;
  // }
}
