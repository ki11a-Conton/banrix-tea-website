import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useAuthStore } from '../../store';

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: '仪表盘', end: true },
  { to: '/admin/products', icon: Package, label: '产品管理', end: false },
  { to: '/admin/orders', icon: ShoppingCart, label: '订单管理', end: false },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuthStore();

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen flex" style={{ background: '#f5f0eb' }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ background: 'rgba(0,0,0,0.3)' }}
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full flex flex-col
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 w-64
        `}
        style={{ background: '#0d0d0d' }}
      >
        {/* Sidebar header */}
        <div className="h-16 flex items-center justify-between px-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 flex items-center justify-center text-sm font-bold"
              style={{ background: 'rgba(200,169,126,0.15)', color: '#c8a97e' }}
            >
              茶
            </div>
            <span className="font-display text-base tracking-wider text-white">
              BANRIX
            </span>
          </div>
          <button
            onClick={closeSidebar}
            className="lg:hidden text-white/40 hover:text-white/80 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 text-sm transition-all duration-200
                ${
                  isActive
                    ? 'text-white'
                    : 'text-white/40 hover:text-white/70'
                }
                `
              }
              style={({ isActive }) => ({
                background: isActive ? 'rgba(200,169,126,0.1)' : 'transparent',
              })}
            >
              <item.icon size={18} strokeWidth={1.5} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Sidebar footer */}
        <div className="p-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm text-white/40 hover:text-red-400/80 transition-all duration-200"
          >
            <LogOut size={18} strokeWidth={1.5} />
            <span>退出登录</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-64">
        {/* Header */}
        <header
          className="h-16 flex items-center justify-between px-6 sticky top-0 z-30"
          style={{ background: 'rgba(245,240,235,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #e8e3de' }}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden transition-colors duration-200"
              style={{ color: '#666' }}
            >
              <Menu size={20} />
            </button>
          </div>

          {/* User info */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm" style={{ color: '#1a1a1a' }}>
                {user?.name || '管理员'}
              </p>
              <p className="text-xs" style={{ color: '#bbb' }}>
                {user?.email || 'admin@banrix.com'}
              </p>
            </div>
            <div
              className="w-9 h-9 flex items-center justify-center text-sm font-semibold"
              style={{ background: 'rgba(200,169,126,0.15)', color: '#c8a97e' }}
            >
              {(user?.name || '管')[0].toUpperCase()}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
