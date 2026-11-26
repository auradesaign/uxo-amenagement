import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { BRAND_NAME_AR } from '../config/contact';

interface HeaderProps {
  onStartBooking: () => void;
}

export function Header({ onStartBooking }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { href: '#booking-wizard', label: 'تقديم طلب' },
    { href: '#how-it-works', label: 'آلية العمل' },
    { href: '#portfolio', label: 'نماذج الأعمال' },
    { href: '#footer-contact', label: 'التغطية الجغرافية' },
  ];

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  return (
    <header
      className="relative z-40 bg-transparent border-b"
      style={{ borderColor: 'var(--hero-border)' }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        <a
          href="#"
          style={{ color: 'var(--hero-ink)' }}
          className="text-lg font-bold tracking-tight whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white rounded"
        >
          {BRAND_NAME_AR}
        </a>

        <nav
          aria-label="التنقل الرئيسي"
          style={{ color: 'var(--hero-muted)' }}
          className="hidden md:flex items-center gap-7 text-sm font-medium"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:opacity-80 hover:underline underline-offset-8 transition-opacity whitespace-nowrap shrink-0 py-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white rounded"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              onStartBooking();
            }}
            style={{ backgroundColor: 'var(--cta-bg)', color: 'var(--cta-fg)' }}
            className="hidden sm:inline-flex items-center justify-center min-h-[40px] px-5 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            ابدأ طلبك الآن
          </button>

          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-panel"
            aria-label={mobileOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            onClick={() => setMobileOpen((prev) => !prev)}
            style={{ color: 'var(--hero-ink)', borderColor: 'var(--hero-border)' }}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl border bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="mobile-nav-panel"
          className="md:hidden border-t border-white/15 bg-[#0b1426]/85 backdrop-blur-md px-4 py-4 space-y-2 text-white"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={handleNavClick}
              className="flex items-center min-h-[44px] px-3 rounded-lg text-sm font-medium text-white hover:bg-white/10 transition-colors"
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              onStartBooking();
            }}
            className="w-full min-h-[44px] mt-2 px-5 py-2.5 rounded-xl bg-white text-[#1E1D1B] text-sm font-medium hover:bg-[#FAF8F5] transition-colors"
          >
            ابدأ طلبك الآن
          </button>
        </div>
      )}
    </header>
  );
}
