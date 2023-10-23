import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { creatUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {

       constructor(private userService: UsersService,
        private jwtservice: JwtService) {}
  
       async login(userDto: creatUserDto ){
          const user = await this.validateUser(userDto);
          return this.generateToken(user);
        }
       
       
   
        async register(userDto: creatUserDto) { 
            const candidate = await this.userService.getUserByEmail(userDto.email);
            if (candidate){
                throw new HttpException('User Already existed', HttpStatus.BAD_REQUEST)
            }
                const hashedPassword = await bcrypt.hash(userDto.password, 5)
                const user = await this.userService.creatUser({...userDto,password : hashedPassword})
                return this.generateToken(user);
            
       }
       
       private async generateToken(user: User) {
          const userInfo = {email : user.email, userId : user.id, roles : user.roles}
          return {
            token: this.jwtservice.sign(userInfo)
          }
       }
       private async validateUser(userDto: creatUserDto) {
        const user  = await this.userService.getUserByEmail(userDto.email);
        const passwordcheck = await bcrypt.compare(userDto.password, user.password);
        if(user && passwordcheck) {
            return user;
        }
        else {
            throw  new UnauthorizedException({message: "Email or password incorrect"});
             
        }

       }

}
 