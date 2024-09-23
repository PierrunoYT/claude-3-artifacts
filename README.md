# PierrunoYT/claude-3-artifacts

## Introduction
**PierrunoYT/claude-3-artifacts** is a React-based project designed to provide a user interface for interacting with the Claude 3.5 Sonnet AI model. This project leverages modern web technologies to offer a chat interface and a React code rendering area, enhancing user interaction with AI-generated content. The project integrates various UI components and employs a server-side Express.js setup for API key management and other backend functionalities.

## Features
- **Chat Interface**: Communicate with the Claude 3.5 Sonnet AI model via a user-friendly chat interface.
- **React Code Rendering**: Automatically render React components received from AI in a dedicated area.
- **Dark Mode Toggle**: Switch between light and dark themes for better user experience.
- **API Key Management**: Securely store and manage API keys for accessing the AI service.
- **Error Handling**: Comprehensive error handling for API requests and React code validation.
- **Responsive Design**: Utilizes Tailwind CSS for a responsive and visually appealing design.

## Requirements
To run this project, ensure you have the following:
- **Node.js**: Version 14.x or later
- **npm**: Version 6.x or later
- **React**: Version 18.2.0
- **Express.js**: Version 4.17.1
- **Environment**: `.env` file with `REACT_APP_OPENROUTER_API_KEY` set

## Installation
Follow these steps to set up the project:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/PierrunoYT/claude-3-artifacts.git
   cd claude-3-artifacts
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Create a `.env` File**:
   Add your OpenRouter API key in the `.env` file:
   ```plaintext
   REACT_APP_OPENROUTER_API_KEY=your_api_key_here
   ```

## Usage
To run the project locally, execute the following command:
```bash
npm run dev
```
This will start both the React development server and the Express server. Navigate to `http://localhost:3000` in your browser to access the application.

## Configuration
### API Key Management
- Enter your OpenRouter API key in the designated input field within the chat interface.
- Click the "Save Key" button to store the key securely.

### Dark Mode
- Toggle the dark mode switch to change the theme between light and dark.

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with a detailed description of your changes.

## License
This project is licensed under the MIT License. You are free to use, modify, and distribute this software in accordance with the license terms.

---

By following this README, you should be able to set up and run the **PierrunoYT/claude-3-artifacts** project successfully, engage with its features, and contribute to its development.