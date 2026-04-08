import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function ProductCard({ product }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
    >
      <Link
        to={`/product/${product.id}`}
        className="group block shadow-sm hover:shadow-md transition-shadow duration-500"
      >
        {/* Image Container */}
        <div className="relative aspect-[3/4] bg-light overflow-hidden rounded-sm">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />

          {/* Badges */}
          {product.new && (
            <span className="absolute top-3 left-3 bg-accent text-white text-[10px] tracking-[0.15em] uppercase px-3 py-1 rounded-sm">
              NEW
            </span>
          )}
          {product.bestseller && (
            <span
              className={`absolute top-3 text-white text-[10px] tracking-[0.15em] uppercase px-3 py-1 rounded-sm bg-dark ${
                product.new ? 'left-3 top-[calc(1.5rem+1.625rem)]' : 'left-3'
              }`}
            >
              人气
            </span>
          )}
        </div>

        {/* Info */}
        <div className="p-5">
          <h3 className="text-base font-medium text-primary tracking-wide">
            {product.name}
          </h3>
          <p className="text-xs text-muted mt-1 tracking-wider">
            {product.nameEn}
          </p>
          <div className="flex justify-between items-center mt-4">
            <span className="text-accent font-medium">&yen;{product.price}</span>
            <ArrowUpRight
              size={16}
              strokeWidth={1.5}
              className="text-muted group-hover:text-accent transition-colors duration-300"
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
