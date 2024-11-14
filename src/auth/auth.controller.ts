// import { Body, Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { AuthService } from './auth.service';
// import { LoginDto } from './dto/login.dto';

// @Controller('auth')
// export class AuthController {
//   constructor(private authService: AuthService) {}

//   // @UseGuards(AuthGuard('local'))
//   // @Post('/login')
//   // async login(@Request() req: any) {
//   //   return this.authService.login(req.user);
//   // }

// }


// src/auth/auth.controller.ts
import { Controller, Post, Body, UseInterceptors, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ResponseInterceptor } from 'src/interceptors/response.interceptor';
import { JwtAuthGuard } from './auth.gaurd';

@Controller('auth') 
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // @UseInterceptors(ResponseInterceptor) // applying interceptor to perticular route
  @Post('login') 
  async login(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
    return this.authService.login(loginDto);
  }


  @UseGuards(JwtAuthGuard)
  @Get("dashboard")
  async dashboard(@Request() req){
    console.log(req.user)
    
    return "hello world"
  }
}
