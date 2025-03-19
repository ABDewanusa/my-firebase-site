import React, { Suspense, ComponentType } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import ProjectPost from './components/ProjectPost';
import ProjectsPage from './pages/projects/ProjectsPage';
import ContactPage from './pages/contact/ContactPage';
import LandingPage from './pages/home/LandingPage';
import Navigation from './components/Navigation';
import { useProject } from './hooks/useProject';
import TextContent from './components/TextContent';

// Pre-import demo components
const TodoListDemo = React.lazy(() => import(/* webpackChunkName: "TodoListDemo" */ 'pages/projects/demos/TodoListDemo'));
const SimpleCrudDemo = React.lazy(() => import(/* webpackChunkName: "SimpleCrudDemo" */ 'pages/projects/demos/SimpleCrudDemo'));

const ProjectRoute: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { project, loading, error } = useProject(id || '');

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error?.message || 'Project not found'}</span>
      </div>
    );
  }

  // Debug log
  console.log('Project content:', {
    type: project.content_type,
    isMarkdown: project.content.isMarkdown,
    aboutContent: project.content.aboutContent
  });

  // Map demo component names to their components
  const demoComponents: Record<string, React.LazyExoticComponent<ComponentType>> = {
    'TodoListDemo': TodoListDemo,
    'SimpleCrudDemo': SimpleCrudDemo
  };

  let DemoComponent: React.LazyExoticComponent<ComponentType> | undefined;
  let aboutContent: React.ReactNode | undefined;

  if (project.content_type === 'demo') {
    DemoComponent = demoComponents[project.content.demoComponent || ''];
    
    if (!DemoComponent) {
      return (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">Demo component not found: {project.content.demoComponent}</span>
        </div>
      );
    }

    aboutContent = project.content.aboutContent ? (
      <TextContent 
        content={project.content.aboutContent} 
        isMarkdown={project.content.isMarkdown ?? false}
      />
    ) : undefined;
  }

  return (
    <ProjectPost
      meta={{
        title: project.title,
        description: project.description,
        date: project.date,
        thumbnail: project.thumbnail,
        technologies: project.technologies,
        githubUrl: project.github_url,
        liveUrl: project.live_url
      }}
      type={project.content_type}
      content={project.content}
      demoComponent={DemoComponent}
      aboutContent={aboutContent}
    />
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <Suspense fallback={
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        }>
          <Routes>
            <Route path="/projects/:id" element={<ProjectRoute />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="*" element={<div>Page not found</div>} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
};

export default App; 