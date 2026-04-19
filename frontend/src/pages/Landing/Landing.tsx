import React from 'react';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  ChartColumn,
  FingerprintPattern,
  Sparkle,
  Webhook,
  Zap,
  Menu,
  X,
} from 'lucide-react';
import './Landing.css';
import Button from '@/components/ui/button';

const Landing: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navLinkStyles =
    'text-muted transition-colors hover:text-white font-mono text-sm';

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.scroll-reveal').forEach((el) => {
        gsap.fromTo(
          el as Element,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el as Element,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          },
        );
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';

      const menuElement = document.querySelector('.mobile-menu');
      if (menuElement) {
        gsap.fromTo(
          menuElement,
          { x: 400, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4, ease: 'power3.out' },
        );
      }
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <div className="min-h-screen bg-bg flex flex-col gap-8 px-4 md:px-6 lg:px-12 pt-4 md:pt-8 lg:pt-12">
      <nav className="flex bg-transparent justify-between items-center">
        <h1 className="font-display font-extrabold text-2xl md:text-3xl sticky z-50">
          base<span className="text-accent">62</span>
        </h1>

        <div className="hidden md:flex gap-8 lg:gap-16 items-center">
          <NavLink to="" className={navLinkStyles}>
            Features
          </NavLink>
          <NavLink to="" className={navLinkStyles}>
            Analytics
          </NavLink>
          <NavLink to="" className={navLinkStyles}>
            Docs
          </NavLink>
          <Button variant="primary">
            Get Started <ArrowRight size={14} />
          </Button>
        </div>

        <button
          className="md:hidden z-50 cursor-pointer"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="mobile-menu md:hidden fixed inset-0 top-16 bg-bg/95 backdrop-blur z-40">
          <div className="flex flex-col gap-6 p-6">
            <NavLink
              to=""
              className={navLinkStyles}
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </NavLink>
            <NavLink
              to=""
              className={navLinkStyles}
              onClick={() => setMobileMenuOpen(false)}
            >
              Analytics
            </NavLink>
            <NavLink
              to=""
              className={navLinkStyles}
              onClick={() => setMobileMenuOpen(false)}
            >
              Docs
            </NavLink>
            <Button variant="primary" className="w-full">
              Get Started <ArrowRight size={14} />
            </Button>
          </div>
        </div>
      )}
      <section className="flex flex-col mt-4 md:mt-8 justify-center items-center gap-4">
        <p className="text-accent font-mono text-xs md:text-sm mb-2 md:mb-4">
          // URL SHORTENER + ANALYTICS
        </p>
        <div className="flex flex-col gap-2 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold justify-center items-center leading-tight">
          <h1>Short</h1>
          <h1 className="text-muted outline">Links.</h1>
          <h1 className="text-accent">
            Big <span className="text-text">Data.</span>
          </h1>
        </div>
        <p className="text-muted font-mono text-xs md:text-sm mt-3 md:mt-4 text-center max-w-2xl px-2">
          Shorten URLs, track every click, and understand your audience — all in
          one razor-sharp platform built for developers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-6 w-full sm:w-auto justify-center">
          <Button variant="primary">
            Start for free <ArrowRight size={14} />
          </Button>
          <Button variant="ghost">View the docs</Button>
        </div>
      </section>
      <section className="scroll-reveal mt-20 md:mt-36 flex flex-col justify-center items-center gap-4 px-2 md:px-0">
        <p className="text-accent font-mono text-xs md:text-sm mb-2 md:mb-4">
          // HOW IT WORKS
        </p>
        <div className="font-extrabold text-3xl md:text-4xl lg:text-5xl flex flex-col items-center mb-8 md:mb-16 text-center">
          <h2>One click.</h2>
          <h2>One link.</h2>
        </div>

        <div className="flex flex-col w-full max-w-2xl">
          <div className="flex items-center gap-2 md:gap-4 bg-surface border border-gray-800 px-3 md:px-6 py-4 md:py-5 overflow-hidden">
            <span className="font-mono text-xs text-muted uppercase tracking-widest min-w-8 md:min-w-12 shrink-0">
              Before
            </span>
            <span className="font-mono text-xs md:text-sm text-text break-all">
              https://www.example.com/blog/how-to-build-a-url-shortener-with-go-and-react/tutorial
            </span>
          </div>

          <div className="flex flex-col items-center py-1 border-x border-gray-800">
            <div className="w-px h-6 md:h-8 bg-linear-to-b from-border-custom to-accent" />
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 bg-surface border border-accent px-3 md:px-6 py-4 md:py-5">
            <span className="font-mono text-xs text-muted uppercase tracking-widest min-w-8 md:min-w-12 shrink-0">
              After
            </span>
            <span className="font-mono text-sm md:text-base text-accent font-medium break-all flex-1">
              b62.sh/xK9mP2
            </span>
            <button
              onClick={(e) => {
                const btn = e.currentTarget;
                btn.textContent = 'copied!';
                setTimeout(() => (btn.textContent = 'copy'), 1500);
              }}
              className="font-mono text-xs text-muted border border-border-custom px-3 py-1.5 hover:border-accent hover:text-accent transition-colors duration-200 cursor-pointer whitespace-nowrap"
            >
              copy
            </button>
          </div>
        </div>
      </section>

      <section className="scroll-reveal mt-20 md:mt-36 flex flex-col justify-center items-center gap-4 px-2 md:px-12">
        <p className="text-accent font-mono text-xs md:text-sm mb-2 md:mb-4">
          // FEATURES
        </p>
        <div className="font-extrabold text-3xl md:text-4xl lg:text-5xl flex flex-col items-center mb-8 md:mb-16 text-center">
          <h2>Everything</h2>
          <h2 className="text-muted" style={{ WebkitTextStroke: '1px #666' }}>
            you need.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 w-full max-w-4xl border border-border-custom divide-x divide-y divide-border-custom cursor-pointer">
          <div className="group p-6 md:p-10 flex flex-col gap-4 bg-bg hover:bg-surface transition-colors duration-300 relative overflow-hidden">
            <span className="text-xl md:text-2xl">
              <Zap />
            </span>
            <h3 className="font-extrabold text-lg md:text-xl tracking-tight">
              Instant Redirects
            </h3>
            <p className="font-mono text-xs md:text-sm text-muted leading-relaxed">
              Sub-20ms redirect times powered by Redis caching. Your users never
              notice the detour.
            </p>
            <span className="absolute -bottom-5 -right-2.5 text-6xl md:text-[120px] font-extrabold text-accent opacity-[0.03] group-hover:opacity-[0.2] transition-opacity duration-300 leading-none pointer-events-none">
              01
            </span>
          </div>

          <div className="group p-6 md:p-10 flex flex-col gap-4 bg-bg hover:bg-surface transition-colors duration-300 relative overflow-hidden">
            <span className="text-xl md:text-2xl">
              <ChartColumn />
            </span>
            <h3 className="font-extrabold text-lg md:text-xl tracking-tight">
              Deep Analytics
            </h3>
            <p className="font-mono text-xs md:text-sm text-muted leading-relaxed">
              Track every click with timestamp, device, browser, and location
              data. Know exactly who's clicking.
            </p>
            <span className="absolute -bottom-5 -right-2.5 text-6xl md:text-[120px] font-extrabold text-accent opacity-[0.03] group-hover:opacity-[0.2] transition-opacity duration-300 leading-none pointer-events-none">
              02
            </span>
          </div>

          <div className="group p-6 md:p-10 flex flex-col gap-4 bg-bg hover:bg-surface transition-colors duration-300 relative overflow-hidden">
            <span className="text-xl md:text-2xl">
              <FingerprintPattern />
            </span>
            <h3 className="font-extrabold text-lg md:text-xl tracking-tight">
              Secure by Default
            </h3>
            <p className="font-mono text-xs md:text-sm text-muted leading-relaxed">
              JWT authentication, bcrypt password hashing, and rate limiting on
              every endpoint.
            </p>
            <span className="absolute -bottom-5 -right-2.5 text-6xl md:text-[120px] font-extrabold text-accent opacity-[0.03] group-hover:opacity-[0.2] transition-opacity duration-300 leading-none pointer-events-none">
              03
            </span>
          </div>

          <div className="group p-6 md:p-10 flex flex-col gap-4 bg-bg hover:bg-surface transition-colors duration-300 relative overflow-hidden">
            <span className="text-xl md:text-2xl">
              <Webhook />
            </span>
            <h3 className="font-extrabold text-lg md:text-xl tracking-tight">
              Developer API
            </h3>
            <p className="font-mono text-xs md:text-sm text-muted leading-relaxed">
              Full REST API with clean JSON responses. Integrate Base62 into any
              stack in minutes.
            </p>
            <span className="absolute -bottom-5 -right-2.5 text-6xl md:text-[120px] font-extrabold text-accent opacity-[0.03] group-hover:opacity-[0.2] transition-opacity duration-300 leading-none pointer-events-none">
              04
            </span>
          </div>
        </div>
      </section>

      <section className="scroll-reveal mt-20 md:mt-36 w-full bg-surface px-4 md:px-12 lg:px-24 py-12 md:py-24 lg:py-24">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 items-center max-w-6xl mx-auto">
          <div className="flex flex-col gap-4 md:gap-6 flex-1">
            <p className="text-accent font-mono text-xs tracking-widest uppercase">
              // Analytics Dashboard
            </p>
            <h2 className="font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight">
              See who's
              <br />
              clicking.
            </h2>
            <p className="font-mono text-xs md:text-sm text-muted leading-relaxed max-w-sm">
              Real-time click data visualised beautifully. Understand your
              audience, optimise your links, and make decisions backed by data.
            </p>
            <div className="flex flex-col gap-2 md:gap-3 mt-2">
              {[
                'Click counts per link',
                'Device & browser breakdown',
                'Geographic location tracking',
                'Time-based click trends',
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 font-mono text-xs md:text-sm text-muted"
                >
                  <span className="text-accent shrink-0">
                    <Sparkle size={9} />
                  </span>
                  {item}
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-4">
              <Button variant="primary">
                Explore Dashboard
                <ArrowRight size={14} />
              </Button>
              <Button variant="ghost">Learn more</Button>
            </div>
          </div>

          <div className="flex-1 w-full bg-bg border border-border-custom p-4 md:p-6 lg:p-8 flex flex-col gap-4 md:gap-6">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-xs text-muted uppercase tracking-widest">
                  Clicks / 7 days
                </span>
                <span className="font-extrabold text-2xl md:text-3xl tracking-tight text-accent">
                  12,847
                </span>
              </div>
              <div className="flex gap-2">
                {['7d', '30d', '90d'].map((label, i) => (
                  <button
                    key={label}
                    className={`font-mono text-xs px-2 md:px-3 py-1.5 border transition-colors duration-200 cursor-pointer ${
                      i === 0
                        ? 'border-accent text-accent'
                        : 'border-border-custom text-muted hover:border-muted hover:text-text'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div
              className="flex items-end gap-1 md:gap-2 mt-2"
              style={{ height: '100px', minHeight: '80px' }}
            >
              {[
                { h: '45%' },
                { h: '62%' },
                { h: '38%' },
                { h: '80%' },
                { h: '55%' },
                { h: '91%' },
                { h: '70%' },
              ].map((bar, i) => (
                <div
                  key={i}
                  className="flex-1 flex flex-col justify-end"
                  style={{ height: '100%' }}
                >
                  <div
                    className="w-full hover:opacity-80 transition-opacity duration-200 cursor-pointer"
                    style={{
                      height: bar.h,
                      background: 'rgba(232,255,71,0.15)',
                      borderTop: '2px solid #e8ff47',
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-1 md:gap-2 overflow-x-auto">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <span
                  key={day}
                  className="flex-1 text-center font-mono text-xs text-muted min-w-fit"
                >
                  {day}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-px bg-border-custom border border-border-custom mt-2">
              {[
                { label: 'Avg / day', value: '1,835' },
                { label: 'Peak day', value: 'Sat' },
                { label: 'Growth', value: '+12%' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-bg px-3 md:px-4 py-2 md:py-3 flex flex-col gap-1"
                >
                  <span className="font-mono text-xs text-muted uppercase tracking-widest">
                    {stat.label}
                  </span>
                  <span className="font-extrabold text-base md:text-lg tracking-tight text-text">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="scroll-reveal mt-20 md:mt-36 flex flex-col items-center justify-center gap-6 md:gap-8 px-4 md:px-12 py-16 md:py-24 lg:py-36 relative overflow-hidden">
        {/* BG GLOW */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(232,255,71,0.05) 0%, transparent 70%)',
          }}
        />

        {/* GHOST TEXT */}
        <span
          className="absolute font-extrabold pointer-events-none select-none text-center"
          style={{
            fontSize: 'clamp(80px, 20vw, 200px)',
            color: 'rgba(232,255,71,0.02)',
            letterSpacing: '-8px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          BASE62
        </span>

        <p className="text-accent font-mono text-xs tracking-widest uppercase relative z-10">
          // Get Started
        </p>

        <h2
          className="font-extrabold text-center leading-none tracking-tight relative z-10 px-2"
          style={{ fontSize: 'clamp(32px, 8vw, 100px)', letterSpacing: '-2px' }}
        >
          Start
          <br />
          <span
            style={{
              WebkitTextStroke: '1px rgba(240,240,240,0.2)',
              color: 'transparent',
            }}
          >
            shortening
          </span>
          <br />
          today.
        </h2>

        <p className="font-mono text-xs md:text-sm text-muted relative z-10 text-center max-w-lg">
          No credit card. No nonsense. Just links that work.
        </p>

        <div className="relative z-10">
          <Button variant="primary" size="lg">
            Make my links shorter <ArrowRight size={16} />
          </Button>
        </div>
      </section>

      <footer className="py-6 md:py-8 flex flex-col md:flex-row justify-between items-center gap-4 px-2">
        <h1 className="font-display font-extrabold text-xl md:text-2xl">
          base<span className="text-accent">62</span>
        </h1>

        <div className="flex flex-wrap gap-4 md:gap-8 justify-center">
          {[
            { label: 'GitHub', to: 'https://github.com' },
            { label: 'Docs', to: '/docs' },
            { label: 'API', to: '/api' },
            { label: 'Status', to: '/status' },
          ].map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className="font-mono text-xs text-muted hover:text-text transition-colors duration-200 tracking-widest uppercase"
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <span className="font-mono text-xs text-muted text-center md:text-right">
          Built with Go + React
        </span>
      </footer>
    </div>
  );
};

export default Landing;
