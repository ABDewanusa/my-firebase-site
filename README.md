# My Firebase Site

A modern web application built with React, TypeScript, and Supabase, featuring a blog-style project showcase with tags and search functionality.

## Features

- 🎨 Modern UI with Tailwind CSS
- 🔍 Project search and filtering
- 🏷️ Tag-based categorization
- 📱 Fully responsive design
- ⚡ Real-time data with Supabase
- 🔒 Type-safe with TypeScript

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd my-firebase-site
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Supabase credentials:
```env
REACT_APP_SUPABASE_URL=your_supabase_url_here
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

4. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
src/
  ├── components/     # Reusable UI components
  ├── pages/         # Page components
  ├── services/      # API and service functions
  ├── types/         # TypeScript type definitions
  └── lib/           # Utility functions and constants
```

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Supabase
- React Router

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
