import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { createProductDto } from './dto/createproduct.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('product')
export class ProductController {
    constructor (private productService : ProductService) {}

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    createPost(@Body() dto : createProductDto, @UploadedFile() image ){
        console.log("dsadaghgfhghfhgs")
        console.log("dsadaghgfhghfhgs")
        console.log("dsadaghgfhghfhgs")
        console.log("dsadaghgfhghfhgs")
        return this.productService.create(dto,image)
    }
}
