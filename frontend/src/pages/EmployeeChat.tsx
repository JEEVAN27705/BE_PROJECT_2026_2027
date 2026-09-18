import {
  useState,
  type FormEvent,
  type KeyboardEvent,
} from 'react';

import '../styles/EmployeeChat.css';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}

export default function EmployeeChat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSend = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!message.trim()) {
      return;
    }

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

      if (message.trim()) {
        e.currentTarget.form?.requestSubmit();
      }
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setMessage('');
  };

  return (
    <div className="chat-page">

      {/* Sidebar */}
      <aside className="chat-sidebar">

        {/* Logo / Brand */}
        <div className="sidebar-brand">
          <div className="brand-icon">
            ✦
          </div>

          <div>
            <h2>AI Knowledge</h2>
            <span>Assistant</span>
          </div>
        </div>

        {/* New Chat */}
        <button
          className="new-chat-button"
          onClick={handleNewChat}
        >
          <span className="new-chat-icon">+</span>
          <span>New chat</span>
        </button>

        {/* Chat History */}
        <div className="sidebar-section">

          <p className="sidebar-heading">
            Chats
          </p>

          {messages.length > 0 ? (
            <button className="chat-history-item">
              <span className="history-icon">◌</span>
              <span>Current conversation</span>
            </button>
          ) : (
            <p className="no-chats">
              No previous chats
            </p>
          )}

        </div>

        {/* Bottom User Area */}
        <div className="sidebar-bottom">

          <div className="employee-profile">

            <div className="profile-avatar">
              E
            </div>

            <div className="profile-info">
              <span className="profile-name">
                Employee
              </span>

              <span className="profile-role">
                Employee
              </span>
            </div>

          </div>

          <button className="logout-button">
            <span>↪</span>
            Logout
          </button>

        </div>

      </aside>

      {/* Main Chat */}
      <section className="chat-main">

        {/* Header */}
        <header className="chat-header">

          <div className="mobile-brand">
            <div className="brand-icon">
              ✦
            </div>

            <span>
              AI Knowledge Assistant
            </span>
          </div>

          <div className="header-role">
            Employee
          </div>

        </header>

        {/* Messages */}
        <main className="chat-content">

          {messages.length === 0 ? (

            <div className="chat-welcome">

              <div className="welcome-icon">
                ✦
              </div>

              <h1>
                How can I help you?
              </h1>

              <p>
                Ask me about projects, tasks, bugs,
                documents, or organizational knowledge.
              </p>

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

            </div>

          )}

        </main>

        {/* Input */}
        <div className="chat-input-container">

          <form
            className="chat-input-form"
            onSubmit={handleSend}
          >

            <textarea
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              onKeyDown={handleKeyDown}
              placeholder="Message AI Knowledge Assistant..."
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
            AI can make mistakes. Check important information.
          </p>

        </div>

      </section>

    </div>
  );
}