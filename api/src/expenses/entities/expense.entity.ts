import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import type { Relation } from "typeorm";
import * as UsersEntity from "../../users/entities/users.entity.js";
import type { Users } from "../../users/entities/users.entity.js";

@Entity()
export class Expenses {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'user_id' })
    userId: string;

    @ManyToOne(() => UsersEntity.Users, user => user.expenses)
    @JoinColumn({ name: 'user_id' })
    user: Relation<Users>;

    @Column({ type: 'numeric', precision: 12, scale: 2 })
    amount: number;

    @Column()
    description: string;

    @Column({ enum: ['food', 'transportation', 'entertainment', 'utilities', 'healthcare', 'education', 'shopping', 'travel', 'other'] })
    category: string;

    @Column({ name: 'occured_on', type: 'date' })
    occuredOn: Date;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @CreateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
