import { motion } from 'framer-motion';
import { Play, Recycle, Download, FileText, ExternalLink } from 'lucide-react';
import { Button } from '../components/ui/button'

export function VideoEducation() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative bg-white rounded-xl card-shadow p-8"
    >
      {/* Background Leaf Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 400 200">
          {[...Array(6)].map((_, i) => (
            <motion.ellipse
              key={i}
              cx={50 + i * 60}
              cy={100 + Math.sin(i) * 30}
              rx="15"
              ry="25"
              fill="#27AE60"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.3,
              }}
            />
          ))}
        </svg>
      </div>

      {/* Header */}
      <div className="text-center mb-6 relative z-10">
        <div className="flex items-center justify-center gap-3 mb-2">
          <h2 className="text-gray-900">Video Edukasi Bank Sampah</h2>
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <Recycle className="w-6 h-6 text-[#2ECC71]" />
          </motion.div>
        </div>
        <p className="text-gray-600">
          Learn how UPNVJT manages campus plastic waste responsibly
        </p>
      </div>

      {/* Video Frame */}
      <div className="relative z-10">
        <div
          className="relative w-full rounded-xl overflow-hidden"
          style={{
            paddingBottom: '56.25%', // 16:9 aspect ratio
            boxShadow: '0 4px 16px rgba(15,40,20,0.08)',
          }}
        >
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=1&modestbranding=1&rel=0"
            title="Tutorial Bank Sampah UPN"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Caption */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
            <Play className="w-4 h-4 text-[#27AE60]" />
            Tutorial Menyetor Sampah Plastik di Bank Sampah UPN
          </p>
        </div>

        {/* Resource Links */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-[#27AE60] border-[#27AE60] hover:bg-[#E8FDF0]"
            aria-label="Download user guide"
          >
            <Download className="w-4 h-4" />
            Download Panduan
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-[#27AE60] border-[#27AE60] hover:bg-[#E8FDF0]"
            aria-label="View transcript"
          >
            <FileText className="w-4 h-4" />
            Transkrip Video
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-[#27AE60] border-[#27AE60] hover:bg-[#E8FDF0]"
            aria-label="More resources"
          >
            <ExternalLink className="w-4 h-4" />
            Sumber Belajar Lainnya
          </Button>
        </div>
      </div>

      {/* Animated Icons */}
      <motion.div
        className="absolute top-6 right-6 text-[#2ECC71] opacity-20"
        animate={{
          y: [0, -8, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg width="40" height="60" viewBox="0 0 40 60">
          <ellipse cx="20" cy="30" rx="12" ry="20" fill="currentColor" />
          <path d="M 20 10 Q 20 30, 20 50" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-6 left-6 text-[#27AE60] opacity-20"
        animate={{
          y: [0, 8, 0],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      >
        <svg width="35" height="55" viewBox="0 0 35 55">
          <ellipse cx="17.5" cy="27.5" rx="10" ry="18" fill="currentColor" />
          <path d="M 17.5 9 Q 17.5 27.5, 17.5 46" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </motion.div>
    </motion.div>
  );
}
