import React from 'react';

function Footer() {
  return (
    <footer className="footer" style={{ padding: '4rem 5%', borderTop: '1px solid var(--color-card-border)', background: 'var(--color-bg-secondary)' }}>
      <div className="footer-content" style={{ display: 'flex', justifyContent: 'space-between', gap: '3rem', flexWrap: 'wrap', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="footer-brand" style={{ flex: '1 1 300px' }}>
          <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              background: 'var(--color-gradient-primary)', 
              borderRadius: '12px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              boxShadow: '0 8px 16px rgba(74, 144, 226, 0.2)',
              position: 'relative'
            }}>
              {/* Briefcase Icon */}
              <div style={{ width: '22px', height: '16px', border: '2.5px solid #fff', borderRadius: '4px', position: 'relative', marginTop: '4px' }}>
                <div style={{ width: '8px', height: '5px', border: '2.5px solid #fff', borderBottom: 'none', borderRadius: '3px 3px 0 0', position: 'absolute', top: '-7px', left: '50%', transform: 'translateX(-50%)' }}></div>
                <div style={{ width: '4px', height: '4px', background: '#fff', borderRadius: '50%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></div>
              </div>
            </div>
            <span className="logo-text" style={{ fontSize: '1.6rem', fontWeight: '900', letterSpacing: '-0.02em', color: '#fff' }}>
              Caree<span style={{ color: 'var(--color-primary)' }}>va</span>
            </span>
          </div>
          <p className="footer-desc" style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', maxWidth: '350px', lineHeight: 1.6 }}>
            Membangun masa depan karier Anda melalui teknologi AI yang personal dan terpercaya.
          </p>
        </div>
        <div className="footer-links" style={{ flex: '1 1 200px' }}>
          <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.5rem' }}>Product</h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <li><a href="/" style={{ color: 'var(--color-text-secondary)' }}>Home</a></li>
            <li><a href="/career-assistant" style={{ color: 'var(--color-text-secondary)' }}>AI Assistant</a></li>
            <li><a href="/pricing" style={{ color: 'var(--color-text-secondary)' }}>Pricing</a></li>
          </ul>
        </div>
        <div className="footer-links" style={{ flex: '1 1 200px' }}>
          <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.5rem' }}>Company</h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <li><a href="/about" style={{ color: 'var(--color-text-secondary)' }}>About Us</a></li>
            <li><a href="#" style={{ color: 'var(--color-text-secondary)' }}>Features</a></li>
            <li><a href="#" style={{ color: 'var(--color-text-secondary)' }}>Careers</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom" style={{ maxWidth: '1200px', margin: '3rem auto 0', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
          &copy; {new Date().getFullYear()} Careeva AI. Hak Cipta Dilindungi.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
