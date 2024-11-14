// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { UsersService } from 'src/users/users.service';


// @Injectable()
// export class AuthService {
//   constructor(
//     private userService: UsersService,
//     private jwtService: JwtService,
//   ) {}

//   // async validateUser(email: string, password: string) {
//   //   const user = await this.userService.findOneByEmail(email);
//   //   if (user && user.password === password) {
//   //     return user;
//   //   }

//   //   return null;
//   // }

//   async logIn(
//     name: string,
//     pass: string,
//   ): Promise<{ access_token: string }> {
//     const user = await this.userService.findOne(name);
//     if (user?.password !== pass) {
//       throw new UnauthorizedException();
//     }
//     const payload = { name: user.name };
//     return {
//       access_token: await this.jwtService.signAsync(payload),
//     };
//   }
// }

// import { Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { UsersService } from '../users/users.service';
// import * as bcrypt from 'bcrypt';

// @Injectable()
// export class AuthService {
//   constructor(
//     private usersService: UsersService,
//     private jwtService: JwtService
//   ) {}

//   async validateUser(username: string, pass: string): Promise<any> {
//     const user = await this.usersService.findOne(username);
//     if (user && (await bcrypt.compare(pass, user.password))) {
//       const { password, ...result } = user;
//       return result;
//     }
//     return null;
//   }

//   async login(user: any) {
//     const payload = { username: user.username, sub: user.id };
//     return {
//       access_token: this.jwtService.sign(payload),
//     };
//   }
// }

// src/auth/auth.service.ts
// import { Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { UsersService } from '../users/users.service';
// import { JwtPayload } from './jwtPayload'; 
// import * as bcrypt from 'bcrypt';

// @Injectable()
// export class AuthService {
//   constructor(
//     private usersService: UsersService,
//     private jwtService: JwtService,
//   ) {}

 
//   async validateUser(username: string, password: string): Promise<any> {
//     const user = await this.usersService.findOne(username); 

//     if (user && await bcrypt.compare(password, user.password)) {
//       return user; 
//     }
//     return null; 
//   }


//   async login(user: { username: string; password: string }): Promise<{ access_token: string }> {
//     const validatedUser = await this.validateUser(user.username, user.password);
    
//     if (!validatedUser) {
//       throw new Error('Invalid credentials'); 
//     }

//     const payload: JwtPayload = { username: validatedUser.username, sub: validatedUser.id };

//     return {
//       access_token: this.jwtService.sign(payload),
//     };
//   }
// }
// src/auth/auth.service.ts
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './jwtPayload'; 
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Validate user credentials and generate JWT token
  async validateUser(username: string, password: string): Promise<any> {
    try {
      const user = await this.usersService.findOne(username);
      if (user && await bcrypt.compare(password, user.password)) {
        return user;
      }
      // Throwing unauthorized error if credentials don't match
      throw new HttpException('Invalid username or password', HttpStatus.UNAUTHORIZED);
    } catch (error) {
      throw new HttpException('An error occurred during validation', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(user: { username: string; password: string }): Promise<any> {
    try {
      const validatedUser = await this.validateUser(user.username, user.password);

      if (!validatedUser) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }

      // Payload for JWT
      const payload: JwtPayload = {
        username: validatedUser.username,
        sub: validatedUser.id,
        role: validatedUser.role,
      };

      // Generating the access token
      const access_token = this.jwtService.sign(payload);

      return { access_token };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error; // Rethrow if it's already an HttpException
      }
      throw new HttpException('An error occurred during login', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  
}
