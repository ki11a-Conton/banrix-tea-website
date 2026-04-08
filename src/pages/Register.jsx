import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store';

const Register = () => {
  const navigate = useNavigate();
  const register = useAuthStore((s) => s.register);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('请输入姓名');
      return;
    }
    if (!email.trim()) {
      setError('请输入邮箱地址');
      return;
    }
    if (password.length < 6) {
      setError('密码至少需要6个字符');
      return;
    }
    if (password !== confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }

    try {
      register(name, email, password);
      navigate('/');
    } catch {
      setError('注册失败，请重试');
    }
  };

  const inputStyle = {
    color: '#1a1a1a',
    borderBottom: '1px solid #ddd',
  };

  const handleFocus = (e) => { e.target.style.borderBottomColor = '#1a1a1a'; };
  const handleBlur = (e) => { e.target.style.borderBottomColor = '#ddd'; };

  return (
    <div className="min-h-screen flex">
      {/* Left - Brand Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden" style={{ background: '#0d0d0d' }}>
        <div className="absolute inset-0 flex flex-col justify-center px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h1 className="font-display text-5xl tracking-wider text-white mb-4">
              BANRIX
            </h1>
            <div className="w-12 h-px mb-6" style={{ background: '#c8a97e' }} />
            <p className="text-white/50 text-sm tracking-widest uppercase mb-8">
              Inspiration Tea
            </p>
            <p className="text-white/30 text-sm leading-relaxed max-w-sm">
              加入半日闲，偷得浮生半日闲。<br />
              一杯好茶，一份灵感。
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-5" style={{ background: 'radial-gradient(circle, #c8a97e, transparent)' }} />
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center px-6 md:px-12 py-12" style={{ background: '#f5f0eb' }}>
        <motion.div
          className="w-full max-w-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Mobile brand */}
          <div className="lg:hidden text-center mb-10">
            <Link to="/">
              <h1 className="font-display text-3xl tracking-wider" style={{ color: '#1a1a1a' }}>
                BANRIX
              </h1>
            </Link>
            <p className="text-xs tracking-widest mt-2" style={{ color: '#999' }}>
              灵感之茶
            </p>
          </div>

          {/* Title */}
          <div className="mb-10">
            <p className="text-xs tracking-widest uppercase mb-3" style={{ color: '#999' }}>
              CREATE ACCOUNT
            </p>
            <h2 className="font-display text-3xl" style={{ color: '#1a1a1a' }}>
              注册
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs tracking-widest uppercase mb-3" style={{ color: '#999' }}>
                昵称
              </label>
              <div className="relative">
                <User className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#bbb' }} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="你的昵称"
                  className="w-full pl-6 pr-4 py-3 bg-transparent text-sm outline-none placeholder:text-[#ccc] transition-colors"
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs tracking-widest uppercase mb-3" style={{ color: '#999' }}>
                邮箱
              </label>
              <div className="relative">
                <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#bbb' }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full pl-6 pr-4 py-3 bg-transparent text-sm outline-none placeholder:text-[#ccc] transition-colors"
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs tracking-widest uppercase mb-3" style={{ color: '#999' }}>
                密码
              </label>
              <div className="relative">
                <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#bbb' }} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="至少6个字符"
                  className="w-full pl-6 pr-4 py-3 bg-transparent text-sm outline-none placeholder:text-[#ccc] transition-colors"
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs tracking-widest uppercase mb-3" style={{ color: '#999' }}>
                确认密码
              </label>
              <div className="relative">
                <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#bbb' }} />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="再次输入密码"
                  className="w-full pl-6 pr-4 py-3 bg-transparent text-sm outline-none placeholder:text-[#ccc] transition-colors"
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-center"
                style={{ color: '#c0392b' }}
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              className="w-full py-4 text-sm tracking-widest uppercase text-white flex items-center justify-center gap-3 transition-all duration-300 hover:opacity-90"
              style={{ background: '#1a1a1a' }}
            >
              注册
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Links */}
          <div className="text-center mt-8">
            <p className="text-sm" style={{ color: '#999' }}>
              已有账号？{' '}
              <Link
                to="/login"
                className="transition-colors duration-300"
                style={{ color: '#c8a97e' }}
                onMouseEnter={(e) => e.target.style.color = '#b8946e'}
                onMouseLeave={(e) => e.target.style.color = '#c8a97e'}
              >
                立即登录
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
