import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/Entities/Post';
import { User } from 'src/Entities/User';
import { CreatePostRequest } from 'src/Requests/post.dto';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  create(post: CreatePostRequest, user: User): Promise<Post> {
    return this.postsRepository.save({ ...post, user });
  }

  findAll(): Promise<Post[]> {
    return this.postsRepository.find({ relations: ['user'] });
  }

  findOne(id: number): Promise<Post> {
    return this.postsRepository.findOne(id);
  }

  findOneBySlug(slug: string): Promise<Post> {
    return this.postsRepository.findOne({ slug });
  }

  async remove(id: string): Promise<void> {
    await this.postsRepository.delete(id);
  }
}
