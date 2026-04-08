import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store';

export default function CartDrawer({ isOpen, onClose }) {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const getTotal = useCartStore((s) => s.getTotal);
  const getItemCount = useCartStore((s) => s.getItemCount);

  const total = getTotal();
  const count = getItemCount();

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            key="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed top-0 right-0 h-full w-full max-w-md z-50 bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-8 py-6 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingBag size={16} strokeWidth={1.5} className="text-primary" />
                <h2 className="text-xs tracking-[0.2em] uppercase text-primary font-medium">
                  购物车
                </h2>
                {count > 0 && (
                  <span className="text-xs text-muted">({count})</span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-muted hover:text-primary transition-colors duration-300 cursor-pointer"
                aria-label="关闭购物车"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto px-8 py-6">
              {items.length === 0 ? (
                /* Empty State */
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag
                    size={64}
                    strokeWidth={1}
                    className="text-border mb-4"
                  />
                  <p className="text-sm text-muted mb-1">购物车是空的</p>
                  <p className="text-xs text-muted/60 mb-6">
                    去挑选一杯好茶吧
                  </p>
                  <Link
                    to="/products"
                    onClick={onClose}
                    className="text-xs tracking-[0.15em] uppercase text-accent hover:text-accent-dark transition-colors duration-300 border-b border-accent/30 hover:border-accent pb-0.5"
                  >
                    去逛逛
                  </Link>
                </div>
              ) : (
                /* Items */
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      {/* Image */}
                      <div className="w-20 h-20 flex-shrink-0 rounded-sm overflow-hidden bg-light">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-primary truncate">
                          {item.name}
                        </h3>
                        <p className="text-xs text-muted mt-1 leading-relaxed">
                          {item.size}
                          {item.sweetness && ` / ${item.sweetness}`}
                          {item.ice && ` / ${item.ice}`}
                        </p>

                        {/* Bottom row: quantity + price + delete */}
                        <div className="flex items-center justify-between mt-3">
                          {/* Quantity Controls */}
                          <div className="inline-flex items-center border border-border rounded-full">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1.5 text-muted hover:text-primary transition-colors duration-200 cursor-pointer"
                              aria-label="减少数量"
                            >
                              <Minus size={12} strokeWidth={1.5} />
                            </button>
                            <span className="w-7 text-center text-xs text-primary font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1.5 text-muted hover:text-primary transition-colors duration-200 cursor-pointer"
                              aria-label="增加数量"
                            >
                              <Plus size={12} strokeWidth={1.5} />
                            </button>
                          </div>

                          {/* Price */}
                          <span className="text-sm font-medium text-primary">
                            &yen;{(item.price * item.quantity).toFixed(0)}
                          </span>

                          {/* Delete */}
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-1 text-muted hover:text-red-400 transition-colors duration-300 cursor-pointer"
                            aria-label="移除商品"
                          >
                            <Trash2 size={14} strokeWidth={1.5} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="sticky bottom-0 bg-white border-t border-border px-8 py-6">
                {/* Subtotal */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted">合计</span>
                  <span className="text-lg font-medium text-primary">
                    &yen;{total.toFixed(2)}
                  </span>
                </div>

                {/* Checkout Button */}
                <Link
                  to="/checkout"
                  onClick={onClose}
                  className="btn-primary w-full flex items-center justify-center mt-4 no-underline"
                >
                  去结算
                </Link>

                {/* Continue Shopping */}
                <button
                  onClick={onClose}
                  className="w-full text-xs text-muted hover:text-primary mt-3 transition-colors duration-300 text-center cursor-pointer"
                >
                  继续购物
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
