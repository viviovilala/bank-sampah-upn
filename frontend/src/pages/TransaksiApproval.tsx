import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Edit2, 
  User, 
  Phone, 
  Calendar,
  Package,
  // Scale,
 //  MessageSquare,
  // Download,
  // Filter,
  // Search
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/ui/tabs';
// import { SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

interface WasteSubmission {
  id: number;
  name: string;
  contact: string;
  date: string;
  wasteType: string;
  weight: number;
  notes?: string;
  photo?: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  adminNotes?: string;
}

export function TransaksiApproval() {
  const [pendingTransactions, setPendingTransactions] = useState<WasteSubmission[]>([]);
  const [approvedTransactions, setApprovedTransactions] = useState<WasteSubmission[]>([]);
  const [rejectedTransactions, setRejectedTransactions] = useState<WasteSubmission[]>([]);
  const [selectedTransaction, setSelectedTransaction] = useState<WasteSubmission | null>(null);
  const [action, setAction] = useState<'approve' | 'reject' | 'edit' | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [editData, setEditData] = useState<Partial<WasteSubmission>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('pending');

  useEffect(() => {
    loadTransactions();
    const interval = setInterval(loadTransactions, 3000);
    return () => clearInterval(interval);
  }, []);

  const loadTransactions = () => {
    const pending = JSON.parse(localStorage.getItem('pendingTransactions') || '[]');
    const approved = JSON.parse(localStorage.getItem('approvedTransactions') || '[]');
    const rejected = JSON.parse(localStorage.getItem('rejectedTransactions') || '[]');
    
    setPendingTransactions(pending.sort((a: WasteSubmission, b: WasteSubmission) => 
      new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    ));
    setApprovedTransactions(approved.sort((a: WasteSubmission, b: WasteSubmission) => 
      new Date(b.reviewedAt || b.submittedAt).getTime() - new Date(a.reviewedAt || a.submittedAt).getTime()
    ));
    setRejectedTransactions(rejected.sort((a: WasteSubmission, b: WasteSubmission) => 
      new Date(b.reviewedAt || b.submittedAt).getTime() - new Date(a.reviewedAt || a.submittedAt).getTime()
    ));
  };

  const handleApprove = () => {
    if (!selectedTransaction) return;

    const updatedTransaction = {
      ...selectedTransaction,
      status: 'approved' as const,
      reviewedAt: new Date().toISOString(),
      adminNotes: adminNotes.trim() || undefined,
    };

    // Remove from pending
    const newPending = pendingTransactions.filter(t => t.id !== selectedTransaction.id);
    localStorage.setItem('pendingTransactions', JSON.stringify(newPending));

    // Add to approved
    const approved = JSON.parse(localStorage.getItem('approvedTransactions') || '[]');
    localStorage.setItem('approvedTransactions', JSON.stringify([updatedTransaction, ...approved]));

    toast.success(`✅ Transaksi dari ${selectedTransaction.name} disetujui!`);
    loadTransactions();
    closeDialog();
  };

  const handleReject = () => {
    if (!selectedTransaction || !adminNotes.trim()) {
      toast.error('Alasan penolakan harus diisi!');
      return;
    }

    const updatedTransaction = {
      ...selectedTransaction,
      status: 'rejected' as const,
      reviewedAt: new Date().toISOString(),
      adminNotes: adminNotes.trim(),
    };

    // Remove from pending
    const newPending = pendingTransactions.filter(t => t.id !== selectedTransaction.id);
    localStorage.setItem('pendingTransactions', JSON.stringify(newPending));

    // Add to rejected
    const rejected = JSON.parse(localStorage.getItem('rejectedTransactions') || '[]');
    localStorage.setItem('rejectedTransactions', JSON.stringify([updatedTransaction, ...rejected]));

    toast.error(`❌ Transaksi dari ${selectedTransaction.name} ditolak`);
    loadTransactions();
    closeDialog();
  };

  const handleEdit = () => {
    if (!selectedTransaction) return;

    const updatedTransaction = {
      ...selectedTransaction,
      ...editData,
      reviewedAt: new Date().toISOString(),
      adminNotes: `Data telah diubah oleh admin. ${adminNotes}`.trim(),
    };

    // Update in pending list
    const newPending = pendingTransactions.map(t => 
      t.id === selectedTransaction.id ? updatedTransaction : t
    );
    localStorage.setItem('pendingTransactions', JSON.stringify(newPending));

    toast.success(`✏️ Data transaksi dari ${selectedTransaction.name} berhasil diupdate!`);
    loadTransactions();
    closeDialog();
  };

  const openDialog = (transaction: WasteSubmission, actionType: 'approve' | 'reject' | 'edit') => {
    setSelectedTransaction(transaction);
    setAction(actionType);
    setAdminNotes('');
    setEditData({
      weight: transaction.weight,
      wasteType: transaction.wasteType,
      date: transaction.date,
    });
  };

  const closeDialog = () => {
    setSelectedTransaction(null);
    setAction(null);
    setAdminNotes('');
    setEditData({});
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="border-orange-500 text-orange-500 bg-orange-50">
          <Clock className="w-3 h-3 mr-1" />
          Menunggu
        </Badge>;
      case 'approved':
        return <Badge className="bg-[#2ECC71] text-white">
          <CheckCircle className="w-3 h-3 mr-1" />
          Disetujui
        </Badge>;
      case 'rejected':
        return <Badge variant="outline" className="border-red-500 text-red-500 bg-red-50">
          <XCircle className="w-3 h-3 mr-1" />
          Ditolak
        </Badge>;
      default:
        return null;
    }
  };

  const getWasteTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      'plastic-bottle': 'Botol Plastik',
      'plastic-bag': 'Kantong Plastik',
      'plastic-packaging': 'Kemasan Plastik',
      'plastic-sachet': 'Sachet/Pouch',
      'styrofoam': 'Styrofoam',
      'mixed-plastic': 'Plastik Campur',
    };
    return types[type] || type;
  };

  const filterTransactions = (transactions: WasteSubmission[]) => {
    return transactions.filter(t => 
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.contact.includes(searchTerm) ||
      getWasteTypeLabel(t.wasteType).toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const TransactionTable = ({ transactions, showActions }: { transactions: WasteSubmission[], showActions: boolean }) => {
    const filteredTransactions = filterTransactions(transactions);

    if (filteredTransactions.length === 0) {
      return (
        <div className="text-center py-12 px-4">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-lg text-gray-900 mb-2">Tidak Ada Data</h3>
          <p className="text-gray-500">
            {searchTerm ? 'Tidak ada hasil yang cocok dengan pencarian' : 'Belum ada transaksi di kategori ini'}
          </p>
        </div>
      );
    }

    return (
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Kontak</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Jenis</TableHead>
              <TableHead className="text-right">Berat (kg)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Waktu Submit</TableHead>
              {showActions && <TableHead className="text-right">Aksi</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((transaction, index) => (
              <motion.tr
                key={transaction.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell className="font-mono text-sm text-gray-500">
                  #{transaction.id.toString().slice(-4)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#E8FDF0] rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-[#27AE60]" />
                    </div>
                    <span className="font-medium text-gray-900">{transaction.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Phone className="w-3 h-3" />
                    {transaction.contact}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm">
                    <Calendar className="w-3 h-3 text-gray-400" />
                    {new Date(transaction.date).toLocaleDateString('id-ID')}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm">
                    <Package className="w-3 h-3 text-gray-400" />
                    {getWasteTypeLabel(transaction.wasteType)}
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium">{transaction.weight}</TableCell>
                <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                <TableCell className="text-sm text-gray-500">
                  {new Date(transaction.submittedAt).toLocaleString('id-ID', {
                    day: '2-digit',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </TableCell>
                {showActions && (
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openDialog(transaction, 'edit')}
                        className="gap-1"
                      >
                        <Edit2 className="w-3 h-3" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => openDialog(transaction, 'approve')}
                        className="bg-[#2ECC71] hover:bg-[#27AE60] text-white gap-1"
                      >
                        <CheckCircle className="w-3 h-3" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openDialog(transaction, 'reject')}
                        className="border-red-500 text-red-500 hover:bg-red-50 gap-1"
                      >
                        <XCircle className="w-3 h-3" />
                        Reject
                      </Button>
                    </div>
                  </TableCell>
                )}
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-gray-900">Transaction Management</h1>
              <p className="text-gray-600">
                Review dan kelola penyetoran sampah dari nasabah
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 card-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Pending Review</p>
                <p className="text-3xl text-orange-500">{pendingTransactions.length}</p>
              </div>
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-500" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 card-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Approved</p>
                <p className="text-3xl text-[#2ECC71]">{approvedTransactions.length}</p>
              </div>
              <div className="w-12 h-12 bg-[#E8FDF0] rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-[#2ECC71]" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 card-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Rejected</p>
                <p className="text-3xl text-red-500">{rejectedTransactions.length}</p>
              </div>
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-500" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-4 card-shadow mb-6"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Cari nama, kontak, atau jenis sampah..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl card-shadow overflow-hidden"
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b px-6">
              <TabsList className="w-full justify-start bg-transparent h-auto p-0">
                <TabsTrigger 
                  value="pending" 
                  className="data-[state=active]:border-b-2 data-[state=active]:border-[#2ECC71] rounded-none pb-4 gap-2"
                >
                  <Clock className="w-4 h-4" />
                  Pending ({pendingTransactions.length})
                </TabsTrigger>
                <TabsTrigger 
                  value="approved"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-[#2ECC71] rounded-none pb-4 gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Approved ({approvedTransactions.length})
                </TabsTrigger>
                <TabsTrigger 
                  value="rejected"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-[#2ECC71] rounded-none pb-4 gap-2"
                >
                  <XCircle className="w-4 h-4" />
                  Rejected ({rejectedTransactions.length})
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="pending" className="p-6">
              <TransactionTable transactions={pendingTransactions} showActions={true} />
            </TabsContent>

            <TabsContent value="approved" className="p-6">
              <TransactionTable transactions={approvedTransactions} showActions={false} />
            </TabsContent>

            <TabsContent value="rejected" className="p-6">
              <TransactionTable transactions={rejectedTransactions} showActions={false} />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      {/* Action Dialog */}
      <Dialog open={!!selectedTransaction && !!action} onOpenChange={closeDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {action === 'approve' && <CheckCircle className="w-5 h-5 text-[#2ECC71]" />}
              {action === 'reject' && <XCircle className="w-5 h-5 text-red-500" />}
              {action === 'edit' && <Edit2 className="w-5 h-5 text-blue-500" />}
              {action === 'approve' && 'Approve Transaction'}
              {action === 'reject' && 'Reject Transaction'}
              {action === 'edit' && 'Edit Transaction'}
            </DialogTitle>
            <DialogDescription>
              Transaksi dari {selectedTransaction?.name}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Transaction Details */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 mb-1">Nama</p>
                  <p className="font-medium text-gray-900">{selectedTransaction?.name}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Kontak</p>
                  <p className="font-medium text-gray-900">{selectedTransaction?.contact}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Tanggal</p>
                  <p className="font-medium text-gray-900">
                    {selectedTransaction && new Date(selectedTransaction.date).toLocaleDateString('id-ID')}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Jenis Sampah</p>
                  <p className="font-medium text-gray-900">
                    {selectedTransaction && getWasteTypeLabel(selectedTransaction.wasteType)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Berat</p>
                  <p className="font-medium text-gray-900">{selectedTransaction?.weight} kg</p>
                </div>
                {selectedTransaction?.notes && (
                  <div className="col-span-2">
                    <p className="text-gray-500 mb-1">Catatan</p>
                    <p className="text-gray-700">{selectedTransaction.notes}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Edit Form */}
            {action === 'edit' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-weight">Berat (kg)</Label>
                    <Input
                      id="edit-weight"
                      type="number"
                      step="0.01"
                      value={editData.weight || ''}
                      onChange={(e) => setEditData({ ...editData, weight: parseFloat(e.target.value) })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-date">Tanggal</Label>
                    <Input
                      id="edit-date"
                      type="date"
                      value={editData.date || ''}
                      onChange={(e) => setEditData({ ...editData, date: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Admin Notes */}
            <div>
              <Label htmlFor="admin-notes">
                {action === 'reject' ? 'Alasan Penolakan *' : 'Catatan Admin (Opsional)'}
              </Label>
              <Textarea
                id="admin-notes"
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder={
                  action === 'reject' 
                    ? 'Jelaskan alasan penolakan transaksi ini...'
                    : 'Tambahkan catatan jika diperlukan...'
                }
                className="mt-2 min-h-[100px]"
                required={action === 'reject'}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>
              Batal
            </Button>
            {action === 'approve' && (
              <Button
                onClick={handleApprove}
                className="bg-[#2ECC71] hover:bg-[#27AE60] text-white gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Approve
              </Button>
            )}
            {action === 'reject' && (
              <Button
                onClick={handleReject}
                className="bg-red-500 hover:bg-red-600 text-white gap-2"
              >
                <XCircle className="w-4 h-4" />
                Reject
              </Button>
            )}
            {action === 'edit' && (
              <Button
                onClick={handleEdit}
                className="bg-blue-500 hover:bg-blue-600 text-white gap-2"
              >
                <Edit2 className="w-4 h-4" />
                Update
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
