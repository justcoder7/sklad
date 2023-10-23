import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { creatUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService) {}

    @Post('/login')  
    
    login(@Body() userDto: creatUserDto ){
     return this.authService.login(userDto)
     }
    
   
    @Post('/register') 

    register(@Body() userDto: creatUserDto) {

        return this.authService.register(userDto )

    }}

