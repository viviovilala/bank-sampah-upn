import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, ChevronRight, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';

interface WeeklyReport {
  minggu: number;
  totalBerat: number;
  jumlahTransaksi: number;
  trend: number;
}

export function LaporanMingguan() {
  const [selectedMonth, setSelectedMonth] = useState('10');
  const [selectedYear, setSelectedYear] = useState('2025');

  const reports: WeeklyReport[] = [
    { minggu: 1, totalBerat: 245.8, jumlahTransaksi: 120, trend: 5 },
    { minggu: 2, totalBerat: 298.3, jumlahTransaksi: 145, trend: 21 },
    { minggu: 3, totalBerat: 315.7, jumlahTransaksi: 138, trend: 6 },
    { minggu: 4, totalBerat: 327.5, jumlahTransaksi: 156, trend: 4 },
  ];

  const chartData = reports.map(r => ({
    minggu: `Minggu ${r.minggu}`,
    'Berat (kg)': r.totalBerat,
    Transaksi: r.jumlahTransaksi,
  }));

  const handleDownload = (format: 'pdf' | 'excel') => {
    toast.success(`Mengunduh laporan dalam format ${format.toUpperCase()}...`, {
      duration: 2000,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      {/* Decorative Plant Vector */}
      <div className="absolute bottom-0 right-12 w-32 h-32 opacity-5 pointer-events-none hidden lg:block">
        <svg viewBox="0 0 100 100">
          <ellipse cx="50" cy="70" rx="8" ry="12" fill="#27AE60" />
          <ellipse cx="50" cy="50" rx="10" ry="15" fill="#27AE60" />
          <ellipse cx="50" cy="30" rx="12" ry="18" fill="#2ECC71" />
          <path d="M 50 90 L 50 20" stroke="#27AE60" strokeWidth="3" fill="none" />
        </svg>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <span>Dashboard</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">Laporan Mingguan</span>
        </div>
        <h1 className="text-gray-900">Rekap Mingguan Sampah Plastik</h1>
        <p className="text-gray-600 mt-2">
          Ringkasan data pengumpulan sampah per minggu
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl p-6 card-shadow mb-6"
      >
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-600">Bulan</label>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Januari</SelectItem>
                  <SelectItem value="2">Februari</SelectItem>
                  <SelectItem value="3">Maret</SelectItem>
                  <SelectItem value="4">April</SelectItem>
                  <SelectItem value="5">Mei</SelectItem>
                  <SelectItem value="6">Juni</SelectItem>
                  <SelectItem value="7">Juli</SelectItem>
                  <SelectItem value="8">Agustus</SelectItem>
                  <SelectItem value="9">September</SelectItem>
                  <SelectItem value="10">Oktober</SelectItem>
                  <SelectItem value="11">November</SelectItem>
                  <SelectItem value="12">Desember</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-600">Tahun</label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => handleDownload('pdf')}
              className="hover:bg-gray-50 group"
            >
              <Download className="w-4 h-4 mr-2 group-hover:translate-y-0.5 transition-transform" />
              Download Laporan (PDF)
            </Button>
            <Button
              variant="outline"
              onClick={() => handleDownload('excel')}
              className="hover:bg-gray-50 group"
            >
              <Download className="w-4 h-4 mr-2 group-hover:translate-y-0.5 transition-transform" />
              Excel
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Compact Chart Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <div className="bg-white rounded-xl p-6 card-shadow">
          <h3 className="mb-6 text-gray-800">Grafik Mingguan</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <defs>
                <linearGradient id="colorBeratGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2ECC71" stopOpacity={1} />
                <stop offset="100%" stopColor="#27AE60" stopOpacity={1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="minggu" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '12px',
              }}
            />
            <Legend />
            <Bar
              dataKey="Berat (kg)"
              fill="url(#colorBeratGradient)"
              radius={[8, 8, 0, 0]}
              animationDuration={800}
              animationBegin={100}
            />
          </BarChart>
        </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl card-shadow overflow-hidden"
      >
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Minggu ke-</TableHead>
                <TableHead>Total Berat (kg)</TableHead>
                <TableHead>Jumlah Transaksi</TableHead>
                <TableHead>Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report, index) => (
                <motion.tr
                  key={report.minggu}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <TableCell>
                    <span className="text-gray-900">Minggu {report.minggu}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-[#2ECC71]">{report.totalBerat.toLocaleString()} kg</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-700">{report.jumlahTransaksi} transaksi</span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={report.trend >= 0 ? 'default' : 'destructive'}
                      className={
                        report.trend >= 0
                          ? 'bg-green-100 text-green-700 hover:bg-green-100'
                          : 'bg-red-100 text-red-700 hover:bg-red-100'
                      }
                    >
                      {report.trend >= 0 ? (
                        <TrendingUp className="w-3 h-3 mr-1" />
                      ) : (
                        <TrendingDown className="w-3 h-3 mr-1" />
                      )}
                      {Math.abs(report.trend)}%
                    </Badge>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Summary */}
        <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">Total Berat Bulan Ini</p>
              <p className="text-xl text-[#2ECC71] mt-1">
                {reports.reduce((sum, r) => sum + r.totalBerat, 0).toLocaleString()} kg
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Transaksi</p>
              <p className="text-xl text-gray-900 mt-1">
                {reports.reduce((sum, r) => sum + r.jumlahTransaksi, 0).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Rata-rata per Minggu</p>
              <p className="text-xl text-gray-900 mt-1">
                {(reports.reduce((sum, r) => sum + r.totalBerat, 0) / reports.length).toFixed(1)} kg
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
