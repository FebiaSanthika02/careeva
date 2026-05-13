import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success('Berhasil keluar dari akun');
    navigate('/');
  };

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
    <motion.main 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{ padding: '3rem 5%', maxWidth: '1200px', margin: '0 auto' }}
    >
      <motion.div 
        variants={itemVariants}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}
      >
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800' }}>Candidate <span className="gradient-text">Dashboard</span></h1>
        <motion.button 
          whileHover={{ scale: 1.05, color: '#ef4444' }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout} 
          style={{ background: 'transparent', border: 'none', color: 'var(--color-text-secondary)', fontWeight: '600', cursor: 'pointer' }}
        >
          Logout
        </motion.button>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {/* Profile Card */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -5, borderColor: 'var(--color-primary)' }}
          className="glass-card" 
          style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--color-gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: '800', color: 'white', marginBottom: '1.5rem', boxShadow: '0 10px 20px rgba(74, 144, 226, 0.3)' }}
          >
            BA
          </motion.div>
          <div className="profile-info">
            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '0.25rem' }}>Budi Ahmad</h3>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>budi.ahmad@example.com</p>
            <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '999px', padding: '6px 16px', fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: '600' }}>
              Profile Completion: 80%
            </div>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-outline" 
            style={{ marginTop: '2rem', width: '100%' }}
          >
            Edit Profile
          </motion.button>
        </motion.div>

        {/* Stats Card */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -5, borderColor: 'var(--color-primary)' }}
          className="glass-card" 
          style={{ padding: '2.5rem' }}
        >
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '2rem' }}>Application Stats</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            {[
              { label: 'Sent', value: '3', color: 'white' },
              { label: 'Interview', value: '1', color: '#4A90E2' },
              { label: 'Rejected', value: '0', color: '#ef4444' }
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                  style={{ fontSize: '2rem', fontWeight: '800', color: stat.color, marginBottom: '0.5rem' }}
                >
                  {stat.value}
                </motion.div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Activity Card */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -5, borderColor: 'var(--color-primary)' }}
          className="glass-card" 
          style={{ padding: '2.5rem' }}
        >
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1.5rem' }}>Recent Activity</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {[
              { title: 'Frontend React Developer', status: 'Interview Scheduled', time: '2 days ago' },
              { title: 'UI/UX Designer', status: 'Application Sent', time: '1 week ago' }
            ].map((activity, i) => (
              <motion.div 
                key={i}
                whileHover={{ x: 5 }}
                style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}
              >
                <div style={{ fontWeight: '700', fontSize: '0.95rem', marginBottom: '0.25rem' }}>{activity.title}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: '600' }}>{activity.status}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>{activity.time}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}

export default Dashboard;
