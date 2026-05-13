import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import ReactMarkdown from 'react-markdown';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

function AiAssistant() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem('gemini_api_key');
  const [messages, setMessages] = useState([
    { role: 'model', content: 'Hello! I am Careeva. How can I assist you with your career or general questions today?' }
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
      toast.error('API Key is missing. Please add it to your .env file.');
      return;
    }

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userMessage,
      });

      setMessages(prev => [...prev, { role: 'model', content: response.text }]);
    } catch (error) {
      console.error(error);
      toast.error('Gagal menghubungi AI: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ padding: '2rem 5%', maxWidth: '900px', margin: '0 auto', minHeight: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column' }}
    >
      <motion.div 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        style={{ marginBottom: '2rem', textAlign: 'center' }}
      >
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>✨ <span className="gradient-text">AI Asisten</span></h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>Tanya apa saja seputar Careeva menggunakan model AI Generatif.</p>
      </motion.div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="glass-card" 
        style={{ display: 'flex', flexDirection: 'column', height: '600px', overflow: 'hidden' }}
      >
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--color-card-border)', background: 'rgba(0,0,0,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '8px', height: '8px', background: '#10B981', borderRadius: '50%' }} />
            <strong style={{ fontSize: '0.9rem' }}>Careeva Chat</strong>
          </div>
        </div>
        
        <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <AnimatePresence initial={false}>
            {messages.map((msg, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                style={{ 
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  background: msg.role === 'user' ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.05)',
                  color: 'white',
                  padding: '1rem 1.2rem',
                  borderRadius: '12px',
                  borderBottomRightRadius: msg.role === 'user' ? '0' : '12px',
                  borderBottomLeftRadius: msg.role === 'model' ? '0' : '12px',
                  border: '1px solid var(--color-card-border)',
                  maxWidth: '80%',
                  fontSize: '0.95rem'
                }}>
                {msg.role === 'model' ? (
                  <div style={{ lineHeight: '1.6' }} className="markdown-body">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                ) : (
                  msg.content
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ alignSelf: 'flex-start', background: 'rgba(255, 255, 255, 0.05)', padding: '1rem', borderRadius: '12px', borderBottomLeftRadius: '0', border: '1px solid var(--color-card-border)' }}
            >
              <motion.span 
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}
              >
                AI sedang mengetik...
              </motion.span>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} style={{ display: 'flex', padding: '1rem', borderTop: '1px solid var(--color-card-border)', background: 'rgba(0,0,0,0.1)' }}>
          <motion.input
            whileFocus={{ scale: 1.01 }}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ketik pesan Anda di sini..."
            disabled={isLoading}
            style={{ flex: 1, marginRight: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-card-border)', padding: '12px 16px', borderRadius: '10px', color: 'white', outline: 'none' }}
          />
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit" 
            className="btn-gradient" 
            disabled={isLoading || !input.trim()} 
            style={{ borderRadius: '10px', padding: '0 24px' }}
          >
            Kirim
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default AiAssistant;
