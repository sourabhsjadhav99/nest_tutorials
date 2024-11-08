import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User} from "src/users/users.entity";

export const typeOrmConfig:TypeOrmModuleOptions={
    type: 'mysql',
    host: 'localhost',
    port: 3307,
    username: 'root',
    password: 'Sourabh@1999',
    database: 'nest',
    autoLoadEntities: false,
    entities: [User],
    synchronize: true,
    logging: true,
}