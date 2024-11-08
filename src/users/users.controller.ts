import {
  Body,
  Controller,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Create_user_dto } from './use_dto/create_user.dto';
import { GetUserParamDto } from './use_dto/get-user-param.dto';
import { UpdateUserDto } from './use_dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService:UsersService){

  }
  @Get("/")
  getUser() {
    return this.usersService.getUsers()
  }

  @Get('/:id')
  getUserById(@Param('id') id: number){
 
      return this.usersService.getUserById(+id);
  }

  // @Get(':id/:gender')
  // getUserByIdandGender(@Param() params: number){
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
  //     return user.getUserById(+id);
  //   }

    @Post()
    @UsePipes(Validation)
  //   createUser(@Body(new ValidationPipe()) user:Create_user_dto) {
      createUser(@Body() user:Create_user_dto) { // added globally
      // implement creating a user
    }


    // dto to validate params 
    @Get(':isMarried?')
    getUsers(@Param() param: GetUserParamDto){
       console.log(param)
       return this.usersService.getUsers()
    }

    // @Patch()
    // updateUser(@Body() user: UpdateUserDto){
    //   console.log(user)
    //   return "user updated successfully"

    // }
  
}
