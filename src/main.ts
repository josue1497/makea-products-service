import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule } from './config/config.module';
import { ConfigClientService } from './config/config-client.service';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  try {
    const configContext = await NestFactory.createApplicationContext(
      ConfigModule,
    );
    const configService = configContext.get(ConfigClientService);
    const config = await configService.getConfigByService('products');
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
      AppModule,
      {
        transport: Transport.RMQ,
        options: {
          urls: [
            config.RABBITMQ_URL,
          ],
          queue: config.RMQ_PRODUCT_QUEUE,
          queueOptions: {
            durable: false,
          },
        },
      },
    );
    await app.listen();
    await configContext.close();

    console.log('Products Microservice is listening')
  } catch (e) {
    console.error(e.code)
  }
}
bootstrap();
