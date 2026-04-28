
export interface User {
  id: string;
  email: string;
  image: string | null;
  name: string;
}

export interface ProfileLike {
  userId: string;
}

export interface ProfileComment {
  id: string;
  content: string;
  createdAt: string;
  author: User;
}

export interface ProfilePostCount {
  likes: number;
  comments: number;
}


export interface ProfilePostsType {
  id: string;
  authorId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: User;
  likes: ProfileLike[];
  comments: ProfileComment[];
  _count: ProfilePostCount;
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
  createdAt: string;
  updatedAt: string;
  _count: {
    followers: number;
    followings: number;
  };
}

export interface LikedPost {
  id: string;        // like id
  userId: string;    // the user who liked the post
  postId: string;
  createdAt: string;
  post: ProfilePostsType;
}
