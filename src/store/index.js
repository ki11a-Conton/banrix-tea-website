import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Auth Store
export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (email, password) => {
        // Simulated login
        const user = {
          id: Date.now(),
          email,
          name: email.split('@')[0],
          avatar: null,
          role: email.includes('admin') ? 'admin' : 'user',
        };
        set({ user, isAuthenticated: true });
        return user;
      },
      register: (name, email, password) => {
        const user = {
          id: Date.now(),
          email,
          name,
          avatar: null,
          role: 'user',
        };
        set({ user, isAuthenticated: true });
        return user;
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

// Cart Store
export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, options = {}) => {
        const { size, sweetness, ice } = options;
        const cartItem = {
          id: `${product.id}-${size}-${sweetness}-${ice}-${Date.now()}`,
          productId: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          size: size || product.sizes[0],
          sweetness: sweetness || product.sweetness[2],
          ice: ice || product.ice[0],
          quantity: 1,
        };
        set({ items: [...get().items, cartItem] });
      },
      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        });
      },
      clearCart: () => {
        set({ items: [] });
      },
      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);

// Product Store (Admin)
export const useProductStore = create(
  persist(
    (set, get) => ({
      products: [],
      orders: [],
      initProducts: (products) => {
        set({ products: [...products] });
      },
      addProduct: (product) => {
        const newProduct = {
          ...product,
          id: Date.now(),
        };
        set({ products: [...get().products, newProduct] });
        return newProduct;
      },
      updateProduct: (id, updates) => {
        set({
          products: get().products.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        });
      },
      deleteProduct: (id) => {
        set({ products: get().products.filter((p) => p.id !== id) });
      },
      addOrder: (order) => {
        const newOrder = {
          ...order,
          id: `ORD-${Date.now()}`,
          createdAt: new Date().toISOString(),
          status: 'pending',
        };
        set({ orders: [newOrder, ...get().orders] });
        return newOrder;
      },
      updateOrderStatus: (id, status) => {
        set({
          orders: get().orders.map((o) =>
            o.id === id ? { ...o, status } : o
          ),
        });
      },
    }),
    {
      name: 'product-storage',
    }
  )
);
