import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './interfaces/product.interface';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ProductService {

  constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}

  async getProducts(): Promise<Product[]> {
    const products = await this.productModel.find()
    return products
  }

  async getProduct(productID: string): Promise<Product>  {
    if (!isValidObjectId(productID)) {
      throw new BadRequestException('El ID proporcionado no es válido.');
    }
    const product = await this.productModel.findById(productID);
    return product;
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const product = new this.productModel(createProductDto);
    return await product.save();
  }  
  
  async deleteProduct(productID: string): Promise<Product> {
    const deletedProduct = await this.productModel.findByIdAndDelete(productID);
    return deletedProduct;
  }

  async updateProduct(productID: string, createProductDto: CreateProductDto): Promise<Product> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(productID, createProductDto, {new: true})    
    return updatedProduct;
  }

}
