import { useRef, useCallback } from 'react';

/**
 * RippleButton — 带涟漪反馈的按钮组件
 *
 * 涟漪实现：点击时在鼠标位置创建一个圆形 span，
 * 通过 CSS animation 从 0 扩展到覆盖按钮区域，然后淡出。
 *
 * @param {object} props
 * @param {'primary'|'secondary'|'outline'} [props.variant='primary'] — 按钮样式变体
 * @param {React.ReactNode} props.children — 按钮内容
 * @param {function} [props.onClick] — 点击回调
 * @param {string} [props.className] — 额外类名
 * @param {boolean} [props.disabled] — 禁用状态
 */
export default function RippleButton({
  variant = 'primary',
  children,
  onClick,
  className = '',
  disabled = false,
  ...rest
}) {
  const buttonRef = useRef(null);

  const handleClick = useCallback(
    (e) => {
      if (disabled) return;

      const btn = buttonRef.current;
      if (!btn) return;

      /* 检测减少动画偏好 */
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        onClick?.(e);
        return;
      }

      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px;`;
      btn.appendChild(ripple);

      ripple.addEventListener('animationend', () => ripple.remove());

      onClick?.(e);
    },
    [disabled, onClick]
  );

  const variantClass = {
    primary: 'ripple-btn-primary',
    secondary: 'ripple-btn-secondary',
    outline: 'ripple-btn-outline',
  }[variant];

  return (
    <button
      ref={buttonRef}
      className={`ripple-btn ${variantClass} ${disabled ? 'ripple-btn-disabled' : ''} ${className}`}
      onClick={handleClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
