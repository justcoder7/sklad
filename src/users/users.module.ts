import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Sequelize } from 'sequelize';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { Product } from 'src/product/product.model';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User,Role,UserRoles,Product]),
    RolesModule,
    JwtModule.register({
      secret : process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn : "1h"
      }
    })
  ],
  exports: [
    UsersService
  ]
})

export class UsersModule {}
