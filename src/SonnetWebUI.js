import React, { useState, useEffect, useCallback } from 'react';
import { Sun, Moon, Send, Code } from 'lucide-react';
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Textarea } from "./components/ui/textarea"
import { Card, CardContent } from "./components/ui/card"
import { Switch } from "./components/ui/switch"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const SonnetWebUI = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [apiKey, setApiKey] = useState(process.env.REACT_APP_OPENROUTER_API_KEY || '');
  const [apiKeyModified, setApiKeyModified] = useState(false);
  const [reactCode, setReactCode] = useState('');
  const [iframeKey, setIframeKey] = useState(0);
  const [renderTrigger, setRenderTrigger] = useState(0);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const envApiKey = process.env.REACT_APP_OPENROUTER_API_KEY;
    const savedApiKey = localStorage.getItem('openRouterApiKey');
    if (envApiKey) {
      setApiKey(envApiKey);
    } else if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  const handleApiKeyChange = (e) => {
    const newValue = e.target.value;
    setApiKey(newValue);
    setApiKeyModified(true);
  };

  const saveApiKey = async () => {
    try {
      const response = await fetch('http://localhost:3001/update-env', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ REACT_APP_OPENROUTER_API_KEY: apiKey }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setApiKeyModified(false);
        console.log('API key saved successfully');
        setChat(prev => [...prev, { role: 'assistant', content: 'API key saved successfully.', isCode: false }]);
      } else {
        throw new Error('Failed to save API key');
      }
    } catch (error) {
      console.error('Error saving API key:', error);
      setChat(prev => [...prev, { role: 'assistant', content: `Error saving API key: ${error.message}`, isCode: false }]);
    }
  };




  const sendMessage = async () => {
    if (message.trim()) {
      const userMessage = { role: 'user', content: message };
      setChat(prev => [...prev, userMessage]);

      try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'HTTP-Referer': window.location.href,
            'X-Title': 'Claude 3.5 Sonnet Web UI',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'anthropic/claude-3-sonnet-20240320',
            messages: [
              ...chat,
              {
                role: 'user',
                content: [
                  {
                    type: 'text',
                    text: message
                  }
                ]
              }
            ]
          })
        });

        if (!response.ok) {
          const errorBody = await response.text();
          console.error('API Error Response:', response.status, errorBody);
          throw new Error(`API request failed with status ${response.status}. Details: ${errorBody}`);
        }

        const data = await response.json();
        console.log('API Response:', data);
        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
          console.error('Unexpected API response format:', data);
          throw new Error('Unexpected response format from API');
        }

        const content = data.choices[0].message.content;
        const isCode = typeof content === 'string' && content.trim().startsWith('```');
        const assistantMessage = { 
          role: 'assistant', 
          content: content, 
          isCode: isCode
        };
        setChat(prev => [...prev, assistantMessage]);

        console.log('Full content from AI:', content);
        if (isCode) {
          const codeMatch = content.match(/```(?:jsx?|react)?\s*([\s\S]*?)```/);
          if (codeMatch) {
            const extractedCode = codeMatch[1].trim();
            console.log('Extracted code:', extractedCode);
            setReactCode(extractedCode);
            console.log('React code state updated');
          } else {
            console.warn('Code block detected but no code extracted');
            console.log('Content that failed to match:', content);
          }
        } else {
          console.log('No code block detected in the response');
        }

        // Log the current state of reactCode after updating
        console.log('Current reactCode state:', reactCode);
      } catch (error) {
        console.error('Error calling OpenRouter API:', error);
        let errorMessage = error.message;
        if (error.message.includes('401')) {
          errorMessage = 'Authentication failed. Please check your API key and ensure it\'s correctly set in the environment variables or entered in the UI.';
        }
        setChat(prev => [...prev, { role: 'assistant', content: `Error: ${errorMessage}`, isCode: false }]);
      }

      setMessage('');
    }
  };

  const generateIframeSrc = useCallback(() => {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
          <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
          <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
          <style>
            .error { color: red; font-family: monospace; white-space: pre-wrap; }
            body { font-family: Arial, sans-serif; }
          </style>
        </head>
        <body>
          <div id="root"></div>
          <script type="text/babel">
            const ErrorBoundary = class extends React.Component {
              constructor(props) {
                super(props);
                this.state = { hasError: false, error: null };
              }
              static getDerivedStateFromError(error) {
                return { hasError: true, error };
              }
              render() {
                if (this.state.hasError) {
                  return <div className="error">
                    Error rendering component:<br />
                    {this.state.error.toString()}
                  </div>;
                }
                return this.props.children;
              }
            };
            
            const UserComponent = () => {
              ${reactCode ? reactCode : `
                return (
                  <div>
                    <h2>Welcome to the React Rendering Area</h2>
                    <p>AI-generated React components will appear here.</p>
                  </div>
                );
              `}
            };

            const App = () => (
              <ErrorBoundary>
                <UserComponent />
              </ErrorBoundary>
            );

            ReactDOM.render(<App />, document.getElementById('root'));
          </script>
        </body>
      </html>
    `;
    return `data:text/html;charset=utf-8,${encodeURIComponent(htmlContent)}`;
  }, [reactCode]);

  const validateReactCode = useCallback((code) => {
    if (!code.trim()) {
      return { isValid: true, error: null };
    }

    try {
      if (code.includes('import ')) {
        throw new Error('Import statements are not allowed in this context. Please define your component without using imports.');
      }
      
      // eslint-disable-next-line no-new-func
      new Function(code);
      
      if (!code.includes('return')) {
        throw new Error('The code does not appear to be a valid React component. Make sure it includes a return statement with JSX.');
      }
      
      if (!code.includes('React.useState') && !code.includes('useState')) {
        console.warn('The component does not use state. Consider adding state for more interactive components.');
      }
      
      if (!code.match(/React\.useEffect|useEffect/)) {
        console.warn('The component does not use effects. Consider adding effects for side effects or data fetching.');
      }
      
      return { isValid: true, error: null };
    } catch (error) {
      console.error('Invalid React code:', error);
      let errorMessage = error.message;
      
      if (error instanceof SyntaxError) {
        if (error.message.includes('Unexpected token')) {
          errorMessage = `Syntax Error: Unexpected token found. This often means you have a typo or misplaced character in your code. Check for missing semicolons, parentheses, or brackets.`;
        } else if (error.message.includes('Unexpected identifier')) {
          errorMessage = `Syntax Error: Unexpected identifier found. This could mean you're using a variable or function name in an unexpected place, or you might be missing an operator or keyword.`;
        }
      }
      
      return { isValid: false, error: errorMessage };
    }
  }, []);

  // Remove the unused renderReactCode function

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    console.log('reactCode changed:', reactCode);
    if (reactCode.trim()) {
      console.log('reactCode is not empty, validating...');
      const { isValid, error } = validateReactCode(reactCode);
      console.log('Validation result:', isValid ? 'Valid' : 'Invalid', error);
      if (isValid) {
        console.log('React code is valid, updating iframe key');
        setIframeKey(prevKey => prevKey + 1);
      } else {
        console.error('React code validation failed:', error);
        setChat(prev => [...prev, { 
          role: 'assistant', 
          content: `⚠️ React Code Error ⚠️\n\n${error}\n\nPlease review your code and fix the issue. Remember:\n- Don't use import statements\n- Ensure you have a valid React component structure\n- Make sure your component returns JSX or null\n- Check for syntax errors like missing brackets or semicolons`, 
          isCode: false 
        }]);
      }
    }
  }, [reactCode, renderTrigger, validateReactCode, setChat]);

  return (
    <div className={`flex h-screen ${darkMode ? 'dark' : ''} bg-background-light dark:bg-background-dark`}>
      {/* Left side - Chat interface */}
      <div className="w-1/2 p-6 flex flex-col border-r border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-primary dark:text-primary-dark">Chat with Claude 3.5 Sonnet</h2>
          <div className="flex items-center">
            <Sun className="mr-2 text-yellow-500" />
            <Switch checked={darkMode} onCheckedChange={toggleDarkMode} className="bg-gray-300 dark:bg-gray-600" />
            <Moon className="ml-2 text-blue-500" />
          </div>
        </div>

        <div className="flex mb-2">
          <Input
            type="password"
            value={apiKey}
            onChange={handleApiKeyChange}
            placeholder="Enter your OpenRouter API key"
            className="flex-grow mr-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded-lg shadow-sm"
          />
          <Button
            onClick={saveApiKey}
            disabled={!apiKeyModified}
            className="bg-primary hover:bg-primary-dark text-white dark:bg-button-dark dark:hover:bg-button-dark-hover dark:text-button-dark-text disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Key
          </Button>
        </div>

        {/* Chat messages */}
        <div className="flex-grow overflow-y-auto mb-6 custom-scrollbar">
          {chat.map((msg, index) => (
            <div key={index} className={`mb-4 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block p-3 rounded-lg shadow-custom ${
                msg.role === 'user' 
                  ? 'bg-primary text-white' 
                  : 'bg-white dark:bg-gray-800 text-text-light dark:text-text-dark'
              }`}>
                {msg.role === 'assistant' ? (
                  msg.content.split('```').map((part, index) => 
                    index % 2 === 0 ? (
                      <span key={index}>{part}</span>
                    ) : (
                      <SyntaxHighlighter
                        key={index}
                        language="javascript"
                        style={vscDarkPlus}
                        customStyle={{
                          padding: '1em',
                          borderRadius: '0.5em',
                          fontSize: '0.9em',
                          marginTop: '0.5em',
                          marginBottom: '0.5em',
                        }}
                      >
                        {part}
                      </SyntaxHighlighter>
                    )
                  )
                ) : (
                  <span>{msg.content}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Message input */}
        <div className="flex flex-col">
          <div className="flex mb-2">
            <Input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow mr-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded-lg shadow-sm"
            />
            <Button 
              onClick={sendMessage} 
              className="bg-primary hover:bg-primary-dark text-white dark:bg-button-dark dark:hover:bg-button-dark-hover dark:text-button-dark-text mr-2"
            >
              <Send className="mr-2" />
              Send
            </Button>
            <Button 
              onClick={() => {
                console.log('Render Code button clicked. Current reactCode:', reactCode);
                setRenderTrigger(prev => prev + 1);
              }} 
              className="bg-primary hover:bg-primary-dark text-white dark:bg-button-dark dark:hover:bg-button-dark-hover dark:text-button-dark-text"
            >
              <Code className="mr-2" />
              Render Code
            </Button>
          </div>
        </div>
      </div>

      {/* Right side - React rendering area */}
      <div className="w-1/2 p-6">
        <h2 className="text-3xl font-bold mb-6 text-primary dark:text-primary-dark">React Rendering Area</h2>
        <Textarea
          value={reactCode}
          readOnly
          placeholder="React component code will appear here automatically..."
          className="mb-4 h-1/3 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded-lg shadow-sm"
        />
        <div className="mb-6 text-sm text-gray-500 dark:text-gray-400">
          The React component will automatically render and update when new code is received from the AI.
        </div>
        <Card className="bg-white dark:bg-gray-800 shadow-custom">
          <CardContent>
            <iframe
              key={iframeKey}
              src={generateIframeSrc()}
              title="React Component Preview"
              className="w-full h-64 border-0"
              sandbox="allow-scripts allow-modals"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SonnetWebUI;
