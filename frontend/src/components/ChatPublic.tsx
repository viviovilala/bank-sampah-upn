import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, User, Mail } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Label } from '../components/ui/label'
import { ScrollArea } from '../components/ui/scroll-area'
import { toast } from 'sonner'
interface Message {
  id: number;
  sender: 'user' | 'admin';
  text: string;
  timestamp: string;
}

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

export function ChatPublic() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Simulate checking for admin replies
  useEffect(() => {
    if (hasSubmitted && isOpen) {
      // In real app, poll API for admin replies
      const checkInterval = setInterval(() => {
        // Simulate admin reply after 30 seconds (for demo)
        const demoReply = localStorage.getItem('demoAdminReply');
        if (demoReply && !chatHistory.find(msg => msg.sender === 'admin')) {
          setChatHistory(prev => [
            ...prev,
            {
              id: Date.now(),
              sender: 'admin',
              text: demoReply,
              timestamp: new Date().toLocaleTimeString('id-ID', { 
                hour: '2-digit', 
                minute: '2-digit' 
              }),
            }
          ]);
          toast.success('Admin telah membalas pesan Anda!');
          localStorage.removeItem('demoAdminReply');
        }
      }, 5000);

      return () => clearInterval(checkInterval);
    }
  }, [hasSubmitted, isOpen, chatHistory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error('Semua kolom wajib diisi!');
      return;
    }

    if (message.length > 500) {
      toast.error('Pesan maksimal 500 karakter!');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Format email tidak valid!');
      return;
    }

    // Add user message to chat
    const userMessage: Message = {
      id: Date.now(),
      sender: 'user',
      text: message,
      timestamp: new Date().toLocaleTimeString('id-ID', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
    };

    setChatHistory([userMessage]);
    setHasSubmitted(true);

    // Store in localStorage (in real app, send to backend API)
    const chatData: ChatMessage = {
      id: Date.now(),
      name,
      email,
      message,
      status: 'waiting',
      timestamp: new Date().toISOString(),
    };

    const existingChats = JSON.parse(localStorage.getItem('publicChats') || '[]');
    localStorage.setItem('publicChats', JSON.stringify([...existingChats, chatData]));

    toast.success('Pesan terkirim! Admin akan segera membalas.');
    setMessage('');
  };

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] rounded-full shadow-lg flex items-center justify-center text-white ripple"
            style={{ 
              boxShadow: '0 8px 24px rgba(46, 204, 113, 0.4)' 
            }}
            aria-label="Chat with admin"
          >
            <MessageCircle className="w-7 h-7" />
            
            {/* Pulse Ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-[#2ECC71]"
              animate={{ 
                scale: [1, 1.3, 1.3],
                opacity: [0.6, 0, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: 'easeOut'
              }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Modal/Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop (mobile only) */}
            {isMobile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
              />
            )}

            {/* Chat Panel */}
            <motion.div
              initial={isMobile ? { y: '100%' } : { x: 400, opacity: 0 }}
              animate={isMobile ? { y: 0 } : { x: 0, opacity: 1 }}
              exit={isMobile ? { y: '100%' } : { x: 400, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={`fixed z-50 bg-white ${
                isMobile 
                  ? 'inset-0' 
                  : 'bottom-6 right-6 w-96 h-[600px] rounded-2xl shadow-2xl'
              }`}
              style={!isMobile ? { 
                boxShadow: '0 20px 60px rgba(15, 40, 20, 0.2)' 
              } : {}}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#2ECC71] to-[#27AE60] p-4 flex items-center justify-between rounded-t-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Chat dengan Admin</h3>
                    <p className="text-white/80 text-sm">Bank Sampah UPN</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Content */}
              <div className="flex flex-col h-[calc(100%-72px)]">
                {!hasSubmitted ? (
                  /* Initial Contact Form */
                  <div className="flex-1 p-6 overflow-y-auto">
                    <div className="mb-6">
                      <p className="text-gray-600 mb-2">
                        Ada pertanyaan seputar Bank Sampah UPN? Kirim pesan dan admin kami akan membalas Anda.
                      </p>
                      <div className="bg-[#E8FDF0] border-l-4 border-[#27AE60] p-3 rounded text-sm text-gray-700">
                        💡 <strong>Tips:</strong> Pesan maksimal 500 karakter
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="chat-name">Nama Lengkap *</Label>
                        <div className="relative mt-1">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            id="chat-name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nama Anda"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="chat-email">Email *</Label>
                        <div className="relative mt-1">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            id="chat-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="email@example.com"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="chat-message">Pesan *</Label>
                        <Textarea
                          id="chat-message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Tulis pertanyaan atau pesan Anda di sini..."
                          className="mt-1 min-h-[120px] resize-none"
                          maxLength={500}
                          required
                        />
                        <div className="text-right text-xs text-gray-500 mt-1">
                          {message.length}/500 karakter
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#2ECC71] to-[#27AE60] hover:from-[#27AE60] hover:to-[#229954] text-white ripple gap-2"
                      >
                        <Send className="w-4 h-4" />
                        Kirim Pesan
                      </Button>
                    </form>
                  </div>
                ) : (
                  /* Chat History View */
                  <>
                    <ScrollArea className="flex-1 p-4">
                      <div className="space-y-4">
                        {/* Welcome Message */}
                        <div className="flex justify-start">
                          <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-2 max-w-[80%]">
                            <p className="text-sm text-gray-800">
                              Terima kasih telah menghubungi Bank Sampah UPN! Pesan Anda sedang menunggu balasan dari admin.
                            </p>
                            <span className="text-xs text-gray-500 mt-1 block">
                              {new Date().toLocaleTimeString('id-ID', { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </span>
                          </div>
                        </div>

                        {/* Chat Messages */}
                        {chatHistory.map((msg) => (
                          <div
                            key={msg.id}
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`rounded-2xl px-4 py-2 max-w-[80%] ${
                                msg.sender === 'user'
                                  ? 'bg-gradient-to-r from-[#2ECC71] to-[#27AE60] text-white rounded-tr-none'
                                  : 'bg-gray-100 text-gray-800 rounded-tl-none'
                              }`}
                            >
                              <p className="text-sm">{msg.text}</p>
                              <span className={`text-xs mt-1 block ${
                                msg.sender === 'user' ? 'text-white/80' : 'text-gray-500'
                              }`}>
                                {msg.timestamp}
                              </span>
                            </div>
                          </div>
                        ))}

                        {/* Waiting Indicator */}
                        {chatHistory.filter(m => m.sender === 'admin').length === 0 && (
                          <div className="flex justify-center">
                            <div className="bg-[#E8FDF0] px-4 py-2 rounded-full text-sm text-[#27AE60] flex items-center gap-2">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                              >
                                <MessageCircle className="w-4 h-4" />
                              </motion.div>
                              Menunggu balasan admin...
                            </div>
                          </div>
                        )}
                      </div>
                    </ScrollArea>

                    {/* Info Footer */}
                    <div className="border-t p-4 bg-gray-50">
                      <p className="text-xs text-gray-600 text-center">
                        Admin akan membalas pesan Anda melalui email: <strong>{email}</strong>
                      </p>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
