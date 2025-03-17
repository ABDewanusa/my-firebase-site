import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with rat_background.png */}
      <div 
        className="relative min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: 'url("/images/landing-page/ants_background2.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* <div className="absolute inset-0 bg-black/10"></div> */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <img
                src="/images/profile/profile.jpg"
                alt="Bagas"
                className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-2xl"
                onError={(e) => {
                  e.target.src = 'https://ui-avatars.com/api/?name=Bagas&background=6366f1&color=fff&size=160';
                  e.target.onerror = null;
                }}
              />
              
            </div>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold text-black mb-6 text-shadow-lg">
            Hi. I'm <span className="text-indigo-800">Bagas</span>.
          </h1>
          <p className="text-xl sm:text-2xl text-black mb-8 max-w-3xl mx-auto text-shadow">
            a developer passionate about creating solutions to your real work problems.
          </p>
          <Link
            to="/projects"
            className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 shadow-lg"
          >
            View My Work
          </Link>
        </div>
      </div>

      {/* Projects Section with buffalo_background.png */}
      <div 
        className="relative py-20"
        style={{
          backgroundImage: 'url("/images/landing-page/buffalo_background.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-shadow-lg">
              Featured Projects
            </h2>
            <p className="text-white text-lg max-w-2xl mx-auto text-shadow">
              Check out some of my recent work
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project Card 1 */}
            <div className="bg-white/20 backdrop-blur-sm rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-200 shadow-xl">
              <Link to="/projects/simple-crud" className="block">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2 text-shadow">
                    Simple CRUD Application
                  </h3>
                  <p className="text-white text-shadow">
                    A React application with Supabase backend demonstrating CRUD operations
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-xs font-medium bg-indigo-600/70 text-white rounded-full shadow">
                      React
                    </span>
                    <span className="px-2 py-1 text-xs font-medium bg-green-600/70 text-white rounded-full shadow">
                      Supabase
                    </span>
                    <span className="px-2 py-1 text-xs font-medium bg-blue-600/70 text-white rounded-full shadow">
                      Tailwind CSS
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Add more project cards as needed */}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/projects"
              className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-black transition-all duration-200 shadow-lg"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage; 