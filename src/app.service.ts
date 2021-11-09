import { Injectable } from '@nestjs/common';
import { Message,PubSub } from '@google-cloud/pubsub';
// import { InjectRepository } from '@nestjs/typeorm';
import { MessageToTopic } from './message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    // @InjectRepository(MessageToTopic)
    // private messageRepository: Repository<MessageToTopic>
  ) {}
  
  
  getHello(): string {
    return 'Hello World!';
  }

  async sendmesstotopic(
    projectId,
    topicName,
    message
  ) {
    // Instantiates a client
    const pubsub = new PubSub({projectId});
    const topic = await pubsub.topic(topicName);

    // console.log('topic : ',topicName)
    // console.log('send message : ',message)
    // Send a message to the topic
    topic.publish(Buffer.from(message));
  }

  async getmessagefromsub(projectId,topicName,subscription_name){
     // Instantiates a client
     const pubsub = new PubSub({projectId});
     const topic = await pubsub.topic(topicName);
     const subscription = await topic.subscription(subscription_name);
 
     subscription.on('message', message => {
       console.log(subscription_name,'Received message:', message.data.toString());
      //  process.exit(0);
     });

     subscription.on('error', error => {
      console.error('Received error:', error);
      // process.exit(1);
    });
  }
}
