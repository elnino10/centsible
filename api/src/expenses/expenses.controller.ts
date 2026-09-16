import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ExpensesService } from './expenses.service.js';
import { RegisterExpenseDto } from './dto/register-expense.dto.js';
import { UpdateExpenseDto } from './dto/update-expense.dto.js';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { RequestUserDto } from '../auth/dto/request-user.dto.js';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  registerExpense(
    @CurrentUser() user: RequestUserDto,
    @Body() registerExpenseDto: RegisterExpenseDto
  ) {
    return this.expensesService.registerExpense(user, registerExpenseDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getExpenseById(@Param('id') id: string) {
    return this.expensesService.getExpenseById(id);
  }

  @Get()
  getExpenses(@Query('query') query: string) {
    return this.expensesService.getExpenses(query);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
  //   return this.expensesService.update(+id, updateExpenseDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.expensesService.remove(+id);
  // }
}
