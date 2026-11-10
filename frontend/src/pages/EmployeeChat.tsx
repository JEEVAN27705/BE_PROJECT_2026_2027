import {
  useState,
  useEffect,
  useRef,
  type FormEvent,
  type KeyboardEvent,
} from 'react';

import Sidebar from '../components/Sidebar';
import '../styles/EmployeeChat.css';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}

export default function EmployeeChat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Automatically scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages]);

  const handleSend = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: message.trim(),
      sender: 'user',
    };

    setMessages((previous) => [
      ...previous,
      userMessage,
    ]);

    setMessage('');

    // Temporary AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: Date.now() + 1,
        text: 'I am your AI Knowledge Assistant. I will help you find information about your organization.',
        sender: 'ai',
      };

      setMessages((previous) => [
        ...previous,
        aiMessage,
      ]);
    }, 500);
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  };

  return (
    <div className="chat-page">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Chat Area */}
      <section className="chat-main">

        {/* Chat Content */}
        <main className="chat-content">

          {messages.length === 0 ? (

            <div className="chat-welcome">

              <div className="welcome-icon">
                ✦
              </div>

              <h1>How can I help you?</h1>

              <p>
                Ask me about projects, tasks, bugs, documents,
                or organizational knowledge.
              </p>

              <div className="suggestion-list">

                <div className="suggestion-item">
                  <span>📁</span>
                  Ask about project details
                </div>

                <div className="suggestion-item">
                  <span>📋</span>
                  Check pending tasks
                </div>

                <div className="suggestion-item">
                  <span>📄</span>
                  Search related to organizational documents
                </div>

              </div>

            </div>

          ) : (

            <div className="messages-container">

              {messages.map((msg) => (

                <div
                  key={msg.id}
                  className={`message-row ${msg.sender}`}
                >

                  {msg.sender === 'ai' && (
                    <div className="message-avatar">
                      ✦
                    </div>
                  )}

                  <div className="message-bubble">
                    {msg.text}
                  </div>

                  {msg.sender === 'user' && (
                    <div className="user-avatar">
                      E
                    </div>
                  )}

                </div>

              ))}

              <div ref={messagesEndRef} />

            </div>

          )}

        </main>

        {/* Message Input */}
        <div className="chat-input-container">

          <form
            className="chat-input-form"
            onSubmit={handleSend}
          >

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about your organization..."
              rows={1}
            />

            <button
              type="submit"
              disabled={!message.trim()}
              aria-label="Send message"
            >
              ↑
            </button>

          </form>

          <p className="chat-disclaimer">
            AI can make mistakes. Verify important information.
          </p>

        </div>

      </section>

    </div>
  );
}