import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Stores() {
  return (
    <main className="min-h-screen bg-bg">
      {/* Hero */}
      <section className="py-20 md:py-28 bg-bg text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-text-secondary">
            STORES
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-text mt-4">
            门店
          </h1>
          <p className="text-text-secondary text-base mt-4">
            寻找离你最近的半日闲
          </p>
        </motion.div>
      </section>

      <div className="h-px bg-divider max-w-7xl mx-auto" aria-hidden="true" />

      {/* 空状态 */}
      <section className="py-24 md:py-32">
        <motion.div
          className="max-w-md mx-auto px-6 text-center"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <div className="w-16 h-16 rounded-full bg-card flex items-center justify-center mx-auto mb-6">
            <MapPin size={28} className="text-text-secondary" strokeWidth={1.5} />
          </div>
          <h2 className="text-xl font-bold text-text mb-3">
            附近暂无门店
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            我们正在努力拓展中，半日闲即将来到你的城市。<br />
            敬请期待。
          </p>
          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-text-secondary">
            <Navigation size={14} strokeWidth={1.5} />
            <span>当前定位：无法获取位置信息</span>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
