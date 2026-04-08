import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Plus, Check, Leaf, Heart, Sun, Mountain } from 'lucide-react';
import { useCartStore } from '../store';

/* ========================================
   Featured product data (with default specs for add-to-cart)
   ======================================== */
const FEATURED_ITEMS = [
  {
    id: 1, name: '多肉葡萄', price: 22, image: '/images/product-1.jpg',
    sizes: ['中杯 500ml', '大杯 700ml'],
    sweetness: ['正常糖', '少甜', '三分甜', '零卡糖'],
    ice: ['正常冰', '少冰', '去冰', '常温'],
  },
  {
    id: 2, name: '烤黑糖波波牛乳', price: 28, image: '/images/product-2.jpg',
    sizes: ['中杯 500ml', '大杯 700ml'],
    sweetness: ['正常糖', '少甜', '三分甜', '零卡糖'],
    ice: ['正常冰', '少冰', '去冰', '常温'],
  },
  {
    id: 3, name: '生打椰椰芒芒', price: 25, image: '/images/product-3.jpg',
    sizes: ['中杯 500ml', '大杯 700ml'],
    sweetness: ['正常糖', '少甜', '三分甜', '零卡糖'],
    ice: ['正常冰', '少冰', '去冰', '常温'],
  },
  {
    id: 4, name: '轻乳茶·茉莉', price: 26, image: '/images/product-4.jpg',
    sizes: ['中杯 500ml', '大杯 700ml'],
    sweetness: ['正常糖', '少甜', '三分甜', '零卡糖'],
    ice: ['正常冰', '少冰', '去冰'],
  },
];

/* ========================================
   Brand values data
   ======================================== */
const BRAND_VALUES = [
  {
    icon: Leaf,
    title: '原叶好茶',
    description: '甄选高山原叶，每一杯都是对茶的本真表达。',
  },
  {
    icon: Heart,
    title: '手作温度',
    description: '拒绝工业化流水线，每一杯都带着匠人的心意。',
  },
  {
    icon: Sun,
    title: '时令鲜果',
    description: '顺应自然节律，只选用当季最新鲜的果实。',
  },
  {
    icon: Mountain,
    title: '东方美学',
    description: '从器物到空间，让每一次品饮都成为一场审美体验。',
  },
];

/* ========================================
   Animations — subtle fade-in only
   ======================================== */
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ========================================
   Editorial Product Card
   ======================================== */
function EditorialProductCard({ item }) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.article
      className="group"
      variants={fadeIn}
    >
      {/* Image — 3:2 aspect ratio */}
      <div className="overflow-hidden rounded-[8px]">
        <div className="aspect-[3/2]">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>
      </div>

      {/* Text info */}
      <div className="mt-5">
        <h3 className="text-xl font-normal text-[#1A1A1A] leading-tight">
          {item.name}
        </h3>
        <p className="text-sm font-light text-[#888888] mt-2">
          ¥{item.price}
        </p>
        <button
          type="button"
          onClick={handleAdd}
          className="mt-3 inline-flex items-center gap-1.5 text-xs tracking-wider text-[#888888] hover:text-[#1A1A1A] transition-colors duration-300"
          aria-label={`加入购物袋：${item.name}`}
        >
          {added ? (
            <>
              <Check size={12} strokeWidth={2} />
              <span>已加入</span>
            </>
          ) : (
            <>
              <Plus size={12} strokeWidth={1.5} />
              <span>加入购物袋</span>
            </>
          )}
        </button>
      </div>
    </motion.article>
  );
}

/* ========================================
   Home Page
   ======================================== */
