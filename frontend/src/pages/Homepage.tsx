import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Scale, Users, TreePine, ArrowRight, Recycle, TrendingUp, Award } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { BannerNews } from '../../components/ui/BannerNews';
import { VideoEducation } from '../../components/ui/VideoEducation';
import { WasteSubmissionForm } from '../../components/WasteSubmissionForm';

interface HomepageProps {
  onJoinClick: () => void;
}

export function Homepage({ onJoinClick }: HomepageProps) {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true });

  const [stats, setStats] = useState({
    totalWaste: 0,
    activeMembers: 0,
    environmentalImpact: 0,
  });

  // Count-up animation
  useEffect(() => {
    if (statsInView) {
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;

      const targets = {
        totalWaste: 12500,
        activeMembers: 189,
        environmentalImpact: 8750,
      };

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        setStats({
          totalWaste: Math.floor(targets.totalWaste * progress),
          activeMembers: Math.floor(targets.activeMembers * progress),
          environmentalImpact: Math.floor(targets.environmentalImpact * progress),
        });
        if (step >= steps) {
          clearInterval(timer);
          setStats(targets);
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [statsInView]);

  const features = [
    {
      icon: Recycle,
      title: 'Kumpulkan Sampah',
      description: 'Pisahkan sampah plastik Anda dan kumpulkan di drop point kampus.',
      color: '#2ECC71',
    },
    {
      icon: Scale,
      title: 'Timbang & Catat',
      description: 'Petugas menimbang dan mencatat berat sampah plastik Anda.',
      color: '#27AE60',
    },
    {
      icon: Award,
      title: 'Tukar Tabungan',
      description: 'Konversi sampah menjadi poin tabungan atau reward menarik.',
      color: '#2ECC71',
    },
  ];

  const publicStats = [
    {
      icon: Scale,
      value: stats.totalWaste,
      unit: 'kg',
      label: 'Total Sampah Terkumpul',
      color: '#2ECC71',
    },
    {
      icon: Users,
      value: stats.activeMembers,
      unit: 'nasabah',
      label: 'Nasabah Aktif',
      color: '#27AE60',
    },
    {
      icon: TreePine,
      value: stats.environmentalImpact,
      unit: 'kg CO₂',
      label: 'Dampak Lingkungan',
      color: '#2ECC71',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 800 600">
            {[...Array(12)].map((_, i) => (
              <motion.ellipse
                key={i}
                cx={100 + (i % 4) * 200}
                cy={100 + Math.floor(i / 4) * 200}
                rx="25"
                ry="40"
                fill="#27AE60"
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 10, 0],
                }}
                transition={{
                  duration: 4 + i * 0.3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.2,
                }}
              />
            ))}
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="inline-block px-4 py-2 bg-[#E8FDF0] rounded-full mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-[#27AE60] text-sm">
                  🌱 Green Campus Movement 2025
                </span>
              </motion.div>

              <h1 className="text-gray-900 mb-6">
                Let's Build a Sustainable Campus Together!
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Bergabunglah dengan Bank Sampah UPN dan jadilah bagian dari gerakan hijau kampus. 
                Setiap sampah plastik yang Anda setor berkontribusi untuk lingkungan yang lebih baik.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={() => {
                    const element = document.getElementById('submit-waste');
                    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  size="lg"
                  className="bg-[#2ECC71] hover:bg-[#27AE60] text-white ripple gap-2"
                  aria-label="Submit your plastic waste"
                >
                  <Recycle className="w-5 h-5" />
                  Submit Your Plastic Waste
                </Button>
                <Button
                  onClick={onJoinClick}
                  variant="outline"
                  size="lg"
                  className="border-[#27AE60] text-[#27AE60] hover:bg-[#E8FDF0] gap-2"
                  aria-label="Join as member"
                >
                  Join Us
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </motion.div>

            {/* Right - Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full h-96 bg-gradient-to-br from-[#E8FDF0] to-white rounded-3xl p-8 card-shadow">
                <svg viewBox="0 0 400 400" className="w-full h-full">
                  {/* Campus Building */}
                  <rect x="50" y="150" width="300" height="200" fill="#27AE60" opacity="0.2" rx="10" />
                  <rect x="80" y="180" width="240" height="150" fill="#2ECC71" opacity="0.3" rx="8" />
                  
                  {/* Trees */}
                  <motion.g
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <circle cx="100" cy="120" r="30" fill="#27AE60" opacity="0.6" />
                    <rect x="95" y="120" width="10" height="40" fill="#27AE60" opacity="0.4" />
                  </motion.g>

                  <motion.g
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  >
                    <circle cx="300" cy="120" r="30" fill="#2ECC71" opacity="0.6" />
                    <rect x="295" y="120" width="10" height="40" fill="#2ECC71" opacity="0.4" />
                  </motion.g>

                  {/* Recycling Bins */}
                  <rect x="150" y="250" width="40" height="60" fill="#2ECC71" rx="5" />
                  <rect x="210" y="250" width="40" height="60" fill="#27AE60" rx="5" />
                  
                  {/* Recycle Icon */}
                  <motion.g
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    style={{ transformOrigin: '200px 80px' }}
                  >
                    <circle cx="200" cy="80" r="35" fill="#2ECC71" opacity="0.3" />
                    <path
                      d="M 200 60 L 210 75 L 190 75 Z M 220 80 L 215 95 L 205 85 Z M 180 80 L 185 85 L 195 95 Z"
                      fill="#27AE60"
                    />
                  </motion.g>
                </svg>

                {/* Floating Leaves */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-[#27AE60] opacity-20"
                    style={{
                      left: `${20 + i * 20}%`,
                      top: `${10 + i * 15}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 4 + i,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: i * 0.4,
                    }}
                  >
                    <svg width="30" height="45" viewBox="0 0 30 45">
                      <ellipse cx="15" cy="22.5" rx="10" ry="18" fill="currentColor" />
                    </svg>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Waste Submission Form Section */}
      <WasteSubmissionForm />

      {/* Feature Cards Section */}
      <section className="py-20 bg-gradient-to-b from-white to-[#E8FDF0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-gray-900 mb-4">Cara Kerja Bank Sampah UPN</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Tiga langkah mudah untuk berkontribusi dalam gerakan hijau kampus
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white rounded-xl p-8 card-shadow hover:shadow-lg transition-all cursor-pointer"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${feature.color}20` }}
                >
                  <feature.icon className="w-8 h-8" style={{ color: feature.color }} />
                </div>
                <h3 className="text-xl text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Public Statistics Section */}
      <section ref={statsRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-gray-900 mb-4">Dampak Nyata yang Terukur</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Kontribusi nyata komunitas Bank Sampah UPN untuk lingkungan yang lebih baik
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {publicStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="bg-gradient-to-br from-white to-[#E8FDF0] rounded-xl p-8 card-shadow text-center"
              >
                <div className="flex justify-center mb-4">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <stat.icon className="w-10 h-10" style={{ color: stat.color }} />
                  </div>
                </div>
                <div className="text-4xl text-gray-900 mb-2">
                  {stat.value.toLocaleString()}
                  <span className="text-2xl ml-2 text-gray-600">{stat.unit}</span>
                </div>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Banner News Section */}
      <section className="py-20 bg-gradient-to-b from-white to-[#E8FDF0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BannerNews />
        </div>
      </section>

      {/* Video Education Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <VideoEducation />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 800 300">
            {[...Array(20)].map((_, i) => (
              <circle
                key={i}
                cx={50 + (i % 10) * 80}
                cy={50 + Math.floor(i / 10) * 200}
                r="30"
                fill="white"
                opacity="0.3"
              />
            ))}
          </svg>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-white mb-6">Siap Berkontribusi?</h2>
            <p className="text-white/90 text-xl mb-8 leading-relaxed">
              Jadilah bagian dari perubahan. Setiap langkah kecil Anda berarti besar bagi lingkungan kampus kita.
            </p>
            <Button
              onClick={onJoinClick}
              size="lg"
              className="bg-white text-[#27AE60] hover:bg-gray-100 ripple gap-2"
              aria-label="Start contributing to green campus"
            >
              Mulai Berkontribusi
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
