import { Injectable } from '@nestjs/common';
import { creatRoleDto } from './create-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';

@Injectable()
export class RolesService {
    
    constructor(@InjectModel(Role) private roleRepository: typeof Role) {}
  
    async createRole(dto : creatRoleDto) { 
        
        const role =  await this.roleRepository.create(dto);
        return role;

    }

    async getRolebyValue(value : string) {       
        const role = await this.roleRepository.findOne( {where: {value}} )
        return role;
    }

}