export default function Home() {
  return (
    <main>
      {/* =============================================
          Section 1: Hero (100vh)
          ============================================= */}
      <section
        className="relative h-screen overflow-hidden bg-[#F5F3F0]"
        aria-label="首屏"
      >
        <div className="relative z-10 h-full max-w-[1400px] mx-auto px-8 md:px-12 flex items-center">
          {/* Left — Brand text grid (40%) */}
          <motion.div
            className="w-[40%] flex flex-col justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            {/* 3x3 character grid */}
            <div className="grid grid-cols-3 gap-x-2 gap-y-1 md:gap-x-4 md:gap-y-2">
              {['慢', '下', '来'].map((char) => (
                <span
                  key={char}
                  className="text-[48px] md:text-[72px] font-light text-[#1A1A1A] leading-none"
                  style={{
                    fontFamily: "'Noto Serif SC', serif",
                    letterSpacing: '0.15em',
                  }}
                >
                  {char}
                </span>
              ))}
              {['，', '', '喝'].map((char, i) => (
                <span
                  key={`row2-${i}`}
                  className="text-[48px] md:text-[72px] font-light text-[#1A1A1A] leading-none"
                  style={{
                    fontFamily: "'Noto Serif SC', serif",
                    letterSpacing: '0.15em',
                  }}
                >
                  {char}
                </span>
              ))}
              {['杯', '好', '茶'].map((char) => (
                <span
                  key={char}
                  className="text-[48px] md:text-[72px] font-light text-[#1A1A1A] leading-none"
                  style={{
                    fontFamily: "'Noto Serif SC', serif",
                    letterSpacing: '0.15em',
                  }}
                >
                  {char}
                </span>
              ))}
            </div>

            {/* Subtitle */}
            <p
              className="mt-8 text-[12px] text-[#888888] tracking-[0.2em]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              banrix · 偷得浮生半日闲
            </p>
          </motion.div>

          {/* Right — Product image (60%) */}
          <motion.div
            className="w-[60%] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
          >
            <img
              src="/images/product-1.jpg"
              alt="半日闲招牌茶饮"
              className="w-[85%] md:w-[75%] object-cover rounded-[8px] shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
              style={{ transform: 'translateY(-5%)' }}
            />
          </motion.div>
        </div>
      </section>

      {/* =============================================
          Section 2: Brand Story (editorial, asymmetric)
          ============================================= */}
      <section
        className="py-24 md:py-32 bg-[#F5F3F0]"
        aria-label="品牌故事"
      >
        <div className="max-w-[1400px] mx-auto px-8 md:px-12">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-12 md:gap-16">
            {/* Left — Text (45%) */}
            <motion.div
              className="w-full md:w-[45%]"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <p
                className="text-[12px] text-[#888888] tracking-[0.2em] uppercase mb-6"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                OUR STORY
              </p>
              <h2
                className="text-[32px] md:text-[40px] font-light text-[#1A1A1A] leading-[1.6]"
                style={{ fontFamily: "'Noto Serif SC', serif" }}
              >
                以一杯好茶
                <br />
                重新想象日常
              </h2>
              <div className="mt-8 space-y-6 max-w-md">
                <p className="text-base font-light leading-[2] text-[#666666]">
                  半日闲诞生于一个简单的信念：好茶不应被高高供奉在茶席之上，而应自然地融入每一个日常瞬间。我们走遍茶园，与制茶师傅对话，只为找到那一口让人停下脚步的味道。
                </p>
                <p className="text-base font-light leading-[2] text-[#666666]">
                  从一颗葡萄的采摘时机，到一杯奶茶的最佳温度，我们相信细节之中藏着生活的诗意。这不是一杯饮品，而是一段属于你的半日闲暇。
                </p>
              </div>
            </motion.div>

            {/* Right — Image (55%) */}
            <motion.div
              className="w-full md:w-[55%]"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <img
                src="/images/product-3.jpg"
                alt="品牌故事"
                className="w-full object-cover rounded-[8px] shadow-[0_16px_48px_rgba(0,0,0,0.06)]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* =============================================
          Section 3: Featured Products (editorial cards)
          ============================================= */}
      <section
        className="py-24 md:py-32 bg-[#FFFFFF]"
        aria-label="精选商品"
      >
        <div className="max-w-[1400px] mx-auto px-8 md:px-12">
          {/* Section header */}
          <motion.div
            className="mb-14 md:mb-20"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <p
              className="text-[12px] text-[#888888] tracking-[0.2em] uppercase mb-3"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              FEATURED
            </p>
            <h2
              className="text-[32px] md:text-[40px] font-light text-[#1A1A1A]"
              style={{ fontFamily: "'Noto Serif SC', serif" }}
            >
              灵感之选
            </h2>
          </motion.div>

          {/* Product grid — 2 columns on desktop, 1 on mobile */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 md:gap-y-20"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {FEATURED_ITEMS.map((item) => (
              <EditorialProductCard key={item.id} item={item} />
            ))}
          </motion.div>

          {/* View all link */}
          <motion.div
            className="mt-16 md:mt-20"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Link
              to="/products"
              className="group inline-flex items-center gap-2 text-sm font-light text-[#888888] hover:text-[#1A1A1A] transition-colors duration-300"
            >
              查看全部
              <ArrowRight
                size={14}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* =============================================
          Section 4: Brand Values (2x2 grid)
          ============================================= */}
      <section
        className="py-24 md:py-32 bg-[#F5F3F0]"
        aria-label="品牌理念"
      >
        <div className="max-w-[1400px] mx-auto px-8 md:px-12">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16 md:gap-y-20"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {BRAND_VALUES.map(({ icon: Icon, title, description }) => (
              <motion.div
                key={title}
                className="flex items-start gap-5"
                variants={fadeIn}
              >
                <Icon
                  size={28}
                  strokeWidth={1}
                  className="text-[#888888] mt-1 shrink-0"
                />
                <div>
                  <h3
                    className="text-xl font-normal text-[#1A1A1A] mb-3"
                    style={{ fontFamily: "'Noto Serif SC', serif" }}
                  >
                    {title}
                  </h3>
                  <p className="text-base font-light leading-[2] text-[#666666] max-w-sm">
                    {description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* =============================================
          Section 5: CTA / Membership
          ============================================= */}
      <section
        className="py-24 md:py-32 bg-[#FFFFFF]"
        aria-label="会员加入"
      >
        <div className="max-w-[1400px] mx-auto px-8 md:px-12 text-center">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <h2
              className="text-[32px] md:text-[40px] font-light text-[#1A1A1A] mb-4"
              style={{ fontFamily: "'Noto Serif SC', serif" }}
            >
              加入半日闲
            </h2>
            <p className="text-base font-light text-[#888888] mb-10">
              成为会员，解锁更多灵感
            </p>
            <Link
              to="/register"
              className="group inline-flex items-center gap-3 px-8 py-3.5 border border-[#1A1A1A] text-[#1A1A1A] text-sm font-light tracking-wider rounded-[8px] hover:bg-[#1A1A1A] hover:text-white transition-all duration-500"
            >
              立即加入
              <ArrowRight
                size={14}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
