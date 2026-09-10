import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import type { Relation } from "typeorm";
import * as ExpensesEntity from "../../expenses/entities/expense.entity.js";
import type { Expenses } from "../../expenses/entities/expense.entity.js";

@Entity()
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @OneToMany(() => ExpensesEntity.Expenses, expense => expense.user)
    expenses: Relation<Expenses[]>;

    @CreateDateColumn({ name: 'created_at'})
    createdAt: Date;

    @CreateDateColumn({ name: 'updated_at'})
    updateAt: Date;
}