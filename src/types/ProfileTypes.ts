
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

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  bio: string | null;
  location: string | null;
  website: string | null;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  _count: {
    followers: number;
    followings: number;
  };
}