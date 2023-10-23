import { ApiProperty } from "@nestjs/swagger";
import { IsEmail,MaxLength, MinLength } from "class-validator";


export class creatUserDto  {
    
  @ApiProperty({example: 'test@mail.com', description : "User email"})
  @IsEmail({}, {message: "Invalid email"})
  readonly email : string ;
  @ApiProperty({example: 'qwerty', description : "User Password"})
  @MinLength(5)
  @MaxLength(10)
  readonly password : string;
}