import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Minus, Plus, ChevronRight, Leaf } from 'lucide-react';
import products from '../data/products';
import ProductCard from '../components/ProductCard';
import { useCartStore } from '../store';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(id));
  const addItem = useCartStore((s) => s.addItem);

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedSweetness, setSelectedSweetness] = useState('');
  const [selectedIce, setSelectedIce] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Sync defaults when product loads
  useState(() => {
    if (product) {
      setSelectedSize(product.sizes?.[0] || '');
      setSelectedSweetness(
        product.sweetness?.[Math.floor(product.sweetness.length / 2)] ||
          product.sweetness?.[0] ||
          ''
      );
      setSelectedIce(product.ice?.[0] || '');
    }
  });

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-muted text-lg mb-4">找不到这款饮品</p>
          <Link to="/products" className="btn-primary inline-block">
            返回点单
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    addItem(product, {
      size: selectedSize,
      sweetness: selectedSweetness,
      ice: selectedIce,
      quantity,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="pt-28 pb-6 px-6 md:px-12 lg:px-24 bg-light"
      >
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-1.5 text-xs tracking-widest text-muted">
            <Link to="/" className="hover:text-accent transition-colors duration-300">
              首页
            </Link>
            <ChevronRight size={12} strokeWidth={1.5} />
            <Link to="/products" className="hover:text-accent transition-colors duration-300">
              点单
            </Link>
            <ChevronRight size={12} strokeWidth={1.5} />
            <span className="text-primary">{product.name}</span>
          </nav>
        </div>
      </motion.section>

      {/* Product Detail */}
      <section className="px-6 md:px-12 lg:px-24 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24">
            {/* LEFT: Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative"
            >
              <div className="aspect-square bg-light rounded-sm overflow-hidden">
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                />
              </div>

              {/* Badges */}
              {product.new && (
                <span className="absolute top-4 left-4 bg-accent text-white text-[10px] tracking-[0.15em] uppercase px-3 py-1 rounded-sm">
                  NEW
                </span>
              )}
              {product.bestseller && (
                <span
                  className={`absolute top-4 bg-dark text-white text-[10px] tracking-[0.15em] uppercase px-3 py-1 rounded-sm ${
                    product.new ? 'left-[calc(1rem+4.5rem)]' : 'left-4'
                  }`}
                >
                  人气
                </span>
              )}
            </motion.div>

            {/* RIGHT: Product Info */}
            <motion.div
              initial="hidden"
              animate="visible"
              className="flex flex-col justify-center"
            >
              {/* English Name */}
              <motion.p
                variants={fadeUp}
                custom={0}
                className="text-xs tracking-[0.2em] uppercase text-accent mb-2"
              >
                {product.nameEn}
              </motion.p>

              {/* Chinese Name */}
              <motion.h1
                variants={fadeUp}
                custom={1}
                className="font-display text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-primary"
              >
                {product.name}
              </motion.h1>

              {/* Divider */}
              <motion.div
                variants={fadeUp}
                custom={2}
                className="w-12 h-px bg-accent mt-6 mb-6"
              />

              {/* Description */}
              <motion.p
                variants={fadeUp}
                custom={3}
                className="text-muted leading-relaxed text-sm md:text-base"
              >
                {product.description}
              </motion.p>

              {/* Price */}
              <motion.p
                variants={fadeUp}
                custom={4}
                className="text-2xl font-display text-accent mt-6"
              >
                &yen;{product.price}
                <span className="text-muted text-sm font-sans ml-1">起</span>
              </motion.p>

              {/* Ingredients */}
              <motion.div variants={fadeUp} custom={5} className="mt-8">
                <h3 className="text-xs tracking-widest uppercase text-muted mb-3 flex items-center gap-2">
                  <Leaf size={14} strokeWidth={1.5} />
                  配料
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ingredient) => (
                    <span
                      key={ingredient}
                      className="px-3 py-1.5 bg-light text-xs text-muted rounded-sm border border-border"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Size Selector */}
              <motion.div variants={fadeUp} custom={6} className="mt-8">
                <h3 className="text-xs tracking-widest uppercase text-muted mb-3">杯型</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      style={
                        selectedSize === s
                          ? { backgroundColor: '#1a1a1a', color: '#fff', borderColor: '#1a1a1a' }
                          : {}
                      }
                      className="px-4 py-2 rounded-full text-xs tracking-wide border border-border text-muted transition-all duration-200 cursor-pointer"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Sweetness Selector */}
              <motion.div variants={fadeUp} custom={7} className="mt-6">
                <h3 className="text-xs tracking-widest uppercase text-muted mb-3">甜度</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sweetness.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSweetness(s)}
                      style={
                        selectedSweetness === s
                          ? { backgroundColor: '#1a1a1a', color: '#fff', borderColor: '#1a1a1a' }
                          : {}
                      }
                      className="px-4 py-2 rounded-full text-xs tracking-wide border border-border text-muted transition-all duration-200 cursor-pointer"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Ice Selector */}
              <motion.div variants={fadeUp} custom={8} className="mt-6">
                <h3 className="text-xs tracking-widest uppercase text-muted mb-3">温度</h3>
                <div className="flex flex-wrap gap-2">
                  {product.ice.map((i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedIce(i)}
                      style={
                        selectedIce === i
                          ? { backgroundColor: '#1a1a1a', color: '#fff', borderColor: '#1a1a1a' }
                          : {}
                      }
                      className="px-4 py-2 rounded-full text-xs tracking-wide border border-border text-muted transition-all duration-200 cursor-pointer"
                    >
                      {i}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Quantity Selector */}
              <motion.div variants={fadeUp} custom={9} className="mt-8">
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
              </motion.div>

              {/* Add to Cart Button */}
              <motion.div variants={fadeUp} custom={10} className="mt-10">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={added}
                  className="btn-primary w-full flex items-center justify-center gap-3 disabled:opacity-80 disabled:cursor-default"
                >
                  <ShoppingBag size={16} strokeWidth={1.5} />
                  {added ? '\u2713 已加入' : '加入购物袋'}
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="bg-light py-24 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <p className="section-subtitle">YOU MAY ALSO LIKE</p>
              <h2 className="section-title mt-2">灵感推荐</h2>
              <div className="w-16 h-px bg-accent mx-auto mt-6" />
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
