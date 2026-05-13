import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';

function SalaryNegotiator() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem('gemini_api_key');
  const [role, setRole] = useState('');
  const [targetSalary, setTargetSalary] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleStart = async () => {
    if (!role.trim() || !targetSalary.trim()) {
      toast.error('Please enter the role and your target salary.');
      return;
    }
    if (!apiKey) {
      toast.error('API Key is missing in .env');
      return;
    }

    setHasStarted(true);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Act as an HR Manager for a tech company offering a job for the role of "${role}". The candidate's target salary is ${targetSalary}, but you have a strict budget that is 15-20% lower than their target. Start the conversation by offering them the job and giving your initial low-ball salary offer. Be professional but firm. Wait for their response.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      setMessages([{ role: 'model', content: response.text }]);
    } catch (error) {
      console.error(error);
      toast.error('Failed to start simulation: ' + error.message);
      setHasStarted(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey });
      
      const historyContents = messages.map(msg => `${msg.role === 'user' ? 'Candidate' : 'HR Manager'}: ${msg.content}`).join('\n');
      const prompt = `You are the HR Manager. Keep acting in your role. The candidate's target is ${targetSalary}, your initial budget was lower. You can slightly negotiate up if they make very strong arguments, but do not just give them what they want immediately. Here is the conversation history:\n${historyContents}\nCandidate: ${userMessage}\n\nRespond as the HR Manager. Keep your answer under 100 words.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      setMessages(prev => [...prev, { role: 'model', content: response.text }]);
    } catch (error) {
      console.error(error);
      toast.error('Failed to contact AI: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ padding: '3rem 5%', maxWidth: '900px', margin: '0 auto', minHeight: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column' }}
    >
      <motion.div 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        style={{ textAlign: 'center', marginBottom: '2rem' }}
      >
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>🤝 <span className="gradient-text">Salary Negotiator</span></h1>
        <p style={{ color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>Practice negotiating your job offer with a strict AI HR Manager.</p>
      </motion.div>

      <AnimatePresence mode="wait">
        {!hasStarted ? (
          <motion.div 
            key="setup-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-card" 
            style={{ padding: '3rem', maxWidth: '600px', margin: '0 auto', width: '100%' }}
          >
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>Job Role</label>
              <motion.input 
                whileFocus={{ scale: 1.01, borderColor: 'var(--color-primary)' }}
                type="text" 
                value={role}
                onChange={e => setRole(e.target.value)}
                placeholder="e.g. Senior Software Engineer" 
                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-card-border)', padding: '12px', borderRadius: '8px', color: 'white', outline: 'none' }} 
              />
            </div>
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>Your Desired Salary</label>
              <motion.input 
                whileFocus={{ scale: 1.01, borderColor: 'var(--color-primary)' }}
                type="text" 
                value={targetSalary}
                onChange={e => setTargetSalary(e.target.value)}
                placeholder="e.g. $120,000 / IDR 20,000,000" 
                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-card-border)', padding: '12px', borderRadius: '8px', color: 'white', outline: 'none' }} 
              />
            </div>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-gradient" 
              onClick={handleStart} 
              style={{ width: '100%', padding: '14px' }}
            >
              Start Negotiation Role-play
            </motion.button>
          </motion.div>
        ) : (
          <motion.div 
            key="chat-window"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card" 
            style={{ display: 'flex', flexDirection: 'column', height: '600px', overflow: 'hidden' }}
          >
            <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--color-card-border)', background: 'rgba(0,0,0,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '8px', height: '8px', background: '#10B981', borderRadius: '50%' }} />
                <strong>HR Manager (AI)</strong>
              </div>
              <motion.button 
                whileHover={{ scale: 1.05, color: 'var(--color-text-primary)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setHasStarted(false); setMessages([]); }} 
                style={{ background: 'transparent', border: '1px solid var(--color-card-border)', color: 'var(--color-text-secondary)', padding: '6px 14px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '600' }}
              >
                Restart
              </motion.button>
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
                      background: msg.role === 'user' ? 'var(--color-primary)' : 'var(--color-card-glass)',
                      color: 'white',
                      padding: '1rem 1.2rem',
                      borderRadius: '12px',
                      borderBottomRightRadius: msg.role === 'user' ? '0' : '12px',
                      borderBottomLeftRadius: msg.role === 'model' ? '0' : '12px',
                      maxWidth: '80%',
                      fontSize: '0.95rem',
                      lineHeight: '1.6'
                    }}>
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ alignSelf: 'flex-start', background: 'var(--color-card-glass)', padding: '1rem', borderRadius: '12px', borderBottomLeftRadius: '0' }}
                >
                  <motion.span 
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}
                  >
                    HR is evaluating...
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
                placeholder="Draft your counter-offer or response..."
                disabled={isLoading}
                style={{ flex: 1, marginRight: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-card-border)', padding: '12px 16px', borderRadius: '8px', color: 'white', outline: 'none' }}
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
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default SalaryNegotiator;
