import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class user extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
    })
    name: string;

    @Column({ type: "varchar" })
    email: string;

    @Column({
        type: "boolean",
        default: false,
    })
    isMarried: boolean;
}
