import { Body, Controller, Get, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { creatUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { addROleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';


@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private usersService : UsersService) {}

    @ApiOperation({summary : 'Creating the user'})
    @ApiResponse({status : 200, type: User})
    @UsePipes(ValidationPipe)
    @Post() 
    create(@Body() userDto : creatUserDto){
       return this.usersService.creatUser(userDto)
    }
    @ApiOperation({summary : 'Getting the list of the users'})
    @ApiResponse({status : 200, type: [User]})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get()
    getAll(){ 
        return this.usersService.getAllUser();
    }

    @ApiOperation({summary : 'Assing  role to the user'})
    @ApiResponse({status : 200})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: addROleDto){ 
          
        return this.usersService.addRole(dto);
    }

    @ApiOperation({summary : 'Banning the user'})
    @ApiResponse({status : 200, type: [User]})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Patch('/ban')
    ban(@Body() dto: BanUserDto){ 
        return this.usersService.ban(dto);
    }
}
