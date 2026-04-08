import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import products, { categories } from '../data/products';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || 'all'
  );

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    if (categoryId === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: categoryId });
    }
  };

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Area */}
      <section className="py-20 md:py-28 bg-light text-center">
        <p className="text-sm tracking-[0.3em] uppercase text-muted">
          BANRIX MENU
        </p>
        <h1 className="section-title mt-4 text-4xl md:text-5xl">点单</h1>
        <p className="text-muted text-base mt-4">真奶真果真茶，一杯灵感</p>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-16 md:top-20 z-30 bg-white/95 backdrop-blur-md border-b border-border/50">
        <div className="flex justify-center gap-1 py-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-6 py-2.5 text-sm tracking-[0.15em] uppercase transition-all duration-300 border-b-2 ${
                selectedCategory === category.id
                  ? 'text-primary border-primary'
                  : 'text-muted border-transparent hover:text-primary'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12"
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredProducts.length === 0 && (
            <div className="text-center py-24">
              <p className="text-muted text-lg">暂无饮品</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Products;
