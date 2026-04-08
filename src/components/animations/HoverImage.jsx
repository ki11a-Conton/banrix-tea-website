/**
 * HoverImage — 图片悬停交互组件
 *
 * 效果：hover 时 scale(1.05) + 底部半透明渐变遮罩
 * 禁用 3D 变换，无闪烁
 *
 * @param {object} props
 * @param {string} props.src — 图片地址
 * @param {string} props.alt — 图片描述
 * @param {string} [props.aspectRatio='4/5'] — 宽高比，默认 4:5
 * @param {string} [props.className] — 额外类名
 * @param {React.ReactNode} [props.overlay] — 悬停时显示在遮罩上的内容（如按钮）
 */
export default function HoverImage({
  src,
  alt,
  aspectRatio = '4/5',
  className = '',
  overlay,
}) {
  return (
    <div className={`hover-image-wrapper ${className}`}>
      <div className="hover-image-inner" style={{ aspectRatio }}>
        <img
          src={src}
          alt={alt}
          className="hover-image-src"
          loading="lazy"
        />

        {/* 悬停渐变遮罩 */}
        <div className="hover-image-overlay" aria-hidden="true" />

        {/* 悬停内容插槽 */}
        {overlay && <div className="hover-image-content">{overlay}</div>}
      </div>
    </div>
  );
}
