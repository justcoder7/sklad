import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Product } from "./product.model";
import { createProductDto } from "./dto/createproduct.dto";
import { FilesService } from "src/files/files.service";


@Injectable() 

export class ProductService {
    
    constructor(@InjectModel(Product) private productRepository : typeof Product, private fileService : FilesService) {}

    async create(dto: createProductDto, image : any){
        const fileName =  await this.fileService.createFile(image)
        const product =  await this.productRepository.create( {...dto, image: fileName} );
        return product;
    }

}