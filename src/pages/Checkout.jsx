import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import {
  CheckCircle,
  ShoppingBag,
  ArrowLeft,
  CreditCard,
  Truck,
  User,
  Phone,
  MapPin,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore, useProductStore } from '../store';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#1a1a1a',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      fontSize: '14px',
      '::placeholder': {
        color: '#ccc',
      },
    },
    invalid: {
      color: '#c0392b',
    },
  },
};

const inputStyle = {
  color: '#1a1a1a',
  borderBottom: '1px solid #ddd',
};

const handleFocus = (e) => { e.target.style.borderBottomColor = '#1a1a1a'; };
const handleBlur = (e) => { e.target.style.borderBottomColor = '#ddd'; };

const CheckoutForm = ({ onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const items = useCartStore((s) => s.items);
  const getTotal = useCartStore((s) => s.getTotal);
  const clearCart = useCartStore((s) => s.clearCart);
  const addOrder = useProductStore((s) => s.addOrder);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const subtotal = getTotal();
  const shipping = 0;
  const total = subtotal + shipping;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('请输入姓名');
      return;
    }
    if (!phone.trim()) {
      setError('请输入电话');
      return;
    }
    if (!address.trim()) {
      setError('请输入地址');
      return;
    }

    if (!stripe || !elements) return;

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const order = addOrder({
        items: [...items],
        shipping: { name, phone, address },
        subtotal,
        shipping,
        total,
        paymentMethod: 'card',
      });

      clearCart();
      onSuccess(order);
    } catch {
      setError('支付失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* Shipping Info */}
      <div>
        <h3 className="flex items-center gap-2 text-xs tracking-widest uppercase mb-8" style={{ color: '#999' }}>
          <Truck className="w-4 h-4" />
          收货信息
        </h3>
        <div className="space-y-6">
          <div className="relative">
            <User className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#bbb' }} />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="姓名"
              className="w-full pl-6 pr-4 py-3 bg-transparent text-sm outline-none placeholder:text-[#ccc] transition-colors"
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
          <div className="relative">
            <Phone className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#bbb' }} />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="电话"
              className="w-full pl-6 pr-4 py-3 bg-transparent text-sm outline-none placeholder:text-[#ccc] transition-colors"
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
          <div className="relative">
            <MapPin className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#bbb' }} />
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="地址"
              className="w-full pl-6 pr-4 py-3 bg-transparent text-sm outline-none placeholder:text-[#ccc] transition-colors"
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
        </div>
      </div>

      {/* Payment Info */}
      <div>
        <h3 className="flex items-center gap-2 text-xs tracking-widest uppercase mb-8" style={{ color: '#999' }}>
          <CreditCard className="w-4 h-4" />
          支付方式
        </h3>
        <div className="p-5" style={{ border: '1px solid #e8e3de' }}>
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </div>
        <p className="text-xs mt-3" style={{ color: '#bbb' }}>
          测试卡号: 4242 4242 4242 4242
        </p>
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
        disabled={loading || !stripe}
        className="w-full py-4 text-sm tracking-widest uppercase text-white flex items-center justify-center gap-3 transition-all duration-300 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ background: '#1a1a1a' }}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            处理中...
          </span>
        ) : (
          <>
            <CreditCard size={16} />
            确认支付 ¥{total}
          </>
        )}
      </button>
    </form>
  );
};

