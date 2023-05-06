import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductsService } from './products.service';

@Controller()
export class ProductsController {

    constructor(private readonly productsService: ProductsService) { }


    @MessagePattern({ cmd: 'findAllProducts' })
    async getProducts(): Promise<unknown> {
        return await this.productsService.findAllProducts();
    }

    @MessagePattern({ cmd: 'findProductById' })
    async getProductById(@Payload() payload: any): Promise<unknown> {
        return await this.productsService.findProductById(payload);
    }

    @MessagePattern({ cmd: 'createProduct' })
    async createProduct(
        @Payload() data: any,
    ): Promise<unknown> {
        return await this.productsService.createProduct(data);
    }

    @MessagePattern({ cmd: 'updateProduct' })
    async updateProduct(@Payload() data: any,) {
        return await this.productsService.updateProduct(data._id, data);
    }

    @MessagePattern({ cmd: 'deleteProduct' })
    async deleteProduct(@Payload() _id: string) {
        return await this.productsService.deleteProduct(_id);
    }


}
