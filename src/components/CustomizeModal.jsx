import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus } from 'lucide-react';
import { useCartStore } from '../store';

export default function CustomizeModal({ product, isOpen, onClose, onAddToCart }) {
  const addItem = useCartStore((s) => s.addItem);

  const [size, setSize] = useState('');
  const [sweetness, setSweetness] = useState('');
  const [ice, setIce] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Sync defaults when modal opens
  useEffect(() => {
    if (isOpen && product) {
      setSize(product.sizes?.[0] || '');
      setSweetness(
        product.sweetness?.[Math.floor(product.sweetness.length / 2)] ||
          product.sweetness?.[0] ||
          ''
      );
      setIce(product.ice?.[0] || '');
      setQuantity(1);
    }
  }, [isOpen, product]);

  // Lock body scroll
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

  if (!product) return null;

  const handleAdd = () => {
    addItem(product, { size, sweetness, ice, quantity });
    onClose();
    onAddToCart?.();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          {/* Overlay */}
          <motion.div
            key="customize-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Panel */}
          <motion.div
            key="customize-panel"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative bg-white rounded-t-2xl sm:rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-1.5 bg-white/80 backdrop-blur-sm rounded-full text-muted hover:text-primary transition-colors duration-300 cursor-pointer"
            >
              <X size={18} strokeWidth={1.5} />
            </button>

            {/* Product Header */}
            <div className="flex gap-4 p-6 pb-0">
              <div className="w-24 h-24 flex-shrink-0 rounded-sm overflow-hidden bg-light">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0 pt-1">
                <h2 className="text-lg font-medium text-primary">{product.name}</h2>
                <p className="text-xs text-muted mt-0.5 tracking-wider">{product.nameEn}</p>
                <p className="text-sm font-medium text-accent mt-2">
                  &yen;{product.price}
                </p>
              </div>
            </div>

            {/* Options */}
            <div className="p-6 space-y-6">
              {/* Size */}
              {product.sizes?.length > 0 && (
                <div>
                  <h3 className="text-xs tracking-widest uppercase text-muted mb-3">规格</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSize(s)}
                        style={
                          size === s
                            ? { backgroundColor: '#1a1a1a', color: '#fff', borderColor: '#1a1a1a' }
                            : {}
                        }
                        className="px-4 py-2 rounded-full text-xs tracking-wide border border-border text-muted transition-all duration-200 cursor-pointer"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sweetness */}
              {product.sweetness?.length > 0 && (
                <div>
                  <h3 className="text-xs tracking-widest uppercase text-muted mb-3">甜度</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sweetness.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSweetness(s)}
                        style={
                          sweetness === s
                            ? { backgroundColor: '#1a1a1a', color: '#fff', borderColor: '#1a1a1a' }
                            : {}
                        }
                        className="px-4 py-2 rounded-full text-xs tracking-wide border border-border text-muted transition-all duration-200 cursor-pointer"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Ice */}
              {product.ice?.length > 0 && (
                <div>
                  <h3 className="text-xs tracking-widest uppercase text-muted mb-3">冰度</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.ice.map((i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setIce(i)}
                        style={
                          ice === i
                            ? { backgroundColor: '#1a1a1a', color: '#fff', borderColor: '#1a1a1a' }
                            : {}
                        }
                        className="px-4 py-2 rounded-full text-xs tracking-wide border border-border text-muted transition-all duration-200 cursor-pointer"
                      >
                        {i}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <h3 className="text-xs tracking-widest uppercase text-muted mb-3">数量</h3>
                <div className="inline-flex items-center border border-border rounded-full">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2.5 text-muted hover:text-primary transition-colors duration-200 cursor-pointer"
                  >
                    <Minus size={14} strokeWidth={1.5} />
                  </button>
                  <span className="w-10 text-center text-sm text-primary font-medium">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-2.5 text-muted hover:text-primary transition-colors duration-200 cursor-pointer"
                  >
                    <Plus size={14} strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Action */}
            <div className="sticky bottom-0 bg-white border-t border-border px-6 py-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-muted">小计</span>
                <span className="text-lg font-medium text-primary">
                  &yen;{(product.price * quantity).toFixed(2)}
                </span>
              </div>
              <button
                type="button"
                onClick={handleAdd}
                className="btn-primary w-full"
              >
                加入购物车
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
