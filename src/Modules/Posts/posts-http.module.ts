import { Module } from '@nestjs/common';
import { PostsController } from 'src/Controllers/posts.controller';
import { PostsService } from 'src/Services/posts.service';
import { PostsModule } from './posts.module';

@Module({
  imports: [PostsModule],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsHttpModule {}
