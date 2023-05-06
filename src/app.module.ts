import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ProductsModule } from './products/products.module';
// import { PersistenceModule } from './persistence/persistence.module';

@Module({
  imports: [ConfigModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
