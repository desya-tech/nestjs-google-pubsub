import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class MessageToTopic {
  @PrimaryGeneratedColumn()
  projectId: string;

  @Column()
  topics: string;

  @Column()
  subscriptionId: string;

  @Column()
  message: string;
}