import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';

function CareerAssistant() {
  const [apiKey, setApiKey] = useState(import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem('gemini_api_key') || '');
  const [activeTab, setActiveTab] = useState('analyzer'); // analyzer, cover_letter, interview

  // Shared File State
  const [file, setFile] = useState(null);
  const [fileBase64, setFileBase64] = useState(null);
  const [fileMimeType, setFileMimeType] = useState(null);

  // Analyzer State
  const [analyzerStatus, setAnalyzerStatus] = useState('idle'); // idle, analyzing, result
  const [analysisResult, setAnalysisResult] = useState(null);

  // Cover Letter State
  const [clJobTitle, setClJobTitle] = useState('');
  const [clCompany, setClCompany] = useState('');
  const [clResult, setClResult] = useState('');
  const [isGeneratingCl, setIsGeneratingCl] = useState(false);

  // Interview State
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatSessionRef = useRef(null);

  const saveApiKey = (key) => {
    setApiKey(key);
    localStorage.setItem('gemini_api_key', key);
    toast.success('API Key saved!');
  };

  const handleFileChange = async (selectedFile) => {
    if (!selectedFile) return;
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error('File size exceeds 5MB limit.');
      return;
    }
    setFile(selectedFile);

    // Convert to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(',')[1];
      setFileBase64(base64String);
      setFileMimeType(selectedFile.type);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    handleFileChange(droppedFile);
  };

  const initAI = () => {
    if (!apiKey) {
      toast.error('Please enter your Gemini API Key first.');
      return null;
    }
    return new GoogleGenAI({ apiKey });
  };

  // --- 1. CV Analyzer ---
  const handleAnalyze = async () => {
    if (!fileBase64 || !fileMimeType) {
      toast.error('Please select a valid PDF or Text file.');
      return;
    }
    const ai = initAI();
    if (!ai) return;

    setAnalyzerStatus('analyzing');
    try {
      const prompt = `You are an expert ATS system and HR Recruiter. Review the attached CV/Resume. 
      Analyze it strictly and provide the result in JSON format with exactly these keys:
      {
        "score": (a number between 0 to 100 representing ATS match and overall quality),
        "strengths": [(list of 2-3 short strings of what is good)],
        "weaknesses": [(list of 2-3 short strings of what needs improvement)],
        "suggestions": [(list of 2-3 short strings of specific actionable advice)]
      }
      Do not include any markdown block formatting like \`\`\`json, just return the raw JSON object.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          prompt,
          {
            inlineData: {
              data: fileBase64,
              mimeType: fileMimeType
            }
          }
        ],
        config: {
          responseMimeType: "application/json"
        }
      });

      const rawJson = response.text.replace(/```json/g, '').replace(/```/g, '').trim();
      const result = JSON.parse(rawJson);
      setAnalysisResult(result);
      setAnalyzerStatus('result');
      toast.success('CV Analysis Complete!');
    } catch (error) {
      console.error(error);
      toast.error('Analysis failed: ' + error.message);
      setAnalyzerStatus('idle');
    }
  };

  // --- 2. Cover Letter Generator ---
  const handleGenerateCL = async () => {
    if (!fileBase64) {
      toast.error('Please upload your CV first.');
      return;
    }
    if (!clJobTitle || !clCompany) {
      toast.error('Please provide Job Title and Company.');
      return;
    }
    const ai = initAI();
    if (!ai) return;

    setIsGeneratingCl(true);
    setClResult('');
    try {
      const prompt = `Based on the attached CV, write a highly professional and compelling cover letter for the position of "${clJobTitle}" at "${clCompany}". Focus on matching the skills in the CV to a typical role of this kind. Keep it concise, engaging, and ready to send.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          prompt,
          {
            inlineData: {
              data: fileBase64,
              mimeType: fileMimeType
            }
          }
        ]
      });

      setClResult(response.text);
      toast.success('Cover Letter Generated!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to generate: ' + error.message);
    } finally {
      setIsGeneratingCl(false);
    }
  };

  // --- 3. Mock Interview ---
  const startInterview = async () => {
    if (!fileBase64) {
      toast.error('Please upload your CV first so I know about your background.');
      return;
    }
    const ai = initAI();
    if (!ai) return;

    setIsChatLoading(true);
    try {
      // We will extract text from CV first for chat context if it's too large, but for simplicity we'll just initiate a chat
      const prompt = `You are an expert technical and behavioral interviewer. I am attaching my CV. I want you to act as the interviewer for a job role that matches my CV. Start by introducing yourself briefly and asking the very first interview question based on my experience. Keep your responses short and realistic. Wait for my answer.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          prompt,
          {
            inlineData: {
              data: fileBase64,
              mimeType: fileMimeType
            }
          }
        ]
      });

      // We store the context in chat history manually to simulate session since GoogleGenAI chat with inlineData can sometimes be tricky
      setChatHistory([{ role: 'ai', text: response.text }]);
    } catch (error) {
      toast.error('Failed to start interview: ' + error.message);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput;
    setChatInput('');
    setChatHistory(prev => [...prev, { role: 'user', text: userMessage }]);

    const ai = initAI();
    if (!ai) return;

    setIsChatLoading(true);
    try {
      // Build conversation history manually
      const historyContents = chatHistory.map(msg => `${msg.role === 'user' ? 'Candidate' : 'Interviewer'}: ${msg.text}`).join('\n');
      const prompt = `You are the Interviewer. Here is the conversation history:\n${historyContents}\nCandidate: ${userMessage}\n\nRespond as the Interviewer evaluating the answer and asking the next question or providing brief feedback. Keep it conversational.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });

      setChatHistory(prev => [...prev, { role: 'ai', text: response.text }]);
    } catch (error) {
      toast.error('Failed to send message: ' + error.message);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <div className="career-layout">

      {/* Sidebar */}
      <aside className="career-sidebar">
        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--color-primary)' }}>
          Career Tools
        </div>
        {[
          { id: 'analyzer', label: 'CV Analyzer' },
          { id: 'cover_letter', label: 'Cover Letter Gen' },
          { id: 'interview', label: 'Mock Interview' },
        ].map(tab => (
          <motion.button
            key={tab.id}
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(74, 144, 226, 0.08)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab(tab.id)}
            className="glass-card"
            style={{
              padding: '1rem',
              textAlign: 'left',
              background: activeTab === tab.id ? 'rgba(74, 144, 226, 0.1)' : 'transparent',
              border: activeTab === tab.id ? '1px solid var(--color-primary)' : '1px solid transparent',
              color: activeTab === tab.id ? 'white' : 'var(--color-text-secondary)',
              transition: 'all 0.3s'
            }}
          >
            {tab.label}
          </motion.button>
        ))}
      </aside>

      {/* Main Content */}
      <div className="career-main">
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>

          <motion.h1
            key={activeTab}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}
          >
            {activeTab === 'analyzer' && 'CV Analyzer'}
            {activeTab === 'cover_letter' && 'Cover Letter Generator'}
            {activeTab === 'interview' && 'Mock Interview'}
          </motion.h1>

          {activeTab === 'analyzer' && !analysisResult && (
            <motion.div
              key="analyzer-intro"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card fade-in"
              style={{ padding: '1.75rem', marginBottom: '2rem', border: '1px solid rgba(255,255,255,0.08)', background: 'linear-gradient(180deg, rgba(74,144,226,0.08), rgba(10,17,34,0.85))' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>Cek Kesiapan CV-mu & Tingkatkan Peluang Lolos dalam 1 Menit!</div>
                  <div style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--color-text-primary)' }}>Dapatkan masukan & rekomendasi dari AI untuk meningkatkan kualitas CV kamu.</div>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  style={{ display: 'inline-flex', gap: '0.5rem', background: 'rgba(255,255,255,0.04)', borderRadius: '999px', padding: '0.55rem 0.85rem', color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}
                >
                  <span style={{ fontWeight: '700', color: 'var(--color-text-primary)' }}>AI CV Reviewer</span>
                  <span style={{ padding: '0.15rem 0.65rem', background: 'var(--color-primary)', borderRadius: '999px', color: 'white' }}>Results</span>
                </motion.div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', alignItems: 'stretch' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <motion.div whileHover={{ y: -5 }} className="glass-card" style={{ padding: '1rem', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '0.8rem' }}>You are</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '1rem', alignItems: 'center' }}>
                      <div style={{ width: '80px', height: '80px', borderRadius: '24px', background: 'linear-gradient(135deg, #4a90e2, #7cb9e8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', color: 'white', fontWeight: '800' }}>C</div>
                      <div>
                        <div style={{ fontSize: '1.35rem', fontWeight: '800', marginBottom: '0.2rem' }}>Americano</div>
                        <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.92rem', lineHeight: 1.5 }}>Profil kamu menonjol sebagai kandidat profesional dan terkini.</div>
                      </div>
                    </div>
                    <div style={{ marginTop: '1rem', padding: '0.9rem', borderRadius: '16px', background: 'rgba(255,255,255,0.04)' }}>
                      <div style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', marginBottom: '0.4rem' }}>Performance Review</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <div style={{ fontSize: '1.2rem', fontWeight: '800' }}>73%</div>
                        <div style={{ flex: 1, height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '999px', overflow: 'hidden' }}>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '73%' }}
                            transition={{ duration: 1 }}
                            style={{ height: '100%', background: 'var(--color-primary)', borderRadius: '999px' }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <div style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
                    {['Share to Instagram', 'Download Poster', 'Open Highlight', 'Add Yours'].map((label, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="btn-outline"
                        style={{ width: '100%', padding: '0.9rem 1rem', fontSize: '0.9rem', justifyContent: 'flex-start' }}
                      >
                        {label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                  <motion.div whileHover={{ scale: 1.01 }} className="glass-card" style={{ padding: '1rem', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                      <div style={{ fontSize: '0.95rem', fontWeight: '700' }}>Overall Impression</div>
                      <div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#10B981' }}>SCORE 98%</div>
                    </div>
                    <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, fontSize: '0.94rem' }}>
                      Secara keseluruhan, CV Anda meninggalkan kesan yang sangat kuat dan positif. Profil Anda komprehensif, terstruktur dengan baik, dan sesuai standar perekrut modern.
                    </p>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.01 }} className="glass-card" style={{ padding: '1rem', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <div style={{ fontWeight: '700' }}>Contact Information</div>
                      <span style={{ color: '#10B981', fontWeight: '700' }}>98%</span>
                    </div>
                    <p style={{ marginBottom: '0.75rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Informasi kontak Anda sudah lengkap dan mudah ditemukan, yang membantu perekrut menghubungi Anda dengan cepat.</p>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.01 }} className="glass-card" style={{ padding: '1rem', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <div style={{ fontWeight: '700' }}>Relevant Skills</div>
                      <span style={{ color: '#7cb9e8', fontWeight: '700' }}>96%</span>
                    </div>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Kemampuan yang ditulis sudah relevan untuk posisi target, tetapi bisa ditingkatkan dengan kata kunci industri.</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {/* SHARED UPLOAD (Required for all tools) */}
          {!file && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card"
              whileHover={{ borderColor: 'var(--color-primary)', background: 'rgba(74, 144, 226, 0.05)' }}
              style={{ padding: '2rem', textAlign: 'center', borderStyle: 'dashed', borderWidth: '2px', borderColor: 'var(--color-card-border)', marginBottom: '2rem' }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Upload your CV to begin</h3>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Supports PDF & Image (Max 5MB)</p>
              <div>
                <input type="file" id="cv-upload" style={{ display: 'none' }} accept=".pdf,image/*,.txt" onChange={(e) => handleFileChange(e.target.files[0])} />
                <motion.label
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  htmlFor="cv-upload"
                  className="btn-gradient"
                  style={{ cursor: 'pointer', display: 'inline-block' }}
                >
                  Choose File
                </motion.label>
              </div>
            </motion.div>
          )}

          {file && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <div>📄 {file.name} <span style={{ color: '#10B981', fontSize: '0.85rem', marginLeft: '0.5rem' }}>✓ Attached</span></div>
              <motion.button
                whileHover={{ scale: 1.1, color: '#FF0000' }}
                onClick={() => { setFile(null); setFileBase64(null); setAnalyzerStatus('idle'); setAnalysisResult(null); setChatHistory([]); }}
                style={{ color: '#EF4444', fontSize: '0.85rem' }}
              >
                Remove
              </motion.button>
            </motion.div>
          )}

          {/* TAB CONTENT WITH ANIMATION */}
          <AnimatePresence mode="wait">
            {/* TAB: CV ANALYZER */}
            {activeTab === 'analyzer' && file && (
              <motion.div
                key="analyzer-content"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {analyzerStatus === 'idle' && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-gradient"
                    onClick={handleAnalyze}
                  >
                    ✨ Analyze CV with AI
                  </motion.button>
                )}

                {analyzerStatus === 'analyzing' && (
                  <div className="glass-card" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
                    <div style={{ width: '60px', height: '60px', borderRadius: '50%', border: '4px solid rgba(124, 92, 255, 0.2)', borderTopColor: 'var(--color-primary)', animation: 'spin 1s linear infinite', margin: '0 auto 2rem' }}></div>
                    <motion.h2 animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} style={{ marginBottom: '1rem' }}>Analyzing your CV...</motion.h2>
                    <p style={{ color: 'var(--color-text-secondary)' }}>Extracting skills, evaluating ATS readability, and generating insights.</p>
                  </div>
                )}

                {analyzerStatus === 'result' && analysisResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card"
                    style={{ 
                      padding: '2.5rem', 
                      marginBottom: '2rem', 
                      border: '1px solid rgba(255,255,255,0.08)', 
                      background: 'linear-gradient(180deg, rgba(74,144,226,0.08), rgba(10,17,34,0.85))' 
                    }}
                  >
                    {/* Header: Score & Headline */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem', marginBottom: '3rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '2rem' }}>
                      <div style={{ flex: '1', minWidth: '300px' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-primary)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Analysis Completed</div>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '1rem' }}>Review Hasil CV Anda</h2>
                        <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                          Berdasarkan analisis AI, CV Anda memiliki tingkat kecocokan yang cukup baik. Perhatikan saran di bawah untuk meningkatkan peluang Anda lolos ATS.
                        </p>
                      </div>
                      
                      <div style={{ textAlign: 'center', padding: '1.5rem 2.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '0.2rem', textTransform: 'uppercase' }}>ATS Score</div>
                        <motion.div 
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          style={{ fontSize: '4.5rem', fontWeight: '900', color: 'var(--color-primary)', lineHeight: '1' }}
                        >
                          {analysisResult.score}<span style={{ fontSize: '1.8rem', opacity: 0.7 }}>%</span>
                        </motion.div>
                      </div>
                    </div>

                    {/* Content Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                      {/* Strengths */}
                      <div>
                        <h4 style={{ color: '#10B981', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
                          <span style={{ fontSize: '1.2rem' }}>✅</span> Keunggulan
                        </h4>
                        <ul style={{ color: 'var(--color-text-secondary)', paddingLeft: '1.2rem', fontSize: '0.95rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                          {analysisResult.strengths?.map((item, i) => <li key={i} style={{ lineHeight: '1.5' }}>{item}</li>)}
                        </ul>
                      </div>

                      {/* Weaknesses */}
                      <div>
                        <h4 style={{ color: '#F59E0B', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
                          <span style={{ fontSize: '1.2rem' }}>⚠️</span> Perlu Perbaikan
                        </h4>
                        <ul style={{ color: 'var(--color-text-secondary)', paddingLeft: '1.2rem', fontSize: '0.95rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                          {analysisResult.weaknesses?.map((item, i) => <li key={i} style={{ lineHeight: '1.5' }}>{item}</li>)}
                        </ul>
                      </div>

                      {/* Suggestions */}
                      <div>
                        <h4 style={{ color: 'var(--color-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
                          <span style={{ fontSize: '1.2rem' }}>💡</span> Saran Aksi
                        </h4>
                        <ul style={{ color: 'var(--color-text-secondary)', paddingLeft: '1.2rem', fontSize: '0.95rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                          {analysisResult.suggestions?.map((item, i) => <li key={i} style={{ lineHeight: '1.5' }}>{item}</li>)}
                        </ul>
                      </div>
                    </div>

                    {/* Footer Action */}
                    <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'center' }}>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => { setFile(null); setAnalysisResult(null); setAnalyzerStatus('idle'); }}
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '0.8rem 2rem', borderRadius: '12px', cursor: 'pointer', fontSize: '0.9rem' }}
                      >
                        Analisis File Lain
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* TAB: COVER LETTER */}
            {activeTab === 'cover_letter' && file && (
              <motion.div
                key="cl-content"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass-card"
                style={{ padding: '2rem' }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>Target Job Title</label>
                    <motion.input
                      whileFocus={{ scale: 1.01, borderColor: 'var(--color-primary)' }}
                      type="text"
                      value={clJobTitle}
                      onChange={e => setClJobTitle(e.target.value)}
                      placeholder="e.g. Frontend Developer"
                      style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-card-border)', padding: '12px', borderRadius: '8px', color: 'white', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>Target Company</label>
                    <motion.input
                      whileFocus={{ scale: 1.01, borderColor: 'var(--color-primary)' }}
                      type="text"
                      value={clCompany}
                      onChange={e => setClCompany(e.target.value)}
                      placeholder="e.g. NusantaraTech"
                      style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-card-border)', padding: '12px', borderRadius: '8px', color: 'white', outline: 'none' }}
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-gradient"
                    onClick={handleGenerateCL}
                    disabled={isGeneratingCl}
                    style={{ alignSelf: 'flex-start' }}
                  >
                    {isGeneratingCl ? 'Generating...' : '✨ Generate Cover Letter'}
                  </motion.button>
                </div>

                {clResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}
                  >
                    <ReactMarkdown>{clResult}</ReactMarkdown>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* TAB: INTERVIEW */}
            {activeTab === 'interview' && file && (
              <motion.div
                key="interview-content"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass-card"
                style={{ display: 'flex', flexDirection: 'column', height: '500px' }}
              >
                <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--color-card-border)', background: 'rgba(0,0,0,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 'bold' }}>Interview Simulator</span>
                  {chatHistory.length === 0 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={startInterview}
                      disabled={isChatLoading}
                      style={{ background: 'var(--color-primary)', color: 'white', padding: '6px 12px', borderRadius: '6px', fontSize: '0.85rem' }}
                    >
                      {isChatLoading ? 'Starting...' : 'Start Interview'}
                    </motion.button>
                  )}
                </div>

                <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {chatHistory.length === 0 && !isChatLoading && (
                    <div style={{ color: 'var(--color-text-secondary)', textAlign: 'center', marginTop: '3rem' }}>
                      Click "Start Interview" to let the AI review your CV and ask the first question.
                    </div>
                  )}
                  {chatHistory.map((chat, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      style={{
                        alignSelf: chat.role === 'user' ? 'flex-end' : 'flex-start',
                        background: chat.role === 'user' ? 'var(--color-primary)' : 'var(--color-card-glass)',
                        padding: '1rem 1.2rem',
                        borderRadius: '12px',
                        borderBottomRightRadius: chat.role === 'user' ? '0' : '12px',
                        borderBottomLeftRadius: chat.role === 'ai' ? '0' : '12px',
                        maxWidth: '80%',
                        fontSize: '0.95rem'
                      }}>
                      <ReactMarkdown>{chat.text}</ReactMarkdown>
                    </motion.div>
                  ))}
                  {isChatLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{ alignSelf: 'flex-start', background: 'var(--color-card-glass)', padding: '1rem', borderRadius: '12px', color: 'var(--color-text-secondary)' }}
                    >
                      Interviewer is typing...
                    </motion.div>
                  )}
                </div>

                <form onSubmit={handleChatSubmit} style={{ padding: '1rem', borderTop: '1px solid var(--color-card-border)', display: 'flex', gap: '1rem' }}>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    disabled={isChatLoading || (chatHistory.length === 0 && !isChatLoading)}
                    placeholder="Type your answer..."
                    style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-card-border)', padding: '12px 16px', borderRadius: '8px', color: 'white', outline: 'none' }}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="btn-gradient"
                    disabled={isChatLoading || (chatHistory.length === 0 && !isChatLoading)}
                    style={{ borderRadius: '8px' }}
                  >
                    Send
                  </motion.button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes pulse { 50% { opacity: 0.5; } }
      `}</style>
    </div>
  );
}

export default CareerAssistant;
