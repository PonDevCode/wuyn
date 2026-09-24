export type PlanId = 'start' | 'pro' | 'chain';
export type Cycle = 'month' | 'year';

/** Discount for paying a year up front. */
export const YEARLY_DISCOUNT = 0.2;

export type Plan = {
  id: PlanId;
  name: string;
  tag: string;
  who: string;
  /** Monthly price in VND; null = price on request */
  monthly: number | null;
  inc: string;
  feat: string[];
};

export const plans: Plan[] = [
  {
    id: 'start',
    name: 'Khởi đầu',
    tag: '1 chi nhánh',
    who: 'Cho tiệm mới, 1 người vận hành',
    monthly: 499_000,
    inc: 'Đủ để bắt đầu nhận khách online',
    feat: ['1 website theo mẫu ngành', 'Đặt lịch online không giới hạn', 'Quản lý khách hàng cơ bản', 'Tên miền riêng'],
  },
  {
    id: 'pro',
    name: 'Chuyên nghiệp',
    tag: 'Phổ biến nhất',
    who: 'Cho spa, salon, phòng khám đang lớn',
    monthly: 999_000,
    inc: 'Gồm mọi thứ ở gói Khởi đầu, cộng thêm:',
    feat: [
      'Nhắc lịch tự động qua Zalo',
      'Thu cọc và ghép thanh toán',
      'Quản lý nhân viên, hoa hồng',
      'Báo cáo doanh thu chi tiết',
      'Chiến dịch giữ chân khách',
    ],
  },
  {
    id: 'chain',
    name: 'Chuỗi · Custom',
    tag: 'Nhiều chi nhánh',
    who: 'Cho chuỗi nhiều chi nhánh hoặc nhu cầu riêng',
    monthly: null,
    inc: 'Gồm mọi thứ ở gói Chuyên nghiệp, cộng thêm:',
    feat: [
      'Nhiều chi nhánh, một tài khoản',
      'Phân quyền theo vai trò',
      'Báo cáo tổng hợp toàn chuỗi',
      'Tính năng và triển khai theo yêu cầu',
    ],
  },
];

export const findPlan = (id: string | undefined) => plans.find((p) => p.id === id);

/** Amount charged for one billing period, in VND. */
export function priceFor(plan: Plan, cycle: Cycle): number | null {
  if (plan.monthly === null) return null;
  return cycle === 'month' ? plan.monthly : Math.round(plan.monthly * 12 * (1 - YEARLY_DISCOUNT));
}

/** 499000 -> "499.000" */
export const formatVnd = (n: number) => n.toLocaleString('vi-VN');
