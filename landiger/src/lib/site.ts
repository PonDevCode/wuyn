/** Site-wide SEO settings. Set NEXT_PUBLIC_SITE_URL to override the domain (e.g. for staging). */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://landiger.com').replace(/\/$/, '');

export const SITE_NAME = 'Landiger';

export const SITE_TITLE = 'Landiger – Phần mềm quản lý spa, salon, phòng khám: website, đặt lịch, CRM';

export const SITE_DESCRIPTION =
  'Landiger giúp spa, salon, phòng khám, phòng tập tạo website đặt lịch online, nhắc lịch qua Zalo, quản lý khách hàng và doanh thu trong một nền tảng. Dùng thử miễn phí 14 ngày.';

export const SITE_KEYWORDS = [
  'phần mềm quản lý spa',
  'phần mềm quản lý salon tóc',
  'phần mềm quản lý phòng khám',
  'phần mềm đặt lịch hẹn',
  'đặt lịch online',
  'nhắc lịch hẹn qua Zalo',
  'tạo website spa',
  'CRM cho doanh nghiệp dịch vụ',
  'quản lý khách hàng',
  'Landiger',
];

/** Short tagline used on the social share image. */
export const SITE_TAGLINE = 'Từ website đến vận hành';

/**
 * Product demo video played by "Xem demo". A YouTube link (watch / youtu.be / shorts / embed) or a
 * direct video file (e.g. '/demo.mp4' placed in public/). Leave empty and "Xem demo" opens the
 * book-a-demo form instead. Can also be set with NEXT_PUBLIC_DEMO_VIDEO_URL.
 */
export const DEMO_VIDEO_URL = process.env.NEXT_PUBLIC_DEMO_VIDEO_URL ?? '';
