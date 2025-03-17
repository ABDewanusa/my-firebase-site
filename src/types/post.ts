export interface Tag {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  thumbnail_url: string;
  github_url?: string;
  live_url?: string;
  published: boolean;
  created_at: string;
  updated_at: string;
  tags: Tag[];
}

export interface PostTag {
  post_id: string;
  tag_id: string;
} 