import { useState } from 'react';
import { Menu, X, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { UPNLogo } from '../components/ui/UPNLogo';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function Navbar({ currentPage, onNavigate, onLogout }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', id: 'dashboard' },
    { name: 'Transactions', id: 'transaksi' },
    { name: 'Weekly Reports', id: 'laporan' },
    { name: 'Chat', id: 'chat' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#2ECC71]/90 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            className="flex items-center gap-3"
            onClick={() => onNavigate('dashboard')}
            aria-label="Go to dashboard home"
          >
            <UPNLogo className="w-10 h-10 icon-lift" />
            <span className="text-white text-lg">Bank Sampah UPN</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-white link-hover transition-colors ${
                  currentPage === item.id ? 'opacity-100' : 'opacity-90 hover:opacity-100'
                }`}
                aria-label={`Navigate to ${item.name}`}
                aria-current={currentPage === item.id ? 'page' : undefined}
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={onLogout}
              className="flex items-center gap-2 text-white link-hover opacity-90 hover:opacity-100 transition-colors"
              aria-label="Logout from dashboard"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-[#27AE60] border-t border-white/10"
        >
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left text-white py-2 px-3 rounded-lg transition-colors ${
                  currentPage === item.id ? 'bg-white/20' : 'hover:bg-white/10'
                }`}
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={() => {
                onLogout();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 w-full text-left text-white py-2 px-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
