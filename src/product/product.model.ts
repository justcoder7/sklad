import { ApiProperty } from "@nestjs/swagger";
import {Model, Column, DataType, Table, BelongsToMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "src/users/users.model";

interface ProductCreationAtts {
    title : string;
    price : number;
    description : string;
    image : string;
    userId : number;
}

@Table({tableName : 'Product'})
export class Product extends Model<Product,ProductCreationAtts> {

  @ApiProperty({example: '1', description : "Unique Id"})  
  @Column({type : DataType.INTEGER,unique: true, autoIncrement : true,primaryKey: true})
  id : number;

  @ApiProperty({example: 'phone', description : "Product name"})
  @Column({type : DataType.STRING,unique: true, allowNull: false, })
  title : string;
  
  @ApiProperty({example: 22.33 , description : "Product price"})
  @Column({type : DataType.DOUBLE,allowNull: false})
  price : number;
  
  @ApiProperty({example: 'Description', description : "Product info"})
  @Column({type : DataType.STRING,allowNull: false})
  description : string;

  @ApiProperty({example: 'Image', description : "Product image"})
  @Column({type : DataType.STRING})
  image : string;
  
  @ForeignKey(()=> User)
  @Column({type : DataType.INTEGER})
  userId : number;

  @BelongsTo(  () => User)

  author: User
}
