import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';

function UiUxCritic() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem('gemini_api_key');
  
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [imageMimeType, setImageMimeType] = useState(null);
  
  const [status, setStatus] = useState('idle'); // idle, analyzing, result
  const [critique, setCritique] = useState('');

  const handleImageChange = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload a valid image file.');
      return;
    }
    
    setImage(file);
    setImagePreview(URL.createObjectURL(file));

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result.split(',')[1]);
      setImageMimeType(file.type);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!apiKey) {
      toast.error('API Key is missing in .env');
      return;
    }
    if (!imageBase64) return;

    setStatus('analyzing');
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are an expert UI/UX Designer. Please critique the provided UI design. 
      Format your response using Markdown. Structure your feedback into:
      1. What works well (Strengths)
      2. Layout & Visual Hierarchy feedback
      3. Color & Typography feedback
      4. Accessibility & UX Suggestions`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          prompt,
          {
            inlineData: {
              data: imageBase64,
              mimeType: imageMimeType
            }
          }
        ]
      });

      setCritique(response.text);
      setStatus('result');
      toast.success('Critique completed!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to analyze: ' + error.message);
      setStatus('idle');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ padding: '3rem 5%', maxWidth: '1000px', margin: '0 auto', minHeight: 'calc(100vh - 80px)' }}
    >
      <motion.h1 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}
      >
        🎨 <span className="gradient-text">UI/UX Critic</span>
      </motion.h1>
      <motion.p 
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        style={{ color: 'var(--color-text-secondary)', marginBottom: '3rem', fontSize: '1.1rem' }}
      >
        Upload a screenshot of your website or app design, and our AI will provide expert layout, typography, and UX feedback.
      </motion.p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
        {/* Upload Column */}
        <motion.div 
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card" 
          style={{ padding: '2rem', height: 'fit-content' }}
        >
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Your Design</h2>
          
          <AnimatePresence mode="wait">
            {!imagePreview ? (
              <motion.div 
                key="upload-prompt"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ borderColor: 'var(--color-primary)', background: 'rgba(74, 144, 226, 0.08)' }}
                style={{ border: '2px dashed var(--color-card-border)', borderRadius: '12px', padding: '4rem 2rem', textAlign: 'center', background: 'rgba(74, 144, 226, 0.04)', cursor: 'pointer', transition: 'border-color 0.3s' }}
                onClick={() => document.getElementById('image-upload').click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => { e.preventDefault(); handleImageChange(e.dataTransfer.files[0]); }}
              >
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ fontSize: '3rem', marginBottom: '1rem' }}
                >
                  📸
                </motion.div>
                <div style={{ fontWeight: '600' }}>Drag & Drop your mockup</div>
                <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Supports PNG, JPG, WebP</div>
                <input type="file" id="image-upload" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleImageChange(e.target.files[0])} />
              </motion.div>
            ) : (
              <motion.div 
                key="preview-container"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <div style={{ position: 'relative', width: '100%', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--color-card-border)', marginBottom: '1.5rem' }}>
                  <img src={imagePreview} alt="Preview" style={{ width: '100%', height: 'auto', display: 'block' }} />
                  <motion.button 
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(239, 68, 68, 0.9)' }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => { setImage(null); setImagePreview(null); setStatus('idle'); setCritique(''); }} 
                    style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.7)', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '600' }}
                  >
                    Remove
                  </motion.button>
                </div>
                {status === 'idle' && (
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-gradient" 
                    style={{ width: '100%' }} 
                    onClick={handleAnalyze}
                  >
                    ✨ Analyze Design
                  </motion.button>
                )}
                {status === 'analyzing' && (
                  <button className="btn-gradient" style={{ width: '100%', opacity: 0.7, cursor: 'not-allowed' }} disabled>
                    <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}>
                      Analyzing...
                    </motion.span>
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Result Column */}
        <motion.div 
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-card" 
          style={{ padding: '2rem', height: '100%', minHeight: '500px', display: 'flex', flexDirection: 'column' }}
        >
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-card-border)', paddingBottom: '0.5rem' }}>AI Feedback</h2>
          
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <AnimatePresence mode="wait">
              {status === 'idle' && (
                <motion.div 
                  key="idle-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ color: 'var(--color-text-secondary)', textAlign: 'center', marginTop: '5rem' }}
                >
                  Upload an image and click analyze to see feedback.
                </motion.div>
              )}
              
              {status === 'analyzing' && (
                <motion.div 
                  key="analyzing-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2rem' }}
                >
                  {[1, 0.8, 0.9, 0.7].map((w, i) => (
                    <motion.div 
                      key={i}
                      initial={{ background: 'rgba(255,255,255,0.05)' }}
                      animate={{ background: ['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)'] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                      style={{ height: '20px', borderRadius: '4px', width: `${w * 100}%` }} 
                    />
                  ))}
                </motion.div>
              )}

              {status === 'result' && (
                <motion.div 
                  key="result-state"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="markdown-body" 
                  style={{ color: 'var(--color-text-primary)', lineHeight: '1.8' }}
                >
                  <ReactMarkdown>{critique}</ReactMarkdown>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default UiUxCritic;
