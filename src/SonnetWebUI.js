import React, { useState, useEffect, useCallback } from 'react';
import { Sun, Moon, Send, Play, RefreshCw, Code } from 'lucide-react';
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
  const [apiKey, setApiKey] = useState('');
  const [reactCode, setReactCode] = useState('');
  const [iframeKey, setIframeKey] = useState(0);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const saveToLocalStorage = useCallback((key, value) => {
    localStorage.setItem(key, value);
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
        </head>
        <body>
          <div id="root"></div>
          <script type="text/babel">
            ${reactCode}
            const App = () => {
              try {
                const Component = eval(${JSON.stringify(reactCode)});
                return React.createElement(Component);
              } catch (error) {
                return React.createElement('div', null, 'Error: ' + error.message);
              }
            };
            ReactDOM.render(React.createElement(App), document.getElementById('root'));
          </script>
        </body>
      </html>
    `;
    return `data:text/html;charset=utf-8,${encodeURIComponent(htmlContent)}`;
  }, [reactCode]);

  const validateReactCode = (code) => {
    try {
      // Basic syntax check
      new Function(code);
      return true;
    } catch (error) {
      console.error('Invalid React code:', error);
      return false;
    }
  };

  const renderReactCode = () => {
    if (validateReactCode(reactCode)) {
      setIframeKey(prevKey => prevKey + 1);
    } else {
      // Display an error message to the user
      setChat(prev => [...prev, { role: 'assistant', content: 'Error: Invalid React code. Please check your syntax.', isCode: false }]);
    }
  };

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
          onChange={(e) => setReactCode(e.target.value)}
          placeholder="Paste your React component code here..."
          className="mb-4 h-1/3 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded-lg shadow-sm"
        />
        <div className="mb-6 text-sm text-gray-500 dark:text-gray-400">
          The React component will automatically render and update as you type.
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
