import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Calendar, User, Clock, Phone, MapPin, Menu, X, ArrowUpRight, Shield } from 'lucide-react';
import { CLINIC_INFO } from '../data';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

export default function Navbar({ activeTab, setActiveTab, isLoggedIn, onLogout }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'treatments', label: 'Treatments' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'blog', label: 'Blog' },
    { id: 'faqs', label: 'FAQs' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full max-w-full overflow-x-hidden bg-[#122315]/85 backdrop-blur-md border-b border-[#C5A880]/20 shadow-lg">
      {/* Top Contact Bar */}
      <div className="bg-[#0D180E] text-[#EAE4DC] py-2 px-4 text-xs border-b border-[#C5A880]/15">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-1">
            <span className="flex items-center gap-1.5 text-[#C5A880]">
              <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
              <span className="text-[11px] font-medium text-[#EAE4DC]">Hours: Mon - Sat 11:00 AM - 8:00 PM</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-[#C5A880]">
              <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
              <span className="text-[11px] font-medium text-[#EAE4DC]">Canal Expressway, Faisalabad</span>
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <a href={`tel:${CLINIC_INFO.phone}`} className="flex items-center gap-1.5 font-bold text-[#C5A880] hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>{CLINIC_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left: Clinic Logo - LUMÉA Botanical Skin Sanctuary */}
          <motion.div 
            id="nav-logo-container"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleTabClick('home')} 
            className="flex items-center gap-3 cursor-pointer shrink-0 select-none group"
          >
            <div className="w-10 h-10 rounded-full bg-[#1A3121] border border-[#C5A880]/40 flex items-center justify-center text-[#C5A880] shadow-md group-hover:border-[#C5A880] transition-colors">
              <span className="font-serif italic font-bold text-lg">L</span>
            </div>
            <div>
              <span className="block text-2xl font-serif font-bold tracking-tight text-white font-serif">
                LUMÉA
              </span>
              <span className="block text-[9px] font-medium tracking-[0.2em] text-[#C5A880] uppercase -mt-1">
                Botanical Skin Sanctuary
              </span>
            </div>
          </motion.div>

          {/* Center: Glassmorphism Floating Pill Menu */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/10 backdrop-blur-md border border-white/20 p-1.5 rounded-full relative shadow-inner">
            {navigationItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  id={`nav-btn-${item.id}`}
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`relative px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all z-10 cursor-pointer ${
                    isActive ? 'text-[#122315] font-bold' : 'text-[#EAE4DC] hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 bg-[#C5A880] rounded-full shadow-md z-[-1]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            {/* Patient Portal Button */}
            <motion.button
              id="nav-btn-portal"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleTabClick('portal')}
              className={`hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-full border transition-all cursor-pointer ${
                activeTab === 'portal'
                  ? 'border-[#C5A880] bg-[#C5A880]/20 text-[#C5A880]'
                  : 'border-[#C5A880]/30 bg-white/5 hover:bg-white/10 text-[#EAE4DC]'
              }`}
            >
              <User className="w-4 h-4 text-[#C5A880]" />
              <span>{isLoggedIn ? 'Dashboard' : 'Portal Login'}</span>
            </motion.button>

            {/* Book Appointment Pill Button */}
            <motion.button
              id="nav-btn-quick-book"
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => handleTabClick('booking')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-[#C5A880] hover:bg-[#B89768] text-[#122315] transition-all shadow-md cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#122315]" />
              <span>Book Appointment</span>
            </motion.button>

            {/* Mobile Menu Toggle */}
            <button
              id="nav-btn-mobile-trigger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-full border border-[#C5A880]/30 text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <motion.div 
          id="mobile-drawer-overlay"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="lg:hidden fixed inset-x-0 top-[120px] bg-[#122315] border-b border-[#C5A880]/30 shadow-2xl py-5 px-4 space-y-5 z-40 max-h-[calc(100vh-130px)] overflow-y-auto"
        >
          <div className="space-y-1.5">
            <p className="text-[10px] font-bold text-[#C5A880] uppercase tracking-widest pl-1">Sanctuary Menu</p>
            <div className="grid grid-cols-2 gap-2">
              {navigationItems.map((item) => (
                <button
                  id={`nav-btn-mobile-${item.id}`}
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`p-3 rounded-2xl text-left text-xs font-bold transition-all border ${
                    activeTab === item.id
                      ? 'bg-[#C5A880] border-[#C5A880] text-[#122315]'
                      : 'bg-[#1A3121] border-[#C5A880]/20 text-[#EAE4DC]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-[#C5A880]/20 space-y-2">
            <button
              id="nav-btn-mobile-portal"
              onClick={() => handleTabClick('portal')}
              className={`w-full p-3.5 rounded-2xl text-xs font-bold flex items-center justify-between border ${
                activeTab === 'portal'
                  ? 'bg-[#C5A880] border-[#C5A880] text-[#122315]'
                  : 'bg-[#1A3121] border-[#C5A880]/20 text-[#EAE4DC]'
              }`}
            >
              <span className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#C5A880]" />
                {isLoggedIn ? 'Go to Patient Dashboard' : 'Patient Portal Login'}
              </span>
              <ArrowUpRight className="w-4 h-4 text-[#C5A880]" />
            </button>

            {isLoggedIn && (
              <button
                id="nav-btn-mobile-logout"
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full p-3 rounded-2xl text-center text-xs font-bold bg-red-950/60 text-red-300 border border-red-800/40"
              >
                Log Out
              </button>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
}


