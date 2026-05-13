import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="logo">
            <span className="logo-icon"></span>
            <span className="logo-text">NUSANTARATECH</span>
          </div>
          <p className="footer-desc">Membangun talenta digital masa depan Indonesia melalui inovasi dan kolaborasi.</p>
        </div>
        <div className="footer-links">
          <h4>Tautan Cepat</h4>
          <ul>
            <li><a href="/">Beranda</a></li>
            <li><a href="/jobs">Lowongan Kerja</a></li>
            <li><a href="/login">Masuk</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} NusantaraTech. Hak Cipta Dilindungi.</p>
      </div>
    </footer>
  );
}

export default Footer;
