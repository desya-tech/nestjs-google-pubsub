// import { GooglePubSubOptions } from '@algoan/pubsub';
import { INestMicroservice } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
// import { GCPubSubServer } from '@algoan/nestjs-google-pubsub-microservice';
import { AppModule } from './app.module';
import { PubSubServer } from 'nestjs-google-pubsub';

async function bootstrap() {
  const app2 = await NestFactory.create(AppModule);
  await app2.listen(3000);
  const app = await NestFactory.createMicroservice(AppModule, {
    strategy: new PubSubServer({
      projectId: 'virtus-platform',
      // other PubSub client options
      topics: {
        'order_topic': {
          subscriptionId: 'package_sub'
        }
      }
    })
  });
  app.listen();
  console.log('Microservice is listening');
  // app.listen(() => console.log('Microservice is listening'));
}
bootstrap();
