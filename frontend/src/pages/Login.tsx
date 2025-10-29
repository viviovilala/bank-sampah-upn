import { useState } from 'react';
import { Mail, Lock, Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { UPNLogo } from '../../components/ui/UPNLogo';

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validateForm = () => {
    const newErrors = { email: '', password: '' };
    
    if (!email) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Format email tidak valid';
    }
    
    if (!password) {
      newErrors.password = 'Password wajib diisi';
    } else if (password.length < 6) {
      newErrors.password = 'Password minimal 6 karakter';
    }
    
    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Shake animation for validation errors
      return;
    }
    
    setLoading(true);
    
    // Simulate authentication with skeleton transition
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Diagonal Gradient Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(135deg, #F0FFF8 0%, #D8F6E3 100%)',
        }}
      />

      {/* Large Faded Logo Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 z-0 animate-parallax">
        <UPNLogo className="w-96 h-96" />
      </div>

      {/* Floating Leaf Particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute z-0"
          style={{
            left: `${10 + i * 12}%`,
            bottom: '-50px',
          }}
          animate={{
            y: [0, -window.innerHeight - 100],
            x: [0, Math.sin(i) * 30],
            rotate: [0, 180],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            delay: i * 1.5,
            ease: 'linear',
          }}
        >
          <svg width="30" height="40" viewBox="0 0 30 40" fill="none">
            <ellipse cx="15" cy="20" rx="10" ry="15" fill="#27AE60" opacity="0.3" />
          </svg>
        </motion.div>
      ))}

      <div className="min-h-screen flex items-center justify-center px-4 relative z-10">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          {/* Login Form Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md mx-auto"
          >
            <div className="bg-white rounded-xl card-shadow p-8">
              {/* Logo Header */}
              <div className="flex items-center gap-3 mb-4">
                <UPNLogo className="w-12 h-12" />
                <div>
                  <h2 className="text-gray-900">Login Admin</h2>
                  <p className="text-sm text-gray-600">Bank Sampah UPN</p>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-6">
                Access the management system for Bank Sampah UPN.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@upnjatim.ac.id"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      className={`pl-11 shadow-inner focus:border-[#2ECC71] focus:ring-[#2ECC71] ${
                        errors.email ? 'border-red-500 validation-shake' : ''
                      }`}
                      required
                      aria-label="Email address"
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                  </div>
                  {errors.email && (
                    <div id="email-error" className="flex items-center gap-1 text-sm text-red-600" role="alert">
                      <AlertCircle className="w-4 h-4" />
                      {errors.email}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errors.password) setErrors({ ...errors, password: '' });
                      }}
                      className={`pl-11 shadow-inner focus:border-[#2ECC71] focus:ring-[#2ECC71] ${
                        errors.password ? 'border-red-500 validation-shake' : ''
                      }`}
                      required
                      aria-label="Password"
                      aria-required="true"
                      aria-invalid={!!errors.password}
                      aria-describedby={errors.password ? 'password-error' : undefined}
                    />
                  </div>
                  {errors.password && (
                    <div id="password-error" className="flex items-center gap-1 text-sm text-red-600" role="alert">
                      <AlertCircle className="w-4 h-4" />
                      {errors.password}
                    </div>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      className="border-gray-300 data-[state=checked]:bg-[#2ECC71] data-[state=checked]:border-[#2ECC71]"
                    />
                    <Label
                      htmlFor="remember"
                      className="text-sm text-gray-600 cursor-pointer"
                    >
                      Remember me
                    </Label>
                  </div>
                  <a
                    href="#"
                    className="text-sm text-[#27AE60] hover:text-[#2ECC71] transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#2ECC71] to-[#27AE60] hover:from-[#27AE60] hover:to-[#229954] text-white ripple transition-all hover:shadow-lg card-hover"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Authenticating...
                    </>
                  ) : (
                    'Login'
                  )}
                </Button>
              </form>

              <p className="text-xs text-gray-500 text-center mt-6">
                © 2025 Bank Sampah UPN – Supported by UPN "Veteran" Jawa Timur
              </p>
            </div>
          </motion.div>

          {/* Right Side Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <svg
                viewBox="0 0 500 500"
                className="w-full h-auto drop-shadow-lg"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Campus Buildings */}
                <g opacity="0.8">
                  <rect x="120" y="200" width="90" height="140" fill="#27AE60" rx="4" />
                  <rect x="130" y="210" width="15" height="15" fill="white" opacity="0.7" rx="2" />
                  <rect x="157" y="210" width="15" height="15" fill="white" opacity="0.7" rx="2" />
                  <rect x="185" y="210" width="15" height="15" fill="white" opacity="0.7" rx="2" />
                  <rect x="130" y="235" width="15" height="15" fill="white" opacity="0.7" rx="2" />
                  <rect x="157" y="235" width="15" height="15" fill="white" opacity="0.7" rx="2" />
                  <rect x="185" y="235" width="15" height="15" fill="white" opacity="0.7" rx="2" />
                  
                  <rect x="250" y="170" width="100" height="170" fill="#2ECC71" rx="4" />
                  <rect x="260" y="180" width="18" height="18" fill="white" opacity="0.7" rx="2" />
                  <rect x="290" y="180" width="18" height="18" fill="white" opacity="0.7" rx="2" />
                  <rect x="320" y="180" width="18" height="18" fill="white" opacity="0.7" rx="2" />
                </g>

                {/* Recycle Symbol */}
                <motion.g
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: '250px 100px' }}
                >
                  <path
                    d="M 250 70 L 270 110 L 230 110 Z"
                    fill="none"
                    stroke="#2ECC71"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <circle cx="250" cy="90" r="3" fill="#2ECC71" />
                </motion.g>

                {/* Floating Leaves Animation */}
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.ellipse
                    key={i}
                    cx={180 + i * 35}
                    cy={360}
                    rx="10"
                    ry="15"
                    fill="#27AE60"
                    opacity="0.5"
                    animate={{
                      y: [-5, 5, -5],
                      rotate: [-5, 5, -5],
                    }}
                    transition={{
                      duration: 2 + i * 0.3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.2,
                    }}
                  />
                ))}

                {/* Ground */}
                <rect x="80" y="340" width="340" height="5" fill="#27AE60" opacity="0.2" rx="2" />
                
                {/* Text */}
                <text x="250" y="380" textAnchor="middle" fill="#27AE60" fontSize="16" fontFamily="Poppins">
                  Green Campus 2025
                </text>
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
