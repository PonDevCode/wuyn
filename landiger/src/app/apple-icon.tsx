import { ImageResponse } from 'next/og';
import { markDataUri } from '@/lib/og-assets';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/** Home-screen icon: the mark on white (iOS doesn't allow transparency). */
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#FFFFFF',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={markDataUri} width={104} height={112} alt="" />
    </div>,
    size,
  );
}
