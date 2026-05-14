import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const features = [
  { icon: '💼', title: 'Career Assistant', desc: 'Upload CV dan dapatkan skor ATS, cover letter AI-generated, dan feedback personal.', link: '/career-assistant' },
  { icon: '🎨', title: 'UI/UX Critic', desc: 'Feedback desain portfolio dari AI yang terlatih pada pola desain modern.', link: '/ui-ux-critic' },
  { icon: '⚡', title: 'Daily Helper', desc: 'Asisten cerdas untuk persiapan interview, pertanyaan teknis, dan perencanaan harian.', link: '/daily-helper' },
  { icon: '🧭', title: 'Career Path', desc: 'Dari posisi sekarang ke impian kamu — roadmap belajar personal dari AI.', link: '/career-path' },
  { icon: '🤝', title: 'Salary Negotiator', desc: 'Latih negosiasi gaji dengan AI HR Manager dan raih kompensasi terbaik.', link: '/salary-negotiator' },
  { icon: '💼', title: 'LinkedIn Optimizer', desc: 'Tulis ulang headline dan summary LinkedIn kamu jadi 3 versi profesional.', link: '/linkedin-optimizer' },
];

const stats = [
  { number: '50K+', label: 'CV Dianalisis' },
  { number: '94%', label: 'Tingkat Kepuasan' },
  { number: '3x', label: 'Lebih Cepat Lolos' },
  { number: '10+', label: 'Fitur AI' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ 
      paddingBottom: '5rem',
      minHeight: '100vh',
      position: 'relative'
    }}>

      {/* Hero */}
      <section className="home-hero">

        <div className="home-hero-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '999px', padding: '8px 22px', marginBottom: '2.5rem', fontSize: '0.9rem', color: 'var(--color-accent)', fontWeight: '600' }}
          >
            Powered by Gemini AI &nbsp;·&nbsp; <span style={{ color: 'var(--color-secondary)' }}>6 Professional AI Tools</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontSize: 'clamp(2rem, 5vw, 2.8rem)', fontWeight: '800', lineHeight: 1.2, marginBottom: '1rem', letterSpacing: '-0.02em' }}
          >
            Boost Your Career with <span className="gradient-text">AI-Powered</span> Tools
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', marginBottom: '2rem', lineHeight: 1.6, maxWidth: '450px' }}
          >
            Analisis CV, tingkatkan desain, dan rencanakan karier kamu bersama AI. Copilot terbaik untuk perjalanan profesionalmu.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="home-hero-buttons"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-gradient"
              onClick={() => navigate('/career-assistant')}
              style={{ fontSize: '0.95rem', padding: '12px 28px', borderRadius: '10px' }}
            >
              Get Started Free
            </motion.button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="home-hero-stats"
          >
            {stats.map((s, i) => (
              <motion.div key={i} variants={itemVariants} whileHover={{ y: -5 }} style={{ cursor: 'default' }}>
                <div style={{ fontSize: '2rem', fontWeight: '900', background: 'var(--color-gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.number}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '2px', fontWeight: '600' }}>{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right — Tight cluster of moving feature cards */}
        <div className="home-hero-right">
          <div className="home-hero-cluster">
            <div style={{ position: 'absolute', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(74,144,226,0.1) 0%, transparent 70%)', borderRadius: '50%' }} />

            {/* ATS Score */}
            <motion.div
              className="glass-card"
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              style={{ position: 'absolute', top: '10%', right: '5%', padding: '1.8rem', width: '280px', boxShadow: '0 30px 60px rgba(0,0,0,0.4)', cursor: 'pointer', zIndex: 3 }}
              animate={{ 
                y: [0, -15, 0],
                rotate: [2, 3, 2]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '0.4rem', fontWeight: '600' }}>ATS CV Score</div>
              <div style={{ fontSize: '3.2rem', fontWeight: '950', color: 'var(--color-primary)', lineHeight: 1 }}>92<span style={{ fontSize: '1.2rem', color: 'var(--color-text-secondary)' }}>/100</span></div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', marginTop: '1.2rem', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '92%', background: 'var(--color-gradient-primary)', borderRadius: '3px' }} />
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-accent)', marginTop: '0.8rem', fontWeight: '700' }}>✓ ATS Optimized</div>
            </motion.div>

            {/* AI Chat Bubble */}
            <motion.div
              className="glass-card"
              whileHover={{ scale: 1.05, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
              style={{ position: 'absolute', top: '42%', left: '0', padding: '1.5rem', width: '310px', boxShadow: '0 30px 60px rgba(0,0,0,0.4)', display: 'flex', gap: '1rem', alignItems: 'flex-start', cursor: 'pointer', zIndex: 4 }}
              animate={{ 
                y: [0, 12, 0],
                x: [0, -8, 0]
              }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <div style={{ background: 'var(--color-gradient-primary)', width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: '900', color: '#080C14' }}>AI</div>
              <div style={{ fontSize: '1rem', lineHeight: 1.5, fontWeight: '500' }}>Tambahkan metrik seperti <span style={{ color: 'var(--color-secondary)', fontWeight: '800' }}>"Meningkatkan penjualan 30%"</span></div>
            </motion.div>

            {/* CV Personality */}
            <motion.div
              className="glass-card"
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
              style={{ position: 'absolute', bottom: '5%', right: '12%', padding: '0.8rem', width: '220px', boxShadow: '0 30px 60px rgba(0,0,0,0.4)', background: 'rgba(74, 144, 226, 0.1)', border: '1px solid rgba(74, 144, 226, 0.2)', cursor: 'pointer', zIndex: 2 }}
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, -2, 0]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            >
              <img 
                src="/cv-personality.png" 
                alt="CV Personality" 
                style={{ width: '100%', borderRadius: '10px', filter: 'hue-rotate(180deg) saturate(1.5) brightness(1.1)' }} 
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it Works — Enhanced with backgrounds and connections */}
      <section className="home-section">
        {/* Decorative Background Elements */}
        <div style={{ position: 'absolute', top: '20%', left: '10%', width: '300px', height: '300px', background: 'var(--color-glow-primary)', filter: 'blur(120px)', opacity: 0.15, zIndex: 0 }}></div>
        <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '400px', height: '400px', background: 'var(--color-glow-secondary)', filter: 'blur(150px)', opacity: 0.1, zIndex: 0 }}></div>

        <div style={{ textAlign: 'center', marginBottom: '5rem', position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: '950', marginBottom: '1.2rem', letterSpacing: '-0.03em' }}>
            Transform Your <span className="gradient-text">Journey</span>
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            Hanya butuh 3 langkah sederhana untuk mengoptimalkan karier Anda dengan bantuan AI tercanggih.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '2rem', 
            maxWidth: '1100px', 
            margin: '0 auto', 
            flexWrap: 'wrap',
            position: 'relative',
            zIndex: 1
          }}
        >
          {/* Connecting Line (Desktop Only) */}
          <div className="desktop-only" style={{ position: 'absolute', top: '25%', left: '15%', right: '15%', height: '2px', background: 'linear-gradient(90deg, transparent, var(--color-card-border), transparent)', zIndex: 0 }}></div>

          {[
            { step: '01', icon: '📤', title: 'Upload / Input', desc: 'Masukkan CV atau paste konten kamu ke platform aman kami.', color: 'rgba(74, 144, 226, 0.15)' },
            { step: '02', icon: '🤖', title: 'AI Analyze', desc: 'Model AI canggih kami memproses dan mengevaluasi data kamu secara instan.', color: 'rgba(124, 185, 232, 0.15)' },
            { step: '03', icon: '💡', title: 'Get Insights', desc: 'Terima feedback yang actionable, skor, dan konten yang sudah diimprove.', color: 'rgba(91, 163, 208, 0.15)' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              style={{ 
                flex: '1 1 280px', 
                textAlign: 'center', 
                padding: '3rem 2rem', 
                position: 'relative',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '32px',
                border: '1px solid var(--color-card-border)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div style={{ 
                width: '85px', 
                height: '85px', 
                borderRadius: '24px', 
                background: item.color, 
                border: '1px solid rgba(255,255,255,0.1)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: '2.2rem', 
                margin: '0 auto 2rem',
                boxShadow: '0 15px 35px rgba(0,0,0,0.2)'
              }}>
                {item.icon}
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: '900', color: 'var(--color-primary)', letterSpacing: '0.2em', marginBottom: '0.8rem', textTransform: 'uppercase' }}>STEP {item.step}</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '1rem', letterSpacing: '-0.01em' }}>{item.title}</h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.65 }}>{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Banner */}
      <section className="home-cta-section">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="home-cta-card"
        >
          <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>Siap tingkatkan kariermu?</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.2rem', marginBottom: '3rem', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto 3rem' }}>
            Bergabung dengan 50.000+ profesional yang sudah memanfaatkan Careeva untuk mendapatkan pekerjaan impian.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 15px 30px rgba(74, 144, 226, 0.2)' }}
              whileTap={{ scale: 0.95 }}
              className="btn-gradient"
              onClick={() => navigate('/career-assistant')}
              style={{ fontSize: '1.1rem', padding: '16px 40px', borderRadius: '14px' }}
            >
              Get Started Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-outline"
              onClick={() => navigate('/pricing')}
              style={{ fontSize: '1.1rem', padding: '16px 40px', borderRadius: '14px' }}
            >
              Lihat Harga
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default Home;
