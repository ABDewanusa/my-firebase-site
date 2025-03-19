import React, { useState } from 'react';
import TextContent from './TextContent';
import YouTubeEmbed from './YouTubeEmbed';

interface ProjectMeta {
  title: string;
  description: string;
  date: string;
  thumbnail: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl: string;
}

interface ProjectPostProps {
  meta: ProjectMeta;
  demoComponent?: React.ComponentType;
  aboutContent?: React.ReactNode;
  type?: 'demo' | 'text' | 'youtube';
  content?: {
    text?: string;
    isMarkdown?: boolean;
    videoId?: string;
    videoTitle?: string;
  };
}

const ProjectPost: React.FC<ProjectPostProps> = ({ 
  meta, 
  demoComponent: DemoComponent, 
  aboutContent,
  type = 'demo',
  content
}) => {
  const [activeTab, setActiveTab] = useState<'demo' | 'about'>('demo');

  const renderContent = () => {
    switch (type) {
      case 'text':
        return content?.text ? (
          <TextContent content={content.text} isMarkdown={content.isMarkdown} />
        ) : null;
      
      case 'youtube':
        return content?.videoId ? (
          <YouTubeEmbed 
            videoId={content.videoId} 
            title={content.videoTitle}
          />
        ) : null;
      
      case 'demo':
      default:
        return DemoComponent ? <DemoComponent /> : null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Project Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{meta.title}</h1>
        <p className="text-xl text-gray-600 mb-6">{meta.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {meta.technologies.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-4 text-sm text-gray-500">
          <span>Date: {meta.date}</span>
          {meta.githubUrl && (
            <a
              href={meta.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800"
            >
              GitHub
            </a>
          )}
          <a
            href={meta.liveUrl}
            className="text-indigo-600 hover:text-indigo-800"
          >
            Live Demo
          </a>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('demo')}
            className={`${
              activeTab === 'demo'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            {type === 'demo' ? 'Live Demo' : type === 'youtube' ? 'Video Demo' : 'Content'}
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`${
              activeTab === 'about'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            About Project
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="mt-8">
        {activeTab === 'demo' ? (
          <div className="bg-white rounded-lg shadow-lg p-6">
            {renderContent()}
          </div>
        ) : (
          <div className="prose prose-indigo max-w-none">
            {aboutContent}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectPost; 