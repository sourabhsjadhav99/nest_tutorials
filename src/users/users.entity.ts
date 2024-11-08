import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
    })
    name: string;


    @Column({ type: "varchar" })
    email: string;


    @Column({
        type: "varchar",
    })
    gender: string;

    @Column({
        type: "boolean",
    })
   isMarried: boolean;

   @Column({ type: "varchar" })
   password: string;


}
