import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import Home from './Home';
import Features from './Features';
import CareerAssistant from './CareerAssistant';
import UiUxCritic from './UiUxCritic';
import DailyHelper from './DailyHelper';
import CareerPath from './CareerPath';
import SalaryNegotiator from './SalaryNegotiator';
import LinkedinOptimizer from './LinkedinOptimizer';
import Pricing from './Pricing';
import About from './About';
import Footer from './Footer';
import './App.css';

function Header() {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/features', label: 'Features' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/about', label: 'About' },
  ];

  const handleNavClick = (to) => {
    navigate(to);
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header 
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '0 5%', height: '70px',
        borderBottom: '1px solid var(--color-card-border)',
        background: 'rgba(8, 12, 20, 0.85)',
        backdropFilter: 'blur(20px)',
        position: 'sticky', top: 0, zIndex: 1000
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
        <Link to="/" style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.5px', color: 'var(--color-text-primary)', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            style={{ 
              display: 'inline-flex', 
              width: '40px', 
              height: '40px', 
              background: 'linear-gradient(135deg, #4a90e2 0%, #7cb9e8 100%)', 
              borderRadius: '12px', 
              alignItems: 'center', 
              justifyContent: 'center', 
              flexShrink: 0,
              boxShadow: '0 8px 16px rgba(74, 144, 226, 0.2)',
              position: 'relative'
            }}
          >
            {/* Briefcase Icon */}
            <div style={{ width: '22px', height: '16px', border: '2.5px solid #fff', borderRadius: '4px', position: 'relative', marginTop: '4px' }}>
              <div style={{ width: '8px', height: '5px', border: '2.5px solid #fff', borderBottom: 'none', borderRadius: '3px 3px 0 0', position: 'absolute', top: '-7px', left: '50%', transform: 'translateX(-50%)' }}></div>
              <div style={{ width: '4px', height: '4px', background: '#fff', borderRadius: '50%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></div>
            </div>
          </motion.div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.1rem' }}>
            <span style={{ fontWeight: '900' }}>Caree</span>
            <span style={{ color: 'var(--color-primary)', fontWeight: '900' }}>va</span>
          </span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="desktop-nav" style={{ display: 'flex', gap: '0.5rem', fontSize: '0.9rem', fontWeight: '500' }}>
          {navLinks.map(({ to, label }) => {
            const isActive = path === to;
            const commonStyle = {
              color: isActive ? 'var(--color-accent)' : 'var(--color-text-secondary)',
              padding: '6px 14px', borderRadius: '8px', transition: 'all 0.2s',
              background: isActive ? 'rgba(74, 144, 226, 0.1)' : 'transparent',
              display: 'flex', alignItems: 'center', cursor: 'pointer'
            };

            return (
              <motion.div key={label} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to={to} style={commonStyle}>
                  {label}
                </Link>
              </motion.div>
            );
          })}
        </nav>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <motion.button 
          whileHover={{ scale: 1.05, boxShadow: '0 8px 25px rgba(74, 144, 226, 0.4)' }}
          whileTap={{ scale: 0.95 }}
          className="btn-gradient desktop-only" 
          onClick={() => navigate('/career-assistant')} 
          style={{ fontSize: '0.9rem', padding: '10px 22px' }}
        >
          Try Now
        </motion.button>

        {/* Hamburger Icon */}
        <motion.button 
          className="mobile-only"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{ fontSize: '1.5rem', color: 'white' }}
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </motion.button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed', top: 0, right: 0, width: '80%', height: '100vh',
              background: 'rgba(13, 19, 33, 0.98)', backdropFilter: 'blur(10px)',
              zIndex: 2000, padding: '5rem 2rem', display: 'flex', flexDirection: 'column', gap: '2rem'
            }}
          >
            {navLinks.map(({ to, label }) => {
              const isActive = path === to;
              return (
                <motion.div 
                  key={label} 
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNavClick(to)}
                >
                  <Link to={to} style={{ fontSize: '1.5rem', fontWeight: '700', color: isActive ? 'var(--color-primary)' : 'white' }}>
                    {label}
                  </Link>
                </motion.div>
              );
            })}
            <motion.button 
              whileTap={{ scale: 0.95 }}
              className="btn-gradient"
              onClick={() => { navigate('/career-assistant'); setIsMobileMenuOpen(false); }}
              style={{ marginTop: '2rem', width: '100%', padding: '15px' }}
            >
              🚀 Try Now
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}


function App() {
  return (
    <Router>
      <div className="app-container">
        <Toaster position="top-center" reverseOrder={false} toastOptions={{
          style: { background: '#0D1321', color: '#F0FDF4', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '12px' }
        }} />
        <Header />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/career-assistant" element={<CareerAssistant />} />
            <Route path="/ui-ux-critic" element={<UiUxCritic />} />
            <Route path="/daily-helper" element={<DailyHelper />} />
            <Route path="/career-path" element={<CareerPath />} />
            <Route path="/salary-negotiator" element={<SalaryNegotiator />} />
            <Route path="/linkedin-optimizer" element={<LinkedinOptimizer />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
