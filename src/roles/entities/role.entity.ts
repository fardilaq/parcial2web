import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity.js';
@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'role_name', unique: true})
    role_name: string;

    @Column({name: 'description', type: 'varchar', length: 255, nullable: true})
    description: string | null;

    @CreateDateColumn({name: 'created_at'})
    created_at: Date;

    @ManyToMany(() => User, (user) => user.roles)
    users: User[];
}