const Checkout = () => {
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const getTotal = useCartStore((s) => s.getTotal);
  const [order, setOrder] = useState(null);

  const subtotal = getTotal();
  const shipping = 0;
  const total = subtotal + shipping;

  // Success State
  if (order) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ background: '#f5f0eb' }}>
        <motion.div
          className="text-center max-w-md w-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <CheckCircle className="w-20 h-20 mx-auto mb-8" style={{ color: '#c8a97e' }} strokeWidth={1} />
          <h2 className="font-display text-3xl mb-3" style={{ color: '#1a1a1a' }}>
            下单成功
          </h2>
          <p className="text-sm mb-2" style={{ color: '#999' }}>
            感谢下单，好茶即将送达
          </p>
          <p className="text-xs mb-10" style={{ color: '#bbb' }}>
            订单编号: {order.id}
          </p>
          <div className="p-6 mb-10 text-left" style={{ background: '#fff' }}>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span style={{ color: '#999' }}>收货人</span>
                <span style={{ color: '#1a1a1a' }}>{order.shipping.name}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: '#999' }}>电话</span>
                <span style={{ color: '#1a1a1a' }}>{order.shipping.phone}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: '#999' }}>地址</span>
                <span className="text-right max-w-[200px]" style={{ color: '#1a1a1a' }}>
                  {order.shipping.address}
                </span>
              </div>
              <div className="pt-3 flex justify-between" style={{ borderTop: '1px solid #e8e3de' }}>
                <span className="font-medium" style={{ color: '#1a1a1a' }}>订单金额</span>
                <span className="text-lg font-display" style={{ color: '#c8a97e' }}>
                  ¥{order.total}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-4 justify-center">
            <Link
              to="/"
              className="px-8 py-3 text-sm tracking-widest uppercase transition-all duration-300"
              style={{ border: '1px solid #ddd', color: '#666' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#1a1a1a'; e.currentTarget.style.color = '#1a1a1a'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#ddd'; e.currentTarget.style.color = '#666'; }}
            >
              返回首页
            </Link>
            <Link
              to="/products"
              className="px-8 py-3 text-sm tracking-widest uppercase text-white transition-all duration-300 hover:opacity-90"
              style={{ background: '#1a1a1a' }}
            >
              继续逛逛
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // Empty Cart
  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ background: '#f5f0eb' }}>
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 mx-auto mb-6" style={{ color: '#ddd' }} strokeWidth={1} />
          <h2 className="font-display text-2xl mb-3" style={{ color: '#1a1a1a' }}>
            购物袋是空的
          </h2>
          <p className="text-sm mb-8" style={{ color: '#999' }}>
            先去挑几杯喜欢的吧
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-3 px-8 py-4 text-sm tracking-widest uppercase text-white transition-all duration-300 hover:opacity-90"
            style={{ background: '#1a1a1a' }}
          >
            去点单
          </Link>
        </div>
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
              CHECKOUT
            </p>
            <h1 className="font-display text-4xl" style={{ color: '#1a1a1a' }}>
              结算
            </h1>
            <div className="w-12 h-px mt-6" style={{ background: '#c8a97e' }} />
          </motion.div>
        </div>
      </section>

      {/* Checkout Content */}
      <section className="px-6 md:px-12 lg:px-24 pb-24">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate('/cart')}
            className="flex items-center gap-2 text-sm mb-10 transition-colors duration-300"
            style={{ color: '#999' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#c8a97e'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#999'}
          >
            <ArrowLeft size={16} />
            返回购物袋
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Order Summary - Left */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <motion.div
                className="p-8 sticky top-24"
                style={{ background: '#fff' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="font-display text-xl mb-8" style={{ color: '#1a1a1a' }}>
                  订单详情
                </h3>
                <div className="space-y-4 mb-8">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="w-12 h-12 overflow-hidden flex-shrink-0" style={{ background: '#f5f0eb' }}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm truncate" style={{ color: '#1a1a1a' }}>{item.name}</p>
                        <p className="text-xs" style={{ color: '#999' }}>
                          {item.size} x{item.quantity}
                        </p>
                      </div>
                      <span className="text-sm" style={{ color: '#1a1a1a' }}>
                        ¥{item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="pt-6 space-y-3" style={{ borderTop: '1px solid #e8e3de' }}>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: '#999' }}>小计</span>
                    <span style={{ color: '#1a1a1a' }}>¥{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: '#999' }}>配送费</span>
                    <span style={{ color: '#c8a97e' }}>免费</span>
                  </div>
                  <div className="pt-3 flex justify-between" style={{ borderTop: '1px solid #e8e3de' }}>
                    <span className="font-medium" style={{ color: '#1a1a1a' }}>合计</span>
                    <span className="text-xl font-display" style={{ color: '#c8a97e' }}>
                      ¥{total}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Payment Form - Right */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Elements stripe={stripePromise}>
                  <CheckoutForm onSuccess={setOrder} />
                </Elements>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Checkout;
