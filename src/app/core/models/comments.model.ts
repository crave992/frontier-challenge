export interface CommentData {
  currentUser: User;
  comments: Comment[];
}

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replyingTo?: string;
  replies?: Comment[];
}

export interface User {
  image: Image;
  username: string;
}

export interface Image {
  png: string;
}
