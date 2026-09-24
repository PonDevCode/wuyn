'use client';

import { useId, useRef, useState } from 'react';
import { useModal, useTrigger } from '@/hooks/useModal';
import { DEMO_VIDEO_URL } from '@/lib/site';

/**
 * "Xem demo" video popup. Any element with a `data-video` attribute opens it. Plays DEMO_VIDEO_URL
 * (YouTube or a video file) and offers a 1-1 demo booking underneath.
 */

/** The YouTube video id for watch / youtu.be / shorts / embed links, or null for anything else. */
function youTubeId(url: string) {
  const m = url.match(
    /(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/,
  );
  return m ? m[1] : null;
}

export default function VideoDialog() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);
  const titleId = useId();

  useTrigger('data-video', (el) => {
    lastTrigger.current = el;
    setOpen(true);
  });

  const close = () => {
    setOpen(false);
    lastTrigger.current?.focus();
  };
  useModal(open, dialogRef, close);

  if (!open || !DEMO_VIDEO_URL) return null;
  const yt = youTubeId(DEMO_VIDEO_URL);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6">
      <div className="absolute inset-0 animate-fade-in bg-ink/70" onClick={close} aria-hidden="true" />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-[min(1040px,calc((100vh-180px)*16/9))] animate-rise overflow-hidden rounded-2xl bg-white shadow-[0_40px_80px_-30px_rgba(11,20,36,0.6)] sm:rounded-3xl"
      >
        <div className="relative aspect-video bg-ink">
          {yt ? (
            <iframe
              className="absolute inset-0 size-full"
              src={`https://www.youtube-nocookie.com/embed/${yt}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              title="Video demo Landiger"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          ) : (
            <video className="absolute inset-0 size-full" src={DEMO_VIDEO_URL} controls autoPlay playsInline />
          )}
        </div>

        <div className="flex flex-col gap-3 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4">
          <div>
            <h2 id={titleId} className="text-[15px] font-extrabold sm:text-base">
              Landiger trong vài phút
            </h2>
            <p className="text-[13px] text-muted">
              Muốn xem đúng quy trình cửa hàng của bạn? Đặt lịch demo 1-1 miễn phí.
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={close}
              className="flex h-10 cursor-pointer items-center rounded-xl border border-line px-4 text-sm font-bold text-ink hover:bg-page"
            >
              Đóng
            </button>
            <a
              href="#"
              data-demo
              onClick={() => setOpen(false)}
              className="flex h-10 items-center rounded-xl bg-brand px-4 text-sm font-bold text-white hover:bg-[#0040cc] hover:text-white"
            >
              Đặt lịch demo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
