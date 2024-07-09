# Sonnet Web UI

Sonnet Web UI is a React-based web application that provides an interface for interacting with the Claude 3 Sonnet AI model via the OpenRouter API. It features a split-screen layout with a chat interface on the left and a React component rendering area on the right.

## Features

- Chat interface for Claude 3 Sonnet AI
- Real-time React component rendering with automatic updates
- Dark mode toggle
- Syntax highlighting for code blocks in chat
- Responsive design using Tailwind CSS
- Enhanced error handling and user-friendly error messages
- Improved React code validation and error reporting

## Roadmap

For detailed information about our completed features, current work, and future plans, please see the [ROADMAP.md](ROADMAP.md) file.

## Contributing

We welcome contributions to the Sonnet Web UI project! If you're interested in helping, please check our issue tracker for open tasks or suggest new features by opening an issue.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- This project uses the OpenRouter API to interact with the Claude 3 Sonnet model.
- UI components are built using the shadcn/ui library and Tailwind CSS.
- We use React Syntax Highlighter for code block formatting in the chat interface.

## React Component Guidelines

When writing React components for the rendering area, please follow these guidelines:

1. Remove any import statements.
2. Define the component as an arrow function.
3. Use React.useState() directly instead of importing the useState hook.
4. Maintain the basic structure of a React component.
5. Double-check all brackets and semicolons to ensure there are no syntax errors.

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

These guidelines ensure that your component will work correctly in the rendering area.
