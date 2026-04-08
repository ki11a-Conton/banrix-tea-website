import { useState, useEffect } from 'react';
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Search,
  Star,
  Sparkles,
  ImageOff,
  Package,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProductStore } from '../../store';
import defaultProducts, { categories } from '../../data/products';

const categoryOptions = categories.filter((c) => c.id !== 'all');

const emptyForm = {
  name: '',
  nameEn: '',
  description: '',
  price: '',
  category: 'classic',
  image: '',
  ingredients: '',
  bestseller: false,
  new: false,
};

const inputClass = `w-full px-4 py-3 text-sm outline-none transition-all duration-200`;
const inputStyle = {
  color: '#1a1a1a',
  background: '#faf8f5',
  border: '1px solid #e8e3de',
};

const selectStyle = {
  color: '#1a1a1a',
  background: '#faf8f5',
  border: '1px solid #e8e3de',
};

export default function ProductManagement() {
  const { products, initProducts, addProduct, updateProduct, deleteProduct } =
    useProductStore();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    if (products.length === 0) {
      initProducts(defaultProducts);
    }
  }, [products.length, initProducts]);

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.nameEn && p.nameEn.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory =
      filterCategory === 'all' || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenAdd = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowModal(true);
  };

  const handleOpenEdit = (product) => {
    setForm({
      name: product.name || '',
      nameEn: product.nameEn || '',
      description: product.description || '',
      price: product.price?.toString() || '',
      category: product.category || 'classic',
      image: product.image || '',
      ingredients: (product.ingredients || []).join(', '),
      bestseller: product.bestseller || false,
      new: product.new || false,
    });
    setEditingId(product.id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      name: form.name.trim(),
      nameEn: form.nameEn.trim(),
      description: form.description.trim(),
      price: parseFloat(form.price) || 0,
      category: form.category,
      image: form.image.trim(),
      ingredients: form.ingredients
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      sizes: ['中杯 500ml', '大杯 700ml'],
      sweetness: ['全糖', '七分糖', '半糖', '三分糖', '无糖'],
      ice: ['正常冰', '少冰', '去冰', '温热'],
      bestseller: form.bestseller,
      new: form.new,
    };

    if (editingId) {
      updateProduct(editingId, productData);
    } else {
      addProduct(productData);
    }

    handleCloseModal();
  };

  const handleDelete = (id) => {
    deleteProduct(id);
    setDeleteConfirm(null);
  };

  const getCategoryName = (catId) => {
    const cat = categoryOptions.find((c) => c.id === catId);
    return cat ? cat.name : catId;
  };

  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="text-xs tracking-widest uppercase mb-2" style={{ color: '#999' }}>
            Products
          </p>
          <h1 className="font-display text-2xl" style={{ color: '#1a1a1a' }}>
            产品管理
          </h1>
          <p className="text-xs mt-1" style={{ color: '#bbb' }}>
            共 {filteredProducts.length} 个产品
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-6 py-3 text-sm tracking-widest uppercase text-white transition-all duration-300 hover:opacity-90"
          style={{ background: '#1a1a1a' }}
        >
          <Plus size={16} strokeWidth={1.5} />
          添加产品
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2"
            style={{ color: '#bbb' }}
          />
          <input
            type="text"
            placeholder="搜索产品名称..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={inputClass + ' pl-10'}
            style={inputStyle}
            onFocus={(e) => { e.target.style.borderColor = '#1a1a1a'; }}
            onBlur={(e) => { e.target.style.borderColor = '#e8e3de'; }}
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className={inputClass + ' cursor-pointer'}
          style={selectStyle}
          onFocus={(e) => { e.target.style.borderColor = '#1a1a1a'; }}
          onBlur={(e) => { e.target.style.borderColor = '#e8e3de'; }}
        >
          <option value="all">全部分类</option>
          {categoryOptions.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Product table */}
      <div style={{ background: '#fff' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid #e8e3de' }}>
                <th className="text-left py-4 px-4 text-xs tracking-widest uppercase" style={{ color: '#999' }}>
                  图片
                </th>
                <th className="text-left py-4 px-4 text-xs tracking-widest uppercase" style={{ color: '#999' }}>
                  名称
                </th>
                <th className="text-right py-4 px-4 text-xs tracking-widest uppercase" style={{ color: '#999' }}>
                  价格
                </th>
                <th className="text-left py-4 px-4 text-xs tracking-widest uppercase" style={{ color: '#999' }}>
                  分类
                </th>
                <th className="text-center py-4 px-4 text-xs tracking-widest uppercase" style={{ color: '#999' }}>
                  标签
                </th>
                <th className="text-right py-4 px-4 text-xs tracking-widest uppercase" style={{ color: '#999' }}>
                  操作
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-16">
                    <Package size={36} className="mx-auto mb-3" style={{ color: '#e8e3de' }} strokeWidth={1} />
                    <p className="text-sm" style={{ color: '#bbb' }}>暂无产品数据</p>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    style={{ borderBottom: '1px solid #f0ebe6' }}
                    className="transition-colors duration-200"
                    onMouseEnter={(e) => e.currentTarget.style.background = '#faf8f5'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <td className="py-3 px-4">
                      <div className="w-12 h-12 overflow-hidden flex-shrink-0" style={{ background: '#f5f0eb' }}>
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div
                          className="w-full h-full items-center justify-center"
                          style={{ display: product.image ? 'none' : 'flex', color: '#ddd' }}
                        >
                          <ImageOff size={18} strokeWidth={1} />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-sm" style={{ color: '#1a1a1a' }}>
                        {product.name}
                      </p>
                      {product.nameEn && (
                        <p className="text-xs mt-0.5" style={{ color: '#bbb' }}>
                          {product.nameEn}
                        </p>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span style={{ color: '#1a1a1a' }}>¥{product.price}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className="inline-block text-xs px-2.5 py-1"
                        style={{ color: '#666', background: '#f5f0eb' }}
                      >
                        {getCategoryName(product.category)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-1.5">
                        {product.bestseller && (
                          <span
                            className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5"
                            style={{ color: '#c8a97e', background: 'rgba(200,169,126,0.1)' }}
                          >
                            <Star size={10} fill="currentColor" />
                            热销
                          </span>
                        )}
                        {product.new && (
                          <span
                            className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5"
                            style={{ color: '#22c55e', background: 'rgba(34,197,94,0.1)' }}
                          >
                            <Sparkles size={10} />
                            新品
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenEdit(product)}
                          className="p-2 transition-colors duration-200"
                          style={{ color: '#bbb' }}
                          onMouseEnter={(e) => e.currentTarget.style.color = '#1a1a1a'}
                          onMouseLeave={(e) => e.currentTarget.style.color = '#bbb'}
                          title="编辑"
                        >
                          <Pencil size={15} strokeWidth={1.5} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(product.id)}
                          className="p-2 transition-colors duration-200"
                          style={{ color: '#bbb' }}
                          onMouseEnter={(e) => e.currentTarget.style.color = '#c0392b'}
                          onMouseLeave={(e) => e.currentTarget.style.color = '#bbb'}
                          title="删除"
                        >
                          <Trash2 size={15} strokeWidth={1.5} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.4)' }} onClick={handleCloseModal} />
            <motion.div
              className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto"
              style={{ background: '#fff' }}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              {/* Modal header */}
              <div className="flex items-center justify-between p-6" style={{ borderBottom: '1px solid #e8e3de' }}>
                <h2 className="font-display text-lg" style={{ color: '#1a1a1a' }}>
                  {editingId ? '编辑产品' : '添加产品'}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="transition-colors duration-200"
                  style={{ color: '#bbb' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#1a1a1a'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#bbb'}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal body */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div>
                  <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: '#999' }}>
                    产品名称 <span style={{ color: '#c0392b' }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => handleFormChange('name', e.target.value)}
                    required
                    placeholder="例如：经典珍珠奶茶"
                    className={inputClass}
                    style={inputStyle}
                    onFocus={(e) => { e.target.style.borderColor = '#1a1a1a'; }}
                    onBlur={(e) => { e.target.style.borderColor = '#e8e3de'; }}
                  />
                </div>

                <div>
                  <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: '#999' }}>
                    英文名称
                  </label>
                  <input
                    type="text"
                    value={form.nameEn}
                    onChange={(e) => handleFormChange('nameEn', e.target.value)}
                    placeholder="例如：Classic Pearl Milk Tea"
                    className={inputClass}
                    style={inputStyle}
                    onFocus={(e) => { e.target.style.borderColor = '#1a1a1a'; }}
                    onBlur={(e) => { e.target.style.borderColor = '#e8e3de'; }}
                  />
                </div>

                <div>
                  <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: '#999' }}>
                    产品描述
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) => handleFormChange('description', e.target.value)}
                    rows={3}
                    placeholder="产品描述信息..."
                    className={inputClass + ' resize-none'}
                    style={inputStyle}
                    onFocus={(e) => { e.target.style.borderColor = '#1a1a1a'; }}
                    onBlur={(e) => { e.target.style.borderColor = '#e8e3de'; }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: '#999' }}>
                      价格 (¥) <span style={{ color: '#c0392b' }}>*</span>
                    </label>
                    <input
                      type="number"
                      value={form.price}
                      onChange={(e) => handleFormChange('price', e.target.value)}
                      required
                      min="0"
                      step="0.01"
                      placeholder="22"
                      className={inputClass}
                      style={inputStyle}
                      onFocus={(e) => { e.target.style.borderColor = '#1a1a1a'; }}
                      onBlur={(e) => { e.target.style.borderColor = '#e8e3de'; }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: '#999' }}>
                      分类 <span style={{ color: '#c0392b' }}>*</span>
                    </label>
                    <select
                      value={form.category}
                      onChange={(e) => handleFormChange('category', e.target.value)}
                      required
                      className={inputClass + ' cursor-pointer'}
                      style={selectStyle}
                      onFocus={(e) => { e.target.style.borderColor = '#1a1a1a'; }}
                      onBlur={(e) => { e.target.style.borderColor = '#e8e3de'; }}
                    >
                      {categoryOptions.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: '#999' }}>
                    图片 URL
                  </label>
                  <input
                    type="text"
                    value={form.image}
                    onChange={(e) => handleFormChange('image', e.target.value)}
                    placeholder={`${window.__BASE_URL__}images/product-1.jpg`}
                    className={inputClass}
                    style={inputStyle}
                    onFocus={(e) => { e.target.style.borderColor = '#1a1a1a'; }}
                    onBlur={(e) => { e.target.style.borderColor = '#e8e3de'; }}
                  />
                </div>

                <div>
                  <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: '#999' }}>
                    配料（用逗号分隔）
                  </label>
                  <input
                    type="text"
                    value={form.ingredients}
                    onChange={(e) => handleFormChange('ingredients', e.target.value)}
                    placeholder="锡兰红茶, 鲜牛奶, 黑糖珍珠"
                    className={inputClass}
                    style={inputStyle}
                    onFocus={(e) => { e.target.style.borderColor = '#1a1a1a'; }}
                    onBlur={(e) => { e.target.style.borderColor = '#e8e3de'; }}
                  />
                </div>

                {/* Toggles */}
                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.bestseller}
                      onChange={(e) => handleFormChange('bestseller', e.target.checked)}
                      className="w-4 h-4 cursor-pointer accent-[#c8a97e]"
                    />
                    <span className="text-sm" style={{ color: '#666' }}>热销产品</span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.new}
                      onChange={(e) => handleFormChange('new', e.target.checked)}
                      className="w-4 h-4 cursor-pointer accent-[#c8a97e]"
                    />
                    <span className="text-sm" style={{ color: '#666' }}>新品</span>
                  </label>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-6" style={{ borderTop: '1px solid #e8e3de' }}>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-6 py-3 text-sm tracking-widest uppercase transition-colors duration-200"
                    style={{ color: '#666' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#1a1a1a'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
                  >
                    取消
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 text-sm tracking-widest uppercase text-white transition-all duration-300 hover:opacity-90"
                    style={{ background: '#1a1a1a' }}
                  >
                    {editingId ? '保存修改' : '添加产品'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete confirmation */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.4)' }} onClick={() => setDeleteConfirm(null)} />
            <motion.div
              className="relative w-full max-w-sm p-8 text-center"
              style={{ background: '#fff' }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div
                className="w-12 h-12 flex items-center justify-center mx-auto mb-5"
                style={{ background: 'rgba(192,57,43,0.1)', color: '#c0392b' }}
              >
                <Trash2 size={20} />
              </div>
              <h3 className="font-display text-lg mb-2" style={{ color: '#1a1a1a' }}>
                确认删除
              </h3>
              <p className="text-sm mb-8" style={{ color: '#999' }}>
                删除后将无法恢复，确定要删除这个产品吗？
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-6 py-3 text-sm tracking-widest uppercase transition-colors duration-200"
                  style={{ color: '#666' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#1a1a1a'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
                >
                  取消
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="px-6 py-3 text-sm tracking-widest uppercase text-white transition-all duration-300 hover:opacity-90"
                  style={{ background: '#c0392b' }}
                >
                  确认删除
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
