import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export interface ProjectContent {
  demoComponent?: string;
  aboutContent?: string;
  isMarkdown?: boolean;
  text?: string;
  videoId?: string;
  videoTitle?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  date: string;
  thumbnail: string;
  technologies: string[];
  github_url?: string;
  live_url: string;
  content_type: 'demo' | 'text' | 'youtube';
  content: ProjectContent;
  created_at: string;
  updated_at: string;
}

export function useProject(id: string) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProject() {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setProject(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch project'));
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [id]);

  return { project, loading, error };
} 