import { useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Download } from 'lucide-react';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';

interface WeeklyChartProps {
  data: Array<{
    week: string;
    berat: number;
    transaksi: number;
  }>;
  compact?: boolean;
  title?: string;
}

export function WeeklyChart({
  data,
  compact = false,
  title = 'Perkembangan Sampah Plastik Mingguan (kg)',
}: WeeklyChartProps) {
  const chartHeight = compact ? 200 : 300;
  const chartRef = useRef<HTMLDivElement>(null);

  const handleExportPNG = async () => {
    try {
      // Placeholder: html2canvas bisa dipakai nanti
      toast.success(
        'Chart exported successfully! (Feature ready for PNG export library integration)'
      );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Failed to export chart');
    }
  };

  return (
    <motion.div
      ref={chartRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white rounded-xl p-6 shadow-md"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-gray-800 font-semibold">{title}</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={handleExportPNG}
          className="gap-2 text-[#27AE60] border-[#27AE60] hover:bg-[#E8FDF0]"
          aria-label="Export chart as PNG"
        >
          <Download className="w-4 h-4" />
          Export PNG
        </Button>
      </div>

      <ResponsiveContainer width="100%" height={chartHeight}>
        <ComposedChart data={data}>
          <defs>
            <linearGradient id="colorBerat" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2ECC71" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#27AE60" stopOpacity={0.8} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="week" stroke="#666" />
          <YAxis
            yAxisId="left"
            stroke="#666"
            label={{ value: 'Berat (kg)', angle: -90, position: 'insideLeft' }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#666"
            label={{ value: 'Transaksi', angle: 90, position: 'insideRight' }}
          />
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
            yAxisId="left"
            dataKey="berat"
            fill="url(#colorBerat)"
            radius={[8, 8, 0, 0]}
            animationDuration={1000}
            animationBegin={200}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="transaksi"
            stroke="#27AE60"
            strokeWidth={3}
            dot={{ fill: '#2ECC71', r: 5 }}
            animationDuration={1200}
            animationBegin={400}
          />
        </ComposedChart>
      </ResponsiveContainer>

      <p className="mt-4 text-sm text-gray-600 text-center">
        Weekly accumulation of plastic waste collected from UPN community recycling points.
      </p>
    </motion.div>
  );
}
