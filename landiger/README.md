# Landiger – Trang chủ (Next.js)

Landing page Landiger chuyển từ bản mockup HTML sang **Next.js 16 (App Router) + Tailwind CSS v4**, responsive cho mobile, tablet và desktop.

## Chạy dự án

```bash
cd landiger
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # bản production
```

## Cấu trúc

```
src/
  app/
    layout.js        # font Be Vietnam Pro (next/font), metadata
    page.js          # ghép các section
    globals.css      # Tailwind + design tokens (@theme) + keyframes
  assets/senspa.png  # ảnh website mẫu SEN Spa
  components/
    Header.js        # menu, có hamburger trên mobile
    Hero.js          # 2 slide: cuộn chuột trên desktop hoặc bấm chấm để chuyển
    HeroLanes.js     # các cột thẻ trượt phía sau tiêu đề
    HeroDashboard.js # mockup dashboard ở slide 2
    Marquee.js       # dải ngành nghề chạy ngang
    Solution.js      # 4 tab tự chuyển + màn hình minh họa (SolutionPanels.js)
    Industries.js    # tab theo ngành
    Why.js           # thanh kéo so sánh trước / sau
    Pricing.js       # bảng giá tháng / năm
    Footer.js        # CTA cuối trang + footer
    Scaler.js        # thu nhỏ mockup kích thước cố định cho màn hình hẹp
```

## Responsive

- **Desktop (≥1024px):** giữ đúng bố cục mockup 1440px.
- **Tablet / mobile:** các cột xếp chồng, menu hamburger, tab ngành cuộn ngang, bảng giá 1 cột.
  Các mockup minh họa (dashboard, màn hình tính năng) được `Scaler` thu nhỏ theo chiều rộng màn hình.
  Phần so sánh "Vì sao" có bố cục riêng cho mobile.
- Tôn trọng `prefers-reduced-motion`.

Các chỗ `[Giá]`, `[X]`, `[LOGO KHÁCH]`, `[Email]`… là placeholder giữ nguyên từ thiết kế.
