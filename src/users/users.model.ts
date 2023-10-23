import { ApiProperty } from "@nestjs/swagger";
import {Model, Column, DataType, Table, BelongsToMany, HasMany } from "sequelize-typescript";
import { Product } from "src/product/product.model";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";

interface UserCreationAtts {
    email : string;
    password : string;
}

@Table({tableName : 'User'})
export class User extends Model<User,UserCreationAtts> {

  @ApiProperty({example: '1', description : "Unique Id"})  
  @Column({type : DataType.INTEGER,unique: true, autoIncrement : true,primaryKey: true})
  id : number;

  @ApiProperty({example: 'test@mail.com', description : "User email"})
  @Column({type : DataType.STRING,unique: true,allowNull: false})
  email : string;

  @ApiProperty({example: 'qwerty', description : "User Password"})
  @Column({type : DataType.STRING,allowNull: false})
  password : string;
 
  @ApiProperty({example: 'false', description : "Type of user "})
  @Column({type : DataType.BOOLEAN,allowNull: false, defaultValue : false})
  isBanned : boolean;
  
  @ApiProperty({example: 'Can not use app', description : "Reason of the ban"})
  @Column({type : DataType.STRING,allowNull: true})
  banReason : string;


  @BelongsToMany( ()=> Role, () => UserRoles)
  roles : Role[];
    banned: boolean;

  @HasMany( ()=> Product)
  products : Product[];
} 
