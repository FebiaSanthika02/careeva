import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const mockJobs = [
  { id: 1, title: 'Frontend React Developer', department: 'Engineering', location: 'Jakarta', type: 'Full-time', description: 'Membangun antarmuka modern yang responsif menggunakan React. Anda akan berkolaborasi dengan desainer UI/UX dan backend engineer untuk menghadirkan pengalaman pengguna yang optimal.' },
  { id: 2, title: 'Data Scientist', department: 'Data', location: 'Remote', type: 'Full-time', description: 'Menganalisis big data untuk menemukan insight bisnis. Anda diharapkan menguasai Python, SQL, dan model Machine Learning dasar.' },
  { id: 3, title: 'Product Manager', department: 'Product', location: 'Bandung', type: 'Full-time', description: 'Memimpin visi produk dari konsepsi hingga peluncuran. Mampu bekerja secara agile dan berkomunikasi dengan berbagai pemangku kepentingan.' },
  { id: 4, title: 'UI/UX Designer', department: 'Design', location: 'Jakarta', type: 'Contract', description: 'Merancang wireframe, prototipe, dan antarmuka akhir dengan fokus pada kemudahan pengguna.' },
];

function Jobs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);

  const filteredJobs = mockJobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    job.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApply = (e) => {
    e.preventDefault();
    toast.success('CV berhasil diunggah dan lamaran terkirim!', {
      duration: 4000,
      position: 'top-center',
    });
    setSelectedJob(null); // Close modal
  };

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="page-container" 
      style={{ padding: '4rem 5%', maxWidth: '1200px', margin: '0 auto' }}
    >
      <motion.div 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="page-header" 
        style={{ textAlign: 'center', marginBottom: '3rem' }}
      >
        <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem' }}>Temukan <span className="gradient-text">Karir Impianmu</span></h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem' }}>Bergabunglah dengan tim yang bersemangat memecahkan masalah besar.</p>
      </motion.div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="search-container" 
        style={{ maxWidth: '600px', margin: '0 auto 4rem', position: 'relative' }}
      >
        <motion.input 
          whileFocus={{ scale: 1.02, borderColor: 'var(--color-primary)' }}
          type="text" 
          placeholder="Cari pekerjaan atau departemen..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-card-border)', padding: '16px 24px 16px 48px', borderRadius: '14px', color: 'white', fontSize: '1rem', outline: 'none', transition: 'border-color 0.3s' }}
        />
        <span style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', fontSize: '1.2rem', opacity: 0.5 }}>🔍</span>
      </motion.div>

      <motion.div 
        layout
        className="jobs-list" 
        style={{ display: 'grid', gap: '1.5rem' }}
      >
        <AnimatePresence mode="popLayout">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, idx) => (
              <motion.div 
                key={job.id} 
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5, background: 'rgba(255,255,255,0.05)', borderColor: 'var(--color-primary)' }}
                className="glass-card job-card" 
                style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', transition: 'background 0.3s, border-color 0.3s' }}
                onClick={() => setSelectedJob(job)}
              >
                <div className="job-info">
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.75rem' }}>{job.title}</h3>
                  <div className="job-meta" style={{ display: 'flex', gap: '1rem', alignItems: 'center', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                    <motion.span 
                      animate={{ y: [0, -2, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: idx * 0.5 }}
                      className="badge" 
                      style={{ background: 'rgba(74, 144, 226, 0.1)', color: 'var(--color-primary)', padding: '4px 12px', borderRadius: '6px', fontWeight: '600' }}
                    >
                      {job.department}
                    </motion.span>
                    <span>📍 {job.location}</span>
                    <span>🕒 {job.type}</span>
                  </div>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-gradient" 
                  style={{ padding: '10px 24px', fontSize: '0.9rem' }}
                >
                  Lihat Detail
                </motion.button>
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="no-results" 
              style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-text-secondary)' }}
            >
              <p>Pekerjaan tidak ditemukan. Coba kata kunci lain.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Modal Detail Pekerjaan */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay" 
            onClick={() => setSelectedJob(null)}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '2rem' }}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="glass-card modal-content" 
              onClick={e => e.stopPropagation()}
              style={{ width: '100%', maxWidth: '650px', padding: '3rem', position: 'relative', background: 'var(--color-bg)', border: '1px solid var(--color-card-border)' }}
            >
              <motion.button 
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="modal-close" 
                onClick={() => setSelectedJob(null)}
                style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: 'var(--color-text-secondary)', fontSize: '2rem', cursor: 'pointer' }}
              >
                ×
              </motion.button>
              
              <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '1rem' }}>{selectedJob.title}</h2>
              <div className="job-meta" style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem', color: 'var(--color-text-secondary)' }}>
                <span className="badge" style={{ background: 'rgba(74, 144, 226, 0.1)', color: 'var(--color-primary)', padding: '4px 12px', borderRadius: '6px', fontWeight: '600' }}>{selectedJob.department}</span>
                <span>{selectedJob.location}</span>
                <span>{selectedJob.type}</span>
              </div>
              
              <div className="modal-section" style={{ marginBottom: '2.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem' }}>Deskripsi Pekerjaan</h3>
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.8' }}>{selectedJob.description}</p>
              </div>
              
              <div className="modal-section">
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1.5rem' }}>Kirim Lamaran</h3>
                <form onSubmit={handleApply} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '0.75rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Upload CV (PDF/DOCX)</label>
                    <motion.input 
                      whileHover={{ borderColor: 'var(--color-primary)' }}
                      type="file" 
                      accept=".pdf,.doc,.docx" 
                      style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-card-border)', borderRadius: '10px', color: 'white' }} 
                      required 
                    />
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit" 
                    className="btn-gradient" 
                    style={{ width: '100%', padding: '14px', fontWeight: '700' }}
                  >
                    Kirim Lamaran Sekarang
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
}

export default Jobs;
