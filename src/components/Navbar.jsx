import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCartStore } from '../store';

/* ========================================
   导航数据
   ======================================== */
const navLinks = [
  { label: 'inspiration', path: '/' },
  { label: 'menu', path: '/products' },
  { label: 'stores', path: '/stores' },
  { label: 'about', path: '/about' },
];

/* ========================================
   移动端全屏菜单动画
   ======================================== */
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

const mobileLinkVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut', delay: 0.1 + i * 0.06 },
  }),
  exit: { opacity: 0, y: 10, transition: { duration: 0.15 } },
};

/* ========================================
   主导航组件 — 喜茶风格
   ======================================== */
export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const items = useCartStore((s) => s.items);
  const cartItemCount = items.reduce((count, item) => count + item.quantity, 0);

  /* 滚动监听：向下隐藏，向上显示 */
  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          if (currentY > lastScrollY.current && currentY > 80) {
            setHidden(true);
          } else {
            setHidden(false);
          }
          lastScrollY.current = currentY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* 锁定 body 滚动（移动端菜单展开时） */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  /* 路由变化关闭菜单 */
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  /* 路径匹配 */
  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* ==================== 导航栏 ==================== */}
      <header
        className="fixed top-0 left-0 right-0 z-50 h-16 transition-transform duration-300 ease-out"
        style={{
          transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
        }}
        role="banner"
      >
        <nav
          className="h-full px-8 md:px-12 flex items-center justify-between"
          role="navigation"
          aria-label="主导航"
        >
          {/* ---- Logo ---- */}
          <Link
            to="/"
            className="flex items-center gap-2 opacity-100 hover:opacity-70 transition-opacity duration-300"
            aria-label="banrix 半日闲 - 返回首页"
          >
            <span
              className="text-base tracking-[0.1em] font-light"
              style={{ fontFamily: "'Montserrat', 'Noto Sans SC', sans-serif" }}
            >
              banrix
            </span>
            <span
              className="text-base tracking-[0.1em] font-light"
              style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
            >
              半日闲
            </span>
          </Link>

          {/* ---- 桌面端导航链接（>=768px） ---- */}
          <ul className="hidden md:flex items-center gap-8" role="menubar">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.path}
                  className={`text-sm tracking-[0.08em] font-light transition-opacity duration-300 ${
                    isActive(link.path)
                      ? 'opacity-100'
                      : 'opacity-50 hover:opacity-100'
                  }`}
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                  role="menuitem"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* ---- 右侧操作区 ---- */}
          <div className="flex items-center gap-4">
            {/* 购物车 */}
            <Link
              to="/cart"
              className="relative opacity-70 hover:opacity-100 transition-opacity duration-300"
              aria-label={`购物车${cartItemCount > 0 ? `，${cartItemCount} 件商品` : ''}`}
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 flex items-center justify-center bg-current text-white text-[10px] font-normal rounded-full px-1 leading-none">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </Link>

            {/* 汉堡菜单按钮（<768px） */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden opacity-70 hover:opacity-100 transition-opacity duration-300"
              aria-label="打开导航菜单"
              aria-expanded="false"
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>
          </div>
        </nav>
      </header>

      {/* ==================== 移动端全屏菜单（<768px） ==================== */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center md:hidden"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="导航菜单"
          >
            {/* 关闭按钮 */}
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-5 right-8 opacity-50 hover:opacity-100 transition-opacity duration-300"
              aria-label="关闭导航菜单"
            >
              <X size={24} strokeWidth={1.5} />
            </button>

            {/* 导航链接 — 居中排列 */}
            <ul className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.label}
                  custom={i}
                  variants={mobileLinkVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <Link
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`text-2xl tracking-[0.1em] font-light transition-opacity duration-300 ${
                      isActive(link.path)
                        ? 'opacity-100'
                        : 'opacity-50 hover:opacity-100'
                    }`}
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            {/* 底部购物车 */}
            <motion.div
              className="absolute bottom-12 flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity duration-300"
              custom={navLinks.length}
              variants={mobileLinkVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Link
                to="/cart"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 text-sm tracking-[0.08em] font-light"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                <ShoppingBag size={18} strokeWidth={1.5} />
                <span>bag{cartItemCount > 0 ? ` (${cartItemCount})` : ''}</span>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
