import { Link } from 'react-router-dom';

function InstagramIcon({ size = 18, strokeWidth = 1.5, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

const productLinks = [
  { label: '全部饮品', path: '/products' },
  { label: '经典系列', path: '/products' },
  { label: '招牌推荐', path: '/products' },
  { label: '当季限定', path: '/products' },
];

const aboutLinks = [
  { label: '关于半日闲', path: '/about' },
  { label: '门店', path: '/about' },
  { label: '加入半日闲', path: '/about' },
  { label: '联系客服', path: '/about' },
];

function WeChatIcon({ size = 18, strokeWidth = 1.5 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
      <path d="M15 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
      <path d="M8.5 8.5C7 7 4.5 7 3 8.5S1.5 12 3 13.5c.5.5 1 .8 1.5 1" />
      <path d="M15.5 8.5C17 7 19.5 7 21 8.5s1.5 3.5 0 5c-.5.5-1 .8-1.5 1" />
      <path d="M12 16c-2 0-3.5-1-3.5-1s1.5 3 3.5 3 3.5-3 3.5-3-1.5 1-3.5 1Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#F5F3F0]">
      <div className="max-w-[1400px] mx-auto px-8 md:px-12 py-16 md:py-24">
        {/* Main Grid: 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1 - Brand */}
          <div>
            <h3
              className="text-lg font-light tracking-[0.1em]"
              style={{ fontFamily: "'Montserrat', 'Noto Sans SC', sans-serif" }}
            >
              banrix 半日闲
            </h3>
            <p
              className="text-sm text-[#888] mt-3"
              style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
            >
              一杯好茶，一份灵感
            </p>
            <p
              className="text-xs text-[#888] mt-4 max-w-xs leading-relaxed"
              style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
            >
              半日闲致力于将传统茶文化与现代生活方式相融合，用匠心制作每一杯茶饮，为都市生活带来片刻宁静与灵感。
            </p>
          </div>

          {/* Column 2 - Products */}
          <div>
            <h4
              className="text-xs tracking-[0.15em] uppercase text-[#888] mb-4"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              products
            </h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-sm text-[#1A1A1A] hover:text-[#C4A882] transition-colors duration-300 no-underline"
                    style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - About */}
          <div>
            <h4
              className="text-xs tracking-[0.15em] uppercase text-[#888] mb-4"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              about
            </h4>
            <ul className="space-y-3">
              {aboutLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-sm text-[#1A1A1A] hover:text-[#C4A882] transition-colors duration-300 no-underline"
                    style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Social */}
          <div>
            <h4
              className="text-xs tracking-[0.15em] uppercase text-[#888] mb-4"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              follow
            </h4>
            <div className="flex items-center gap-5">
              <a
                href="#"
                className="text-[#1A1A1A] hover:text-[#C4A882] transition-colors duration-300"
                aria-label="Instagram"
              >
                <InstagramIcon size={18} strokeWidth={1.5} />
              </a>
              <a
                href="#"
                className="text-[#1A1A1A] hover:text-[#C4A882] transition-colors duration-300"
                aria-label="微信"
              >
                <WeChatIcon size={18} strokeWidth={1.5} />
              </a>
            </div>
            <p
              className="text-xs text-[#888] mt-4"
              style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
            >
              关注我们
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[#E8E4DF]">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p
              className="text-xs text-[#888]"
              style={{ fontFamily: "'Montserrat', 'Noto Sans SC', sans-serif" }}
            >
              &copy; 2024 半日闲 BANRIX. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-xs text-[#888] hover:text-[#1A1A1A] transition-colors duration-300 no-underline"
                style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
              >
                隐私条款
              </a>
              <a
                href="#"
                className="text-xs text-[#888] hover:text-[#1A1A1A] transition-colors duration-300 no-underline"
                style={{ fontFamily: "'Noto Sans SC', sans-serif" }}
              >
                帮助中心
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
