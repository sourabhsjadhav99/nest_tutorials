import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto{

    @IsNumber()
    id:number;

    @IsString()
    @IsNotEmpty()
    @MinLength(3, {message:"min length is 3 char"})
    name:string;

    @IsEmail()
    email:string;

    @IsString()
    @IsOptional()
    gender?:string;

    @IsBoolean()
    isMarried:boolean;
}
