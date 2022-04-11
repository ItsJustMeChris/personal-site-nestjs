import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Post as PostEntity } from 'src/Entities/Post';
import { TypeORMExceptionFilter } from 'src/Exceptions/typeorm.exception';
import { JwtAuthGuard } from 'src/Guards/jwt.guard';
import { CreatePostRequest } from 'src/Requests/post.dto';
import { PostsService } from 'src/Services/posts.service';
import { S3Service } from 'src/Services/s3.service';

@Controller('posts')
export class PostsController {
  constructor(
    private postsService: PostsService,
    private s3Service: S3Service,
  ) {}

  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(ClassSerializerInterceptor)
  @UseFilters(TypeORMExceptionFilter)
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createPostRequest: CreatePostRequest, @Req() req) {
    return this.postsService.create(createPostRequest, req.user);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  index(): Promise<PostEntity[]> {
    return this.postsService.findAll();
  }

  @Get(':slug')
  @UseInterceptors(ClassSerializerInterceptor)
  single(@Param('slug') slug: string): Promise<PostEntity> {
    return this.postsService.findOneBySlug(slug);
  }

  @Patch(':slug')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(ClassSerializerInterceptor)
  @UseFilters(TypeORMExceptionFilter)
  @UseGuards(JwtAuthGuard)
  update(
    @Param('slug') slug: string,
    @Body() createPostRequest: CreatePostRequest,
  ) {
    return this.postsService.update(slug, createPostRequest);
  }
}
