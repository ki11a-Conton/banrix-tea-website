import { motion } from 'framer-motion';
import { Leaf, Heart, Sun, Mountain } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const values = [
  {
    icon: Leaf,
    title: '真茶原叶',
    desc: '深入高山茶园，甄选每一片原叶。不使用茶粉、茶精，只泡真正的茶叶。从采摘到杯中，每一步都保留茶的本味。',
  },
  {
    icon: Heart,
    title: '真心实意',
    desc: '拒绝植脂末，拒绝香精色素。每一杯都用鲜奶、真果、原糖。我们相信，好饮品不需要添加剂来伪装。',
  },
  {
    icon: Sun,
    title: '日常灵感',
    desc: '不需要特别的场合，也不需要仪式感。一个普通的下午，一杯好茶，就是生活给自己的一份小礼物。',
  },
  {
    icon: Mountain,
    title: '慢的力量',
    desc: '在这个越跑越快的世界里，我们选择慢下来。慢工出好茶，也慢出好生活。半日闲暇，足以重新出发。',
  },
];

export default function About() {
  return (
    <main className="bg-bg">
      {/* ==================== Hero ==================== */}
      <section className="relative h-[70vh] min-h-[480px] overflow-hidden bg-[#f5f0eb]">
        <img
          src={`${window.__BASE_URL__}images/product-3.jpg`}
          alt="半日闲茶饮"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/50 text-xs tracking-[0.3em] uppercase mb-5"
          >
            OUR STORY
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
          >
            关于半日闲
          </motion.h1>
        </div>
      </section>

      {/* ==================== 品牌缘起 ==================== */}
      <section className="py-20 md:py-[80px]">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="space-y-8"
          >
            <motion.div variants={fadeUp}>
              <p className="text-xs font-bold text-text-secondary tracking-[0.2em] uppercase mb-4">
                ORIGIN
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-text leading-snug">
                缘起
              </h2>
            </motion.div>

            <motion.p variants={fadeUp} className="text-text-secondary leading-[1.8] text-base">
              半日闲诞生于一个很简单的念头——想喝一杯真正的好茶。
            </motion.p>

            <motion.p variants={fadeUp} className="text-text-secondary leading-[1.8] text-base">
              我们发现，市面上的茶饮越来越花哨，配料表越来越长，但那杯茶本来的味道，反而越来越难找到。于是我们决定自己做：用原叶泡茶，用鲜奶做底，用真果调味。不加多余的，只留必要的。
            </motion.p>

            <motion.p variants={fadeUp} className="text-text-secondary leading-[1.8] text-base">
              「半日闲」这个名字，取自李涉的诗句——「因过竹院逢僧话，偷得浮生半日闲」。我们觉得这句话里有一种很珍贵的东西：不是逃离生活，而是在忙碌中找到片刻的停顿。一杯茶的时间，刚好够你深呼吸一次，看看窗外的天，然后继续往前走。
            </motion.p>
          </motion.div>
        </div>
      </section>

      <div className="h-px bg-divider max-w-7xl mx-auto" aria-hidden="true" />

      {/* ==================== 品牌理念 ==================== */}
      <section className="py-20 md:py-[80px]">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="space-y-8"
          >
            <motion.div variants={fadeUp}>
              <p className="text-xs font-bold text-text-secondary tracking-[0.2em] uppercase mb-4">
                PHILOSOPHY
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-text leading-snug">
                我们相信
              </h2>
            </motion.div>

            <motion.p variants={fadeUp} className="text-text-secondary leading-[1.8] text-base">
              好的茶饮不需要教育消费者。它应该像一阵风，你路过的时候觉得舒服，停下来喝一杯，然后带着好心情继续赶路。
            </motion.p>

            <motion.p variants={fadeUp} className="text-text-secondary leading-[1.8] text-base">
              我们不做「网红款」，不追「爆款」。每一款产品上架之前，我们自己先喝一百遍。如果喝到第一百遍还是觉得好喝，它才值得端给你。
            </motion.p>

            <motion.p variants={fadeUp} className="text-text-secondary leading-[1.8] text-base">
              价格不应该是喝好茶的门槛。所以我们把每一杯的价格，定在一个让人觉得「随时可以来一杯」的范围内。真品质，不昂贵——这是我们的承诺，也是我们的底线。
            </motion.p>
          </motion.div>
        </div>
      </section>

      <div className="h-px bg-divider max-w-7xl mx-auto" aria-hidden="true" />

      {/* ==================== 品牌价值观 ==================== */}
      <section className="py-20 md:py-[80px]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <p className="text-xs font-bold text-text-secondary tracking-[0.2em] uppercase mb-4">
              VALUES
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-text">
              四件事
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {values.map((item) => (
              <motion.div
                key={item.title}
                className="bg-white p-8 rounded-card"
                variants={fadeUp}
              >
                <div className="w-11 h-11 rounded-lg bg-card flex items-center justify-center mb-5">
                  <item.icon size={20} className="text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold text-text mb-3">{item.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="h-px bg-divider max-w-7xl mx-auto" aria-hidden="true" />

      {/* ==================== 结尾 ==================== */}
      <section className="py-20 md:py-[80px]">
        <motion.div
          className="max-w-2xl mx-auto px-6 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <p className="text-2xl md:text-3xl font-bold text-text leading-snug">
            「偷得浮生半日闲」
          </p>
          <p className="text-text-secondary text-base leading-relaxed mt-6">
            不是逃避，是选择。选择在忙碌中给自己留一点空间，喝一杯好茶，想一些有的没的。这半日的闲暇，就是我们对生活最大的敬意。
          </p>
          <p className="text-text-secondary text-sm mt-8">
            —— 半日闲团队
          </p>
        </motion.div>
      </section>
    </main>
  );
}
