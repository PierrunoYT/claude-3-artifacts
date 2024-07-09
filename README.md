# Sonnet Web UI

Sonnet Web UI is a React-based web application that provides an interface for interacting with the Claude 3 Sonnet AI model via the OpenRouter API. It features a split-screen layout with a chat interface on the left and a React component rendering area on the right.

## Features

- Chat interface for Claude 3 Sonnet AI
- Real-time React component rendering
- Dark mode toggle
- Persistent storage for site URL and app name
- Code block formatting in chat
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

## Usage

To start the development server:

1. Run the following command:
   ```
   npm start
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

3. Enter your OpenRouter API key, site URL, and app name in the input fields at the top of the chat interface.

4. Start chatting with the AI or use the React rendering area to test React components.

## Project Structure

- `src/components/ui/`: Contains reusable UI components
- `src/lib/utils.js`: Utility functions
- `src/SonnetWebUI.js`: Main component for the Sonnet Web UI
- `src/App.js`: Root component
- `src/index.js`: Entry point of the application

## Features in Detail

### Chat Interface
- Send messages to Claude 3 Sonnet AI
- Toggle between regular text and code block formatting
- View chat history with user and AI messages

### React Rendering Area
- Input area for React component code
- Real-time rendering of React components
- Refresh button to update the rendered component

### Dark Mode
- Toggle between light and dark themes

### Persistent Storage
- Site URL and app name are saved in localStorage
- API key is stored only for the current session

## Customization

You can customize the appearance of the UI by modifying the Tailwind CSS classes in the component files. The `tailwind.config.js` file can be used to extend or override the default Tailwind configuration.

## Contributing

Contributions to the Sonnet Web UI project are welcome. Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- This project uses the OpenRouter API to interact with the Claude 3 Sonnet model.
- UI components are built using the shadcn/ui library and Tailwind CSS.
