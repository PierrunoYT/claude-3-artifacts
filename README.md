# PierrunoYT/claude-3-artifacts

## ⚠️ Project Archived

This project has been archived and is no longer actively maintained. Please note that no further updates or support will be provided.

### Completing the Archive Process on GitHub

To complete the archiving process on GitHub, please follow these steps:

1. Go to the GitHub repository page for this project.
2. Click on the "Settings" tab near the top of the page.
3. Scroll down to the "Danger Zone" section.
4. Click on the "Archive this repository" button.
5. Read the warning message and confirm by typing the repository name.
6. Click "I understand the consequences, archive this repository" to finalize the process.

Once archived, the repository will become read-only, and no new issues, pull requests, or comments can be added.

---

## Important Update
**New Version Available**: A new version of this project is now available at [https://github.com/PierrunoYT/claude-3-artifacts-2](https://github.com/PierrunoYT/claude-3-artifacts-2). Please note that the new version is currently under development and is not yet functional. We recommend continuing to use this version until further notice.

## Introduction
**PierrunoYT/claude-3-artifacts** is an advanced React-based project that provides an interactive user interface for communicating with the Claude 3.5 Sonnet AI model. This application showcases modern web development practices, offering a seamless chat experience and real-time React code rendering capabilities.

## Key Features
- **AI-Powered Chat Interface**: Engage in dynamic conversations with the Claude 3.5 Sonnet AI model.
- **Real-Time React Code Rendering**: Instantly visualize and interact with AI-generated React components.
- **Dark Mode Support**: Toggle between light and dark themes for optimal viewing comfort.
- **Secure API Key Management**: Safely store and manage your OpenRouter API key.
- **Robust Error Handling**: Comprehensive error management for API requests and React code validation.
- **Responsive Design**: Fully responsive interface using Tailwind CSS for a polished look across devices.

## Technical Requirements
- **Node.js**: Version 14.x or later
- **npm**: Version 6.x or later
- **React**: Version 18.2.0
- **Express.js**: Version 4.17.1
- **OpenRouter API Key**: Required for AI model access

## Getting Started

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/PierrunoYT/claude-3-artifacts.git
   cd claude-3-artifacts
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy the `.env.template` file to create a new `.env` file in the project root:
     ```bash
     cp .env.template .env
     ```
   - Open the `.env` file and replace `your_openrouter_api_key_here` with your actual OpenRouter API key:
     ```
     REACT_APP_OPENROUTER_API_KEY=your_actual_api_key_here
     ```

### Running the Application
Launch the application with:
```bash
npm run dev
```
This command starts both the React frontend and Express backend servers. Access the application at `http://localhost:3000`.

## Usage Guide

### Chat Interface
- Type your message in the input field at the bottom of the chat area.
- Click the "Send" button or press Enter to send your message to the AI.
- View AI responses in the chat window, including any code snippets.

### React Code Rendering
- AI-generated React code will automatically appear in the code textarea.
- The code will be rendered in real-time in the preview area below the textarea.
- Any errors in the React code will be displayed in the chat interface.

### API Key Management
- Enter your OpenRouter API key in the designated input field.
- Click "Save Key" to securely store the key for future sessions.

### Dark Mode
- Use the sun/moon toggle switch in the top-right corner to switch between light and dark themes.

## Contributing
We welcome contributions to improve PierrunoYT/claude-3-artifacts! Here's how you can contribute:

1. Fork the repository on GitHub.
2. Create a new branch for your feature or bug fix.
3. Commit your changes with clear, descriptive messages.
4. Push your branch and submit a pull request with a detailed description of your changes.

Please ensure your code adheres to the existing style and passes all tests.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Support
If you encounter any issues or have questions, please file an issue on the GitHub repository.

---

Thank you for using PierrunoYT/claude-3-artifacts! We hope this tool enhances your AI interaction and React development experience.
