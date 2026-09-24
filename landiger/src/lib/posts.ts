/**
 * Blog posts for /tin-tuc. To add a post, append an entry: `slug` becomes the URL
 * (/tin-tuc/<slug>), `date` is YYYY-MM-DD. In paragraph / list text, **text** is bold.
 */

export type Block =
  | { type: 'h2'; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'tip'; text: string };

export type Post = {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  author: string;
  keywords: string[];
  body: Block[];
};

const AUTHOR = 'Đội ngũ Landiger';

export const posts: Post[] = [
  {
    slug: 'chi-so-van-hanh-spa-salon-phong-kham',
    title: '5 chỉ số nên xem mỗi tuần khi vận hành spa, salon, phòng khám',
    description:
      'Doanh thu chưa đủ để biết cửa hàng khoẻ hay yếu. Năm chỉ số đơn giản giúp chủ spa, salon, phòng khám thấy sớm vấn đề và biết nên sửa ở đâu.',
    category: 'Quản lý',
    date: '2026-09-24',
    author: AUTHOR,
    keywords: ['chỉ số vận hành spa', 'quản lý salon', 'báo cáo doanh thu spa', 'tỷ lệ khách quay lại'],
    body: [
      {
        type: 'p',
        text: 'Nhiều chủ cửa hàng dịch vụ chỉ nhìn một con số: doanh thu cuối tháng. Nhưng khi doanh thu giảm thì thường đã muộn. Nếu mỗi tuần dành 15 phút xem **5 chỉ số** dưới đây, bạn sẽ thấy vấn đề từ sớm và biết chính xác cần sửa khâu nào.',
      },
      { type: 'h2', text: '1. Tỷ lệ lấp đầy lịch' },
      {
        type: 'p',
        text: 'Lấy số giờ đã có khách đặt chia cho tổng số giờ kỹ thuật viên hoặc bác sĩ có thể nhận. Tỷ lệ thấp vào một số khung giờ cố định (ví dụ sáng thứ Ba) là tín hiệu để chạy ưu đãi giờ thấp điểm thay vì giảm giá cả tuần.',
      },
      { type: 'h2', text: '2. Tỷ lệ khách bỏ hẹn (no-show)' },
      {
        type: 'p',
        text: 'Mỗi lịch hẹn bị bỏ là một khung giờ mất trắng, không bán lại được. Theo dõi tỷ lệ này theo từng kênh đặt lịch và từng nhân viên nhận lịch. Nếu tỷ lệ cao, hãy bắt đầu bằng việc **nhắc lịch tự động** trước giờ hẹn.',
      },
      { type: 'h2', text: '3. Tỷ lệ khách quay lại' },
      {
        type: 'p',
        text: 'Trong số khách mới của tháng trước, bao nhiêu người đã quay lại lần hai? Với ngành dịch vụ, khách quay lại là nguồn doanh thu rẻ nhất vì bạn không phải trả tiền quảng cáo lần nữa. Chỉ số này giảm thường là do chất lượng dịch vụ, hoặc do cửa hàng không chăm sóc lại sau buổi đầu.',
      },
      { type: 'h2', text: '4. Giá trị trung bình mỗi lượt' },
      {
        type: 'p',
        text: 'Doanh thu chia cho số lượt phục vụ. Con số này tăng khi nhân viên tư vấn thêm dịch vụ đi kèm, bán liệu trình hoặc sản phẩm chăm sóc tại nhà. So sánh giữa các nhân viên để biết ai cần được hướng dẫn thêm về tư vấn.',
      },
      { type: 'h2', text: '5. Khách mới theo từng kênh' },
      {
        type: 'p',
        text: 'Khách đến từ đâu: website, Facebook, Zalo, Google Maps hay được giới thiệu? Khi biết kênh nào mang về khách thật (không chỉ lượt tin nhắn), bạn sẽ dồn ngân sách đúng chỗ.',
      },
      { type: 'h2', text: 'Làm sao để có số liệu mà không mất công' },
      {
        type: 'p',
        text: 'Khó nhất không phải là tính, mà là có dữ liệu. Nếu lịch hẹn nằm trong sổ tay, khách hàng nằm trong Zalo và doanh thu nằm trong Excel, thì cuối tuần sẽ không ai ngồi ghép lại. Hãy đưa lịch hẹn, khách hàng và thanh toán về cùng một chỗ. Khi đó các chỉ số trên tự có.',
      },
      {
        type: 'tip',
        text: 'Landiger gom website, đặt lịch, khách hàng và doanh thu vào một workspace, nên 5 chỉ số này có sẵn trên bảng điều khiển mà không cần nhập tay.',
      },
    ],
  },
  {
    slug: 'spa-salon-co-can-website-rieng',
    title: 'Spa, salon đã có fanpage thì có cần website riêng không?',
    description:
      'Fanpage giúp tiếp cận khách, website giúp khách tin và đặt lịch. So sánh vai trò của hai kênh và khi nào cửa hàng dịch vụ nên có website riêng.',
    category: 'Marketing',
    date: '2026-09-17',
    author: AUTHOR,
    keywords: ['website spa', 'website salon tóc', 'tạo website spa', 'fanpage hay website'],
    body: [
      {
        type: 'p',
        text: 'Hầu hết spa, salon ở Việt Nam bắt đầu bằng fanpage Facebook và Zalo. Cách này nhanh và miễn phí. Nhưng khi cửa hàng lớn dần, câu hỏi thường gặp là: có cần làm website riêng không, hay fanpage là đủ?',
      },
      { type: 'h2', text: 'Fanpage làm tốt điều gì' },
      {
        type: 'ul',
        items: [
          '**Tiếp cận khách mới** qua quảng cáo và chia sẻ.',
          '**Trò chuyện nhanh** qua Messenger, Zalo.',
          'Đăng hình ảnh, video trước/sau hằng ngày.',
        ],
      },
      { type: 'h2', text: 'Những gì fanpage không làm được' },
      {
        type: 'ul',
        items: [
          '**Khách không tự đặt lịch được.** Mọi lịch hẹn phải qua tin nhắn, và nhân viên phải trả lời từng người.',
          '**Khó xuất hiện khi khách tìm trên Google** các cụm như “spa gần đây” hay “gội đầu dưỡng sinh quận 3”.',
          '**Bạn không sở hữu kênh.** Thuật toán thay đổi hoặc trang bị khoá là mất liên lạc với khách.',
          'Bảng giá, dịch vụ, chính sách bị trôi theo bài đăng, khách khó tìm lại.',
        ],
      },
      { type: 'h2', text: 'Website đúng nghĩa cho cửa hàng dịch vụ cần gì' },
      {
        type: 'ol',
        items: [
          'Danh sách dịch vụ kèm giá và thời lượng rõ ràng.',
          'Nút **đặt lịch online** cho khách chọn dịch vụ, nhân viên và khung giờ còn trống.',
          'Địa chỉ, bản đồ, giờ mở cửa, cách liên hệ Zalo.',
          'Hình ảnh thật của cửa hàng và đánh giá của khách.',
          'Tốc độ tải nhanh trên điện thoại, vì phần lớn khách vào từ di động.',
        ],
      },
      { type: 'h2', text: 'Kết luận: dùng cả hai, mỗi kênh một vai' },
      {
        type: 'p',
        text: 'Fanpage kéo khách đến, website giúp khách **tin và chốt lịch**. Cách hiệu quả là mọi bài đăng, quảng cáo và tin nhắn tự động đều dẫn về một trang đặt lịch. Khi đó nhân viên không phải hỏi đi hỏi lại “chị muốn làm dịch vụ gì, mấy giờ?”.',
      },
      {
        type: 'tip',
        text: 'Website tạo bằng Landiger có sẵn trang đặt lịch nối thẳng với lịch làm việc của nhân viên, nên khách đặt xong là lịch hẹn và hồ sơ khách tự vào hệ thống.',
      },
    ],
  },
  {
    slug: 'giam-khach-huy-lich-spa-salon',
    title: '7 cách giảm khách bỏ hẹn, huỷ lịch sát giờ cho spa, salon',
    description:
      'Khách bỏ hẹn làm mất trắng khung giờ và công của nhân viên. Bảy cách thực tế giúp spa, salon, phòng khám giảm no-show mà không làm phiền khách.',
    category: 'Vận hành',
    date: '2026-09-10',
    author: AUTHOR,
    keywords: ['khách bỏ hẹn', 'giảm no-show spa', 'nhắc lịch hẹn qua Zalo', 'đặt cọc lịch hẹn'],
    body: [
      {
        type: 'p',
        text: 'Một lịch hẹn bị bỏ không chỉ mất doanh thu của lượt đó. Nhân viên ngồi chờ, khung giờ không bán lại kịp, và khách khác bị từ chối vì “kín lịch”. Tin tốt là phần lớn trường hợp bỏ hẹn đến từ việc **khách quên**, và điều đó hoàn toàn xử lý được.',
      },
      { type: 'h2', text: '1. Nhắc lịch hai lần' },
      {
        type: 'p',
        text: 'Một tin nhắc trước một ngày và một tin trước giờ hẹn khoảng 2 tiếng. Nên gửi qua Zalo vì khách Việt đọc Zalo nhiều hơn SMS. Tin nhắn nên có tên dịch vụ, giờ, địa chỉ và cách đổi lịch.',
      },
      { type: 'h2', text: '2. Cho khách đổi lịch dễ dàng' },
      {
        type: 'p',
        text: 'Khách thường bỏ hẹn vì ngại gọi điện huỷ. Một đường link đổi lịch trong tin nhắc giúp bạn biết trước để mở lại khung giờ cho người khác.',
      },
      { type: 'h2', text: '3. Xác nhận ngay khi đặt' },
      {
        type: 'p',
        text: 'Gửi tin xác nhận ngay sau khi khách đặt lịch. Khách thấy lịch hẹn “chính thức” sẽ có trách nhiệm hơn so với một câu “ok chị” trong tin nhắn.',
      },
      { type: 'h2', text: '4. Đặt cọc cho dịch vụ dài hoặc giá trị cao' },
      {
        type: 'p',
        text: 'Với liệu trình dài hay dịch vụ đắt tiền, đặt cọc một phần qua chuyển khoản QR là cách lọc khách nghiêm túc hiệu quả nhất. Ghi rõ chính sách hoàn cọc khi khách báo huỷ trước thời hạn.',
      },
      { type: 'h2', text: '5. Có chính sách huỷ lịch rõ ràng' },
      {
        type: 'p',
        text: 'Ghi chính sách trên website và trong tin xác nhận, ví dụ báo trước 4 tiếng. Không cần phạt nặng, chỉ cần khách biết là có quy định.',
      },
      { type: 'h2', text: '6. Ghi lại lịch sử bỏ hẹn của từng khách' },
      {
        type: 'p',
        text: 'Khách đã bỏ hẹn 2 lần nên được gọi xác nhận trực tiếp hoặc yêu cầu đặt cọc lần sau. Việc này chỉ làm được khi thông tin khách được lưu tập trung, không nằm rải rác trong điện thoại của từng nhân viên.',
      },
      { type: 'h2', text: '7. Lấp chỗ trống bằng danh sách chờ' },
      {
        type: 'p',
        text: 'Khi có khách huỷ, nhắn cho những khách đang muốn khung giờ đó. Giờ cao điểm hầu như luôn có người sẵn sàng đến ngay.',
      },
      {
        type: 'tip',
        text: 'Landiger tự gửi tin xác nhận và nhắc lịch qua Zalo, cho khách đổi lịch bằng một đường link và lưu lịch sử hẹn của từng khách trong CRM.',
      },
    ],
  },
];

export const sortedPosts = () => [...posts].sort((a, b) => b.date.localeCompare(a.date));
export const findPost = (slug: string) => posts.find((p) => p.slug === slug);

/** 24/09/2026 */
export const formatDate = (iso: string) => iso.split('-').reverse().join('/');

/** Rough reading time at ~220 words per minute. */
export function readingMinutes(post: Post) {
  const text = post.body.map((b) => ('text' in b ? b.text : b.items.join(' '))).join(' ');
  return Math.max(1, Math.round(text.split(/\s+/).length / 220));
}
