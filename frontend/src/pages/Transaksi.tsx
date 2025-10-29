import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Download, Search, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { TransaksiModal } from '../components/TransaksiModal';
import { Badge } from '../components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { Checkbox } from '../components/ui/checkbox';
import { toast } from 'sonner';

export function Transaksi() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<TransaksiData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [transaksiList, setTransaksiList] = useState<TransaksiData[]>([
    { id: 1, nama: 'Ahmad Yani', tanggal: '2025-10-27', berat: 12.5 },
    { id: 2, nama: 'Siti Nurhaliza', tanggal: '2025-10-27', berat: 8.3 },
    { id: 3, nama: 'Budi Santoso', tanggal: '2025-10-26', berat: 15.7 },
    { id: 4, nama: 'Dewi Lestari', tanggal: '2025-10-26', berat: 6.2 },
    { id: 5, nama: 'Eko Prasetyo', tanggal: '2025-10-25', berat: 11.8 },
    { id: 6, nama: 'Fitri Handayani', tanggal: '2025-10-25', berat: 9.5 },
  ]);

  const handleSave = (data: TransaksiData) => {
    if (data.id) {
      // Update existing
      setTransaksiList(transaksiList.map(t => t.id === data.id ? data : t));
    } else {
      // Add new
      const newData = { ...data, id: Math.max(...transaksiList.map(t => t.id || 0)) + 1 };
      setTransaksiList([newData, ...transaksiList]);
    }
    setEditData(null);
  };

  const handleEdit = (data: TransaksiData) => {
    setEditData(data);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setTransaksiList(transaksiList.filter(t => t.id !== id));
    toast.success('Transaksi berhasil dihapus!');
  };

  const handleExport = () => {
    const dataToExport = selectedIds.length > 0
      ? transaksiList.filter(t => selectedIds.includes(t.id!))
      : transaksiList;
    
    toast.success(`Mengekspor ${dataToExport.length} transaksi...`);
  };

  const toggleSelect = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredTransaksi.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredTransaksi.map(t => t.id!));
    }
  };

  const filteredTransaksi = transaksiList.filter(t =>
    t.nama.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      {/* Decorative Elements */}
      <div className="absolute top-8 right-8 w-20 h-20 opacity-5 pointer-events-none hidden lg:block">
        <svg viewBox="0 0 100 100">
          <ellipse cx="50" cy="50" rx="20" ry="30" fill="#27AE60" />
          <ellipse cx="50" cy="50" rx="10" ry="20" fill="#2ECC71" />
        </svg>
      </div>

      <div className="absolute bottom-12 left-12 w-24 h-24 opacity-5 pointer-events-none hidden lg:block">
        <svg viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#27AE60" strokeWidth="2" />
          <path d="M 30 50 L 50 30 L 70 50 L 50 70 Z" fill="#2ECC71" />
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
          <span className="text-gray-900">Transaksi</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-gray-900">Input Data Sampah Plastik</h1>
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></span>
              Realtime
            </Badge>
          </div>
          <Button
            onClick={() => {
              setEditData(null);
              setIsModalOpen(true);
            }}
            className="bg-[#2ECC71] hover:bg-[#27AE60] text-white ripple"
          >
            <Plus className="w-4 h-4 mr-2" />
            Tambah Transaksi
          </Button>
        </div>
      </motion.div>

      {/* Filters & Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl p-6 card-shadow mb-6"
      >
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Cari nama penyetor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11"
            />
          </div>
          <div className="flex gap-2">
            {selectedIds.length > 0 && (
              <Badge variant="secondary">
                {selectedIds.length} dipilih
              </Badge>
            )}
            <Button
              variant="outline"
              onClick={handleExport}
              className="hover:bg-gray-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl card-shadow overflow-hidden"
      >
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedIds.length === filteredTransaksi.length && filteredTransaksi.length > 0}
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Nama Penyetor</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Berat</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransaksi.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-64">
                    <div className="flex flex-col items-center justify-center text-center py-12">
                      <div className="w-20 h-20 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                        <Search className="w-10 h-10 text-gray-400" />
                      </div>
                      <h3 className="text-lg text-gray-900 mb-2">
                        {searchQuery ? 'Tidak ada hasil pencarian' : 'Belum ada transaksi'}
                      </h3>
                      <p className="text-gray-500 mb-4 max-w-sm">
                        {searchQuery
                          ? `Tidak ditemukan transaksi dengan nama "${searchQuery}"`
                          : 'Mulai tambahkan transaksi pertama Anda untuk melacak pengumpulan sampah plastik'}
                      </p>
                      {!searchQuery && (
                        <Button
                          onClick={() => {
                            setEditData(null);
                            setIsModalOpen(true);
                          }}
                          className="bg-[#2ECC71] hover:bg-[#27AE60] text-white"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Tambah Transaksi Pertama
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredTransaksi.map((transaksi, index) => (
                <motion.tr
                  key={transaksi.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.includes(transaksi.id!)}
                      onCheckedChange={() => toggleSelect(transaksi.id!)}
                    />
                  </TableCell>
                  <TableCell>{transaksi.id}</TableCell>
                  <TableCell>{transaksi.nama}</TableCell>
                  <TableCell>
                    {new Date(transaksi.tanggal).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </TableCell>
                  <TableCell>
                    <span className="text-[#2ECC71]">{transaksi.berat} kg</span>
                    <span className="text-gray-400 text-sm ml-2">
                      ({(transaksi.berat * 1000).toLocaleString()} g)
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(transaksi)}
                        className="hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(transaksi.id!)}
                        className="hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </motion.tr>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </motion.div>

      {/* Modal */}
      <TransaksiModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditData(null);
        }}
        onSave={handleSave}
        editData={editData}
      />
    </div>
  );
}
