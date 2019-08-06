import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, Unique } from 'typeorm';
import * as crypto from 'crypto';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  avatar: string;

  @Column()
  email: string;

  @Column()
  isAdmin: string;

  @Column()
  customerId: number;

  @BeforeInsert()
  hashPassword() {
    this.password = crypto.createHmac('sha256', this.password).digest('hex');
  }
  @Column()
  password: string;

  @BeforeInsert()
  updateDates() {
    this.createdDate = new Date().toISOString();
  }
  @Column()
  createdDate: string;
}
