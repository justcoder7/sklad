import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { createProductDto } from './dto/createproduct.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Product')
@Controller('product')
export class ProductController {
    constructor (private productService : ProductService) {}
    
    @ApiOperation({summary : 'Creating the product'})
    @ApiResponse({status : 200})
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    createPost(@Body() dto : createProductDto, @UploadedFile() image ){
        return this.productService.create(dto,image)
    }
}
