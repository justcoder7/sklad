import { ApiProperty } from "@nestjs/swagger";
import {Model, Column, DataType, Table, BelongsToMany, ForeignKey } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { Role } from "./roles.model";

@Table({tableName : 'user_roles'})
export class UserRoles extends Model<UserRoles> {

  @ApiProperty({example: '1', description : "Unique user_role_id"})
  @Column({type : DataType.INTEGER,unique: true, autoIncrement : true,primaryKey: true})
  id : number;
  
  @ApiProperty({example: 'ADMIN', description : "Unique Role id  of the user for that company"})
  @ForeignKey( ()=> Role)
  @Column({type : DataType.INTEGER})
  roleId : number;
  
  @ApiProperty({example: '8', description : "Unique User id of the user"})
  @ForeignKey( ()=> User)
  @Column({type : DataType.INTEGER})
  userId : number;
}
