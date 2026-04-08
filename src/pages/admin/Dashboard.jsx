import { useEffect, useMemo } from 'react';
import {
  Package,
  ShoppingCart,
  DollarSign,
  Clock,
  TrendingUp,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useProductStore } from '../../store';
import defaultProducts from '../../data/products';

const statusMap = {
  pending: { label: '待处理', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  processing: { label: '处理中', color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' },
  shipped: { label: '已发货', color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)' },
  delivered: { label: '已完成', color: '#22c55e', bg: 'rgba(34,197,94,0.1)' },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Dashboard() {
  const { products, orders, initProducts } = useProductStore();

  useEffect(() => {
    if (products.length === 0) {
      initProducts(defaultProducts);
    }
  }, [products.length, initProducts]);

  const stats = useMemo(() => {
    const totalProducts = products.length;
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
    const pendingOrders = orders.filter((o) => o.status === 'pending').length;
    return { totalProducts, totalOrders, totalRevenue, pendingOrders };
  }, [products, orders]);

  const recentOrders = useMemo(() => {
    return orders.slice(0, 5);
  }, [orders]);

  const statCards = [
    { label: '总产品数', value: stats.totalProducts, icon: Package },
    { label: '总订单数', value: stats.totalOrders, icon: ShoppingCart },
    { label: '总收入', value: `¥${stats.totalRevenue.toLocaleString()}`, icon: DollarSign },
    { label: '待处理订单', value: stats.pendingOrders, icon: Clock },
  ];

  const chartBars = [65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88, 72];

  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Page title */}
      <motion.div variants={itemVariants}>
        <p className="text-xs tracking-widest uppercase mb-2" style={{ color: '#999' }}>
          Overview
        </p>
        <h1 className="font-display text-2xl" style={{ color: '#1a1a1a' }}>
          仪表盘
        </h1>
      </motion.div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <motion.div
            key={card.label}
            className="p-6"
            style={{ background: '#fff' }}
            variants={itemVariants}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs tracking-widest uppercase" style={{ color: '#999' }}>
                  {card.label}
                </p>
                <p className="text-2xl font-display mt-2" style={{ color: '#1a1a1a' }}>
                  {card.value}
                </p>
              </div>
              <div
                className="w-11 h-11 flex items-center justify-center"
                style={{ background: 'rgba(200,169,126,0.1)', color: '#c8a97e' }}
              >
                <card.icon size={20} strokeWidth={1.5} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales trend chart placeholder */}
        <motion.div
          className="lg:col-span-2 p-6"
          style={{ background: '#fff' }}
          variants={itemVariants}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-lg" style={{ color: '#1a1a1a' }}>销售趋势</h2>
              <p className="text-xs mt-1" style={{ color: '#bbb' }}>近12个月销售数据</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs" style={{ color: '#999' }}>
              <TrendingUp size={14} />
              <span>月度统计</span>
            </div>
          </div>

          {/* Bar chart */}
          <div className="flex items-end gap-2 h-48 px-2">
            {chartBars.map((height, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-sm transition-all duration-300 min-h-[4px]"
                  style={{
                    height: `${height}%`,
                    background: index === chartBars.length - 1
                      ? 'linear-gradient(to top, #c8a97e, #d4b88e)'
                      : 'linear-gradient(to top, #e8e3de, #f0ebe6)',
                  }}
                />
                <span className="text-[10px]" style={{ color: '#bbb' }}>
                  {index + 1}月
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent orders */}
        <motion.div
          className="p-6"
          style={{ background: '#fff' }}
          variants={itemVariants}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-lg" style={{ color: '#1a1a1a' }}>最近订单</h2>
            <span className="text-xs" style={{ color: '#bbb' }}>
              {recentOrders.length} 条记录
            </span>
          </div>

          {recentOrders.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart size={36} className="mx-auto mb-3" style={{ color: '#e8e3de' }} strokeWidth={1} />
              <p className="text-sm" style={{ color: '#bbb' }}>暂无订单数据</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((order) => {
                const status = statusMap[order.status] || { label: order.status, color: '#999', bg: 'rgba(153,153,153,0.1)' };
                return (
                  <div
                    key={order.id}
                    className="flex items-center justify-between py-3"
                    style={{ borderBottom: '1px solid #f0ebe6' }}
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm truncate" style={{ color: '#1a1a1a' }}>
                        {order.id}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: '#bbb' }}>
                        {order.customerName || order.customer || '未知客户'}
                      </p>
                    </div>
                    <div className="text-right ml-3 flex-shrink-0">
                      <p className="text-sm" style={{ color: '#1a1a1a' }}>
                        ¥{(order.total || 0).toFixed(2)}
                      </p>
                      <span
                        className="inline-block text-[10px] px-2 py-0.5 mt-0.5"
                        style={{ color: status.color, background: status.bg }}
                      >
                        {status.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>

      {/* Recent orders table (desktop) */}
      {recentOrders.length > 0 && (
        <motion.div
          className="p-6 hidden lg:block"
          style={{ background: '#fff' }}
          variants={itemVariants}
        >
          <h2 className="font-display text-lg mb-6" style={{ color: '#1a1a1a' }}>
            订单明细
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid #e8e3de' }}>
                  <th className="text-left py-3 px-4 text-xs tracking-widest uppercase" style={{ color: '#999' }}>
                    订单号
                  </th>
                  <th className="text-left py-3 px-4 text-xs tracking-widest uppercase" style={{ color: '#999' }}>
                    客户
                  </th>
                  <th className="text-left py-3 px-4 text-xs tracking-widest uppercase" style={{ color: '#999' }}>
                    商品数
                  </th>
                  <th className="text-right py-3 px-4 text-xs tracking-widest uppercase" style={{ color: '#999' }}>
                    金额
                  </th>
                  <th className="text-center py-3 px-4 text-xs tracking-widest uppercase" style={{ color: '#999' }}>
                    状态
                  </th>
                  <th className="text-right py-3 px-4 text-xs tracking-widest uppercase" style={{ color: '#999' }}>
                    时间
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => {
                  const status = statusMap[order.status] || { label: order.status, color: '#999', bg: 'rgba(153,153,153,0.1)' };
                  return (
                    <tr
                      key={order.id}
                      style={{ borderBottom: '1px solid #f0ebe6' }}
                      className="transition-colors duration-200"
                      onMouseEnter={(e) => e.currentTarget.style.background = '#faf8f5'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <td className="py-3 px-4" style={{ color: '#1a1a1a' }}>
                        {order.id}
                      </td>
                      <td className="py-3 px-4" style={{ color: '#666' }}>
                        {order.customerName || order.customer || '未知客户'}
                      </td>
                      <td className="py-3 px-4" style={{ color: '#666' }}>
                        {order.items?.length || 0} 件
                      </td>
                      <td className="py-3 px-4 text-right" style={{ color: '#1a1a1a' }}>
                        ¥{(order.total || 0).toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className="inline-block text-xs px-2.5 py-1"
                          style={{ color: status.color, background: status.bg }}
                        >
                          {status.label}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right" style={{ color: '#bbb' }}>
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString('zh-CN')
                          : '-'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
