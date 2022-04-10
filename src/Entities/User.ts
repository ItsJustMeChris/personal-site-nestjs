import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Post } from './Post';

@Entity()
@Unique(['email'])
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ default: false })
  isActive: boolean;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
