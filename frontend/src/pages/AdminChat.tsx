import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Mail, User, Clock, Send, CheckCircle, Search, Filter } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
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
} from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

interface ChatMessage {
  id: number;
  name: string;
  email: string;
  message: string;
  status: 'waiting' | 'replied';
  timestamp: string;
  adminReply?: string;
  replyTimestamp?: string;
}

export function AdminChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ChatMessage | null>(null);
  const [replyText, setReplyText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'waiting' | 'replied'>('all');

  useEffect(() => {
    loadMessages();
    const interval = setInterval(loadMessages, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const loadMessages = () => {
    const chats = JSON.parse(localStorage.getItem('publicChats') || '[]');
    setMessages(chats.sort((a: ChatMessage, b: ChatMessage) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ));
  };

  const handleReply = () => {
    if (!selectedMessage || !replyText.trim()) {
      toast.error('Balasan tidak boleh kosong!');
      return;
    }

    const updatedMessages = messages.map(msg => 
      msg.id === selectedMessage.id
        ? {
            ...msg,
            status: 'replied' as const,
            adminReply: replyText,
            replyTimestamp: new Date().toISOString(),
          }
        : msg
    );

    setMessages(updatedMessages);
    localStorage.setItem('publicChats', JSON.stringify(updatedMessages));
    
    // Store demo reply for public chat to show
    localStorage.setItem('demoAdminReply', replyText);

    toast.success('Balasan berhasil dikirim!');
    setSelectedMessage(null);
    setReplyText('');
  };

  const filteredMessages = messages.filter(msg => {
    const matchesSearch = 
      msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' || msg.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const waitingCount = messages.filter(m => m.status === 'waiting').length;
  const repliedCount = messages.filter(m => m.status === 'replied').length;

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
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-gray-900">Chat & Public Messages</h1>
              <p className="text-gray-600">
                Kelola pesan dari publik dan balas pertanyaan nasabah
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
                <p className="text-gray-600 text-sm mb-1">Total Pesan</p>
                <p className="text-3xl text-gray-900">{messages.length}</p>
              </div>
              <div className="w-12 h-12 bg-[#E8FDF0] rounded-xl flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-[#27AE60]" />
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
                <p className="text-gray-600 text-sm mb-1">Menunggu Balasan</p>
                <p className="text-3xl text-[#F39C12]">{waitingCount}</p>
              </div>
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-[#F39C12]" />
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
                <p className="text-gray-600 text-sm mb-1">Sudah Dibalas</p>
                <p className="text-3xl text-[#2ECC71]">{repliedCount}</p>
              </div>
              <div className="w-12 h-12 bg-[#E8FDF0] rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-[#2ECC71]" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filters & Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-6 card-shadow mb-6"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Cari nama, email, atau pesan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="w-full md:w-48">
              <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
                <SelectTrigger>
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    <SelectValue placeholder="Filter Status" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="waiting">Menunggu Balasan</SelectItem>
                  <SelectItem value="replied">Sudah Dibalas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* Messages Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl card-shadow overflow-hidden"
        >
          {filteredMessages.length === 0 ? (
            <div className="text-center py-12 px-4">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg text-gray-900 mb-2">Belum Ada Pesan</h3>
              <p className="text-gray-500">
                {searchTerm ? 'Tidak ada hasil yang cocok dengan pencarian Anda' : 'Pesan dari publik akan muncul di sini'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Pesan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Waktu</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMessages.map((msg, index) => (
                    <motion.tr
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-[#E8FDF0] rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="w-4 h-4 text-[#27AE60]" />
                          </div>
                          <span className="font-medium text-gray-900">{msg.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mail className="w-4 h-4" />
                          <span className="text-sm">{msg.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-gray-700 line-clamp-2 max-w-xs">
                          {msg.message}
                        </p>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={msg.status === 'waiting' ? 'outline' : 'default'}
                          className={
                            msg.status === 'waiting'
                              ? 'border-[#F39C12] text-[#F39C12] bg-orange-50'
                              : 'bg-[#2ECC71] text-white'
                          }
                        >
                          {msg.status === 'waiting' ? 'Menunggu' : 'Dibalas'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Clock className="w-3 h-3" />
                          {new Date(msg.timestamp).toLocaleDateString('id-ID', {
                            day: '2-digit',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant={msg.status === 'waiting' ? 'default' : 'outline'}
                          className={
                            msg.status === 'waiting'
                              ? 'bg-[#2ECC71] hover:bg-[#27AE60]'
                              : ''
                          }
                          onClick={() => setSelectedMessage(msg)}
                        >
                          {msg.status === 'waiting' ? 'Balas' : 'Lihat'}
                        </Button>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </motion.div>
      </div>

      {/* Reply Dialog */}
      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-[#27AE60]" />
              {selectedMessage?.status === 'waiting' ? 'Balas Pesan' : 'Detail Pesan'}
            </DialogTitle>
            <DialogDescription>
              Pesan dari {selectedMessage?.name}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Original Message */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-gray-500" />
                <span className="font-medium text-gray-900">{selectedMessage?.name}</span>
              </div>
              <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{selectedMessage?.email}</span>
              </div>
              <p className="text-gray-700">{selectedMessage?.message}</p>
              <p className="text-xs text-gray-500 mt-2">
                {selectedMessage && new Date(selectedMessage.timestamp).toLocaleString('id-ID')}
              </p>
            </div>

            {/* Admin Reply Section */}
            {selectedMessage?.status === 'replied' ? (
              <div className="bg-[#E8FDF0] rounded-lg p-4 border border-[#27AE60]/20">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-[#27AE60]" />
                  <span className="font-medium text-gray-900">Balasan Admin</span>
                </div>
                <p className="text-gray-700">{selectedMessage.adminReply}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {selectedMessage.replyTimestamp && 
                    new Date(selectedMessage.replyTimestamp).toLocaleString('id-ID')}
                </p>
              </div>
            ) : (
              <div>
                <Label htmlFor="reply-message">Balasan Anda *</Label>
                <Textarea
                  id="reply-message"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Tulis balasan untuk pengirim pesan..."
                  className="mt-2 min-h-[120px]"
                />
                <p className="text-sm text-gray-500 mt-2">
                  💡 Balasan akan dikirim ke email: <strong>{selectedMessage?.email}</strong>
                </p>
              </div>
            )}
          </div>

          {selectedMessage?.status === 'waiting' && (
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setSelectedMessage(null)}>
                Batal
              </Button>
              <Button
                onClick={handleReply}
                className="bg-gradient-to-r from-[#2ECC71] to-[#27AE60] hover:from-[#27AE60] hover:to-[#229954] text-white gap-2"
              >
                <Send className="w-4 h-4" />
                Kirim Balasan
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
