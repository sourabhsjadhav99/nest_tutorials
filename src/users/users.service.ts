// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { CreateUserDto } from './userDto/create_user.dto';
// import { User } from './users.entity';
// import { Repository } from 'typeorm';
// import { UpdateUserDto } from './userDto/update-user.dto';

// @Injectable()
// export class UsersService {
//   constructor(
//     @InjectRepository(User)
//     private userRepository: Repository<User>,
//   ) {}

//   async findOne(email: string): Promise<User> {
//     await this.userRepository.find(user => user.email === email);
//   }

//   async create(userdto: CreateUserDto): Promise<User> {
//     const user = this.userRepository.create(userdto);
//     return this.userRepository.save(user);
//   }

//   async findAll(): Promise<User[]> {
//     return this.userRepository.find();
//   }

//   async update(id: number, user: UpdateUserDto): Promise<void> {
//     await this.userRepository.update(id, user);
//   }

//   async remove(id: number): Promise<void> {
//     await this.userRepository.delete(id);
//   }

//   async findOneByEmail(email: string): Promise<User> {
//     return this.userRepository.findOneBy({ email });
//   }

// }

import {
  Injectable,
  NotFoundException,
  UseGuards,
  HttpStatus,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './userDto/create_user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  // Find a user by their username
  async findOne(username: string): Promise<User | undefined> {
    try {
      let user = this.usersRepository.findOne({ where: { username } });
      if (!user) {
        throw new NotFoundException(`User with id ${username} not found`);
      }
      return user;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Something went wrong while retrieving the user',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Create a new user
  async create(userDto: CreateUserDto): Promise<any> {
    try {
      const hashedPassword = await bcrypt.hash(userDto.password, 10);

      const user = this.usersRepository.create({
        ...userDto,
        password: hashedPassword,
      });

      return await this.usersRepository.save(user);
    } catch (error) {
      console.error('Error creating user:', error);

      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An error occurred while creating the user',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  
}
