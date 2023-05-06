import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../persistence/repositories/product.repository';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ProductsService {

    constructor(private readonly productRepository: ProductRepository) {

    }

    findAllProducts(): any {
        try{
            return this.productRepository.findAll();
        } catch (error) {
            throw new RpcException(error)
        }
    }

    async findProductById({ id }: any) {
        console.log(id)
        const product = await this.productRepository.findOne(id)
        if(!product){
            throw new RpcException('Product not found')
        }
        return product;
    }

    createProduct(product: any) {
        if(this.productRepository.findBy({title: product.title})){
            throw new RpcException('Product already exists')
        }
        return this.productRepository.create(product);
    }

    updateProduct(_id: string, data: any) {
        if(!this.productRepository.findOne(_id)){
            throw new RpcException('Product not found')
        }
        return this.productRepository.update(_id, data);
    }

    deleteProduct(_id: string) {
        if(!this.productRepository.findOne(_id)){
            throw new RpcException('Product not found')
        }
        return this.productRepository.delete(_id);
    }

}
