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

  create(post: CreatePostRequest, user: User) {
    return this.postsRepository.create({ ...post, user });
  }

  findAll(): Promise<Post[]> {
    return this.postsRepository.find({ relations: ['user'] });
  }

  async update(slug: string, post: CreatePostRequest) {
    const p = await this.findOneBySlug(slug);
    return this.postsRepository.save({ ...p, ...post });
  }

  findOne(id: number): Promise<Post> {
    return this.postsRepository.findOne(id, { relations: ['user'] });
  }

  findOneBySlug(slug: string): Promise<Post> {
    return this.postsRepository.findOne({ slug }, { relations: ['user'] });
  }

  async remove(id: string): Promise<void> {
    await this.postsRepository.delete(id);
  }
}
