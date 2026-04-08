import { useState, useEffect, useCallback, createContext, useContext, useRef } from 'react';

/* ========================================
   Toast Context — 全局单例管理
   ======================================== */
const ToastContext = createContext(null);

let toastId = 0;

/**
 * ToastProvider — 包裹在 App 最外层，提供 toast 方法
 * 用法：<ToastProvider><App /></ToastProvider>
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timersRef = useRef({});

  const addToast = useCallback((message, duration = 2000) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message }]);
    timersRef.current[id] = setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
      delete timersRef.current[id];
    }, duration);
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    if (timersRef.current[id]) {
      clearTimeout(timersRef.current[id]);
      delete timersRef.current[id];
    }
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* Toast 容器 — 固定在视口底部中上方，不遮挡内容 */}
      <div
        className="toast-container"
        role="status"
        aria-live="polite"
        aria-label="通知"
      >
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            message={toast.message}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

/**
 * useToast — 在任意组件中调用
 * const { addToast } = useToast();
 * addToast('已加入购物袋');
 */
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>');
  return ctx;
}

/* ========================================
   ToastItem — 单条 Toast（2s 自动消失）
   ======================================== */
function ToastItem({ message, onClose }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    /* 在总时长 2s 中，后 0.3s 触发退出动画 */
    const exitTimer = setTimeout(() => setExiting(true), 1700);
    return () => clearTimeout(exitTimer);
  }, []);

  return (
    <div
      className={`toast-item ${exiting ? 'toast-item-exit' : ''}`}
      role="alert"
    >
      <span className="toast-item-text">{message}</span>
      <button
        className="toast-item-close"
        onClick={onClose}
        aria-label="关闭通知"
      >
        ✕
      </button>
    </div>
  );
}
