import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

function Courses() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  const courses = [
    {
      id: 1,
      title: "Frontend Development with React",
      level: "Pemula",
      duration: "8 Minggu",
      students: 1240,
      description: "Pelajari dasar-dasar React, Hooks, dan pengelolaan state untuk membangun antarmuka web modern yang interaktif.",
      category: "Programming"
    },
    {
      id: 2,
      title: "Backend Development Node.js",
      level: "Menengah",
      duration: "10 Minggu",
      students: 856,
      description: "Bangun RESTful API yang handal, pahami autentikasi, dan kelola database dengan Node.js dan Express.",
      category: "Programming"
    },
    {
      id: 3,
      title: "UI/UX Design Masterclass",
      level: "Semua Tingkat",
      duration: "6 Minggu",
      students: 2100,
      description: "Kuasai Figma, wireframing, prototyping, dan prinsip desain user-centric untuk aplikasi digital.",
      category: "Design"
    },
    {
      id: 4,
      title: "Data Science for Beginners",
      level: "Pemula",
      duration: "12 Minggu",
      students: 630,
      description: "Pahami dasar-dasar Python, analisis data dengan Pandas, dan pengenalan machine learning.",
      category: "Data"
    }
  ];

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ padding: '4rem 5%', maxWidth: '1200px', margin: '0 auto' }}
    >
      <motion.div 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        style={{ textAlign: 'center', marginBottom: '4rem' }}
      >
        <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem' }}>
          Katalog <span className="gradient-text">Kelas</span>
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem' }}>Pilih dari berbagai kelas yang dirancang khusus oleh para pakar industri.</p>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          style={{ marginTop: '2.5rem', maxWidth: '600px', margin: '2.5rem auto 0', position: 'relative' }}
        >
          <motion.input 
            whileFocus={{ scale: 1.02, borderColor: 'var(--color-primary)' }}
            type="text" 
            placeholder="Cari kelas (contoh: React, Design)..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-card-border)', padding: '16px 24px 16px 48px', borderRadius: '14px', color: 'white', fontSize: '1rem', outline: 'none', transition: 'border-color 0.3s' }}
          />
          <span style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', fontSize: '1.2rem', opacity: 0.5 }}>🔍</span>
        </motion.div>
      </motion.div>

      <motion.div 
        layout
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}
      >
        <AnimatePresence mode="popLayout">
          {filteredCourses.map((course, idx) => (
            <motion.div 
              key={course.id} 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8, borderColor: 'var(--color-primary)', background: 'rgba(255,255,255,0.03)' }}
              className="glass-card" 
              style={{ display: 'flex', flexDirection: 'column', padding: '2rem', borderRadius: '16px', border: '1px solid var(--color-card-border)', transition: 'background 0.3s, border-color 0.3s' }}
            >
              <div style={{ marginBottom: '1.5rem' }}>
                <motion.span 
                  whileHover={{ scale: 1.1, rotate: -2 }}
                  style={{ display: 'inline-block', padding: '6px 14px', background: 'rgba(74, 144, 226, 0.12)', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-primary)', marginBottom: '1rem' }}
                >
                  {course.category}
                </motion.span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '0.75rem', lineHeight: '1.4' }}>{course.title}</h3>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '1.25rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>📊 {course.level}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>⏱️ {course.duration}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>👥 {course.students} Siswa</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                  {course.description}
                </p>
              </div>
              
              <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-gradient" 
                  style={{ width: '100%', padding: '12px', fontWeight: '700' }} 
                  onClick={() => navigate('/login')}
                >
                  Daftar Kelas
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredCourses.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', color: 'var(--color-text-secondary)' }}
          >
            <p style={{ fontSize: '1.1rem' }}>Tidak ada kelas yang ditemukan dengan kata kunci tersebut.</p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default Courses;
