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
  const [isCode, setIsCode] = useState(false);
  const [apiKey, setApiKey] = useState(process.env.REACT_APP_OPENROUTER_API_KEY || '');
  const [reactCode, setReactCode] = useState('');
  const [iframeKey, setIframeKey] = useState(0);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (apiKey) {
      localStorage.setItem('openRouterApiKey', apiKey);
    }
  }, [apiKey]);

  useEffect(() => {
    const savedApiKey = localStorage.getItem('openRouterApiKey');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);




  const sendMessage = async () => {
    if (message.trim()) {
      const userMessage = { role: 'user', content: message };
      setChat(prev => [...prev, userMessage]);

      try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: 'anthropic/claude-3-sonnet-20240320',
            messages: [...chat, userMessage],
          }),
        });

        if (!response.ok) {
          throw new Error('API request failed');
        }

        const data = await response.json();
        const content = data.choices[0].message.content;
        const assistantMessage = { 
          role: 'assistant', 
          content: content, 
          isCode: isCode || content.trim().startsWith('```')
        };
        setChat(prev => [...prev, assistantMessage]);

        // Extract React code from the response if it's a code block
        if (assistantMessage.isCode) {
          const codeMatch = content.match(/```(?:jsx?|react)?\s*([\s\S]*?)```/);
          if (codeMatch) {
            setReactCode(codeMatch[1].trim());
          }
        }
      } catch (error) {
        console.error('Error calling OpenRouter API:', error);
        setChat(prev => [...prev, { role: 'assistant', content: 'Sorry, there was an error processing your request.', isCode: false }]);
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
              ${reactCode}
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

  const validateReactCode = (code) => {
    try {
      // Check for import statements
      if (code.includes('import ')) {
        throw new Error('Import statements are not allowed in this context. Please define your component without using imports.');
      }
        
      // Basic syntax check
      // eslint-disable-next-line no-new-func
      new Function(code);
        
      // Check for React component structure
      if (!code.includes('return')) {
        throw new Error('The code does not appear to be a valid React component. Make sure it includes a return statement with JSX.');
      }
        
      return { isValid: true, error: null };
    } catch (error) {
      console.error('Invalid React code:', error);
      let errorMessage = error.message;
      
      // Provide more user-friendly error messages for common syntax errors
      if (error instanceof SyntaxError) {
        if (error.message.includes('Unexpected token')) {
          errorMessage = `Syntax Error: Unexpected token found. This often means you have a typo or misplaced character in your code. Check for missing semicolons, parentheses, or brackets.`;
        } else if (error.message.includes('Unexpected identifier')) {
          errorMessage = `Syntax Error: Unexpected identifier found. This could mean you're using a variable or function name in an unexpected place, or you might be missing an operator or keyword.`;
        }
      }
      
      return { isValid: false, error: errorMessage };
    }
  };

  const renderReactCode = useCallback(() => {
    const { isValid, error } = validateReactCode(reactCode);
    if (isValid) {
      setIframeKey(prevKey => prevKey + 1);
    } else {
      // Display a detailed error message to the user
      setChat(prev => [...prev, { 
        role: 'assistant', 
        content: `⚠️ React Code Error ⚠️\n\n${error}\n\nPlease review your code and fix the issue. Remember:\n- Don't use import statements\n- Ensure you have a valid React component structure\n- Check for syntax errors like missing brackets or semicolons`, 
        isCode: false 
      }]);
    }
  }, [reactCode, validateReactCode, setChat, setIframeKey]);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    if (reactCode.trim()) {
      renderReactCode();
    }
  }, [reactCode]);

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

        <Input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your OpenRouter API key"
          className="mb-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded-lg shadow-sm"
        />

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
            <Button onClick={() => setIsCode(!isCode)} className={`mr-2 ${isCode ? 'bg-secondary' : 'bg-gray-300'} hover:bg-secondary-dark text-white`}>
              <Code className="mr-2" />
              Code
            </Button>
            <Button onClick={sendMessage} className="bg-primary hover:bg-primary-dark text-white">
              <Send className="mr-2" />
              Send
            </Button>
          </div>
          {isCode && (
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Code mode is active. The AI's response will be formatted as a code block.
            </div>
          )}
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
              sandbox="allow-scripts"
              onLoad={(e) => {
                e.target.contentWindow.postMessage(reactCode, '*');
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SonnetWebUI;
