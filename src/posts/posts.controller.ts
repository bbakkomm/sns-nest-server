import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // 1) GET /posts
  //    모든 게시물 조회
  @Get()
  getPosts() {
    return this.postsService.getAllPosts();
  }

  // 2) GET /posts/:id
  //    특정 게시물 조회
  @Get(':id')
  getPost(@Param('id') id: string) {
    return this.postsService.getPostById(+id);
  }

  // 3) POST /posts
  //    게시물 생성
  @Post()
  postPosts(
    @Body('author') author: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    return this.postsService.createPost(author, title, content);
  }

  // 4) PUT /posts/:id
  //    게시물 수정
  @Put(':id')
  putPost(
    @Param('id') id: string,
    @Body('author') author: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    return this.postsService.updatePost(+id, author, title, content);
  }

  // 5) DELETE /posts/:id
  //    게시물 삭제
  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(+id);
  }
}
