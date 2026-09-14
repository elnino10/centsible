import { Injectable } from '@nestjs/common';
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
    @InjectRepository(Users) private readonly usersRepository: Repository<Users>
  ) { }

  async registerExpense(user: RequestUserDto, registerExpenseDto: RegisterExpenseDto) {

    const getUser = await this.usersRepository.findOne({
      where: { id: user.userId }
    })

    const newExpense = this.expensesRepository.create({
      ...registerExpenseDto,
      userId: user.userId,
      user: { id:getUser?.id, password: getUser?.password, ...getUser},
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
