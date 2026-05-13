import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';

function LinkedinOptimizer() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem('gemini_api_key');
  const [profileText, setProfileText] = useState('');
  const [status, setStatus] = useState('idle'); // idle, generating, result
  const [optimizedProfiles, setOptimizedProfiles] = useState([]);

  const handleOptimize = async () => {
    if (!profileText.trim()) {
      toast.error('Please paste your current LinkedIn headline or summary.');
      return;
    }
    if (!apiKey) {
      toast.error('API Key is missing in .env');
      return;
    }

    setStatus('generating');
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are an expert LinkedIn Profile Optimizer and Tech Recruiter. 
      The user provided the following LinkedIn headline or summary:
      "${profileText}"
      
      Please rewrite it and provide exactly 3 different versions:
      1. **Professional & Corporate**: Focused on leadership, metrics, and standard industry terminology.
      2. **Creative & Engaging**: Catchy, story-driven, and designed to stand out.
      3. **Metric-Driven**: Heavily focused on data, achievements, and technical impact.
      
      Format the response in Markdown, clearly separating the 3 versions.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      // Split the response into the 3 versions roughly
      const text = response.text;
      const parts = text.split(/(?=\d\.\s\*\*)/); // Split by "1. **", "2. **" etc if it matches the format
      
      if (parts.length > 1) {
        setOptimizedProfiles(parts.filter(p => p.trim().length > 0));
      } else {
        setOptimizedProfiles([text]);
      }
      
      setStatus('result');
      toast.success('Optimization complete!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to generate profiles: ' + error.message);
      setStatus('idle');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ padding: '3rem 5%', maxWidth: '1000px', margin: '0 auto', minHeight: 'calc(100vh - 80px)' }}
    >
      <motion.div 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        style={{ textAlign: 'center', marginBottom: '3rem' }}
      >
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}><span className="gradient-text">LinkedIn Optimizer</span></h1>
        <p style={{ color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>Make your profile irresistible to recruiters with AI-optimized headlines and summaries.</p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: status === 'result' ? 'repeat(auto-fit, minmax(300px, 1fr))' : '1fr', gap: '2rem' }}>
        
        {/* Input Column */}
        <motion.div 
          layout
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="glass-card" 
          style={{ padding: '2rem', height: 'fit-content' }}
        >
          <label style={{ display: 'block', marginBottom: '1rem', color: 'var(--color-text-secondary)', fontWeight: '600' }}>Current Headline or Summary</label>
          <motion.textarea 
            whileFocus={{ scale: 1.01, borderColor: 'var(--color-primary)' }}
            value={profileText}
            onChange={(e) => setProfileText(e.target.value)}
            placeholder="e.g. Software Engineer looking for new opportunities."
            style={{ 
              width: '100%', 
              height: '200px', 
              background: 'rgba(255,255,255,0.05)', 
              border: '1px solid var(--color-card-border)', 
              padding: '1rem', 
              borderRadius: '12px', 
              color: 'white',
              resize: 'vertical',
              marginBottom: '1.5rem',
              fontFamily: 'inherit',
              lineHeight: '1.5',
              outline: 'none'
            }}
          />
          
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-gradient" 
            onClick={handleOptimize} 
            disabled={status === 'generating'}
            style={{ width: '100%', opacity: status === 'generating' ? 0.7 : 1 }}
          >
            {status === 'generating' ? 'Optimizing...' : 'Optimize Profile'}
          </motion.button>
        </motion.div>

        {/* Result & Loading Area */}
        <AnimatePresence mode="wait">
          {status === 'generating' && (
            <motion.div 
              key="loading"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card" 
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '3rem' }}
            >
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', border: '4px solid rgba(74, 144, 226, 0.2)', borderTopColor: 'var(--color-primary)', animation: 'spin 1s linear infinite', marginBottom: '1rem' }}></div>
              <motion.div 
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Crafting the perfect pitch for recruiters...
              </motion.div>
            </motion.div>
          )}

          {status === 'result' && (
            <motion.div 
              key="results"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.15 } }
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
            >
              {optimizedProfiles.map((profile, idx) => (
                <motion.div 
                  key={idx} 
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: { y: 0, opacity: 1 }
                  }}
                  whileHover={{ y: -5, borderColor: 'var(--color-primary)' }}
                  className="glass-card" 
                  style={{ padding: '2rem', position: 'relative' }}
                >
                  <div className="markdown-body" style={{ color: 'var(--color-text-primary)' }}>
                    <ReactMarkdown>{profile}</ReactMarkdown>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(74, 144, 226, 0.2)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { navigator.clipboard.writeText(profile); toast.success('Copied to clipboard!'); }}
                    style={{ marginTop: '1.5rem', padding: '8px 16px', background: 'rgba(255,255,255,0.08)', color: 'white', borderRadius: '8px', fontSize: '0.85rem', border: '1px solid var(--color-card-border)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    Copy Text
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </motion.div>
  );
}

export default LinkedinOptimizer;
