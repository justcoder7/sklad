import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { User } from "./users/users.model";
import { RolesModule } from './roles/roles.module';
import { Role } from "./roles/roles.model";
import { UserRoles } from "./roles/user-roles.model";
import { AuthModule } from './auth/auth.module';
import { PostModule } from './product/product.module';
import { Product } from "./product/product.model";
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from "@nestjs/serve-static/dist/serve-static.module";
import * as path from 'path';

@Module({
    controllers : [],
    providers : [],
    imports: [
        ConfigModule.forRoot({  
            envFilePath : [`./src/.env.${process.env.NODE_ENV}`, './src/.env']
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname , 'static')
          }),
        SequelizeModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => {
                console.log(configService.get<string>('POSTGRES_PASSWORD')); 
                return {
                    dialect: 'postgres',
                    host: configService.get<string>('POSTGRES_HOST'),
                    port: Number(configService.get<string>('POSTGRES_PORT')),
                    username: configService.get<string>('POSTGRES_USER'),
                    password: configService.get<string>('POSTGRES_PASSWORD'),
                    database: configService.get<string>('POSTGRES_DB'),
                    models: [User, Role, UserRoles, Product],
                    autoLoadModels : true
                }
            },
            inject: [ConfigService],
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        PostModule,
        FilesModule
    ]
})
export class AppModule {} 
