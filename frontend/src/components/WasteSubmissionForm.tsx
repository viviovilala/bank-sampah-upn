import { useState } from 'react';
import { motion } from 'framer-motion';
import { Recycle, Upload, User, Phone, Calendar, Scale, Package, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';

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

export function WasteSubmissionForm() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [date, setDate] = useState('');
  const [wasteType, setWasteType] = useState('');
  const [weight, setWeight] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const wasteTypes = [
    { value: 'plastic-bottle', label: 'Botol Plastik' },
    { value: 'plastic-bag', label: 'Kantong Plastik' },
    { value: 'plastic-packaging', label: 'Kemasan Plastik' },
    { value: 'plastic-sachet', label: 'Sachet/Pouch' },
    { value: 'styrofoam', label: 'Styrofoam' },
    { value: 'mixed-plastic', label: 'Plastik Campur' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!name.trim() || name.length < 3) {
      toast.error('Nama harus minimal 3 karakter!');
      return;
    }

    if (!contact.trim() || contact.length < 10) {
      toast.error('Nomor kontak tidak valid!');
      return;
    }

    if (!date) {
      toast.error('Tanggal penyetoran harus diisi!');
      return;
    }

    if (!wasteType) {
      toast.error('Pilih jenis sampah plastik!');
      return;
    }

    const weightNum = parseFloat(weight);
    if (!weight || weightNum < 0.1) {
      toast.error('Berat minimal 0.1 kg!');
      return;
    }

    setIsSubmitting(true);

    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    const submission: WasteSubmission = {
      id: Date.now(),
      name: name.trim(),
      contact: contact.trim(),
      date,
      wasteType,
      weight: weightNum,
      notes: notes.trim() || undefined,
      status: 'pending',
      submittedAt: new Date().toISOString(),
    };

    // Save to localStorage (pending transactions)
    const pending = JSON.parse(localStorage.getItem('pendingTransactions') || '[]');
    localStorage.setItem('pendingTransactions', JSON.stringify([...pending, submission]));

    // Notify admin via chat
    const adminNotification = {
      id: Date.now() + 1,
      name: 'System Notification',
      email: 'system@banksampah.upn',
      message: `New waste submission from ${name}: ${weightNum} kg ${wasteType}`,
      status: 'waiting',
      timestamp: new Date().toISOString(),
      isNotification: true,
    };
    
    const chats = JSON.parse(localStorage.getItem('publicChats') || '[]');
    localStorage.setItem('publicChats', JSON.stringify([adminNotification, ...chats]));

    toast.success('✅ Penyetoran berhasil dikirim dan menunggu persetujuan admin!');

    // Reset form
    setName('');
    setContact('');
    setDate('');
    setWasteType('');
    setWeight('');
    setNotes('');
    setIsSubmitting(false);
  };

  const weightInGrams = weight ? (parseFloat(weight) * 1000).toFixed(0) : '0';

  return (
    <section id="submit-waste" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-block px-6 py-2 bg-[#E8FDF0] rounded-full mb-6"
          >
            <span className="text-[#27AE60] font-medium">♻️ Setor Sampah</span>
          </motion.div>

          <h2 className="text-gray-900 mb-4">
            Submit Your Plastic Waste
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Kirim data penyetoran sampah plastik Anda. Admin akan meninjau dan menyetujui data Anda untuk diproses lebih lanjut.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-white to-[#E8FDF0] rounded-2xl p-8 md:p-12 card-shadow"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <Label htmlFor="submit-name" className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#27AE60]" />
                  Nama Lengkap *
                </Label>
                <Input
                  id="submit-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama Anda"
                  className="mt-2"
                  required
                  minLength={3}
                />
                <p className="text-xs text-gray-500 mt-1">Minimal 3 karakter</p>
              </div>

              {/* Contact */}
              <div>
                <Label htmlFor="submit-contact" className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#27AE60]" />
                  Nomor Kontak (WA) *
                </Label>
                <Input
                  id="submit-contact"
                  type="tel"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="08xx-xxxx-xxxx"
                  className="mt-2"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Format: 08xx-xxxx-xxxx</p>
              </div>

              {/* Date */}
              <div>
                <Label htmlFor="submit-date" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#27AE60]" />
                  Tanggal Penyetoran *
                </Label>
                <Input
                  id="submit-date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                  className="mt-2"
                  required
                />
              </div>

              {/* Waste Type */}
              <div>
                <Label htmlFor="submit-type" className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#27AE60]" />
                  Jenis Sampah Plastik *
                </Label>
                <Select value={wasteType} onValueChange={setWasteType} required>
                  <SelectTrigger id="submit-type" className="mt-2">
                    <SelectValue placeholder="Pilih jenis sampah" />
                  </SelectTrigger>
                  <SelectContent>
                    {wasteTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Weight */}
              <div>
                <Label htmlFor="submit-weight" className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-[#27AE60]" />
                  Berat (kg) *
                </Label>
                <Input
                  id="submit-weight"
                  type="number"
                  step="0.01"
                  min="0.1"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="0.00"
                  className="mt-2"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  ≈ {weightInGrams} gram | Minimal 0.1 kg
                </p>
              </div>

              {/* Optional Photo Upload (Placeholder) */}
              <div>
                <Label htmlFor="submit-photo" className="flex items-center gap-2">
                  <Upload className="w-4 h-4 text-[#27AE60]" />
                  Foto Sampah (Opsional)
                </Label>
                <div className="mt-2">
                  <button
                    type="button"
                    className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-[#2ECC71] transition-colors text-center"
                  >
                    <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                    <span className="text-sm text-gray-500">
                      Klik untuk upload foto
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <Label htmlFor="submit-notes" className="flex items-center gap-2">
                Catatan Tambahan (Opsional)
              </Label>
              <Textarea
                id="submit-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Tambahkan keterangan jika diperlukan..."
                className="mt-2 min-h-[100px]"
                maxLength={200}
              />
              <p className="text-xs text-gray-500 mt-1 text-right">
                {notes.length}/200 karakter
              </p>
            </div>

            {/* Info Box */}
            <div className="bg-[#2ECC71]/10 border-l-4 border-[#27AE60] p-4 rounded">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#27AE60] flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-700">
                  <p className="font-medium mb-1">📋 Informasi Penting:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Semua data akan ditinjau oleh admin sebelum disetujui</li>
                    <li>Pastikan sampah plastik dalam kondisi bersih dan kering</li>
                    <li>Anda akan menerima notifikasi setelah data disetujui</li>
                    <li>Berat minimal penyetoran adalah 0.1 kg (100 gram)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#2ECC71] to-[#27AE60] hover:from-[#27AE60] hover:to-[#229954] text-white ripple h-12 gap-2"
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Recycle className="w-5 h-5" />
                  </motion.div>
                  Mengirim Data...
                </>
              ) : (
                <>
                  <Recycle className="w-5 h-5" />
                  Submit Penyetoran Sampah
                </>
              )}
            </Button>
          </form>
        </motion.div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-600 text-sm">
            Butuh bantuan? <button className="text-[#27AE60] hover:underline font-medium">Chat dengan Admin</button> atau hubungi{' '}
            <a href="https://wa.me/6281234567890" className="text-[#27AE60] hover:underline font-medium">
              WhatsApp: +62 812-3456-7890
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
