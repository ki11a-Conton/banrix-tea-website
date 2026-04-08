import { useState } from 'react';
import {
  Search,
  ChevronDown,
  ChevronUp,
  ShoppingCart,
  Eye,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProductStore } from '../../store';

const statusConfig = {
  pending: { label: '待处理', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', dot: '#f59e0b' },
  processing: { label: '处理中', color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', dot: '#3b82f6' },
  shipped: { label: '已发货', color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)', dot: '#8b5cf6' },
  delivered: { label: '已完成', color: '#22c55e', bg: 'rgba(34,197,94,0.1)', dot: '#22c55e' },
};

const statusOptions = [
  { value: 'pending', label: '待处理' },
  { value: 'processing', label: '处理中' },
  { value: 'shipped', label: '已发货' },
  { value: 'delivered', label: '已完成' },
];

const inputStyle = {
  color: '#1a1a1a',
  background: '#faf8f5',
  border: '1px solid #e8e3de',
};

export default function OrderManagement() {
  const { orders, updateOrderStatus } = useProductStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [expandedRow, setExpandedRow] = useState(null);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.customerName || order.customer || '')
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  const toggleExpand = (orderId) => {
    setExpandedRow(expandedRow === orderId ? null : orderId);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <p className="text-xs tracking-widest uppercase mb-2" style={{ color: '#999' }}>
          Orders
        </p>
        <h1 className="font-display text-2xl" style={{ color: '#1a1a1a' }}>
          订单管理
        </h1>
        <p className="text-xs mt-1" style={{ color: '#bbb' }}>
          共 {filteredOrders.length} 个订单
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2"
            style={{ color: '#bbb' }}
          />
          <input
            type="text"
            placeholder="搜索订单号或客户..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 text-sm outline-none transition-all duration-200"
            style={inputStyle}
            onFocus={(e) => { e.target.style.borderColor = '#1a1a1a'; }}
            onBlur={(e) => { e.target.style.borderColor = '#e8e3de'; }}
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-3 text-sm outline-none cursor-pointer transition-all duration-200"
          style={inputStyle}
          onFocus={(e) => { e.target.style.borderColor = '#1a1a1a'; }}
          onBlur={(e) => { e.target.style.borderColor = '#e8e3de'; }}
        >
          <option value="all">全部状态</option>
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Orders table */}
      <div style={{ background: '#fff' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid #e8e3de' }}>
                <th className="text-left py-4 px-4 text-xs tracking-widest uppercase w-8" style={{ color: '#999' }}></th>
                <th className="text-left py-4 px-4 text-xs tracking-widest uppercase" style={{ color: '#999' }}>
                  订单号
                </th>
                <th className="text-left py-4 px-4 text-xs tracking-widest uppercase" style={{ color: '#999' }}>
                  客户
                </th>
                <th className="text-right py-4 px-4 text-xs tracking-widest uppercase" style={{ color: '#999' }}>
                  金额
                </th>
                <th className="text-center py-4 px-4 text-xs tracking-widest uppercase" style={{ color: '#999' }}>
                  状态
                </th>
                <th className="text-right py-4 px-4 text-xs tracking-widest uppercase" style={{ color: '#999' }}>
                  时间
                </th>
                <th className="text-center py-4 px-4 text-xs tracking-widest uppercase" style={{ color: '#999' }}>
                  操作
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-16">
                    <ShoppingCart size={36} className="mx-auto mb-3" style={{ color: '#e8e3de' }} strokeWidth={1} />
                    <p className="text-sm" style={{ color: '#bbb' }}>暂无订单数据</p>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  const config = statusConfig[order.status] || {
                    label: order.status,
                    color: '#999',
                    bg: 'rgba(153,153,153,0.1)',
                    dot: '#999',
                  };
                  const isExpanded = expandedRow === order.id;

                  return (
                    <>
                      <tr
                        key={order.id}
                        style={{ borderBottom: '1px solid #f0ebe6' }}
                        className="transition-colors duration-200"
                        onMouseEnter={(e) => e.currentTarget.style.background = '#faf8f5'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        <td className="py-3 px-4">
                          <button
                            onClick={() => toggleExpand(order.id)}
                            className="p-1 transition-colors duration-200"
                            style={{ color: '#ccc' }}
                            onMouseEnter={(e) => e.currentTarget.style.color = '#666'}
                            onMouseLeave={(e) => e.currentTarget.style.color = '#ccc'}
                          >
                            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                        </td>
                        <td className="py-3 px-4" style={{ color: '#1a1a1a' }}>
                          {order.id}
                        </td>
                        <td className="py-3 px-4" style={{ color: '#666' }}>
                          {order.customerName || order.customer || '未知客户'}
                        </td>
                        <td className="py-3 px-4 text-right" style={{ color: '#1a1a1a' }}>
                          ¥{(order.total || 0).toFixed(2)}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1"
                            style={{ color: config.color, background: config.bg }}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ background: config.dot }}
                            />
                            {config.label}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right text-xs" style={{ color: '#bbb' }}>
                          {formatDate(order.createdAt)}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            className="text-xs px-2 py-1.5 cursor-pointer outline-none transition-all duration-200"
                            style={{ color: '#666', background: '#faf8f5', border: '1px solid #e8e3de' }}
                            onFocus={(e) => { e.target.style.borderColor = '#1a1a1a'; }}
                            onBlur={(e) => { e.target.style.borderColor = '#e8e3de'; }}
                          >
                            {statusOptions.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>

                      {/* Expanded detail row */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.tr
                            key={`${order.id}-detail`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <td colSpan={7} className="px-4 py-0">
                              <div className="py-4 px-4 mb-3" style={{ background: '#faf8f5' }}>
                                <div className="flex items-center gap-2 mb-4">
                                  <Eye size={14} style={{ color: '#bbb' }} strokeWidth={1.5} />
                                  <span className="text-xs tracking-widest uppercase" style={{ color: '#999' }}>
                                    订单详情
                                  </span>
                                </div>

                                {order.items && order.items.length > 0 ? (
                                  <div className="space-y-3">
                                    {order.items.map((item, idx) => (
                                      <div
                                        key={idx}
                                        className="flex items-center justify-between py-2"
                                        style={{ borderBottom: '1px solid #e8e3de' }}
                                      >
                                        <div className="flex items-center gap-3">
                                          <div className="w-10 h-10 overflow-hidden flex-shrink-0" style={{ background: '#f0ebe6' }}>
                                            {item.image ? (
                                              <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                              />
                                            ) : (
                                              <div className="w-full h-full flex items-center justify-center" style={{ color: '#ddd' }}>
                                                <ShoppingCart size={14} />
                                              </div>
                                            )}
                                          </div>
                                          <div>
                                            <p className="text-sm" style={{ color: '#1a1a1a' }}>
                                              {item.name}
                                            </p>
                                            <p className="text-xs" style={{ color: '#bbb' }}>
                                              {item.size && `${item.size}`}
                                              {item.sweetness && item.size && ' / '}
                                              {item.sweetness && `${item.sweetness}`}
                                              {item.ice && item.sweetness && ' / '}
                                              {item.ice && `${item.ice}`}
                                            </p>
                                          </div>
                                        </div>
                                        <div className="text-right">
                                          <p className="text-sm" style={{ color: '#1a1a1a' }}>
                                            ¥{((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                                          </p>
                                          {item.quantity > 1 && (
                                            <p className="text-xs" style={{ color: '#bbb' }}>
                                              x{item.quantity}
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-xs py-2" style={{ color: '#bbb' }}>
                                    暂无商品详情
                                  </p>
                                )}

                                <div className="mt-4 pt-4 flex items-center justify-between" style={{ borderTop: '1px solid #e8e3de' }}>
                                  <span className="text-xs" style={{ color: '#bbb' }}>
                                    共 {order.items?.length || 0} 件商品
                                  </span>
                                  <span className="text-sm font-display" style={{ color: '#1a1a1a' }}>
                                    合计：¥{(order.total || 0).toFixed(2)}
                                  </span>
                                </div>
                              </div>
                            </td>
                          </motion.tr>
                        )}
                      </AnimatePresence>
                    </>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
