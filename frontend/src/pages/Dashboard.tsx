import { Scale, TrendingUp, Users, DollarSign, Plus, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { KPICard } from '../components/KPICard';
import { WeeklyChart } from '../components/WeeklyChart';
import { ActivityTimeline } from '../components/ActivityTimeline';
import { BannerNews } from '../components/BannerNews';
import { VideoEducation } from '../components/VideoEducation';
import { AnnouncementSidebar } from '../components/AnnouncementSidebar';
import { SkeletonKPICard, SkeletonChart, SkeletonTimeline } from '../components/SkeletonLoader';
import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';

interface DashboardProps {
  onQuickAdd: () => void;
}

export function Dashboard({ onQuickAdd }: DashboardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [kpiData, setKpiData] = useState([
    {
      title: 'Total Berat Minggu Ini',
      value: 0,
      unit: 'kg',
      icon: Scale,
      trend: 12,
      sparklineData: [0, 0, 0, 0, 0, 0],
    },
    {
      title: 'Jumlah Transaksi Approved',
      value: 0,
      unit: 'transaksi',
      icon: TrendingUp,
      trend: 8,
      sparklineData: [0, 0, 0, 0, 0, 0],
    },
    {
      title: 'Nasabah Aktif',
      value: 0,
      unit: 'nasabah',
      icon: Users,
      trend: 5,
      sparklineData: [0, 0, 0, 0, 0, 0],
    },
    {
      title: 'Total Pendapatan',
      value: 0,
      unit: 'Rp',
      icon: DollarSign,
      trend: 15,
      sparklineData: [0, 0, 0, 0, 0, 0],
    },
  ]);

  useEffect(() => {
    // Load approved transactions and calculate KPIs
    const loadKPIs = () => {
      const approved = JSON.parse(localStorage.getItem('approvedTransactions') || '[]');
      
      // Calculate total weight
      const totalWeight = approved.reduce((sum: number, t: any) => sum + (t.weight || 0), 0);
      
      // Count unique nasabah
      const uniqueNasabah = new Set(approved.map((t: any) => t.contact)).size;
      
      // Calculate revenue (example: Rp 5000 per kg)
      const revenue = totalWeight * 5000;

      setKpiData([
        {
          title: 'Total Berat Approved',
          value: Math.round(totalWeight * 100) / 100,
          unit: 'kg',
          icon: Scale,
          trend: 12,
          sparklineData: [180, 220, 250, 280, 300, totalWeight],
        },
        {
          title: 'Transaksi Approved',
          value: approved.length,
          unit: 'transaksi',
          icon: TrendingUp,
          trend: 8,
          sparklineData: [100, 115, 130, 140, 150, approved.length],
        },
        {
          title: 'Nasabah Aktif',
          value: uniqueNasabah,
          unit: 'nasabah',
          icon: Users,
          trend: 5,
          sparklineData: [75, 78, 82, 85, 87, uniqueNasabah],
        },
        {
          title: 'Total Pendapatan',
          value: revenue,
          unit: 'Rp',
          icon: DollarSign,
          trend: 15,
          sparklineData: [3500000, 3800000, 4100000, 4400000, 4650000, revenue],
        },
      ]);
    };

    loadKPIs();
    
    // Poll for updates every 5 seconds
    const interval = setInterval(loadKPIs, 5000);

    // Simulate data loading with skeleton transition
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const [chartData, setChartData] = useState([
    { week: 'Minggu 1', berat: 0, transaksi: 0 },
    { week: 'Minggu 2', berat: 0, transaksi: 0 },
    { week: 'Minggu 3', berat: 0, transaksi: 0 },
    { week: 'Minggu 4', berat: 0, transaksi: 0 },
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Decorative Leaf Corners */}
      <div className="fixed top-20 right-8 w-24 h-24 opacity-10 pointer-events-none hidden lg:block animate-leaf-sway">
        <svg viewBox="0 0 100 100">
          <ellipse cx="50" cy="50" rx="20" ry="35" fill="#27AE60" />
          <path d="M 50 15 Q 50 50, 50 85" stroke="#27AE60" strokeWidth="3" fill="none" />
        </svg>
      </div>

      <div className="fixed bottom-24 left-8 w-32 h-32 opacity-10 pointer-events-none hidden lg:block animate-leaf-sway" style={{ animationDelay: '1s' }}>
        <svg viewBox="0 0 100 100">
          <ellipse cx="50" cy="50" rx="25" ry="40" fill="#27AE60" />
          <path d="M 50 10 Q 50 50, 50 90" stroke="#27AE60" strokeWidth="3" fill="none" />
        </svg>
      </div>

      {/* Hero Section - Compact */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <span>Dashboard</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#27AE60]">Overview</span>
        </div>
        <h1 className="text-gray-900 mb-2">Selamat Datang, Admin Bank Sampah UPN</h1>
        <p className="text-gray-600">
          Pantau pengumpulan sampah dan gerakan hijau kampus.
        </p>
      </motion.div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {isLoading ? (
          <>
            {[...Array(4)].map((_, i) => (
              <SkeletonKPICard key={i} />
            ))}
          </>
        ) : (
          kpiData.map((kpi, index) => (
            <KPICard
              key={kpi.title}
              title={kpi.title}
              value={kpi.value}
              unit={kpi.unit}
              icon={kpi.icon}
              trend={kpi.trend}
              sparklineData={kpi.sparklineData}
              delay={index * 0.1}
            />
          ))
        )}
      </div>

      {/* Main Content + Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Main Content - Left 2/3 */}
        <div className="lg:col-span-2 space-y-8">
          {/* Compact Chart Section - Centered and Constrained */}
          <div className="max-w-4xl mx-auto">
            {isLoading ? (
              <SkeletonChart />
            ) : (
              <WeeklyChart data={chartData} compact={true} />
            )}
          </div>

          {/* Dynamic Banner Section */}
          <div>
            <BannerNews />
          </div>

          {/* Video Education Section */}
          <div>
            <VideoEducation />
          </div>

          {/* Activity Timeline */}
          <div>
            {isLoading ? <SkeletonTimeline /> : <ActivityTimeline />}
          </div>
        </div>

        {/* Sidebar - Right 1/3 */}
        <div className="lg:col-span-1">
          <div className="sticky top-20">
            <AnnouncementSidebar />
          </div>
        </div>
      </div>

      {/* Campus Map Mock */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="bg-white rounded-xl p-6 card-shadow"
      >
        <h3 className="mb-4 text-gray-800">Peta Drop Point Kampus</h3>
        <div className="relative bg-gray-100 rounded-lg h-64 overflow-hidden">
          <svg viewBox="0 0 800 300" className="w-full h-full">
            {/* Map background */}
            <rect width="800" height="300" fill="#f5f5f5" />
            
            {/* Roads */}
            <path d="M 0 150 L 800 150" stroke="#ddd" strokeWidth="20" />
            <path d="M 400 0 L 400 300" stroke="#ddd" strokeWidth="20" />
            
            {/* Buildings */}
            <rect x="100" y="50" width="120" height="80" fill="#e0e0e0" stroke="#ccc" strokeWidth="2" />
            <text x="160" y="95" textAnchor="middle" className="text-xs" fill="#666">Rektorat</text>
            
            <rect x="280" y="50" width="100" height="80" fill="#e0e0e0" stroke="#ccc" strokeWidth="2" />
            <text x="330" y="95" textAnchor="middle" className="text-xs" fill="#666">FT</text>
            
            <rect x="450" y="50" width="120" height="80" fill="#e0e0e0" stroke="#ccc" strokeWidth="2" />
            <text x="510" y="95" textAnchor="middle" className="text-xs" fill="#666">FEB</text>
            
            <rect x="100" y="190" width="100" height="80" fill="#e0e0e0" stroke="#ccc" strokeWidth="2" />
            <text x="150" y="235" textAnchor="middle" className="text-xs" fill="#666">FISIP</text>
            
            {/* Drop Points with pulsing animation */}
            <g>
              <circle cx="160" cy="90" r="8" fill="#2ECC71" className="animate-pulse-dot" />
              <circle cx="330" cy="90" r="8" fill="#2ECC71" className="animate-pulse-dot" style={{ animationDelay: '0.5s' }} />
              <circle cx="510" cy="90" r="8" fill="#2ECC71" className="animate-pulse-dot" style={{ animationDelay: '1s' }} />
              <circle cx="150" cy="230" r="8" fill="#2ECC71" className="animate-pulse-dot" style={{ animationDelay: '1.5s' }} />
            </g>
          </svg>
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-2 rounded-lg text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#2ECC71] animate-pulse-dot"></div>
              <span className="text-gray-700">Drop Point Aktif</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Decorative Leaf */}
      <div className="fixed bottom-8 left-8 w-32 h-32 opacity-10 pointer-events-none hidden lg:block">
        <svg viewBox="0 0 100 100" className="animate-leaf-sway">
          <path
            d="M 50 10 Q 70 30, 80 50 Q 70 70, 50 90 Q 30 70, 20 50 Q 30 30, 50 10"
            fill="#27AE60"
          />
          <path
            d="M 50 10 L 50 90"
            stroke="#27AE60"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      {/* FAB - Quick Add Transaction */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
          delay: 1,
        }}
        className="fixed bottom-8 right-8 z-40"
      >
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            onClick={onQuickAdd}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-[#2ECC71] to-[#27AE60] hover:from-[#27AE60] hover:to-[#229954] shadow-lg hover:shadow-2xl transition-all ripple"
            aria-label="Tambah Transaksi"
          >
            <Plus className="w-7 h-7 text-white" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
