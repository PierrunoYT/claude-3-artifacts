import React, { useState, useEffect } from 'react';
import { Sun, Moon, Send, Play } from 'lucide-react';
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Textarea } from "./components/ui/textarea"
import { Card, CardContent } from "./components/ui/card"
import { Switch } from "./components/ui/switch"

const SonnetWebUI = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [apiKey, setApiKey] = useState('');
  const [siteUrl, setSiteUrl] = useState('');
  const [appName, setAppName] = useState('');
  const [reactCode, setReactCode] = useState('');
  const [renderedComponent, setRenderedComponent] = useState(null);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

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
            'HTTP-Referer': siteUrl,
            'X-Title': appName,
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
        const assistantMessage = { role: 'assistant', content: data.choices[0].message.content };
        setChat(prev => [...prev, assistantMessage]);
      } catch (error) {
        console.error('Error calling OpenRouter API:', error);
        setChat(prev => [...prev, { role: 'assistant', content: 'Sorry, there was an error processing your request.' }]);
      }

      setMessage('');
    }
  };

  const renderReactCode = () => {
    try {
      // eslint-disable-next-line no-new-func
      const ComponentFunction = new Function('React', `return ${reactCode}`)
      const Component = ComponentFunction(React);
      setRenderedComponent(<Component />);
    } catch (error) {
      console.error('Error rendering React component:', error);
      setRenderedComponent(<div>Error rendering component: {error.message}</div>);
    }
  };

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className={`flex h-screen ${darkMode ? 'dark' : ''}`}>
      {/* Left side - React rendering area */}
      <div className="w-1/2 p-4 border-r bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <h2 className="text-2xl font-bold mb-4">React Rendering Area</h2>
        <Textarea
          value={reactCode}
          onChange={(e) => setReactCode(e.target.value)}
          placeholder="Paste your React component code here..."
          className="mb-4 h-1/3"
        />
        <Button onClick={renderReactCode} className="mb-4">
          <Play className="mr-2" />
          Render Component
        </Button>
        <Card className="bg-gray-100 dark:bg-gray-800 p-4">
          <CardContent>
            {renderedComponent}
          </CardContent>
        </Card>
      </div>

      {/* Right side - Chat interface */}
      <div className="w-1/2 p-4 flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Chat with Claude 3.5 Sonnet</h2>
          <div className="flex items-center">
            <Sun className="mr-2" />
            <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
            <Moon className="ml-2" />
          </div>
        </div>

        <Input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your OpenRouter API key"
          className="mb-2"
        />
        <Input
          type="text"
          value={siteUrl}
          onChange={(e) => setSiteUrl(e.target.value)}
          placeholder="Enter your site URL"
          className="mb-2"
        />
        <Input
          type="text"
          value={appName}
          onChange={(e) => setAppName(e.target.value)}
          placeholder="Enter your app name"
          className="mb-4"
        />

        {/* Chat messages */}
        <div className="flex-grow overflow-y-auto mb-4">
          {chat.map((msg, index) => (
            <div key={index} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
              <span className={`inline-block p-2 rounded-lg ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                {msg.content}
              </span>
            </div>
          ))}
        </div>

        {/* Message input */}
        <div className="flex">
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow mr-2"
          />
          <Button onClick={sendMessage}>
            <Send className="mr-2" />
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SonnetWebUI;