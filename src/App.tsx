import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProjectsPage from './pages/projects/ProjectsPage';
import ContactPage from './pages/contact/ContactPage';
import LandingPage from './pages/home/LandingPage';
import Navigation from './components/Navigation';
import SimpleCrudPost from './pages/projects/posts/simple-crud';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <Routes>
          <Route path="/projects/simple-crud" element={<SimpleCrudPost />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App; 