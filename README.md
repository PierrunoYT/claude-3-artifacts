# Sonnet Web UI

Sonnet Web UI is a React-based web application that provides an interface for interacting with the Claude 3.5 Sonnet AI model via the OpenRouter API. It features a split-screen layout with a React component rendering area on the left and a chat interface on the right.

## Features

- Chat interface for Claude 3.5 Sonnet AI
- Real-time React component rendering
- Dark mode toggle
- Responsive design using Tailwind CSS

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- An OpenRouter API key

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/sonnet-web-ui.git
   cd sonnet-web-ui
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your OpenRouter API key:
   ```
   REACT_APP_OPENROUTER_API_KEY=your_api_key_here
   ```

## Usage

To start the development server:

```
npm start
```

This will run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Project Structure

- `src/components/ui/`: Contains reusable UI components
- `src/lib/utils.js`: Utility functions
- `src/SonnetWebUI.js`: Main component for the Sonnet Web UI
- `src/App.js`: Root component
- `src/index.js`: Entry point of the application

## Customization

You can customize the appearance of the UI by modifying the Tailwind CSS classes in the component files. The `tailwind.config.js` file can be used to extend or override the default Tailwind configuration.

## Contributing

Contributions to the Sonnet Web UI project are welcome. Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- This project uses the OpenRouter API to interact with the Claude 3.5 Sonnet model.
- UI components are built using the shadcn/ui library.