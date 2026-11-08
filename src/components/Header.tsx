import React, { useState, useEffect } from 'react';
import { Menu, X, Activity, Settings } from 'lucide-react';
import { ClinicInfo } from '../types/clinic';

interface HeaderProps {
  clinicInfo: ClinicInfo;
  onOpenBooking: () => void;
  onOpenCms: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  clinicInfo,
  onOpenBooking,
  onOpenCms,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Treatments', href: '#treatments' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Location', href: '#location' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3.5'
          : 'bg-[#F7FAFC]/85 backdrop-blur-sm border-b border-slate-200/50 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Single text element Brand wordmark with subtle clinic icon */}
          <a
            href="#home"
            className="flex items-center gap-2.5 text-[#10243A] group whitespace-nowrap shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-[#10243A] flex items-center justify-center text-[#16B8A6] shadow-sm group-hover:bg-[#16B8A6] group-hover:text-[#10243A] transition-all">
              <Activity className="w-5 h-5" />
            </div>
            <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-[#10243A]">
              {clinicInfo.name}
            </span>
          </a>

          {/* Zone 2: 4-5 single-line clean nav links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#16B8A6] transition-colors whitespace-nowrap shrink-0 py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 Primary CTA button (+ CMS settings toggle) */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={onOpenCms}
              title="Clinic Profile CMS (Edit details & placeholders)"
              className="p-2 text-slate-500 hover:text-[#10243A] hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Clinic Settings"
            >
              <Settings className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenBooking}
              className="px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#10243A] hover:bg-[#16B8A6] rounded-xl shadow-sm transition-all duration-200 whitespace-nowrap shrink-0"
            >
              Book Appointment
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 pb-4 border-t border-slate-200 animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-[#16B8A6] hover:bg-slate-50 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between px-3">
                <span className="text-xs text-slate-400">Kolar Road, Bhopal</span>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCms();
                  }}
                  className="text-xs text-[#16B8A6] font-medium flex items-center gap-1"
                >
                  <Settings className="w-3.5 h-3.5" /> Clinic CMS
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
