import { ImageResponse } from 'next/og';
import { markDataUri, ogFonts } from '@/lib/og-assets';
import { SITE_TAGLINE } from '@/lib/site';

export const alt = 'Landiger – Từ website đến vận hành: website, đặt lịch, CRM cho doanh nghiệp dịch vụ';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const chips = ['Website', 'Đặt lịch online', 'Nhắc lịch Zalo', 'CRM & doanh thu'];

export default async function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '72px 80px',
        backgroundColor: '#F4F6FA',
        backgroundImage:
          'linear-gradient(#E1E7F1 1px, transparent 1px), linear-gradient(90deg, #E1E7F1 1px, transparent 1px)',
        backgroundSize: '56px 56px',
        fontFamily: 'BeVietnam, BeVietnamVi',
        color: '#0B1424',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={markDataUri} width={64} height={69} alt="" />
        <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: '-0.02em' }}>Landiger</div>
        <div style={{ display: 'flex', flexGrow: 1 }} />
        <div
          style={{
            display: 'flex',
            padding: '12px 24px',
            borderRadius: 16,
            background: '#004BEC',
            color: '#FFFFFF',
            fontSize: 26,
            fontWeight: 800,
          }}
        >
          landiger.com
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ display: 'flex', fontSize: 30, fontWeight: 700, color: '#4B5670' }}>
          Phần mềm cho spa, salon, phòng khám, phòng tập
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 84, fontWeight: 800, lineHeight: 1.12 }}>
          <span>{SITE_TAGLINE.split(' đến ')[0].toUpperCase()}</span>
          <span style={{ color: '#004BEC' }}>ĐẾN {SITE_TAGLINE.split(' đến ')[1].toUpperCase()}</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 12 }}>
          {chips.map((c) => (
            <div
              key={c}
              style={{
                display: 'flex',
                padding: '12px 22px',
                borderRadius: 999,
                background: '#FFFFFF',
                border: '2px solid #D6DEEB',
                fontSize: 24,
                fontWeight: 700,
              }}
            >
              {c}
            </div>
          ))}
        </div>
      </div>
    </div>,
    { ...size, fonts: await ogFonts() },
  );
}
