import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { creatRoleDto } from './create-role.dto';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { Role } from './roles.model';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {

    constructor(private roleservice : RolesService) {}
    @ApiOperation({summary : 'Creating the role'})
    @ApiResponse({status : 200, type: Role})
    @Post()
    create(@Body() dto : creatRoleDto){
        return this.roleservice.createRole(dto);
    }
    
    @ApiOperation({summary : 'Getting the role by value'})
    @ApiResponse({status : 200, type: Role})
    @Get('/:value')
    getbyValue(@Param('value')  value : string){
        return this.roleservice.getRolebyValue(value);
    }
}
