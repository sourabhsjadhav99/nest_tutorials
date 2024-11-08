import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './userDto/create_user.dto';
import { GetUserParamDto } from './userDto/get-user-param.dto';
import { UpdateUserDto } from './userDto/update-user.dto';
import { User } from './users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService:UsersService){

  }
  // @Get("/")
  // getUser() {
  //   return this.usersService.getUsers()
  // }

  // @Get('/:id')
  // getUserById(@Param('id') id: number){
 
  //     return this.usersService.getUserById(+id);
  // }

  // @Get(':id/:gender')
  // getUserByIdandGender(@Param() params: any){
  //     console.log(params)
  // }

  // @Get()
  // getUsers(@Query() query:any){
  //     console.log(query) // for http://localhost:3000/users/?id=2&name=sourabh

  // }

  // @Get()
  // getUsers(@Query("name") query:any){
  //     console.log(query) // for http://localhost:3000/users/?id=2&name=sourabh

  // }

  // pipes
  // @Get(':id')
  //   getUserById(@Param('id', ParseIntPipe) id: number) {
  //     let user = new UsersService();
  //     return user.getUserById(id);
  //   }

  //   @Post()
  //   // @UsePipes(ValidationPipe) 1 way
  // //   createUser(@Body(new ValidationPipe()) user:CreateUserDto) { // 2nd way
  //     createUser(@Body() user:CreateUserDto) { // added globally  // 3rd way
  //     // implement creating a user
  //   }


    // dto to validate params 
    // @Get(':isMarried?')
    // getUsers(@Param() param: GetUserParamDto){
    //    console.log(param)
    //    return this.usersService.getUsers()
    // }

    // @Patch()
    // updateUser(@Body() user: UpdateUserDto){
    //   console.log(user)
    //   return "user updated successfully"

    // }

    // @Post("/create")
    // async createUser(@Body() user: CreateUserDto) {
    //     return await this.usersService.createUser(user);
    // }

    @Post()
    async create(@Body() userDto: CreateUserDto): Promise<User> {
      return this.usersService.create(userDto);
    }
  
    @Get()
    async findAll(): Promise<User[]> {
      return this.usersService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
      return this.usersService.findOne(id);
    }
  
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() userDto: UpdateUserDto): Promise<void> {
      await this.usersService.update(id, userDto);
    }
  
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
      await this.usersService.remove(id);
    }
  
}
