import React, { useState } from 'react';
import { Stethoscope, Calendar, User, Clock, Phone, MapPin, Menu, X, ArrowRight, ShieldAlert } from 'lucide-react';
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
    { id: 'doctors', label: 'Our Doctors' },
    { id: 'treatments', label: 'Treatments' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'blog', label: 'Skincare Blog' },
    { id: 'faqs', label: 'FAQs' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-primary/10 shadow-xs">
      {/* Top Banner with Timings & Quick Contact */}
      <div className="bg-primary text-white/90 py-2.5 px-4 text-[11px]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1">
            <span className="flex items-center gap-1 font-mono">
              <Clock className="w-3.5 h-3.5 text-accent" />
              <span>Timings: Mon - Sat 11:00 AM - 08:00 PM (Sun: On-Call)</span>
            </span>
            <span className="hidden md:flex items-center gap-1 font-mono">
              <MapPin className="w-3.5 h-3.5 text-accent" />
              <span>Doc+ Building, Canal Expy, Faisalabad</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href={`tel:${CLINIC_INFO.phone}`} className="flex items-center gap-1 font-semibold hover:text-accent transition-colors">
              <Phone className="w-3.5 h-3.5 text-accent" />
              <span>Helpdesk: {CLINIC_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Brand Logo */}
          <div 
            id="nav-logo-container"
            onClick={() => handleTabClick('home')} 
            className="flex items-center gap-2.5 cursor-pointer shrink-0"
          >
            <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-accent shadow-xs">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-lg font-display font-semibold tracking-tight text-primary">
                Doc<span className="text-accent font-bold font-sans">+</span> Dermatology
              </span>
              <span className="block text-[10px] font-mono tracking-widest text-primary/60 uppercase -mt-0.5">
                Premium Clinical Care
              </span>
            </div>
          </div>

          {/* Navigation Links - Centered Pill design on large screens */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#FAF9F5] border border-primary/10 p-1.5 rounded-full">
            {navigationItems.map((item) => (
              <button
                id={`nav-btn-${item.id}`}
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  activeTab === item.id
                    ? 'bg-primary text-white shadow-xs font-bold'
                    : 'text-primary/70 hover:text-primary hover:bg-primary/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Actions & Hamburg Menu */}
          <div className="flex items-center gap-2.5">
            {/* Patient Dashboard Button */}
            <button
              id="nav-btn-portal"
              onClick={() => handleTabClick('portal')}
              className={`hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full border transition-all ${
                activeTab === 'portal'
                  ? 'border-primary bg-primary/5 text-primary font-bold'
                  : 'border-primary/20 hover:bg-primary/5 text-primary/70'
              }`}
            >
              <User className="w-3.5 h-3.5 text-primary" />
              <span>{isLoggedIn ? 'My Dashboard' : 'Patient Portal'}</span>
            </button>

            {/* Book Appointment CTA */}
            <button
              id="nav-btn-quick-book"
              onClick={() => handleTabClick('booking')}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-accent hover:bg-accent/95 text-primary transition-all shadow-xs hover:shadow-md hover:scale-[1.02]"
            >
              <Calendar className="w-3.5 h-3.5 text-primary" />
              <span className="hidden xs:inline">Book Consultation</span>
              <span className="inline xs:hidden">Book</span>
            </button>

            {/* Mobile Drawer Trigger */}
            <button
              id="nav-btn-mobile-trigger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg border border-primary/20 text-primary hover:bg-primary/5 transition-colors focus:outline-hidden"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE NAV DRAWER OVERLAY */}
      {mobileMenuOpen && (
        <div 
          id="mobile-drawer-overlay"
          className="lg:hidden fixed inset-x-0 top-[115px] bg-white border-b border-[#F6D6D8]/40 shadow-xl py-6 px-4 space-y-6 z-40 max-h-[calc(100vh-120px)] overflow-y-auto animate-fade-in"
        >
          <div className="space-y-1.5">
            <p className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest pl-2">Navigation</p>
            <div className="grid grid-cols-2 gap-2">
              {navigationItems.map((item) => (
                <button
                  id={`nav-btn-mobile-${item.id}`}
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`p-3 rounded-xl text-left text-xs font-semibold transition-all border ${
                    activeTab === item.id
                      ? 'bg-[#A8C3A0]/10 border-[#A8C3A0] text-slate-800'
                      : 'bg-white border-slate-100 text-gray-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 space-y-3">
            <p className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest pl-2">Secure Portals</p>
            <div className="flex flex-col gap-2">
              <button
                id="nav-btn-mobile-portal"
                onClick={() => handleTabClick('portal')}
                className={`p-3.5 rounded-xl text-left text-xs font-semibold flex items-center justify-between border ${
                  activeTab === 'portal'
                    ? 'bg-[#A8C3A0]/10 border-[#A8C3A0] text-slate-800'
                    : 'bg-[#FAF8F8] border-slate-100 text-gray-700'
                }`}
              >
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#A8C3A0]" />
                  {isLoggedIn ? 'Go to Patient Dashboard' : 'Login to Patient Portal'}
                </span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </button>

              {isLoggedIn && (
                <button
                  id="nav-btn-mobile-logout"
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="p-3.5 rounded-xl text-center text-xs font-semibold bg-red-50 text-red-600 border border-red-100"
                >
                  Log Out Secure Session
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
