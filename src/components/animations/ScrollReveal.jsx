import { useEffect, useRef, useState } from 'react';

/**
 * ScrollReveal — 基于 IntersectionObserver 的滚动入场组件
 *
 * 动效参数（不可配置，保持一致性）：
 *   opacity: 0 → 1
 *   translateY: 30px → 0
 *   duration: 0.6s
 *   easing: cubic-bezier(0.16, 1, 0.3, 1)
 *
 * @param {object} props
 * @param {React.ReactNode} props.children — 需要入场的内容
 * @param {number} [props.delay=0] — 入场延迟（秒），用于 stagger 效果
 * @param {string} [props.className] — 传递给外层 div 的类名
 * @param {React.ElementType} [props.as='div'] — 外层标签，默认 div
 */
export default function ScrollReveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* 检测用户是否偏好减少动画 */
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(30px)',
    transition: visible
      ? `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s`
      : 'none',
  };

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
