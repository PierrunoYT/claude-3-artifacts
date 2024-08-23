# Sonnet Web UI

Sonnet Web UI is a React-based application that provides an interactive interface for the Claude 3 Sonnet AI model using the OpenRouter API. It features a split-screen layout with a chat interface and a real-time React component rendering area.

## Features

- Chat interface for Claude 3 Sonnet AI
- Real-time React component rendering with automatic updates
- Dark mode toggle
- Syntax highlighting for code blocks
- Responsive design using Tailwind CSS
- Enhanced error handling and user-friendly messages
- Improved React code validation and error reporting

## Quick Start

1. Clone the repository
2. Run `npm install`
3. Create a `.env` file in the root directory and add your OpenRouter API key:
   ```
   REACT_APP_OPENROUTER_API_KEY=your_api_key_here
   ```
4. Development: `npm run dev` (port 3000)
5. Production: `npm run build` then `npm start` (port 3001)

## Technologies

- React
- Express
- Tailwind CSS
- OpenRouter API
- shadcn/ui components
- React Syntax Highlighter

## React Component Guidelines

When writing React components for the rendering area:

1. Remove any import statements
2. Define components as arrow functions
3. Use React.useState() directly (don't import useState)
4. Maintain basic React component structure
5. Double-check syntax, brackets, and semicolons

Example:
```jsx
const MyComponent = () => {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
};
```

## Contributing

We welcome contributions! Check our issue tracker or suggest new features by opening an issue.

## License

MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenRouter API for Claude 3 Sonnet model interaction
- shadcn/ui library and Tailwind CSS for UI components
- React Syntax Highlighter for code formatting

For more details on features and future plans, see [ROADMAP.md](ROADMAP.md).
# Sonnet Web UI

Sonnet Web UI is a React-based application that provides an interactive interface for the Claude 3 Sonnet AI model using the OpenRouter API. It features a split-screen layout with a chat interface and a real-time React component rendering area.

## Features

- Chat interface for Claude 3 Sonnet AI
- Real-time React component rendering with automatic updates
- Dark mode toggle
- Syntax highlighting for code blocks
- Responsive design using Tailwind CSS
- Enhanced error handling and user-friendly messages
- Improved React code validation and error reporting

## Quick Start

1. Clone the repository
2. Run `npm install`
3. Create a `.env` file in the root directory and add your OpenRouter API key:
   ```
   REACT_APP_OPENROUTER_API_KEY=your_api_key_here
   ```
4. Development: `npm run dev` (port 3000)
5. Production: `npm run build` then `npm start` (port 3001)

## Technologies

- React
- Express
- Tailwind CSS
- OpenRouter API
- shadcn/ui components
- React Syntax Highlighter

## React Component Guidelines

When writing React components for the rendering area:

1. Remove any import statements
2. Define components as arrow functions
3. Use React.useState() directly (don't import useState)
4. Maintain basic React component structure
5. Double-check syntax, brackets, and semicolons

Example:
```jsx
const MyComponent = () => {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
};
```

## Contributing

We welcome contributions! Check our issue tracker or suggest new features by opening an issue.

## License

MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenRouter API for Claude 3 Sonnet model interaction
- shadcn/ui library and Tailwind CSS for UI components
- React Syntax Highlighter for code formatting

For more details on features and future plans, see [ROADMAP.md](ROADMAP.md).
