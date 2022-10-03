export interface Post {
  id: string;
  title: string;
  content: string;
}

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type PartialPost = Optional<Post, 'id'>
