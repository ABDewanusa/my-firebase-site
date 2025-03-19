import { supabase } from '../supabaseClient';
import { Post } from '../types/post';

export async function getPosts() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select(`
      *,
      post_tags (
        tags (
          id,
          name,
          slug
        )
      )
    `)
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return posts.map((post: any) => ({
    ...post,
    tags: post.post_tags?.map((pt: any) => pt.tags) || []
  }));
}

export async function getPostBySlug(slug: string) {
  const { data: post, error } = await supabase
    .from('posts')
    .select(`
      *,
      post_tags (
        tags (
          id,
          name,
          slug
        )
      )
    `)
    .eq('slug', slug)
    .single();

  if (error) throw error;

  return {
    ...post,
    tags: post.post_tags?.map((pt: any) => pt.tags) || []
  };
}

export async function getTags() {
  const { data: tags, error } = await supabase
    .from('tags')
    .select('*')
    .order('name');

  if (error) throw error;
  return tags;
}

export async function createPost(post: Omit<Post, 'id' | 'created_at' | 'updated_at' | 'tags'>) {
  const { data, error } = await supabase
    .from('posts')
    .insert([
      {
        title: post.title,
        slug: post.slug,
        description: post.description,
        content: post.content,
        thumbnail_url: post.thumbnail_url,
        github_url: post.github_url,
        live_url: post.live_url,
        published: post.published
      }
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updatePost(id: string, post: Partial<Omit<Post, 'id' | 'created_at' | 'tags'>>) {
  const { data, error } = await supabase
    .from('posts')
    .update({
      ...post,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deletePost(id: string) {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export async function addTagToPost(postId: string, tagId: string) {
  const { error } = await supabase
    .from('post_tags')
    .insert([{ post_id: postId, tag_id: tagId }]);

  if (error) throw error;
}

export async function removeTagFromPost(postId: string, tagId: string) {
  const { error } = await supabase
    .from('post_tags')
    .delete()
    .eq('post_id', postId)
    .eq('tag_id', tagId);

  if (error) throw error;
} 