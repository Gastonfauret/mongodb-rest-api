import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, NotFoundException, Query, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('')
  async createPost(@Res() res, @Body() createProductDto: CreateProductDto) {  
    const newProduct = await this.productService.createProduct(createProductDto)  
    return res.status(HttpStatus.OK).json({
      message: 'New Product was created succesfully.',
      newProduct
    })
  }

  @Get('/')
  async getProducts(@Res() res) {
    const products = await this.productService.getProducts();
    return res.status(HttpStatus.OK).json({
      message: 'Products were retrieved succesfully.',
      products
    });    
  }

  @Get('/:productID')
  async getProduct(@Res() res, @Param('productID') productID) {
    const foundProduct = await this.productService.getProduct(productID);
    if (!foundProduct) throw new NotFoundException('Product does not exist.')
    return res.status(HttpStatus.OK).json(foundProduct)
  } 

  @Delete('/delete')
  async deleteProduct(@Res() res, @Query('productID') productID) {
    const deletedProduct = await this.productService.deleteProduct(productID);
    if (!deletedProduct) throw new NotFoundException('Product does not exist.')
    return res.status(HttpStatus.OK).json({
        message: 'Product was deleted succesfully.',
        deletedProduct  
    })
  }

  @Put('/update')
  async updateProduct(@Res() res, @Body() createProductDto: CreateProductDto, @Query('productID') productID) {
    const updatedProduct = await this.productService.updateProduct(productID, createProductDto);
    if (!updatedProduct) throw new NotFoundException('Product does not exist.')
      return res.status(HttpStatus.OK).json({
        message: 'Product updated succesfully.',
        updatedProduct
      })
  }
}

