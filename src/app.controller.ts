import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';
// import { EmittedMessage } from '@algoan/pubsub';
import { Message } from '@google-cloud/pubsub';
import { MessageToTopic } from './message.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Get('getmessage')
  // @EventPattern('order_topic')
  async handleMyTopicEvent(data: Message) {
    console.log(data.data.toString());
    // return this.appService.getMessage(data);
  }

  @Get('sendmessage/:mess')
  async sendmessage(@Param('mess') mess) {
    return this.appService.sendmesstotopic('virtus-platform','order_topic',mess);
  }

  @Get('getmessage/:sub')
  async getmessage(@Param('sub') sub) {
    return this.appService.getmessagefromsub('virtus-platform','order_topic',sub);
  }

  // @Post('pushmessage')
  // async sendmessage2(@Body() contact: MessageToTopic): Promise<any> {
  //   return this.appService.sendmesstotopic('pubsub-331106','order_topic','love vti');
  // }
 
}
