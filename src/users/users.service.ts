import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './userDto/create_user.dto';
import { user } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(user) private userRepository: Repository<user>){

    }


    // users: {id:number, name:string, email:string, isMarried:boolean}[] = [
    //     {id: 1, name: 'John Doe', email: 'john.doe@example.com', isMarried: true},
    //     {id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', isMarried: false},
    //     {id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com',isMarried: true},
    // ];

    // getUsers(): {id:number, name:string, email:string, isMarried:boolean}[] {
    //     return this.users;
    // }

    // getUserById(id: number): {id:number, name:string, email:string, isMarried:boolean} | undefined {
    //     return this.users.find(user => user.id === id);
    // }

    async createUser(user:CreateUserDto){

        return await this.userRepository.save(user)

    }
}
