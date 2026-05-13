import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: { monthly: 0, yearly: 0 },
    description: 'Perfect for students and recent graduates exploring AI tools.',
    features: [
      { text: '3 CV Analysis per month', included: true },
      { text: '5 Cover Letters per month', included: true },
      { text: 'Basic Career Assistant', included: true },
      { text: 'Basic Mock Interviews', included: true },
      { text: 'UI/UX Critic access', included: false },
      { text: 'LinkedIn Optimizer', included: false },
      { text: 'Priority AI Processing', included: false },
    ],
    cta: 'Get Started Free',
    popular: false,
    color: 'var(--color-text-secondary)',
  },
  {
    id: 'pro',
    name: 'Pro Professional',
    price: { monthly: 15, yearly: 12 },
    description: 'For active job seekers who want the ultimate edge.',
    features: [
      { text: 'Unlimited CV Analysis', included: true },
      { text: 'Unlimited Cover Letters', included: true },
      { text: 'Advanced Career Assistant', included: true },
      { text: 'Advanced Mock Interviews', included: true },
      { text: 'Full UI/UX Critic access', included: true },
      { text: 'LinkedIn Optimizer', included: true },
      { text: 'Priority AI Processing', included: true },
    ],
    cta: 'Upgrade to Pro',
    popular: true,
    color: 'var(--color-primary)',
  },
  {
    id: 'teams',
    name: 'Teams',
    price: { monthly: 49, yearly: 39 },
    description: 'For bootcamps and institutions helping students land jobs.',
    features: [
      { text: 'Everything in Pro', included: true },
      { text: 'Up to 10 user accounts', included: true },
      { text: 'Custom API Access', included: true },
      { text: 'Admin Dashboard', included: true },
      { text: 'Dedicated Support', included: true },
      { text: 'Custom Branding', included: true },
      { text: 'Analytics & Reports', included: true },
    ],
    cta: 'Contact Sales',
    popular: false,
    color: 'var(--color-secondary)',
  },
];

function Pricing() {
  const [billing, setBilling] = useState('monthly');
  const navigate = useNavigate();

  const handleCta = (plan) => {
    if (plan.id === 'starter') {
      navigate('/career-assistant');
      toast.success('Selamat datang! Mulai gunakan fitur gratis.');
    } else if (plan.id === 'pro') {
      toast('🚀 Redirecting to payment gateway...', { icon: '💳' });
      setTimeout(() => toast.success('Fitur pembayaran segera hadir!'), 1500);
    } else {
      toast('📧 Tim kami akan menghubungi kamu!', { icon: '📞' });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ padding: '4rem 5%', maxWidth: '1200px', margin: '0 auto', minHeight: 'calc(100vh - 70px)' }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(16,185,129,0.08)', border: '1px solid var(--color-card-border)', borderRadius: '999px', padding: '6px 16px', marginBottom: '1.5rem', fontSize: '0.85rem', color: 'var(--color-accent)' }}
        >
          💎 Simple, Transparent Pricing
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ fontSize: 'clamp(1.8rem, 5vw, 2.6rem)', fontWeight: '800', marginBottom: '0.8rem', lineHeight: 1.2 }}
        >
          Choose Your <span className="gradient-text">Career Plan</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', maxWidth: '500px', margin: '0 auto 2rem', lineHeight: 1.6 }}
        >
          All plans include access to our core AI features. Upgrade anytime.
        </motion.p>

        {/* Billing toggle */}
        <div style={{ display: 'inline-flex', background: 'rgba(16,185,129,0.06)', border: '1px solid var(--color-card-border)', borderRadius: '12px', padding: '4px', gap: '0' }}>
          {['monthly', 'yearly'].map(b => (
            <motion.button 
              key={b} 
              onClick={() => setBilling(b)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '8px 24px', borderRadius: '10px', fontWeight: '600', fontSize: '0.9rem', transition: 'all 0.2s', textTransform: 'capitalize',
                background: billing === b ? 'var(--color-gradient-primary)' : 'transparent',
                color: billing === b ? '#080C14' : 'var(--color-text-secondary)',
                border: 'none',
                cursor: 'pointer'
              }}>
              {b} {b === 'yearly' && <span style={{ fontSize: '0.75rem', opacity: 0.85 }}>(-20%)</span>}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Plans */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        {plans.map((plan, idx) => (
          <motion.div 
            key={plan.id} 
            className="glass-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + idx * 0.1 }}
            whileHover={{ 
              y: -8,
              transition: { duration: 0.2 }
            }}
            style={{
              flex: '1 1 290px', maxWidth: '360px', padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', position: 'relative',
              border: plan.popular ? '1px solid var(--color-primary)' : '1px solid var(--color-card-border)',
              background: plan.popular ? 'rgba(16,185,129,0.05)' : 'var(--color-card-glass)',
              boxShadow: plan.popular ? '0 20px 40px rgba(16,185,129,0.1)' : 'none',
              zIndex: plan.popular ? 1 : 0,
              scale: plan.popular ? 1.04 : 1
            }}
          >
            {plan.popular && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: 'var(--color-gradient-primary)', color: '#080C14', padding: '4px 18px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '800', whiteSpace: 'nowrap' }}
              >
                MOST POPULAR
              </motion.div>
            )}

            <div style={{ fontWeight: '700', color: plan.color, marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.85rem' }}>{plan.name}</div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginBottom: '0.5rem' }}>
              <motion.span 
                key={billing}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ fontSize: '3rem', fontWeight: '900', lineHeight: 1 }}
              >
                {plan.price[billing] === 0 ? 'Free' : `$${plan.price[billing]}`}
              </motion.span>
              {plan.price[billing] > 0 && <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>/mo</span>}
            </div>

            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.88rem', marginBottom: '2rem', lineHeight: 1.5 }}>{plan.description}</p>

            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2.5rem', flex: 1 }}>
              {plan.features.map((feature, i) => (
                <li key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', fontSize: '0.88rem', color: feature.included ? 'var(--color-text-primary)' : 'var(--color-text-secondary)', opacity: feature.included ? 1 : 0.5 }}>
                  <span style={{ color: feature.included ? 'var(--color-primary)' : 'var(--color-text-secondary)', fontWeight: '700', flexShrink: 0 }}>
                    {feature.included ? '✓' : '✗'}
                  </span>
                  {feature.text}
                </li>
              ))}
            </ul>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={plan.popular ? "btn-gradient" : "btn-outline"} 
              style={{ width: '100%', padding: '13px', borderRadius: '12px', border: plan.popular ? 'none' : '1px solid var(--color-card-border)' }} 
              onClick={() => handleCta(plan)}
            >
              {plan.cta} {plan.popular && '→'}
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* FAQ strip */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{ marginTop: '4rem', textAlign: 'center' }}
      >
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
          Have questions? <motion.a whileHover={{ x: 3 }} href="/about" style={{ color: 'var(--color-accent)', fontWeight: '600', display: 'inline-block' }}>Talk to us →</motion.a>
        </p>
      </motion.div>
    </motion.div>
  );
}

export default Pricing;
