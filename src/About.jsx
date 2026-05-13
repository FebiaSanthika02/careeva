import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
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
      style={{ padding: '6rem 5%', maxWidth: '1300px', margin: '0 auto', minHeight: 'calc(100vh - 70px)' }}
      className="page-container"
    >
      <motion.div variants={itemVariants} style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(74, 144, 226, 0.08)', border: '1px solid var(--color-card-border)', borderRadius: '999px', padding: '6px 16px', marginBottom: '1.2rem', fontSize: '0.85rem', color: 'var(--color-accent)' }}
        >
          🌱 About Us
        </motion.div>
        <h1 style={{ fontSize: 'clamp(3rem, 7vw, 4.5rem)', fontWeight: '900', marginBottom: '1.5rem', lineHeight: 1.05, letterSpacing: '-0.04em' }}>
          About <span className="gradient-text">Careeva</span>
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.2rem', maxWidth: '850px', margin: '0 auto', lineHeight: 1.7 }}>
          Kami hadir untuk mendemokratisasi pertumbuhan karier melalui kekuatan AI yang personal dan mudah diakses oleh siapa saja.
        </p>
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '4rem' }}>
        {/* Vision Section - Tight Horizontal */}
        <motion.div 
          variants={itemVariants}
          className="glass-card" 
          style={{ padding: '3rem', display: 'flex', gap: '3rem', alignItems: 'center', flexWrap: 'wrap' }}
        >
          <div style={{ flex: '1 1 300px' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.2rem', color: 'var(--color-primary)', fontWeight: '900', lineHeight: 1.1 }}>🎯 Our Vision</h2>
            <div style={{ width: '60px', height: '5px', background: 'var(--color-gradient-primary)', borderRadius: '3px' }} />
          </div>
          <p style={{ flex: '2 1 600px', color: 'var(--color-text-secondary)', fontSize: '1.2rem', lineHeight: '1.8' }}>
            Mencari pekerjaan atau berkembang dalam karier secara tradisional adalah proses yang melelahkan dan tidak transparan.
            Di Careeva, kami percaya setiap orang berhak mendapatkan career coach pribadi. Dengan memanfaatkan model Generative AI mutakhir,
            kami memberikan feedback yang actionable, personal, dan instan untuk pencari kerja dan profesional di mana saja.
          </p>
        </motion.div>

        {/* Feature Grid - Forced 3 Columns */}
        <motion.div 
          variants={containerVariants}
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '1.5rem',
            width: '100%'
          }}
          className="responsive-grid-3"
        >
          {[
            { icon: '🌍', title: 'Global Standard', desc: 'Algoritma ATS scoring kami dilatih pada standar industri tech global terbaik.' },
            { icon: '🔒', title: 'Privacy First', desc: 'Data CV kamu diproses secara aman dan tidak disimpan lebih lama dari yang dibutuhkan.' },
            { icon: '⚡', title: 'Lightning Fast', desc: 'Dapatkan review CV komprehensif dalam hitungan detik dengan LLM terbaru.' },
          ].map((item, i) => (
            <motion.div 
              key={i} 
              variants={itemVariants}
              whileHover={{ y: -8, borderColor: 'rgba(74, 144, 226, 0.4)' }}
              className="glass-card" 
              style={{ padding: '2.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', height: '100%' }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{item.icon}</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.6rem', fontWeight: '800' }}>{item.title}</h3>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6, fontSize: '0.95rem', flexGrow: 1 }}>{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Values Section - Compact Horizontal */}
        <motion.div variants={itemVariants} className="glass-card" style={{ padding: '3rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '0.4rem', color: 'var(--color-secondary)' }}>💛 Our Values</h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>Prinsip yang mendasari setiap inovasi kami.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {[
              { label: 'Accessibility', desc: 'AI career tools seharusnya bisa diakses semua orang tanpa biaya mahal.' },
              { label: 'Transparency', desc: 'Kami menjelaskan cara kerja AI kami dan bagaimana skor dihitung secara terbuka.' },
              { label: 'Continuous Improvement', desc: 'Feedback pengguna langsung membentuk fitur yang kami kembangkan.' },
            ].map((v, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants}
                whileHover={{ backgroundColor: 'rgba(74, 144, 226, 0.05)' }}
                style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.8rem', background: 'rgba(74, 144, 226, 0.03)', borderRadius: '18px', border: '1px solid rgba(74, 144, 226, 0.08)' }}
              >
                <span style={{ background: 'var(--color-gradient-primary)', color: 'white', width: '28px', height: '28px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '0.9rem' }}>{i + 1}</span>
                <div>
                  <div style={{ fontWeight: '800', marginBottom: '0.4rem', fontSize: '1.1rem' }}>{v.label}</div>
                  <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>{v.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* CTA - Slim Horizontal */}
      <motion.div 
        variants={itemVariants}
        whileHover={{ scale: 1.01 }}
        style={{ textAlign: 'center', padding: '4rem 2rem', background: 'linear-gradient(135deg, rgba(74, 144, 226, 0.08) 0%, rgba(124, 185, 232, 0.05) 100%)', borderRadius: '28px', border: '1px solid rgba(74, 144, 226, 0.15)' }}
      >
        <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem', fontWeight: '900' }}>Ready to elevate your career?</h2>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2.5rem', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
          Bergabung dengan 50.000+ profesional yang sudah berhasil.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/career-assistant">
            <motion.div 
              whileHover={{ scale: 1.05, boxShadow: '0 12px 30px rgba(74, 144, 226, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="btn-gradient" 
              style={{ fontSize: '1rem', padding: '16px 36px' }}
            >
              🚀 Get Started
            </motion.div>
          </Link>
          <Link to="/pricing">
            <motion.div 
              whileHover={{ scale: 1.05, background: 'rgba(74, 144, 226, 0.1)' }}
              whileTap={{ scale: 0.95 }}
              className="btn-outline" 
              style={{ fontSize: '1rem', padding: '16px 32px' }}
            >
              View Pricing
            </motion.div>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default About;
