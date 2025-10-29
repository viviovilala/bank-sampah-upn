import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle, Globe, Instagram, Youtube } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success('Pesan Anda telah terkirim! Tim kami akan segera menghubungi Anda.');
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Alamat',
      content: 'Kampus UPNVJT, Jl. Raya Rungkut Madya, Gunung Anyar, Surabaya',
      link: 'https://maps.google.com/?q=UPN+Veteran+Jawa+Timur',
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'banksampah@upnjatim.ac.id',
      link: 'mailto:banksampah@upnjatim.ac.id',
    },
    {
      icon: Phone,
      title: 'Telepon',
      content: '+62 812-3456-7890',
      link: 'tel:+6281234567890',
    },
  ];

  const socialLinks = [
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      subtitle: 'Chat langsung dengan kami',
      link: 'https://wa.me/6281234567890',
      color: '#25D366',
    },
    {
      icon: Instagram,
      title: 'Instagram',
      subtitle: '@banksampah.upn',
      link: 'https://instagram.com/upnvjt',
      color: '#E4405F',
    },
    {
      icon: Youtube,
      title: 'YouTube',
      subtitle: 'Tutorial & Video Edukasi',
      link: 'https://youtube.com/@upnvjt',
      color: '#FF0000',
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-[#E8FDF0] to-white overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 800 400">
            {[...Array(10)].map((_, i) => (
              <motion.ellipse
                key={i}
                cx={80 + (i % 5) * 160}
                cy={80 + Math.floor(i / 5) * 200}
                rx="20"
                ry="35"
                fill="#27AE60"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 3 + i * 0.3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.2,
                }}
              />
            ))}
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-gray-900 mb-4">Hubungi Kami</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ada pertanyaan atau ingin bergabung? Tim Bank Sampah UPN siap membantu Anda.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-white rounded-xl p-8 card-shadow">
                <h2 className="text-2xl text-gray-900 mb-6">Kirim Pesan</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Nama Lengkap *</Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="mt-2"
                      placeholder="Masukkan nama lengkap Anda"
                      aria-required="true"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="mt-2"
                      placeholder="nama@email.com"
                      aria-required="true"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Pesan *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      className="mt-2 min-h-[150px]"
                      placeholder="Tulis pesan atau pertanyaan Anda di sini..."
                      aria-required="true"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#2ECC71] hover:bg-[#27AE60] text-white ripple gap-2"
                    aria-label="Send message"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        Mengirim...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Kirim Pesan
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info & Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              {/* Contact Cards */}
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.title}
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ x: 4 }}
                    className="flex items-start gap-4 bg-white rounded-xl p-6 card-shadow hover:shadow-lg transition-all cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#E8FDF0] flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-[#27AE60]" />
                    </div>
                    <div>
                      <h3 className="text-lg text-gray-900 mb-1">{info.title}</h3>
                      <p className="text-gray-600">{info.content}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Map Placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-white rounded-xl overflow-hidden card-shadow h-64"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.2976707833636!2d112.78994931477531!3d-7.321729894710775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fb99e0e7f1a3%3A0x9b7b8f0f8f0f8f0f!2sUPN%20Veteran%20Jawa%20Timur!5e0!3m2!1sen!2sid!4v1234567890123"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="UPN Veteran Jawa Timur Location"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Media Links */}
      <section className="py-20 bg-gradient-to-b from-white to-[#E8FDF0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-gray-900 mb-4">Ikuti Kami di Media Sosial</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Dapatkan update terbaru tentang kegiatan dan program Bank Sampah UPN
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.title}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white rounded-xl p-8 card-shadow hover:shadow-lg transition-all text-center cursor-pointer"
                aria-label={`Visit our ${social.title}`}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: `${social.color}20` }}
                >
                  <social.icon className="w-8 h-8" style={{ color: social.color }} />
                </div>
                <h3 className="text-xl text-gray-900 mb-2">{social.title}</h3>
                <p className="text-gray-600">{social.subtitle}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Quick WhatsApp CTA */}
      <section className="py-16 bg-gradient-to-r from-[#25D366] to-[#128C7E]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-white mb-4">Butuh Bantuan Cepat?</h2>
            <p className="text-white/90 text-lg mb-6">
              Hubungi kami langsung melalui WhatsApp untuk respon yang lebih cepat
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-[#25D366] hover:bg-gray-100 ripple gap-2"
              aria-label="Chat with us on WhatsApp"
            >
              <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5" />
                Chat via WhatsApp
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
