import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './userDto/create_user.dto';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './userDto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) 
    private userRepository: Repository<User>,
  ) {}

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


  async create(userdto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(userdto);
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async update(id: number, user: UpdateUserDto): Promise<void> {
    await this.userRepository.update(id, user);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

}
