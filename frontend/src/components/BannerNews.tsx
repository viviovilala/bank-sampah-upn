import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface NewsItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

export function BannerNews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: 'Green Campus 2025',
      description: 'Program Pengelolaan Sampah Fakultas Teknik - Target pengurangan sampah plastik 40%',
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=200&fit=crop',
    },
    {
      id: 2,
      title: 'KKN Hijau',
      description: 'Mahasiswa KKN Tematik melakukan sosialisasi bank sampah ke masyarakat sekitar kampus',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=200&fit=crop',
    },
    {
      id: 3,
      title: 'Kampus Bebas Plastik',
      description: 'Deklarasi kampus bebas plastik sekali pakai - Seluruh civitas akademika mendukung',
      image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=200&fit=crop',
    },
    {
      id: 4,
      title: 'Green Governance Update',
      description: 'Laporan triwulan pencapaian UPNVJT dalam program keberlanjutan lingkungan',
      image: 'https://images.unsplash.com/photo-1972115915127-89ae0b1bbe1d?w=400&h=200&fit=crop',
    },
    {
      id: 5,
      title: 'Program Pengelolaan Sampah Fakultas Ekonomi',
      description: 'Drop point baru dibuka - Pengumpulan setiap Senin & Kamis pukul 09:00 WIB',
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=200&fit=crop',
    },
  ];

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % newsItems.length);
      }, 300000); // 5 minutes = 300000ms

      return () => clearInterval(interval);
    }
  }, [isPaused, newsItems.length]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + newsItems.length) % newsItems.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % newsItems.length);
  };

  const currentNews = newsItems[currentIndex];

  return (
    <div
      className="relative w-full h-48 rounded-xl overflow-hidden group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{
        background: 'linear-gradient(135deg, #E8FDF0 0%, #FFFFFF 100%)',
      }}
    >
      {/* Left Accent Border */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#27AE60] z-10"></div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentNews.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center h-full px-8 gap-6"
        >
          {/* Image */}
          <div className="flex-shrink-0 w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <ImageWithFallback
              src={currentNews.image}
              alt={currentNews.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="text-gray-900 mb-2">{currentNews.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
              {currentNews.description}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <button
          onClick={handlePrevious}
          className="w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center text-[#27AE60] hover:scale-110 transition-transform pointer-events-auto"
          aria-label="Previous banner"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          className="w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center text-[#27AE60] hover:scale-110 transition-transform pointer-events-auto"
          aria-label="Next banner"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {newsItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-[#27AE60] w-6'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to banner ${index + 1}`}
          />
        ))}
      </div>

      {/* Bottom Accent Border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#2ECC71]"></div>
    </div>
  );
}
