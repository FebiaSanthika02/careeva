import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';

function DailyHelper() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem('gemini_api_key');
  const [messages, setMessages] = useState([
    { role: 'model', content: 'Hello! I am your **Daily Helper**. I can help you plan your day, practice technical concepts, or prioritize tasks. What is on your agenda today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (!apiKey) {
      toast.error('API Key is missing in .env');
      return;
    }

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey });
      
      const promptContext = `You are a Productivity & Tech Career Assistant called "Daily Helper". 
      Keep your answers concise, practical, and highly organized (use bullet points or lists). 
      If the user gives you a list of tasks, categorize and prioritize them for a standard work day.
      User message: ${userMessage}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: promptContext,
      });

      setMessages(prev => [...prev, { role: 'model', content: response.text }]);
    } catch (error) {
      console.error(error);
      toast.error('Failed to contact AI: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const templates = [
    "Help me plan my day. My tasks: code review, standup, fix login bug, read docs.",
    "Give me 3 frontend interview questions to practice.",
    "How do I prioritize learning Node.js vs Python for backend?"
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ padding: '3rem 5%', maxWidth: '1000px', margin: '0 auto', minHeight: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column' }}
    >
      <motion.div 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        style={{ textAlign: 'center', marginBottom: '2rem' }}
      >
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>⚡ <span className="gradient-text">Daily Helper</span></h1>
        <p style={{ color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>Your personal AI companion for planning, productivity, and technical interview prep.</p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr) 3fr)', gap: '2rem', flex: 1, overflow: 'hidden' }}>
        
        {/* Sidebar Templates */}
        <motion.div 
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          <h3 style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>Quick Actions</h3>
          {templates.map((text, idx) => (
            <motion.button 
              key={idx}
              whileHover={{ scale: 1.02, x: 5, backgroundColor: 'rgba(74, 144, 226, 0.08)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setInput(text)}
              className="glass-card" 
              style={{ padding: '1rem', textAlign: 'left', fontSize: '0.9rem', color: 'var(--color-text-primary)', transition: 'background 0.2s', border: '1px solid var(--color-card-border)' }}
            >
              {text}
            </motion.button>
          ))}
        </motion.div>

        {/* Chat Area */}
        <motion.div 
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card" 
          style={{ display: 'flex', flexDirection: 'column', height: '600px', overflow: 'hidden' }}
        >
          <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <AnimatePresence initial={false}>
              {messages.map((msg, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  style={{ display: 'flex', gap: '1rem', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}
                >
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    style={{ width: '36px', height: '36px', borderRadius: '12px', background: msg.role === 'user' ? 'var(--color-primary)' : 'var(--color-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0, color: 'white', fontSize: '0.8rem' }}
                  >
                    {msg.role === 'user' ? 'ME' : 'AI'}
                  </motion.div>
                  <div style={{ 
                    background: msg.role === 'user' ? 'rgba(74, 144, 226, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                    padding: '1rem 1.5rem',
                    borderRadius: '12px',
                    borderTopRightRadius: msg.role === 'user' ? '0' : '12px',
                    borderTopLeftRadius: msg.role === 'model' ? '0' : '12px',
                    border: '1px solid var(--color-card-border)',
                    maxWidth: '85%',
                    lineHeight: '1.6'
                  }}>
                    {msg.role === 'model' ? (
                      <div className="markdown-body" style={{ fontSize: '0.95rem' }}>
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <div style={{ fontSize: '0.95rem' }}>{msg.content}</div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isLoading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: 'var(--color-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'white', fontSize: '0.8rem' }}>AI</div>
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1rem 1.5rem', borderRadius: '12px', borderTopLeftRadius: '0', border: '1px solid var(--color-card-border)' }}>
                  <motion.span 
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}
                  >
                    Thinking...
                  </motion.span>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} style={{ padding: '1rem', borderTop: '1px solid var(--color-card-border)', background: 'rgba(0,0,0,0.2)', display: 'flex', gap: '1rem' }}>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Daily Helper to plan your day or practice interview questions..."
              disabled={isLoading}
              style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-card-border)', padding: '12px 16px', borderRadius: '8px', color: 'white', outline: 'none' }}
            />
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit" 
              className="btn-gradient" 
              disabled={isLoading || !input.trim()} 
              style={{ borderRadius: '8px' }}
            >
              Send
            </motion.button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default DailyHelper;
