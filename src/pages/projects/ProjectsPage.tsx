import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getPosts, getTags } from '../../services/postService';
import { Post, Tag } from '../../types/post';

function ProjectsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [postsData, tagsData] = await Promise.all([
          getPosts(),
          getTags()
        ]);
        setPosts(postsData);
        setTags(tagsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Calculate tag weights based on usage
  const tagWeights = useMemo(() => {
    const weights = new Map<string, number>();
    posts.forEach(post => {
      post.tags.forEach(tag => {
        weights.set(tag.id, (weights.get(tag.id) || 0) + 1);
      });
    });
    return weights;
  }, [posts]);

  // Filter posts based on search term and selected tag
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesTag = selectedTag ? post.tags.some(tag => tag.slug === selectedTag) : true;
      const matchesSearch = searchTerm.trim() === '' ? true : (
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      return matchesTag && matchesSearch;
    });
  }, [posts, selectedTag, searchTerm]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 p-4 rounded-md">
            <p className="text-red-700">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-12">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Projects</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            My Work
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Here are some of the projects I've worked on
          </p>
        </div>

        {/* Search bar */}
        <div className="mb-8">
          <div className="max-w-xl mx-auto">
            <label htmlFor="search" className="sr-only">Search projects</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                name="search"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search projects by title, description, or tags"
              />
            </div>
          </div>
        </div>

        {/* Tag cloud */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedTag === null
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {tags.map((tag) => {
              const weight = tagWeights.get(tag.id) || 0;
              const fontSize = Math.max(0.8, Math.min(1.4, 0.8 + (weight * 0.2))); // Scale between 0.8 and 1.4
              return (
                <button
                  key={tag.id}
                  onClick={() => setSelectedTag(tag.slug)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedTag === tag.slug
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                  style={{ fontSize: `${fontSize}rem` }}
                >
                  {tag.name}
                  <span className="ml-2 text-xs opacity-60">({weight})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results count */}
        <div className="text-center mb-8">
          <p className="text-gray-600">
            {filteredPosts.length === 0 ? (
              'No projects found'
            ) : (
              `Found ${filteredPosts.length} project${filteredPosts.length === 1 ? '' : 's'}`
            )}
          </p>
        </div>

        {/* Posts grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <Link
              key={post.id}
              to={`/projects/${post.slug}`}
              className="group"
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-200 hover:shadow-xl hover:scale-[1.02]">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={post.thumbnail_url}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/images/projects/placeholder.png';
                      e.currentTarget.onerror = null;
                    }}
                  />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600">
                    {post.title}
                  </h3>
                  <p className="text-gray-600">
                    {post.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectsPage; 