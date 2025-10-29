import { motion } from 'framer-motion';
import { UPNLogo } from '../components/ui/UPNLogo';
import { Instagram, Youtube, Globe } from 'lucide-react';

export function Footer() {
  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Globe, href: '#', label: 'Website' },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full bg-gradient-to-b from-[#2ECC71] to-[#27AE60] text-white mt-16 relative overflow-hidden"
    >
      {/* Leaf Pattern Background */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 800 200">
          {[...Array(10)].map((_, i) => (
            <ellipse
              key={i}
              cx={50 + i * 80}
              cy={100}
              rx="15"
              ry="25"
              fill="white"
            />
          ))}
        </svg>
      </div>

      {/* Floating Leaf Decoration */}
      <motion.div
        className="absolute bottom-8 left-8 opacity-10 hidden lg:block"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg width="60" height="90" viewBox="0 0 60 90">
          <ellipse cx="30" cy="45" rx="20" ry="35" fill="white" />
          <path d="M 30 10 Q 30 45, 30 80" stroke="white" strokeWidth="3" fill="none" />
        </svg>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Top Section - 3 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-8">
          {/* Left - Logo */}
          <div className="flex justify-center md:justify-start">
            <motion.div
              whileHover={{
                scale: 1.05,
                filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.4))',
              }}
              className="grayscale hover:grayscale-0 transition-all cursor-pointer"
            >
              <UPNLogo className="w-16 h-16" />
            </motion.div>
          </div>

          {/* Center - Title & Subtitle */}
          <div className="text-center">
            <h3 className="text-white mb-2">Bank Sampah UPN</h3>
            <p className="text-white/90 text-sm">
              Part of UPNVJT Green Campus Movement 2025
            </p>
          </div>

          {/* Right - Social Icons */}
          <div className="flex items-center justify-center md:justify-end gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{
                  scale: 1.1,
                  rotate: 10,
                  filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.4))',
                }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full border-2 border-white/30 hover:border-white/60 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
                aria-label={`Visit our ${social.label}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
              >
                <social.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-px bg-white/30 my-8"
        />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/90 text-center md:text-left" style={{ letterSpacing: '0.3px' }}>
            © 2025 Bank Sampah UPN – Universitas Pembangunan Nasional "Veteran" Jawa Timur
          </p>
          <p className="text-sm text-white/80 text-center md:text-right">
            Designed with ❤️ by Mahasiswa Sistem Informasi UPNVJT
          </p>
        </div>
      </div>

      {/* Wave Divider (Optional decorative top edge) */}
      <svg
        className="absolute top-0 left-0 w-full"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        style={{ height: '60px' }}
      >
        <path
          d="M0,30 Q360,0 720,30 T1440,30 L1440,60 L0,60 Z"
          fill="white"
          opacity="0.1"
        />
      </svg>
    </motion.footer>
  );
}

