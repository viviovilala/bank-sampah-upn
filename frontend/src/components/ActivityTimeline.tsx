import { motion } from 'framer-motion';
import { Bell, MapPin, Calendar, Users } from 'lucide-react';

interface Activity {
  id: number;
  title: string;
  description: string;
  time: string;
  icon: 'bell' | 'map' | 'calendar' | 'users';
}

const iconMap = {
  bell: Bell,
  map: MapPin,
  calendar: Calendar,
  users: Users,
};

export function ActivityTimeline() {
  const activities: Activity[] = [
    {
      id: 1,
      title: 'Green Campus 2025',
      description: 'Program Pengelolaan Sampah Fakultas Teknik dimulai hari ini',
      time: '2 jam lalu',
      icon: 'calendar',
    },
    {
      id: 2,
      title: 'KKN Hijau',
      description: 'Mahasiswa KKN membantu sosialisasi bank sampah ke masyarakat',
      time: '5 jam lalu',
      icon: 'users',
    },
    {
      id: 3,
      title: 'Gerakan Kampus Bersih',
      description: 'Aksi bersih kampus minggu depan - semua civitas diundang',
      time: '1 hari lalu',
      icon: 'bell',
    },
    {
      id: 4,
      title: 'Drop Point Fakultas Ekonomi',
      description: 'Jadwal pengumpulan sampah plastik: Senin & Kamis pukul 09:00',
      time: '2 hari lalu',
      icon: 'map',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="bg-white rounded-xl p-6 card-shadow"
    >
      <h3 className="mb-6 text-gray-800">Aktivitas & Pengumuman</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = iconMap[activity.icon];
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
              className="flex gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-green-50 rounded-full flex items-center justify-center group-hover:bg-green-100 transition-colors">
                <Icon className="w-5 h-5 text-[#2ECC71]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 group-hover:text-[#2ECC71] transition-colors">
                  {activity.title}
                </p>
                <p className="text-xs text-gray-500 mt-1">{activity.description}</p>
                <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
