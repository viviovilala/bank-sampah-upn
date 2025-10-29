import { useState } from 'react';
import { X, Save, User, Calendar, Scale } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';

interface TransaksiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: TransaksiData) => void;
  editData?: TransaksiData | null;
}

export interface TransaksiData {
  id?: number;
  nama: string;
  tanggal: string;
  berat: number;
}

export function TransaksiModal({ isOpen, onClose, onSave, editData }: TransaksiModalProps) {
  const [nama, setNama] = useState(editData?.nama || '');
  const [tanggal, setTanggal] = useState(editData?.tanggal || new Date().toISOString().split('T')[0]);
  const [berat, setBerat] = useState(editData?.berat.toString() || '');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!nama.trim()) {
      newErrors.nama = 'Nama penyetor harus diisi';
    }
    
    if (!tanggal) {
      newErrors.tanggal = 'Tanggal harus diisi';
    }
    
    if (!berat || parseFloat(berat) <= 0) {
      newErrors.berat = 'Berat harus lebih dari 0';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      const data: TransaksiData = {
        id: editData?.id,
        nama: nama.trim(),
        tanggal,
        berat: parseFloat(berat),
      };
      
      onSave(data);
      toast.success(editData ? 'Transaksi berhasil diupdate!' : 'Transaksi berhasil disimpan!', {
        duration: 3000,
      });
      onClose();
      resetForm();
    }
  };

  const resetForm = () => {
    setNama('');
    setTanggal(new Date().toISOString().split('T')[0]);
    setBerat('');
    setErrors({});
  };

  const handleClose = () => {
    onClose();
    if (!editData) resetForm();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-xl card-shadow z-50"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#2ECC71] to-[#27AE60] px-6 py-4 rounded-t-xl flex items-center justify-between">
              <h3 className="text-white">{editData ? 'Edit Transaksi' : 'Tambah Transaksi Baru'}</h3>
              <button
                onClick={handleClose}
                className="text-white hover:bg-white/20 rounded-lg p-1 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="nama">Nama Penyetor</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="nama"
                    type="text"
                    placeholder="Nama lengkap penyetor"
                    value={nama}
                    onChange={(e) => {
                      setNama(e.target.value);
                      setErrors({ ...errors, nama: '' });
                    }}
                    className={`pl-11 ${errors.nama ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.nama && (
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-red-500 text-sm"
                  >
                    {errors.nama}
                  </motion.p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="tanggal">Tanggal</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="tanggal"
                    type="date"
                    value={tanggal}
                    onChange={(e) => {
                      setTanggal(e.target.value);
                      setErrors({ ...errors, tanggal: '' });
                    }}
                    className={`pl-11 ${errors.tanggal ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.tanggal && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm"
                  >
                    {errors.tanggal}
                  </motion.p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="berat">Berat (kg)</Label>
                <div className="relative">
                  <Scale className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="berat"
                    type="number"
                    step="0.1"
                    placeholder="0.0"
                    value={berat}
                    onChange={(e) => {
                      setBerat(e.target.value);
                      setErrors({ ...errors, berat: '' });
                    }}
                    className={`pl-11 ${errors.berat ? 'border-red-500' : ''}`}
                  />
                </div>
                {berat && parseFloat(berat) > 0 && (
                  <p className="text-sm text-gray-500">
                    = {(parseFloat(berat) * 1000).toLocaleString()} gram
                  </p>
                )}
                {errors.berat && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm"
                  >
                    {errors.berat}
                  </motion.p>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  className="flex-1"
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-[#2ECC71] hover:bg-[#27AE60] text-white ripple"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Simpan
                </Button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
