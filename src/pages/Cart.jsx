import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore } from '../store';

const Cart = () => {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const getTotal = useCartStore((s) => s.getTotal);

  const subtotal = getTotal();
  const shipping = 0;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ background: '#f5f0eb' }}>
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ShoppingBag className="w-16 h-16 mx-auto mb-6" style={{ color: '#ddd' }} strokeWidth={1} />
          <h2 className="font-display text-2xl mb-3" style={{ color: '#1a1a1a' }}>
            购物袋是空的
          </h2>
          <p className="text-sm mb-8" style={{ color: '#999' }}>
            去挑一杯喜欢的吧
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-3 px-8 py-4 text-sm tracking-widest uppercase text-white transition-all duration-300 hover:opacity-90"
            style={{ background: '#1a1a1a' }}
          >
            去点单
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#f5f0eb' }}>
      {/* Page Header */}
      <section className="pt-32 pb-12 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs tracking-widest uppercase mb-3" style={{ color: '#999' }}>
              SHOPPING BAG
            </p>
            <h1 className="font-display text-4xl" style={{ color: '#1a1a1a' }}>
              购物袋
            </h1>
            <div className="w-12 h-px mt-6" style={{ background: '#c8a97e' }} />
          </motion.div>
        </div>
      </section>

      {/* Cart Content */}
      <section className="px-6 md:px-12 lg:px-24 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              {/* Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 pb-4 text-xs tracking-widest uppercase" style={{ color: '#999', borderBottom: '1px solid #ddd' }}>
                <div className="col-span-5">饮品</div>
                <div className="col-span-3">规格</div>
                <div className="col-span-2 text-center">数量</div>
                <div className="col-span-1 text-right">小计</div>
                <div className="col-span-1" />
              </div>

              {/* Items */}
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 py-6 items-center"
                  style={{ borderBottom: '1px solid #e8e3de' }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  {/* Product Info */}
                  <div className="md:col-span-5 flex items-center gap-5">
                    <div className="w-20 h-20 overflow-hidden flex-shrink-0" style={{ background: '#e8e3de' }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    </div>
                    <div>
                      <h3 className="font-display text-base" style={{ color: '#1a1a1a' }}>{item.name}</h3>
                      <p className="text-sm mt-1" style={{ color: '#c8a97e' }}>¥{item.price}</p>
                    </div>
                  </div>

                  {/* Options */}
                  <div className="md:col-span-3">
                    <p className="text-xs leading-relaxed" style={{ color: '#999' }}>
                      {item.size}
                      <br />
                      {item.sweetness} / {item.ice}
                    </p>
                  </div>

                  {/* Quantity */}
                  <div className="md:col-span-2 flex items-center justify-center gap-4">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center transition-colors duration-300"
                      style={{ border: '1px solid #ddd' }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = '#1a1a1a'}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = '#ddd'}
                    >
                      <Minus size={12} style={{ color: '#666' }} />
                    </button>
                    <span className="text-sm w-6 text-center" style={{ color: '#1a1a1a' }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center transition-colors duration-300"
                      style={{ border: '1px solid #ddd' }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = '#1a1a1a'}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = '#ddd'}
                    >
                      <Plus size={12} style={{ color: '#666' }} />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="md:col-span-1 text-right">
                    <span className="text-sm" style={{ color: '#1a1a1a' }}>
                      ¥{item.price * item.quantity}
                    </span>
                  </div>

                  {/* Remove */}
                  <div className="md:col-span-1 flex justify-end">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="transition-colors duration-300"
                      style={{ color: '#bbb' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#c0392b'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#bbb'}
                    >
                      <Trash2 size={16} strokeWidth={1.5} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                className="p-8 sticky top-24"
                style={{ background: '#fff' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h3 className="font-display text-xl mb-8" style={{ color: '#1a1a1a' }}>
                  订单详情
                </h3>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm">
                    <span style={{ color: '#999' }}>小计</span>
                    <span style={{ color: '#1a1a1a' }}>¥{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: '#999' }}>配送费</span>
                    <span style={{ color: '#c8a97e' }}>免费</span>
                  </div>
                  <div className="pt-4 flex justify-between" style={{ borderTop: '1px solid #e8e3de' }}>
                    <span className="font-medium" style={{ color: '#1a1a1a' }}>合计</span>
                    <span className="text-xl font-display" style={{ color: '#c8a97e' }}>
                      ¥{total}
                    </span>
                  </div>
                </div>
                <Link
                  to="/checkout"
                  className="w-full py-4 text-sm tracking-widest uppercase text-white flex items-center justify-center gap-3 transition-all duration-300 hover:opacity-90"
                  style={{ background: '#1a1a1a' }}
                >
                  去结算
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/products"
                  className="block text-center text-sm mt-5 transition-colors duration-300"
                  style={{ color: '#999' }}
                  onMouseEnter={(e) => e.target.style.color = '#c8a97e'}
                  onMouseLeave={(e) => e.target.style.color = '#999'}
                >
                  继续逛逛
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
