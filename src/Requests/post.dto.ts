import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreatePostRequest {
  @ApiProperty()
  @IsString()
  @MinLength(6)
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  content: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  slug: string;
}
