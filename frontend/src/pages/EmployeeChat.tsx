import {
  useState,
  useEffect,
  useRef,
  type FormEvent,
  type KeyboardEvent,
} from 'react';

import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import '../styles/EmployeeChat.css';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}

interface KnowledgeResponse {
  answer: string;
  source_code: string | null;
}

export default function EmployeeChat() {
  const { token } = useAuth();

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Automatically scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages, isLoading]);

  // Send message to the backend AI
  const handleSend = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const question = message.trim();

    if (!question || isLoading) return;

    if (!token) {
      setMessages((previous) => [
        ...previous,
        {
          id: Date.now(),
          text: 'Your session has expired. Please log in again.',
          sender: 'ai',
        },
      ]);
      return;
    }

    const userMessage: Message = {
      id: Date.now(),
      text: question,
      sender: 'user',
    };

    setMessages((previous) => [
      ...previous,
      userMessage,
    ]);

    setMessage('');
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/knowledge/ask`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            question: question,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.detail || 'Unable to get an AI response.'
        );
      }

      const data: KnowledgeResponse = result;

      const aiMessage: Message = {
        id: Date.now() + 1,
        text: data.answer,
        sender: 'ai',
      };

      setMessages((previous) => [
        ...previous,
        aiMessage,
      ]);

    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.';

      setMessages((previous) => [
        ...previous,
        {
          id: Date.now() + 1,
          text: `Error: ${errorMessage}`,
          sender: 'ai',
        },
      ]);

    } finally {
      setIsLoading(false);
    }
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

              {isLoading && (
                <div className="message-row ai">
                  <div className="message-avatar">
                    ✦
                  </div>

                  <div className="message-bubble">
                    Thinking...
                  </div>
                </div>
              )}

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
              disabled={isLoading}
            />

            <button
              type="submit"
              disabled={!message.trim() || isLoading}
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