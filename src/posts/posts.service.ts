import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostsModel } from './entities/posts.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsModel)
    private readonly postsRepository: Repository<PostsModel>,
  ) {}

  async getAllPosts(): Promise<PostsModel[]> {
    return this.postsRepository.find();
  }

  async getPostById(id: number): Promise<PostsModel> {
    const post = await this.postsRepository.findOne({ where: { id } });

    if (!post) throw new NotFoundException('게시물을 찾을 수 없습니다.');
    return post;
  }

  async createPost(
    author: string,
    title: string,
    content: string,
  ): Promise<PostsModel> {
    const post = this.postsRepository.create({
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    });

    const newPost = await this.postsRepository.save(post);

    return newPost;
  }

  async updatePost(
    postId: number,
    author: string,
    title: string,
    content: string,
  ): Promise<PostsModel> {
    const post = await this.postsRepository.findOne({ where: { id: postId } });

    if (!post) throw new NotFoundException('게시물을 찾을 수 없습니다.');

    if (author) post.author = author;
    if (title) post.title = title;
    if (content) post.content = content;

    const newPost = await this.postsRepository.save(post);

    return newPost;
  }

  async deletePost(postId: number): Promise<number> {
    const post = await this.postsRepository.findOne({ where: { id: postId } });

    if (!post) throw new NotFoundException();

    await this.postsRepository.delete(postId);

    return postId;
  }
}
