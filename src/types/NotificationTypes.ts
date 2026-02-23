
export interface User {
  id: string;
  name: string;
  image: string | null;
  email: string;
}

export interface Post {
  content: string;
}

export interface Comment {
  content: string;
}

export type NotificationType = 'FOLLOW' | 'LIKE' | 'COMMENT';

export interface Notification {
  id: string;
  userId: string;
  creatorId: string;
  postId: string | null;
  commentId: string | null;
  type: NotificationType;
  read: boolean;
  createdAt: string;
  creator: User;
  post: Post | null;
  comment: Comment | null;
}