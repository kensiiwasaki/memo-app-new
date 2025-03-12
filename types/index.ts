export interface Memo {
  id: string;
  content: string;
  user_id: string;
  created_at: string;
  comments?: Comment[];
  likes: number;
}

export interface Comment {
  id: string;
  content: string;
  user_id: string;
  memo_id: string;
  created_at: string;
}