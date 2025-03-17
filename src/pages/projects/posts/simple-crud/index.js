import { useState } from 'react';
import SimpleCrudApp from './SimpleCrudApp';

export const projectMeta = {
  title: "Simple CRUD Application",
  description: "A React application demonstrating CRUD operations using Supabase and Tailwind CSS",
  date: "March 2024",
  thumbnail: "/images/projects/simple-crud-thumbnail.png",
  technologies: ["React", "Supabase", "Tailwind CSS"],
  githubUrl: "",
  liveUrl: "/projects/simple-crud"
};

function SimpleCrudPost() {
  const [activeTab, setActiveTab] = useState('demo'); // 'demo' or 'about'

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Project Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{projectMeta.title}</h1>
          <p className="text-lg text-gray-600 mb-4">{projectMeta.description}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {projectMeta.technologies.map((tech) => (
              <span 
                key={tech}
                className="px-3 py-1 text-sm font-medium bg-indigo-100 text-indigo-800 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex gap-4">
            <a
              href={projectMeta.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              View on GitHub
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
              Live Demo
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
            <SimpleCrudApp />
          ) : (
            <div className="prose max-w-none">
              <h2>About This Project</h2>
              <p>
                This Simple CRUD (Create, Read, Update, Delete) application demonstrates the fundamental operations of data management using React and Supabase. The project showcases:
              </p>
              <ul>
                <li>Real-time data synchronization with Supabase backend</li>
                <li>Modern UI design using Tailwind CSS</li>
                <li>Form handling and validation</li>
                <li>State management using React hooks</li>
                <li>Responsive design for all screen sizes</li>
                <li>Error handling and loading states</li>
              </ul>

              <h2>Technical Implementation</h2>
              <p>
                The application is built using React and leverages Supabase as the backend service. Key technical features include:
              </p>
              <ul>
                <li>Custom hooks for data fetching and state management</li>
                <li>Optimistic updates for better user experience</li>
                <li>Debounced search functionality</li>
                <li>Sorting and filtering capabilities</li>
                <li>Pagination for handling large datasets</li>
              </ul>

              <h2>Lessons Learned</h2>
              <p>
                During the development of this project, several valuable lessons were learned:
              </p>
              <ul>
                <li>Importance of proper error handling in real-time applications</li>
                <li>Benefits of using a UI framework like Tailwind CSS for rapid development</li>
                <li>Strategies for managing component state effectively</li>
                <li>Best practices for form handling in React</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SimpleCrudPost; 