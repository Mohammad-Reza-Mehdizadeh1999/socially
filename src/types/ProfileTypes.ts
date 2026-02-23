
export interface User {
  id: string;
  email: string;
  image: string | null;
  name: string;
}

export interface Like {
  userId: string;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: string;
}

export interface Post {
  id: string;
  authorId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: User;
  likes: Like[];
  comments: Comment[];
  _count: {
    likes: number;
    comments: number;
  };
}

export interface LikedPost {
  id: string;
  userId: string;
  postId: string;
  createdAt: string;
  post: Post;
}

export type ProfileTab = 'posts' | 'likes';