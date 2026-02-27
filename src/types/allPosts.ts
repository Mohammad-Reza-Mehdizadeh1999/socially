export interface User {
  name: string;
  email: string;
  image: string | null;
}

export interface Like {
  userId: string;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  author: User;
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

export interface NewPostResponse {
  message: string;
  success: boolean;
  data?: {
    id: string;
    authorId: string;
    content: string;
    createdAt: string;
    updatedAt: string;
  };
}