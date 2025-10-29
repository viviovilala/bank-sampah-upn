import { motion } from 'framer-motion';
import { Recycle, Scale, Award, UserPlus, Package, TrendingUp, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';

interface HowItWorksProps {
  onJoinClick: () => void;
}

export function HowItWorks({ onJoinClick }: HowItWorksProps) {
  const steps = [
    {
      number: '01',
      icon: UserPlus,
      title: 'Daftar Sebagai Nasabah',
      description: 'Datang ke drop point Bank Sampah UPN dengan membawa KTM/identitas untuk mendaftar sebagai nasabah. Gratis dan mudah!',
      color: '#2ECC71',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
    },
    {
      number: '02',
      icon: Package,
      title: 'Kumpulkan Sampah Plastik',
      description: 'Pisahkan sampah plastik Anda dari rumah atau tempat tinggal. Pastikan dalam kondisi bersih dan kering untuk nilai lebih tinggi.',
      color: '#27AE60',
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop',
    },
    {
      number: '03',
      icon: Scale,
      title: 'Setor & Timbang',
      description: 'Bawa sampah plastik ke drop point kampus. Petugas akan menimbang dan mencatat berat sampah Anda secara transparan.',
      color: '#2ECC71',
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=300&fit=crop',
    },
    {
      number: '04',
      icon: Award,
      title: 'Dapatkan Poin & Reward',
      description: 'Setiap kilogram sampah akan dikonversi menjadi poin tabungan. Tukar dengan uang tunai atau reward menarik lainnya.',
      color: '#27AE60',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
    },
  ];

  const benefits = [
    {
      icon: Recycle,
      title: 'Lingkungan Lebih Bersih',
      description: 'Mengurangi sampah plastik di kampus dan lingkungan sekitar',
    },
    {
      icon: TrendingUp,
      title: 'Dapat Penghasilan Tambahan',
      description: 'Sampah plastik Anda bernilai ekonomi dan bisa ditabung',
    },
    {
      icon: Award,
      title: 'Kontribusi Nyata',
      description: 'Menjadi bagian dari Green Campus Movement 2025',
    },
  ];

  const requirements = [
    'KTM UPNVJT atau identitas mahasiswa/dosen/staff',
    'Sampah plastik bersih dan kering (botol, kemasan, sachet)',
    'Minimal setoran 0.5 kg',
    'Datang ke drop point pada jam operasional',
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#E8FDF0] to-white overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 800 600">
            {[...Array(15)].map((_, i) => (
              <motion.ellipse
                key={i}
                cx={80 + (i % 5) * 160}
                cy={80 + Math.floor(i / 5) * 200}
                rx="20"
                ry="35"
                fill="#27AE60"
                animate={{
                  y: [0, -12, 0],
                  rotate: [0, 8, 0],
                }}
                transition={{
                  duration: 3.5 + i * 0.3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.15,
                }}
              />
            ))}
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-6 py-2 bg-[#E8FDF0] rounded-full mb-6"
            >
              <span className="text-[#27AE60] font-medium">♻️ Cara Kerja</span>
            </motion.div>

            <h1 className="text-gray-900 mb-6">
              Bagaimana Bank Sampah UPN Bekerja?
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Empat langkah mudah untuk berkontribusi dalam gerakan hijau kampus dan mendapatkan manfaat ekonomi dari sampah plastik Anda.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: `${step.color}20` }}
                    >
                      <step.icon className="w-8 h-8" style={{ color: step.color }} />
                    </div>
                    <span
                      className="text-6xl opacity-10"
                      style={{ color: step.color }}
                    >
                      {step.number}
                    </span>
                  </div>

                  <h2 className="text-gray-900 mb-4">{step.title}</h2>
                  <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    {step.description}
                  </p>

                  {index === 0 && (
                    <Button
                      onClick={onJoinClick}
                      className="bg-gradient-to-r from-[#2ECC71] to-[#27AE60] hover:from-[#27AE60] hover:to-[#229954] text-white ripple"
                    >
                      Daftar Sekarang
                    </Button>
                  )}
                </div>

                {/* Image */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className={index % 2 === 1 ? 'lg:order-1' : ''}
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <div
                        className="inline-block px-4 py-2 rounded-lg font-semibold text-white text-lg"
                        style={{ backgroundColor: step.color }}
                      >
                        Langkah {step.number}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-white to-[#E8FDF0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-gray-900 mb-4">Manfaat Bergabung</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Lebih dari sekadar membuang sampah, Anda mendapatkan nilai tambah
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-xl p-8 card-shadow hover:shadow-lg transition-all text-center"
              >
                <div className="w-16 h-16 bg-[#E8FDF0] rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="w-8 h-8 text-[#27AE60]" />
                </div>
                <h3 className="text-xl text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-gray-900 mb-4">Syarat & Ketentuan</h2>
            <p className="text-gray-600">
              Persiapkan hal-hal berikut sebelum menyetor sampah plastik
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#E8FDF0] to-white rounded-2xl p-8 card-shadow"
          >
            <div className="space-y-4">
              {requirements.map((req, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-8 h-8 bg-[#2ECC71] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-gray-700 text-lg">{req}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="bg-[#2ECC71]/10 border-l-4 border-[#27AE60] p-4 rounded">
                <p className="text-sm text-gray-700">
                  <strong>💡 Tips:</strong> Untuk nilai jual lebih tinggi, pastikan sampah plastik dalam kondisi bersih, kering, dan sudah dipisahkan berdasarkan jenisnya (botol, kemasan, sachet).
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Drop Point Info */}
      <section className="py-20 bg-gradient-to-b from-white to-[#E8FDF0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 md:p-12 card-shadow"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-gray-900 mb-4">Lokasi Drop Point</h2>
                <p className="text-gray-600 mb-6">
                  Bank Sampah UPN memiliki 15 drop point yang tersebar di berbagai lokasi strategis di kampus UPNVJT.
                </p>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#E8FDF0] rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-[#27AE60]" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Jam Operasional</p>
                      <p className="text-gray-600">Senin - Jumat: 08.00 - 16.00 WIB</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#E8FDF0] rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-[#27AE60]" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Lokasi Utama</p>
                      <p className="text-gray-600">Gedung Rektorat UPNVJT Lantai 1</p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={onJoinClick}
                  size="lg"
                  className="bg-gradient-to-r from-[#2ECC71] to-[#27AE60] hover:from-[#27AE60] hover:to-[#229954] text-white ripple"
                >
                  Mulai Sekarang
                </Button>
              </div>

              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-[#E8FDF0] to-[#2ECC71]/10 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <Recycle className="w-16 h-16 text-[#27AE60] mx-auto mb-4 animate-leaf-sway" />
                    <p className="text-gray-600">
                      Peta drop point akan dimuat di sini
                    </p>
                  </div>
                </div>

                {/* Floating decoration */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-[#27AE60] opacity-10"
                    style={{
                      left: `${20 + i * 30}%`,
                      top: `${10 + i * 20}%`,
                    }}
                    animate={{
                      y: [0, -15, 0],
                      rotate: [0, 10, 0],
                    }}
                    transition={{
                      duration: 3 + i,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: i * 0.5,
                    }}
                  >
                    <svg width="40" height="60" viewBox="0 0 40 60">
                      <ellipse cx="20" cy="30" rx="15" ry="25" fill="currentColor" />
                    </svg>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#2ECC71] to-[#27AE60]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-white mb-6">Siap Bergabung?</h2>
            <p className="text-white/90 text-xl mb-8">
              Mulai kontribusi Anda untuk kampus hijau yang lebih baik
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={onJoinClick}
                size="lg"
                className="bg-white text-[#27AE60] hover:bg-gray-100 ripple"
              >
                Daftar Sebagai Nasabah
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10"
              >
                Pelajari Lebih Lanjut
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
