import { motion } from 'framer-motion';
import { Bell, Calendar, TrendingUp, Award, Leaf } from 'lucide-react';

interface Announcement {
  id: number;
  title: string;
  date: string;
  icon: any;
  thumbnail?: string;
}

export function AnnouncementSidebar() {
  const announcements: Announcement[] = [
    {
      id: 1,
      title: 'Pencapaian Target Mingguan',
      date: '27 Okt 2025',
      icon: TrendingUp,
    },
    {
      id: 2,
      title: 'Workshop Pengelolaan Sampah',
      date: '25 Okt 2025',
      icon: Award,
    },
    {
      id: 3,
      title: 'Kampus Bebas Plastik Week',
      date: '22 Okt 2025',
      icon: Leaf,
    },
    {
      id: 4,
      title: 'Penyerahan Reward Nasabah',
      date: '20 Okt 2025',
      icon: Award,
    },
  ];

  return (
    <div className="bg-white rounded-xl p-6 card-shadow">
      <div className="flex items-center gap-2 mb-4">
        <Bell className="w-5 h-5 text-[#2ECC71]" />
        <h3 className="text-lg">Pengumuman Terkini</h3>
      </div>

      <div className="space-y-3">
        {announcements.map((announcement, index) => (
          <motion.div
            key={announcement.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative p-3 rounded-lg border border-gray-100 hover:border-[#2ECC71] hover:bg-gradient-to-r hover:from-[#E8FDF0] hover:to-white transition-all cursor-pointer overflow-hidden"
          >
            {/* Slide reveal effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#2ECC71]/5 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />

            <div className="relative flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#E8FDF0] flex items-center justify-center group-hover:bg-[#2ECC71] transition-colors">
                <announcement.icon className="w-5 h-5 text-[#27AE60] group-hover:text-white transition-colors" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 group-hover:text-[#27AE60] transition-colors line-clamp-2">
                  {announcement.title}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <Calendar className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-500">{announcement.date}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <button className="w-full mt-4 py-2 text-sm text-[#2ECC71] hover:text-[#27AE60] hover:bg-[#E8FDF0] rounded-lg transition-colors">
        Lihat Semua Pengumuman →
      </button>
    </div>
  );
}

