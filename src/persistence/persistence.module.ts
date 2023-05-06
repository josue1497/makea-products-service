import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigClientService } from '../config/config-client.service';
import { ConfigModule } from '../config/config.module';
import { Product, ProductSchema } from './schemas/product.schema';
import { ProductRepository } from './repositories/product.repository';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigClientService) => {
                const config = await configService.getConfigByService('products');
                return {
                    uri: config.MONGODB_URL,
                    user: config.MONGO_DB_USER,
                    pass: config.MONGO_DB_PASS,
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    authSource: config.MONGO_DB_AUTH_SOURCE,
                }
            },
            inject: [ConfigClientService],
        }),
        MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    ],
    providers: [ProductRepository],
    exports: [ProductRepository],
})
export class PersistenceModule { }
