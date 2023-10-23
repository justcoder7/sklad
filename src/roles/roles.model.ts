import { ApiProperty } from "@nestjs/swagger";
import {Model, Column, DataType, Table, BelongsToMany } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { UserRoles } from "./user-roles.model";

interface RolesCreationAtts {
    value : string;
    description : string;
}

@Table({tableName : 'Roles'})
export class Role extends Model<Role,RolesCreationAtts> {

  @ApiProperty({example: '1', description : "Unique Id"})  
  @Column({type : DataType.INTEGER,unique: true, autoIncrement : true,primaryKey: true})
  id : number;

  @ApiProperty({example: 'ADMIN', description : "Unique Role of the user"})
  @Column({type : DataType.STRING,unique: true,allowNull: false})
  value : string;

  @ApiProperty({example: 'Adminstrator', description : "Info about role"})
  @Column({type : DataType.STRING,allowNull: false})
  description : string;
  

  @BelongsToMany( ()=> User, () => UserRoles)
  users : User[];
}
