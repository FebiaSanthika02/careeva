import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const featureList = [
  { icon: '💼', title: 'Career Assistant', desc: 'Upload CV dan dapatkan skor ATS, cover letter AI-generated, dan feedback personal.', link: '/career-assistant' },
  { icon: '🎨', title: 'UI/UX Critic', desc: 'Feedback desain portfolio dari AI yang terlatih pada pola desain modern.', link: '/ui-ux-critic' },
  { icon: '⚡', title: 'Daily Helper', desc: 'Asisten cerdas untuk persiapan interview, pertanyaan teknis, dan perencanaan harian.', link: '/daily-helper' },
  { icon: '🧭', title: 'Career Path', desc: 'Dari posisi sekarang ke impian kamu — roadmap belajar personal dari AI.', link: '/career-path' },
  { icon: '🤝', title: 'Salary Negotiator', desc: 'Latih negosiasi gaji dengan AI HR Manager dan raih kompensasi terbaik.', link: '/salary-negotiator' },
  { icon: '💼', title: 'LinkedIn Optimizer', desc: 'Tulis ulang headline dan summary LinkedIn kamu jadi 3 versi profesional.', link: '/linkedin-optimizer' },
];

function Features() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="page-container"
      style={{ padding: '4rem 5%', maxWidth: '1200px', margin: '0 auto', minHeight: 'calc(100vh - 70px)' }}
    >
      <motion.div variants={itemVariants} style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(16,185,129,0.08)', border: '1px solid var(--color-card-border)', borderRadius: '999px', padding: '6px 16px', marginBottom: '1.5rem', fontSize: '0.85rem', color: 'var(--color-accent)' }}
        >
          ✨ Our Features
        </motion.div>
        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: '900', marginBottom: '1.5rem', lineHeight: 1.1 }}>
          Everything you need to <span className="gradient-text">Level Up</span>
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.15rem', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
          Platform All-in-One yang ditenagai oleh AI mutakhir untuk membantu Anda meraih pekerjaan impian lebih cepat dan cerdas.
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '4rem' }}
      >
        {featureList.map((feature, idx) => (
          <motion.div 
            key={idx} 
            variants={itemVariants}
            whileHover={{ 
              y: -10, 
              borderColor: 'rgba(16,185,129,0.4)',
              boxShadow: '0 20px 40px rgba(16,185,129,0.1)'
            }}
            whileTap={{ scale: 0.98 }}
            className="glass-card" 
            onClick={() => navigate(feature.link)}
            style={{ padding: '2.5rem', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
          >
            <motion.div 
              initial={{ scale: 0.8 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              style={{ fontSize: '3rem', marginBottom: '1.5rem', display: 'inline-block' }}
            >
              {feature.icon}
            </motion.div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '0.75rem' }}>{feature.title}</h3>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, fontSize: '1rem', marginBottom: '1.5rem' }}>{feature.desc}</p>
            <motion.div 
              whileHover={{ x: 5 }}
              style={{ color: 'var(--color-primary)', fontWeight: '700', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              Learn More <span>→</span>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Stats Section in Features */}
      <motion.div 
        variants={itemVariants}
        className="glass-card" 
        style={{ padding: '3rem', textAlign: 'center', background: 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(245,158,11,0.05) 100%)' }}
      >
        <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '1rem' }}>AI kami terus belajar</h2>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Setiap fitur dirancang dengan masukan dari perekrut profesional dan engineer AI terbaik.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
          {[
            { n: '50K+', l: 'Users' },
            { n: '98%', l: 'Accuracy' },
            { n: '24/7', l: 'Availability' }
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--color-primary)' }}>{s.n}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Features;
