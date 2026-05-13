import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';

function CareerPath() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem('gemini_api_key');
  const [currentRole, setCurrentRole] = useState('');
  const [dreamRole, setDreamRole] = useState('');
  const [status, setStatus] = useState('idle'); // idle, generating, result
  const [roadmap, setRoadmap] = useState('');

  const handleGenerate = async () => {
    if (!currentRole.trim() || !dreamRole.trim()) {
      toast.error('Please fill in both roles.');
      return;
    }
    if (!apiKey) {
      toast.error('API Key is missing in .env');
      return;
    }

    setStatus('generating');
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are an expert Career Coach. Create a detailed, step-by-step career roadmap for someone transitioning from "${currentRole}" to their dream role: "${dreamRole}".
      Format the response beautifully in Markdown. Include:
      - Estimated timeline
      - Phase 1: Core Skills to Learn
      - Phase 2: Portfolio/Projects to Build
      - Phase 3: Networking & Job Hunting
      Keep the tone encouraging, realistic, and highly actionable.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      setRoadmap(response.text);
      setStatus('result');
      toast.success('Roadmap generated successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to generate roadmap: ' + error.message);
      setStatus('idle');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ padding: '3rem 5%', maxWidth: '1000px', margin: '0 auto', minHeight: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column' }}
    >
      <motion.div 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        style={{ textAlign: 'center', marginBottom: '3rem' }}
      >
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>🧭 <span className="gradient-text">Career Path Explorer</span></h1>
        <p style={{ color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>Map out your journey from where you are today, to where you want to be tomorrow.</p>
      </motion.div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card" 
        style={{ padding: '2rem', marginBottom: '3rem', display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}
      >
        <div style={{ flex: 1, minWidth: '250px' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>Current Role</label>
          <motion.input 
            whileFocus={{ scale: 1.01, borderColor: 'var(--color-primary)' }}
            type="text" 
            value={currentRole}
            onChange={e => setCurrentRole(e.target.value)}
            placeholder="e.g. Customer Service" 
            style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-card-border)', padding: '12px', borderRadius: '8px', color: 'white', fontSize: '1rem', outline: 'none' }} 
          />
        </div>
        <motion.div 
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ display: 'flex', alignItems: 'center', paddingTop: '1.5rem', color: 'var(--color-primary)', fontSize: '1.5rem' }}
        >
          ➔
        </motion.div>
        <div style={{ flex: 1, minWidth: '250px' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>Dream Role</label>
          <motion.input 
            whileFocus={{ scale: 1.01, borderColor: 'var(--color-primary)' }}
            type="text" 
            value={dreamRole}
            onChange={e => setDreamRole(e.target.value)}
            placeholder="e.g. Frontend Developer" 
            style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-card-border)', padding: '12px', borderRadius: '8px', color: 'white', fontSize: '1rem', outline: 'none' }} 
          />
        </div>
        <div style={{ paddingTop: '1.5rem' }}>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-gradient" 
            onClick={handleGenerate} 
            disabled={status === 'generating'}
            style={{ padding: '12px 24px', opacity: status === 'generating' ? 0.7 : 1 }}
          >
            {status === 'generating' ? 'Mapping...' : 'Generate Roadmap'}
          </motion.button>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {status === 'generating' && (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}
          >
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', border: '4px solid rgba(74, 144, 226, 0.2)', borderTopColor: 'var(--color-primary)', animation: 'spin 1s linear infinite', marginBottom: '1rem' }}></div>
            <motion.div 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Calculating the best path for your career...
            </motion.div>
          </motion.div>
        )}

        {status === 'result' && (
          <motion.div 
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card markdown-body" 
            style={{ padding: '3rem', flex: 1, overflowY: 'auto', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--color-card-border)' }}
          >
            <ReactMarkdown>{roadmap}</ReactMarkdown>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </motion.div>
  );
}

export default CareerPath;
