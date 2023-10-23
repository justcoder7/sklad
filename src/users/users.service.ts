import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { creatUserDto } from './dto/create-user.dto';
import { where } from 'sequelize';
import { RolesService } from 'src/roles/roles.service';
import { addROleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository : typeof User,
    private roleservice : RolesService) {

    }
    async creatUser(dto : creatUserDto) { 
        const user = await this.userRepository.create(dto);
        const role = await this.roleservice.getRolebyValue("ADMIN");

        await user.$set('roles', [role.id]);
        const updatedUser = await this.userRepository.findOne({
            where: { id: user.id },
            include: ['roles']  
          });
          
          return updatedUser;


    }

    async getAllUser() {
       const user = await this.userRepository.findAll({
        include: ['roles']}
       );
       return user;
    }
    async getUserByEmail(email : string) {
        const user = await this.userRepository.findOne({where: {email}, include : {all :true }})
        return user;
    }
    
    async addRole(dto :addROleDto) {
        const user  = await this.userRepository.findByPk(dto.userId);
        const role =  await this.roleservice.getRolebyValue(dto.value);
        if(user && role) {
            await user.$add('role',role.id);
            return dto;
        }
        throw new HttpException("User or Role not found",HttpStatus.NOT_FOUND);
    }

    async ban(dto :BanUserDto) {
         const user = await this.userRepository.findByPk(dto.userId);
         if(!user) {
            throw new HttpException("User not found", HttpStatus.NOT_FOUND)
         }
         user.isBanned = true;
         user.banReason = dto.banReason;
         await user.save();
         return user;
    }   
}
