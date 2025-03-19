-- Create projects table
CREATE TABLE projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date TEXT NOT NULL,
  thumbnail TEXT NOT NULL,
  technologies TEXT[] NOT NULL,
  github_url TEXT,
  live_url TEXT NOT NULL,
  demo_component TEXT NOT NULL,
  about_content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Public projects are viewable by everyone"
  ON projects FOR SELECT
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert initial data
INSERT INTO projects (
  id,
  title,
  description,
  date,
  thumbnail,
  technologies,
  github_url,
  live_url,
  demo_component,
  about_content
) VALUES (
  'todo-list',
  'Todo List Application',
  'A modern Todo List application with filtering, real-time updates, and a clean UI',
  'March 2024',
  '/images/projects/todo-list-thumbnail.png',
  ARRAY['React', 'TypeScript', 'Supabase', 'Tailwind CSS'],
  '',
  '/projects/todo-list',
  'TodoListDemo',
  '<div><h2>About This Project</h2><p>This Todo List application demonstrates modern web development practices using React and TypeScript. It features real-time data synchronization with Supabase and a clean, responsive UI built with Tailwind CSS.</p><h3>Features</h3><ul><li>Create, read, update, and delete todos</li><li>Mark todos as complete/incomplete</li><li>Filter todos by status (All, Active, Completed)</li><li>Real-time updates with Supabase</li><li>Responsive design for all screen sizes</li><li>Type-safe with TypeScript</li></ul><h3>Technical Implementation</h3><p>The application is built using several modern technologies and practices:</p><ul><li>React Hooks for state management</li><li>TypeScript for type safety</li><li>Supabase for backend services</li><li>Tailwind CSS for styling</li><li>Error handling and loading states</li><li>Optimistic updates for better UX</li></ul><h3>Lessons Learned</h3><p>Building this project provided valuable insights into:</p><ul><li>State management patterns in React</li><li>TypeScript best practices</li><li>Real-time database operations</li><li>Modern UI/UX design principles</li><li>Error handling in async operations</li></ul></div>'
),
(
  'simple-crud',
  'Simple CRUD Application',
  'A basic CRUD (Create, Read, Update, Delete) application demonstrating fundamental database operations',
  'March 2024',
  '/images/projects/simple-crud-thumbnail.png',
  ARRAY['React', 'TypeScript', 'Supabase', 'Tailwind CSS'],
  '',
  '/projects/simple-crud',
  'SimpleCrudDemo',
  '<div><h2>About This Project</h2><p>This Simple CRUD application showcases basic database operations using React and Supabase. It provides a clean interface for managing items with names and descriptions.</p><h3>Features</h3><ul><li>Create new items with name and description</li><li>View all items in a clean list</li><li>Delete items with confirmation</li><li>Real-time updates with Supabase</li><li>Responsive design</li><li>Form validation</li></ul><h3>Technical Implementation</h3><p>The application demonstrates:</p><ul><li>Basic CRUD operations with Supabase</li><li>Form handling in React</li><li>Error handling and loading states</li><li>Optimistic updates</li><li>TypeScript type safety</li></ul><h3>Lessons Learned</h3><p>This project helped understand:</p><ul><li>Basic database operations</li><li>Form state management</li><li>Error handling patterns</li><li>User experience considerations</li></ul></div>'
); 