# claude-3-artifacts

claude-3-artifacts is a React-based application that provides an interactive interface for the Claude 3 Sonnet AI model using the OpenRouter API. It features a split-screen layout with a chat interface and a real-time React component rendering area.

**Important Note:** This project is currently broken and may not be fixed in the near future. Use at your own risk and be aware that functionality may be limited or non-existent.

## Features

- Chat interface for Claude 3 Sonnet AI
- Real-time React component rendering with automatic updates
- Dark mode toggle
- Syntax highlighting for code blocks
- Responsive design using Tailwind CSS
- Enhanced error handling and user-friendly messages
- Improved React code validation and error reporting

## Quick Start

1. Clone the repository:
   ```
   git clone https://github.com/PierrunoYT/claude-3-artifacts.git
   cd claude-3-artifacts
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your OpenRouter API key:
   ```
   REACT_APP_OPENROUTER_API_KEY=your_api_key_here
   ```

4. For development:
   ```
   npm run dev
   ```
   This will start the development server on port 3000.

5. For production:
   ```
   npm run build
   npm start
   ```
   This will build the project and start the production server on port 3001.

6. Open your browser and navigate to `http://localhost:3000` (for development) or `http://localhost:3001` (for production).

## Technologies

- React
- Express
- Tailwind CSS
- OpenRouter API
- shadcn/ui components
- React Syntax Highlighter

## React Component Guidelines

When writing React components for the rendering area, follow these guidelines:

1. Remove any import statements
2. Define components as arrow functions
3. Use React.useState() directly (don't import useState)
4. Maintain basic React component structure
5. Double-check syntax, brackets, and semicolons
6. Avoid using external libraries or components
7. Keep components simple and focused on UI rendering
8. Use inline styles or className for styling (Tailwind classes are available)

Example:
```jsx
const MyComponent = () => {
  const [count, setCount] = React.useState(0);

  return (
    <div className="p-4 bg-gray-100 rounded-md">
      <p className="text-lg mb-2">You clicked {count} times</p>
      <button 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => setCount(count + 1)}
      >
        Click me
      </button>
    </div>
  );
};
```

## Troubleshooting

If you encounter issues while setting up or running the project, try the following:

1. Ensure you have the latest version of Node.js installed (v14 or higher recommended).
2. Clear your browser cache and restart the development server.
3. Check that your OpenRouter API key is correctly set in the `.env` file.
4. If you're having issues with dependencies, try deleting the `node_modules` folder and `package-lock.json` file, then run `npm install` again.
5. Make sure you're not using any reserved words or syntax that might conflict with the React component rendering system.

If problems persist, please open an issue on the GitHub repository with a detailed description of the problem and any error messages you're seeing.

## Contributing

We welcome contributions! Check our issue tracker or suggest new features by opening an issue.

## License

MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenRouter API for Claude 3 Sonnet model interaction
- shadcn/ui library and Tailwind CSS for UI components
- React Syntax Highlighter for code formatting

For more details on features and future plans, see [ROADMAP.md](ROADMAP.md).
