import { Column, Entity, ManyToMany, JoinTable, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import { Role } from "../../roles/entities/role.entity.js";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'email', unique: true})
    email: string;

    @Column({name: 'password'})
    password: string;

    @Column({name:'name'})
    name: string;

    @Column({ name: 'phone', type: 'varchar', nullable: true })
    phone: string | null;

    @Column({name: 'is_active', default: true})
    is_active: boolean

    @CreateDateColumn({name: 'created_at'})
    created_at: Date;

    @ManyToMany(() => Role, (role) => role.users)
    @JoinTable({
        name: 'user_roles',
        joinColumn: { name: 'user_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
    })
    roles: Role[];
}
