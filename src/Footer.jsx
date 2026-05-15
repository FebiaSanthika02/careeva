import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer" style={{ background: 'transparent' }}>
      <div className="footer-content" style={{ display: 'flex', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap', maxWidth: '900px', margin: '0 auto' }}>
        <div className="footer-brand" style={{ flex: '1 1 200px' }}>
          <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <div style={{
              width: '28px',
              height: '28px',
              background: 'var(--color-gradient-primary)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(74, 144, 226, 0.15)',
              position: 'relative'
            }}>
              {/* Briefcase Icon - Extra Small */}
              <div style={{ width: '14px', height: '10px', border: '1.5px solid #fff', borderRadius: '2px', position: 'relative', marginTop: '2px' }}>
                <div style={{ width: '5px', height: '3px', border: '1.5px solid #fff', borderBottom: 'none', borderRadius: '1.5px 1.5px 0 0', position: 'absolute', top: '-4.5px', left: '50%', transform: 'translateX(-50%)' }}></div>
                <div style={{ width: '2px', height: '2px', background: '#fff', borderRadius: '50%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></div>
              </div>
            </div>
            <span className="logo-text" style={{ fontSize: '1.2rem', fontWeight: '900', letterSpacing: '-0.02em', color: '#fff' }}>
              Caree<span style={{ color: 'var(--color-primary)' }}>va</span>
            </span>
          </div>
          <p className="footer-desc" style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem', maxWidth: '250px', lineHeight: 1.5 }}>
            Membangun masa depan karier Anda melalui teknologi AI yang personal dan terpercaya.
          </p>
        </div>

        <div className="footer-nav-groups" style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
          <div className="footer-links">
            <h4 style={{ fontSize: '0.85rem', fontWeight: '800', marginBottom: '1rem', textTransform: 'uppercase', color: 'var(--color-text-primary)', letterSpacing: '0.05em' }}>Product</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><Link to="/" style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>Home</Link></li>
              <li><Link to="/career-assistant" style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>AI Assistant</Link></li>
              <li><Link to="/pricing" style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>Pricing</Link></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4 style={{ fontSize: '0.85rem', fontWeight: '800', marginBottom: '1rem', textTransform: 'uppercase', color: 'var(--color-text-primary)', letterSpacing: '0.05em' }}>Company</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><Link to="/about" style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>About Us</Link></li>
              <li><Link to="/features" style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>Features</Link></li>
              <li><Link to="/careers" style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>Careers</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom" style={{ maxWidth: '900px', margin: '1rem auto 0', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>
          &copy; {new Date().getFullYear()} Careeva AI. Hak Cipta Dilindungi.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
