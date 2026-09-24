'use client';

import { useState } from 'react';
import SectionHead from './SectionHead';

const plans = [
  {
    name: 'Khởi đầu', tag: '1 chi nhánh', who: 'Cho tiệm mới, 1 người vận hành', m: '[Giá]', y: '[Giá]',
    inc: 'Đủ để bắt đầu nhận khách online',
    feat: ['1 website theo mẫu ngành', 'Đặt lịch online không giới hạn', 'Quản lý khách hàng cơ bản', 'Tên miền riêng'],
  },
  {
    name: 'Chuyên nghiệp', tag: 'Phổ biến cho spa, salon', who: 'Cho spa, salon, phòng khám đang lớn', m: '[Giá]', y: '[Giá]',
    inc: 'Gồm mọi thứ ở gói Khởi đầu, cộng thêm:', highlight: true,
    feat: ['Nhắc lịch tự động qua Zalo', 'Thu cọc và ghép thanh toán', 'Quản lý nhân viên, hoa hồng', 'Báo cáo doanh thu chi tiết', 'Chiến dịch giữ chân khách'],
  },
  {
    name: 'Chuỗi', tag: 'Nhiều chi nhánh', who: 'Cho nhiều chi nhánh', m: 'Liên hệ', y: 'Liên hệ', contact: true,
    inc: 'Gồm mọi thứ ở gói Chuyên nghiệp, cộng thêm:',
    feat: ['Nhiều chi nhánh, một tài khoản', 'Phân quyền theo vai trò', 'Báo cáo tổng hợp toàn chuỗi', 'Hỗ trợ triển khai riêng'],
  },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  const seg = (on) =>
    `h-[34px] flex-1 cursor-pointer rounded-lg border-0 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
      on ? 'bg-white text-brand shadow-[0_1px_3px_rgba(11,20,36,0.12)]' : 'bg-transparent text-subtle'
    }`;

  return (
    <section id="bang-gia" className="relative overflow-hidden px-4 pb-16 pt-14 sm:px-8">
      <div
        aria-hidden="true"
        className="bg-grid absolute inset-0"
        style={{
          maskImage: 'linear-gradient(180deg, transparent 0%, #000 20%, #000 80%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, #000 20%, #000 80%, transparent 100%)',
        }}
      />

      <div className="relative flex flex-col items-center gap-3">
        <SectionHead
          eyebrow="BẢNG GIÁ"
          title="Chọn gói"
          accent="theo quy mô của bạn"
          sub="Bắt đầu nhỏ, nâng cấp khi tiệm đông khách. Không cần ký hợp đồng dài hạn."
        />
        <div
          role="group"
          aria-label="Chu kỳ thanh toán"
          className="relative mt-2.5 flex w-[min(300px,100%)] rounded-[10px] bg-[#E6ECF6] p-[3px]"
        >
          <button type="button" aria-pressed={!yearly} onClick={() => setYearly(false)} className={seg(!yearly)}>
            Tháng
          </button>
          <button type="button" aria-pressed={yearly} onClick={() => setYearly(true)} className={seg(yearly)}>
            Năm
          </button>
          <span className="absolute -right-3 -top-3 flex size-[30px] items-center justify-center rounded-full bg-sky text-[10px] font-bold text-white shadow-[0_6px_12px_-6px_rgba(0,149,254,0.8)]">
            -[X]%
          </span>
        </div>
      </div>

      <div className="relative mx-auto mt-10 grid max-w-[440px] gap-5 md:max-w-[1120px] md:grid-cols-3 md:items-stretch md:gap-4 lg:mt-[60px] lg:gap-5">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`flex flex-col rounded-2xl bg-white p-6 ${
              p.highlight
                ? 'border-[1.5px] border-brand shadow-[0_30px_50px_-36px_rgba(0,75,236,0.55)]'
                : 'border border-transparent shadow-card'
            }`}
          >
            <div className="flex items-center justify-between gap-2.5">
              <span className="text-[19px] font-semibold">{p.name}</span>
              <span className="rounded-md bg-tint px-[9px] py-1 text-right text-[11px] font-semibold text-brand">{p.tag}</span>
            </div>
            <div className="mt-[18px] flex items-baseline gap-1">
              <span className="text-[32px] font-bold tracking-[-0.01em]">{yearly ? p.y : p.m}</span>
              {!p.contact && <span className="text-sm text-[#8A94A8]">{yearly ? 'đ /năm' : 'đ /tháng'}</span>}
            </div>
            <div className="mt-1 text-xs text-[#8A94A8]">{p.who}</div>
            <div className="mt-[18px] flex items-center gap-2 rounded-lg bg-page px-3 py-[9px] text-xs text-subtle">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8A94A8" strokeWidth="2" aria-hidden="true" className="shrink-0">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 11v5M12 8h.01" strokeLinecap="round" />
              </svg>
              {p.inc}
            </div>
            <ul className="m-0 mt-[18px] flex grow list-none flex-col gap-3 p-0">
              {p.feat.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-[#1F2737]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
                    <circle cx="12" cy="12" r="11" fill="#004BEC" />
                    <path d="M7.5 12.5l3 3L16.5 9" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#"
              className="mt-6 flex h-11 items-center justify-center rounded-lg bg-brand text-sm font-semibold text-white shadow-[0_10px_20px_-12px_rgba(0,75,236,0.7)] hover:bg-[#0040cc] hover:text-white"
            >
              Chọn gói
            </a>
          </div>
        ))}
      </div>

      <div className="relative mt-10 text-center text-sm text-muted lg:mt-12">
        Chưa chắc gói nào hợp?{' '}
        <a href="#" className="font-bold text-brand hover:text-brand">
          Để Landiger tư vấn miễn phí →
        </a>
      </div>
    </section>
  );
}
