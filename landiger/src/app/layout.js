import { Be_Vietnam_Pro } from 'next/font/google';
import './globals.css';

const beVietnam = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-be-vietnam',
});

export const metadata = {
  title: 'Landiger – Trang chủ',
  description:
    'Landiger là không gian làm việc cho doanh nghiệp dịch vụ: website, đặt lịch, khách hàng và vận hành trong một nền tảng.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F4F6FA',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" className={beVietnam.variable}>
      <body>{children}</body>
    </html>
  );
}
