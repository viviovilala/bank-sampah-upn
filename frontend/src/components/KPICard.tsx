import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

interface KPICardProps {
  title: string;
  value: number;
  unit: string;
  icon: LucideIcon;
  trend?: number;
  sparklineData?: number[];
  delay?: number;
}

export function KPICard({ title, value, unit, icon: Icon, trend, sparklineData, delay = 0 }: KPICardProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1000;
    const steps = 60;
    const stepValue = value / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(stepValue * currentStep));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className="card-hover border-2 border-[#2ECC71] card-shadow relative overflow-hidden">
        {/* Sparkle Effect */}
        <div className="absolute top-2 right-2 w-2 h-2 bg-[#2ECC71] rounded-full animate-sparkle"></div>
        
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm text-gray-600">{title}</CardTitle>
          <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
            <Icon className="w-5 h-5 text-[#2ECC71]" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl animate-count-up">{displayValue.toLocaleString()}</span>
              <span className="text-gray-500">{unit}</span>
            </div>
            {trend !== undefined && (
              <div className={`text-sm flex items-center gap-1 ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                <span>{trend >= 0 ? '↑' : '↓'}</span>
                <span>{Math.abs(trend)}% dari minggu lalu</span>
              </div>
            )}
            {sparklineData && (
              <svg width="100%" height="30" className="mt-2">
                <polyline
                  points={sparklineData
                    .map((val, i) => `${(i / (sparklineData.length - 1)) * 100}%,${30 - (val / Math.max(...sparklineData)) * 25}`)
                    .join(' ')}
                  fill="none"
                  stroke="#2ECC71"
                  strokeWidth="2"
                  opacity="0.6"
                />
              </svg>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
