import { motion } from 'framer-motion';
import { Target, Eye, Users, Award, Leaf, Building } from 'lucide-react';
import { UPNLogo } from './UPNLogo';
import { useRef } from 'react';

export function About() {
  const activities = [
    {
      title: 'Kampanye Bebas Plastik',
      description: 'Edukasi dan sosialisasi pengurangan sampah plastik di lingkungan kampus',
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop',
    },
    {
      title: 'Workshop Daur Ulang',
      description: 'Pelatihan kreasi produk daur ulang dari sampah plastik',
      image: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=400&h=300&fit=crop',
    },
    {
      title: 'Green Campus Day',
      description: 'Event rutin pengumpulan dan pengelolaan sampah kampus',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop',
    },
  ];

  const values = [
    {
      icon: Target,
      title: 'Visi',
      description:
        'Menjadikan UPNVJT sebagai kampus hijau yang berkelanjutan dengan zero waste pada tahun 2030.',
      color: '#2ECC71',
    },
    {
      icon: Eye,
      title: 'Misi',
      description:
        'Mengelola sampah plastik kampus secara bertanggung jawab dan memberdayakan civitas akademika dalam gerakan lingkungan.',
      color: '#27AE60',
    },
    {
      icon: Users,
      title: 'Komunitas',
      description:
        'Membangun ekosistem kampus yang peduli lingkungan melalui partisipasi aktif seluruh warga kampus.',
      color: '#2ECC71',
    },
  ];

  const achievements = [
    { icon: Award, value: '12,500+', label: 'Kg Sampah Terolah' },
    { icon: Users, value: '189', label: 'Nasabah Aktif' },
    { icon: Leaf, value: '8,750', label: 'Kg CO₂ Dikurangi' },
    { icon: Building, value: '15', label: 'Drop Point Kampus' },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#E8FDF0] to-white overflow-hidden">
        {/* Background Pattern */}
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
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center mb-8"
            >
              <div className="relative">
                <UPNLogo className="w-32 h-32" />
                <motion.div
                  className="absolute -inset-4 border-2 border-[#2ECC71] rounded-full opacity-20"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-900 mb-4"
            >
              Tentang Bank Sampah UPN
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              Bank Sampah UPN "Veteran" Jawa Timur adalah inisiatif pengelolaan sampah plastik kampus 
              yang mengintegrasikan edukasi, partisipasi, dan teknologi untuk menciptakan kampus berkelanjutan.
            </motion.p>
          </div>

          {/* Achievements Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-white rounded-xl p-6 card-shadow text-center"
              >
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 rounded-full bg-[#E8FDF0] flex items-center justify-center">
                    <achievement.icon className="w-6 h-6 text-[#27AE60]" />
                  </div>
                </div>
                <div className="text-2xl text-[#2ECC71] mb-1">{achievement.value}</div>
                <p className="text-sm text-gray-600">{achievement.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision, Mission, Community */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-gray-900 mb-4">Visi, Misi & Komunitas</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Fondasi kami dalam membangun gerakan hijau di UPNVJT
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="bg-gradient-to-br from-white to-[#E8FDF0] rounded-xl p-8 card-shadow"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${value.color}20` }}
                >
                  <value.icon className="w-8 h-8" style={{ color: value.color }} />
                </div>
                <h3 className="text-xl text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Carousel */}
      <section className="py-20 bg-gradient-to-b from-white to-[#E8FDF0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-gray-900 mb-4">Kegiatan Kami</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Berbagai aktivitas dan program untuk mendukung kampus berkelanjutan
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-xl overflow-hidden card-shadow hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-lg">{activity.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600">{activity.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-gray-900 mb-4">Pengelola Bank Sampah UPN</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-12">
              Dikelola oleh mahasiswa dan dosen UPNVJT dalam program KKN Hijau dan Green Campus Movement
            </p>

            <div className="bg-gradient-to-r from-[#E8FDF0] to-white rounded-xl p-12 card-shadow">
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-[#2ECC71]/20 flex items-center justify-center mx-auto mb-4">
                    <Users className="w-12 h-12 text-[#27AE60]" />
                  </div>
                  <h3 className="text-xl text-gray-900 mb-2">Tim Pengelola</h3>
                  <p className="text-gray-600">15 Mahasiswa KKN</p>
                </div>

                <div className="hidden md:block w-px h-24 bg-gray-300" />

                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-[#27AE60]/20 flex items-center justify-center mx-auto mb-4">
                    <Award className="w-12 h-12 text-[#2ECC71]" />
                  </div>
                  <h3 className="text-xl text-gray-900 mb-2">Pembimbing</h3>
                  <p className="text-gray-600">3 Dosen Pendamping</p>
                </div>

                <div className="hidden md:block w-px h-24 bg-gray-300" />

                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-[#2ECC71]/20 flex items-center justify-center mx-auto mb-4">
                    <Building className="w-12 h-12 text-[#27AE60]" />
                  </div>
                  <h3 className="text-xl text-gray-900 mb-2">Lokasi</h3>
                  <p className="text-gray-600">Kampus UPNVJT Surabaya</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#2ECC71] to-[#27AE60]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-white mb-4">Tertarik Bergabung?</h2>
            <p className="text-white/90 text-lg mb-6">
              Hubungi kami untuk informasi lebih lanjut tentang Bank Sampah UPN
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
