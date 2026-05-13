import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Password dan konfirmasi password tidak cocok!');
      return;
    }
    toast.success(`Akun berhasil dibuat untuk: ${name}`);
    navigate('/login');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="auth-container"
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 100px)', padding: '2rem' }}
    >
      <motion.div 
        initial={{ y: 20, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="glass-card auth-card"
        style={{ width: '100%', maxWidth: '480px', padding: '3rem' }}
      >
        <motion.h2 
          initial={{ x: -10 }}
          animate={{ x: 0 }}
          style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem', textAlign: 'center' }}
        >
          Create Account
        </motion.h2>
        <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center', marginBottom: '2.5rem', fontSize: '0.95rem' }}>
          Join thousands of professionals accelerating their career with Careeva.
        </p>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '600' }}>Full Name</label>
            <motion.input 
              whileFocus={{ scale: 1.01, borderColor: 'var(--color-primary)' }}
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="John Doe"
              required 
              style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-card-border)', padding: '12px 16px', borderRadius: '10px', color: 'white', outline: 'none', transition: 'border-color 0.3s' }}
            />
          </div>
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '600' }}>Email Address</label>
            <motion.input 
              whileFocus={{ scale: 1.01, borderColor: 'var(--color-primary)' }}
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="name@company.com"
              required 
              style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-card-border)', padding: '12px 16px', borderRadius: '10px', color: 'white', outline: 'none', transition: 'border-color 0.3s' }}
            />
          </div>
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '600' }}>Password</label>
            <motion.input 
              whileFocus={{ scale: 1.01, borderColor: 'var(--color-primary)' }}
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••"
              required 
              style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-card-border)', padding: '12px 16px', borderRadius: '10px', color: 'white', outline: 'none', transition: 'border-color 0.3s' }}
            />
          </div>
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '600' }}>Confirm Password</label>
            <motion.input 
              whileFocus={{ scale: 1.01, borderColor: 'var(--color-primary)' }}
              type="password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              placeholder="••••••••"
              required 
              style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-card-border)', padding: '12px 16px', borderRadius: '10px', color: 'white', outline: 'none', transition: 'border-color 0.3s' }}
            />
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.02, boxShadow: '0 10px 25px rgba(74, 144, 226, 0.3)' }}
            whileTap={{ scale: 0.98 }}
            type="submit" 
            className="btn-gradient" 
            style={{ width: '100%', padding: '14px', marginTop: '1rem', borderRadius: '10px', fontWeight: '700' }}
          >
            Create Account
          </motion.button>
        </form>
        
        <p style={{ marginTop: '2.5rem', textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
          Already have an account? {' '}
          <Link to="/login">
            <motion.span 
              whileHover={{ color: 'var(--color-primary)', textDecoration: 'underline' }}
              style={{ color: 'white', fontWeight: '700', transition: 'color 0.2s' }}
            >
              Sign in
            </motion.span>
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
}

export default Register;
