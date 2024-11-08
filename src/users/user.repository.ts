import { Repository } from "typeorm";
import { user } from "./users.entity";



export class UserRepository extends Repository<user>{

}