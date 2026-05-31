import { Injectable, NotFoundException } from '@nestjs/common';

export interface PostModel {
  id: number;
  author: string;
  title: string;
  content: string;
  images: string[];
  likeCount: number;
  commentCount: number;
}

let posts: PostModel[] = [
  {
    id: 1,
    author: 'John Doe',
    title: 'My First Post',
    content: 'This is the content of my first post.',
    images: [],
    likeCount: 1000,
    commentCount: 999,
  },
  {
    id: 2,
    author: 'Jane Smith',
    title: 'My Second Post',
    content: 'This is the content of my second post.',
    images: [],
    likeCount: 500,
    commentCount: 499,
  },
  {
    id: 3,
    author: 'Bob Johnson',
    title: 'My Third Post',
    content: 'This is the content of my third post.',
    images: [],
    likeCount: 250,
    commentCount: 249,
  },
];

@Injectable()
export class PostsService {
  getAllPosts(): PostModel[] {
    return posts;
  }

  getPostById(id: number): PostModel {
    const post = posts.find((post) => post.id === id);

    if (!post) throw new NotFoundException('게시물을 찾을 수 없습니다.');

    return post;
  }

  createPost(
    author: string,
    title: string,
    content: string,
    images?: string[],
  ): PostModel {
    const post = {
      id: posts[posts.length - 1].id + 1,
      author,
      title,
      content,
      images: Array.isArray(images) ? images : [],
      likeCount: 0,
      commentCount: 0,
    };

    posts = [...posts, post];

    return post;
  }

  updatePost(
    postId: number,
    title?: string,
    content?: string,
    images?: string[],
  ): PostModel {
    const post = posts.find((post) => post.id === postId);

    if (!post) throw new NotFoundException();

    if (title) post.title = title;
    if (content) post.content = content;
    if (images) post.images = Array.isArray(images) ? images : post.images;

    posts = posts.map((prevPost) => (prevPost.id === postId ? post : prevPost));

    return post;
  }

  deletePost(postId: number) {
    const post = posts.find((post) => post.id === postId);

    if (!post) throw new NotFoundException();

    posts = posts.filter((post) => post.id !== postId);

    return postId;
  }
}
