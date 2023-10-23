import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from './product.model';
import { User } from 'src/users/users.model';
import { SequelizeModule } from '@nestjs/sequelize/dist/sequelize.module';
import { FilesModule } from 'src/files/files.module';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [
    SequelizeModule.forFeature([User,Product]),
    FilesModule 
  ]
})
export class PostModule {}
