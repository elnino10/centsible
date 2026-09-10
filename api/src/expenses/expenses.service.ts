import { Injectable } from '@nestjs/common';
import { RegisterExpenseDto } from './dto/register-expense.dto.js';
import { UpdateExpenseDto } from './dto/update-expense.dto.js';
import { Expenses } from './entities/expense.entity.js';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ExpensesService {

  constructor(@InjectRepository(Expenses) private readonly expensesRepository: Repository<Expenses>) {}

  registerExpense(userId: string, registerExpenseDto: RegisterExpenseDto) {
    const newExpense = this.expensesRepository.create({
      ...registerExpenseDto,
      userId,
    });
    return this.expensesRepository.save(newExpense);
  }

  findAll() {
    return `This action returns all expenses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} expense`;
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return `This action updates a #${id} expense`;
  }

  remove(id: number) {
    return `This action removes a #${id} expense`;
  }
}
