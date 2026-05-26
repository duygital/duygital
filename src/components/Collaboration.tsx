import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ArrowRight, Layers, Sliders, Check, ShieldAlert } from "lucide-react";
import { translations } from "../translations";

interface CollaborationProps {
  workflow?: any;
  pricing?: any;
  faqs?: any;
  testimonials?: any;
  onGoToContact: () => void;
  language: "en" | "vi";
}

const contentLocal = {
  en: {
    intro: {
      tag: "04 / CREATIVE VALUE & STRUCTURE",
      title: "Rates & Framework",
      desc: "Rates are not a game of marketing discounts or complex pricing packages. Duygital is a personal creative video editing service. I believe in complete transparency, structured timelines, and honest capability boundaries. Below is the active pricing structure and collaboration framework designed to invite deliberate partnerships.",
      quote: "My focus is: taste, honesty, and reliable creative rhythm. I outline this framework to protect the focus required for genuine narrative results."
    },
    levels: {
      sectionTitle: "CREATIVE CAPABILITY LEVELS",
      sectionSub: "An evolution framework mapping my development and operational milestones. I am not an agency or a production pipeline—I work directly on your timeline.",
      level1Badge: "ACTIVE — SERVICE AVAILABLE",
      level2Badge: "FUTURE ROADMAP / MUTED",
      level3Badge: "FUTURE ROADMAP / MUTED",
      
      l1Positioning: "Special introductory rates to build a high-fidelity portfolio while preserving my professional procedural posture.",
      l2Positioning: "Operational setup tailored for agencies or brand pipelines requiring consistent output aligned with pre-established style guidelines.",
      l3Positioning: "High-end narrative treatment, deep emotional progression sculpting, and premium channel-native formats.",

      l1Footage: "Standard raw footage. Strict limits calculated to keep deadlines predictable.",
      l2Footage: "Deeper raw ingestion, flexible narrative structures. Adaptive to various shoot formats.",
      l3Footage: "High raw processing ratio, complex edits. Tailored distribution-native iterations.",

      l1Mindset: "Refining narrative structure, visual impact, and flow. Focus is on absolute clarity & retention.",
      l2Mindset: "Ensuring tone and visual consistency across brand campaigns and ongoing series.",
      l3Mindset: "Micro-pacing, tight mood arcs, and precision-tuned emotional flow.",

      l1Turnaround: "3–7 business days depending on footage length and queue. Final timeline is set after brief confirmation.",
      l2Turnaround: "Accelerated series output supported by consistent timeline priority. Formatted for ongoing production rhythms.",
      l3Turnaround: "Synchronized with active shoot calendars. Follows a highly integrated, sequential handoff queue.",

      l1Ideal: "Ideal for: Social video creators, standalone vloggers, or small teams with straightforward recap projects who value an organized editor.",
      l2Ideal: "Ideal for: Creative agencies or brands seeking stable, repetitive series assets constructed under a unified guideline set.",
      l3Ideal: "Ideal for: Short brand films, flagship campaign launches, or high-stakes content requesting custom pacing attention.",

      cta: "BOOK LEVEL 1 INTAKE",
      ctaMuted: "COMING SOON"
    },
    pricingHeader: {
      ratesTitle: "Active Rates (Level 1 — Entry)",
      ratesSub: "This rate sheet is designed to outline scope calculations transparently. Every single project requires a brief submission to confirm scope and secure a pipeline slot.",
      
      colCategory: "FORMAT",
      colDescription: "SCOPE & EXPECTATIONS",
      colPrice: "BASE RATE",
      colNotes: "RAW PARAMS & LIMITS",

      shortTitle: "SHORT-FORM POST-PRODUCTION",
      shortSub: "Optimized for TikTok, Reels, Shorts, and digital loops. Focusing strictly on quick pacing, visual retention, and message clarity.",
      shortApply: "Applicable to: Talking Head, Short Event Recap, Podcast, Review, Beauty/Cosmetic, Gaming, Real Estate, Funny, F&B...",

      longTitle: "LONG-FORM POST-PRODUCTION",
      longSub: "Designed for content prioritizing structural narration, story arcs, and relaxed emotional progression.",
      longApply: "Applicable to: Vlog, Talking Head, Podcast, Event Recap, Wedding, and Music Video.",

      rawWarning: "RAW FOOTAGE POLICY"
    },
    shortRates: [
      {
        title: "Standard Edit",
        desc: "Mainstream narrative flow, standard text title integration, clean cut transitions, and basic audio tone balancing.",
        price: "250,000 VND",
        unit: "/ minute",
        notes: "Based on final video duration"
      },
      {
        title: "Fast Pace / Effects",
        desc: "Rapid edit rhythm, high caption/subtitle density, graphic motion overlays, and format-specific transition cues.",
        price: "350,000 VND",
        unit: "/ minute",
        notes: "Based on final video duration"
      },
      {
        title: "Micro-Sequence (<30s)",
        desc: "Sub-30 second high-impact storytelling format requiring compressed visual delivery.",
        price: "200,000 VND",
        unit: "/ video",
        notes: "Minimum flat contract charge"
      },
      {
        title: "Monthly Retainer / Series",
        desc: "Continuous monthly editorial booking blocks. Leverages volume discounts and secure timeline priority.",
        price: "Custom Quote",
        unit: "",
        notes: "Requires brief review"
      }
    ],
    longRates: [
      {
        title: "Vlog / Talk Show",
        desc: "Continuous narrative assembly, logical sequence editing, and neat basic sound balance.",
        price: "1,200,000 VND",
        unit: "/ video",
        notes: "Final video ≤ 10 minutes"
      },
      {
        title: "Podcast Episode",
        desc: "Neat multi-cam switching (if applicable), audio levels leveling, and basic caption overlays.",
        price: "2,000,000 VND",
        unit: "/ episode",
        notes: "Final video ≤ 30 minutes"
      },
      {
        title: "Wedding (Cinematic)",
        desc: "Clean storytelling sequence, rhythmic music synchronization, and natural organic pacing.",
        price: "3,500,000 VND",
        unit: "/ video",
        notes: "Final video ≤ 7 minutes"
      },
      {
        title: "Recap / Corporate",
        desc: "Clean corporate highlight layout, brand-aligned transition styles, and professional structure.",
        price: "3,500,000 VND",
        unit: "/ video",
        notes: "Final video ≤ 6 minutes"
      },
      {
        title: "Music Video / MV",
        desc: "Complex synchronization, experimental cuts, and creative artistic direction alignment.",
        price: "Custom Quote",
        unit: "",
        notes: "Based on raw footage & complexity"
      },
      {
        title: "Multi-Episode Series",
        desc: "Cohesive multi-part package pricing conforming to a rhythmic delivery schedule.",
        price: "Custom Quote",
        unit: "",
        notes: "Negotiated based on episode count"
      }
    ],
    rawPolicyShort: "Short-form Raw Limit: Included raw footage ≤ 60 mins total per 1–2 mins of final master. Surplus footage is billed at +50,000 VND per additional 30 mins raw.",
    rawPolicyLong: "Long-form Raw Limit: Included raw footage ≤ 3 hours total per project. Surplus footage is billed at +120,000 VND per additional raw camera hour.",
    
    baseline: {
      title: "Always Included (No Add-On Charges)",
      sub: "My fundamental guidelines for ensuring stable, high-end visual and procedural consistency on every Level 1 project.",
      items: [
        {
          title: "Pacing & Rhythm Tuning",
          desc: "Clean cutting designed around human voice, action accents, and natural pause metrics—no lazy filler clips."
        },
        {
          title: "Basic Sound Design",
          desc: "Balancing standard volume ranges, noise gating loud audio, and applying subtle environmental transition foley."
        },
        {
          title: "Subtitles / Captions",
          desc: "Clean-typeset, highly readable screen layout subtitles to ensure viewers retain vital information easily."
        },
        {
          title: "Basic Letter Graphics (Text Motion)",
          desc: "Restrained, beautiful typography overlays, graphic intros, and minimalist static graphics."
        },
        {
          title: "Narrative Transitions",
          desc: "Organic editing cuts that preserve spatial logic. I avoid trendy, motion-sickness inducing digital effect presets."
        },
        {
          title: "Basic Color Correction (Rec709)",
          desc: "Duygital does NOT offer advanced color grading as a standard service. Basic Rec709 correction balances contrast levels, ensures correct exposures, and converts flat camera LOG profiles to real standard screen colors for clean visual consistency."
        }
      ]
    },
    addons: {
      title: "Optional Add-on Assistance",
      sub: "Specialized additional tasks outside our baseline. All options must be confirmed in the creative brief before editing commences.",
      items: [
        {
          title: "Map Animation (After Effects)",
          desc: "Bespoke spatial mapping vectors. Outstanding for High-end Travel, Real Estate briefs, or Case Studies.",
          price: "1,000,000 VND / minute"
        },
        {
          title: "Short Map Scene Segment",
          desc: "A brief graphical map sequence utilized strictly as an editorial transition beat.",
          price: "200,000 VND / 5 seconds"
        },
        {
          title: "Aspect Ratio Format Conversion",
          desc: "Re-cropping, re-timing, and adapting typography layout between horizontal (16:9) and vertical (9:16 / 1:1) displays.",
          price: "50%–80% of base rate"
        },
        {
          title: "Cinematic Color Grading (Outsourced Out of House)",
          desc: "I am not a professional master colorist. For extreme creative grading or custom cinematic moodboards, I hire an external professional colorist. Rates are calculated separately based on footage scale and selected reference profiles.",
          price: "Outsourced Separate Rate"
        }
      ]
    },
    faq: {
      title: "Honest Project FAQs",
      tag: "LIMITS & REAL SYSTEM EXCELLENCE",
      items: [
        {
          question: "1. What types of videos do you edit?",
          answer: "I edit the following types of videos: talking head, vlog, review, podcast, interview, and storytelling. The focus is on clear content, natural rhythm, and high viewer retention."
        },
        {
          question: "2. Which platforms do you edit for?",
          answer: "YouTube, TikTok, Instagram Reels, and Facebook. Each video is optimized specifically for the target platform, considering aspect ratios and user viewing behavior on phones or computers."
        },
        {
          question: "3. What is your video editing workflow?",
          answer: "Receive footage and guidelines → define editing direction and tone → deliver the first cut → refine based on feedback until the video is fully ready."
        },
        {
          question: "4. How long does it take to complete a video?",
          answer: "– Short-form video: 2–4 days\n– Long-form or multi-layered video: 5–7 days\nTimeline is mutually agreed upon before starting. I only take on projects when I can guarantee meeting the deadline."
        },
        {
          question: "5. Do you offer revisions? How many rounds are free?",
          answer: "Yes, 2 rounds of revisions are included free of charge for each project. Please compile all feedback in one go before sending, so we can avoid scattered edits that delay the project timeline."
        },
        {
          question: "6. What do I need to prepare before starting?",
          answer: "You just need to send the raw footage, basic requirements, or reference videos (if any). We will align on the deployment details. If you don't have a specific vision, I will craft the video based on my professional experience."
        },
        {
          question: "7. Do you add subtitles, music, and sound effects?",
          answer: "Yes. I handle background music, sound effects, and subtitles/captions (when needed) with restraint, focusing on elevating the viewing experience without cluttering or 'noise'."
        },
        {
          question: "8. What if I don't know exactly what I want yet?",
          answer: "That is completely fine. Many projects start with an unclear idea. I will guide you through defining the editing style, content structure, and storytelling method most suited to your video."
        },
        {
          question: "9. Do you accept all projects?",
          answer: "No. If I feel a project is not a good fit or that I cannot deliver exceptional results, I will be honest with you from the start to avoid wasting time for both sides."
        },
        {
          question: "10. Do you provide working contracts?",
          answer: "Yes. Corporate clients are always provided with contracts. Individual clients can use contracts if requested. All terms are finalized before implementation."
        }
      ]
    }
  },
  vi: {
    intro: {
      tag: "04 / GIÁ TRỊ & BIỂU PHÍ THỰC TẾ",
      title: "Hợp tác & Biểu phí",
      desc: "Chi phí không phải là một ván bài tiếp thị hay giảm giá vô tội vạ. Duygital là dịch vụ biên tập video cá nhân tập trung vào tư duy kể chuyện và nhịp điệu lát cắt. Tôi đề cao sự minh bạch tuyệt đối về năng lực, mốc thời gian rõ ràng và những giới hạn kỹ thuật chân thực. Dưới đây là bảng giá thực tế và lộ trình làm việc được thiết lập để chào đón những đối tác nghiêm túc.",
      quote: "Mục tiêu cốt lõi của tôi là: thẩm mỹ, sự trung thực và nhịp sản xuất tin cậy. Tôi phác thảo các mốc giới hạn này để bảo vệ sự tập trung tối đa cần có cho một tác phẩm chỉn chu."
    },
    levels: {
      sectionTitle: "HỆ LEVEL PHÁT TRIỂN (MINH BẠCH LỘ TRÌNH)",
      sectionSub: "Đây không phải “gói bán” để lôi kéo nâng cấp. Mục tiêu là minh bạch năng lực và định hướng phát triển ở từng giai đoạn của Duygital. Hiện tại chỉ có Level 1 đang chính thức áp dụng.",
      level1Badge: "LEVEL 01 — ĐANG ÁP DỤNG",
      level2Badge: "LEVEL 02 — ROADMAP TƯƠNG LAI",
      level3Badge: "LEVEL 03 — ROADMAP TƯƠNG LAI",
      
      l1Positioning: "Giá ưu đãi để build portfolio. Vẫn giữ chuẩn làm việc chuyên nghiệp.",
      l2Positioning: "Chuẩn vận hành cho brand/agency đã có guideline phong cách và nhịp sản xuất cố định.",
      l3Positioning: "Premium execution, cinematic thinking. Kiểm soát và mài dũa sâu sắc trải nghiệm người xem.",

      l1Footage: "Xử lý raw ở mức tiêu chuẩn. Giới hạn dung lượng hợp lý theo từng loại dự án.",
      l2Footage: "Xử lý raw sâu hơn, linh hoạt cấu trúc file thô thặng dư. Đáp ứng nhiều loại source máy quay.",
      l3Footage: "Xử lý raw sâu, cấu trúc timeline phức tạp hoặc đa cam phối hợp.",

      l1Mindset: "Tối ưu câu chuyện, cảm xúc và nhịp dựng. Ưu tiên sự rõ ràng (clarity & retention).",
      l2Mindset: "Tập trung sự đồng nhất (consistency) theo tone và bộ nhận diện thương hiệu.",
      l3Mindset: "Tối ưu “đường dây cảm xúc” & pacing tinh. Kiểm soát micro-moment.",

      l1Turnaround: "3–7 ngày tùy độ dài và lịch nhận dự án thực tế. Chốt timeline chính thức sau khi nhận brief.",
      l2Turnaround: "Nhanh hơn nhờ ưu tiên lịch và tối ưu hóa quy trình. Phù hợp theo nhịp sản xuất series dày.",
      l3Turnaround: "Ưu tiên linh hoạt đồng hành theo lịch trình sản xuất, quay phim và hậu kỳ khép kín.",

      l1Ideal: "Phù hợp nhất với: Series truyền thông mạng xã hội, vlog cá nhân, talkshow hoặc recap gọn gàng với mong muốn tối ưu cấu trúc.",
      l2Ideal: "Phù hợp nhất với: Agency pipeline cần đầu ra đều đặn, series dài tập hoặc các chiến dịch thương hiệu có quy chuẩn rõ.",
      l3Ideal: "Phù hợp nhất với: Phim ngắn giới thiệu thương hiệu lớn, launch video sản phẩm quan trọng hoặc các flagship campaign đòi hỏi độ chỉn chu cao.",

      cta: "BẮT ĐẦU INTAKE LEVEL 1",
      ctaMuted: "CHƯA KHỞI ĐỘNG"
    },
    pricingHeader: {
      ratesTitle: "Báo Giá Thực Hiện (Level 1 — Đang Áp Dụng)",
      ratesSub: "Mục tiêu bảng giá dưới đây là minh bạch phạm vi công việc và phương thức tính phí. Mọi dự án đều cần gửi brief chi tiết để thống nhất scope & timeline trước khi bấm máy hậu kỳ.",
      
      colCategory: "LOẠI HÌNH",
      colDescription: "PHẠM VI BIÊN TẬP & KỲ VỌNG",
      colPrice: "ĐƠN GIÁ",
      colNotes: "QUY CHẾ FOOTAGE THÔ",

      shortTitle: "BIÊN TẬP PHIM NGẮN (SHORT-FORM)",
      shortSub: "Phù hợp cho định dạng dọc TikTok, Reels, Shorts. Tập trung vào nhịp dựng trực diện, giữ chân người xem và truyền tải thông điệp ngắn mạch lạc.",
      shortApply: "Áp dụng cho: Talking Head, Short Event Recap, Podcast, Review, Beauty/Cosmetic, Gaming, Real Estate, Funny, F&B…",

      longTitle: "BIÊN TẬP PHIM DÀI (LONG-FORM)",
      longSub: "Phương án tập trung ưu tiên cấu trúc tự sự, dòng chảy câu chuyện truyền thống và nhịp cảm xúc sâu sắc.",
      longApply: "Áp dụng cho: Vlog, Talking Head, Podcast, Event Recap, Wedding và Music Video.",

      rawWarning: "QUY ĐỊNH FOOTAGE THÔ (RAW SOURCE POLICY)"
    },
    shortRates: [
      {
        title: "Tiêu Chuẩn",
        desc: "Dựng khung câu chuyện mạch lạc, chèn phụ đề tiêu chuẩn, cắt thẳng cinematic, và xử lý phân biệt thoại.",
        price: "250.000đ",
        unit: "/ phút thành phẩm",
        notes: "Tính theo phút final"
      },
      {
        title: "Nhịp Dày / Hiệu Ứng",
        desc: "Nhịp cắt gấp gáp giữ retention cao, bổ sung text/motion, overlay graphic, và hiệu ứng chuyển dạng format.",
        price: "350.000đ",
        unit: "/ phút thành phẩm",
        notes: "Tính theo phút final"
      },
      {
        title: "Minimum (<30 Giây)",
        desc: "Tác phẩm thời lượng siêu ngắn cực kỳ cô đọng, đòi hỏi cô đặc kịch bản thị giác.",
        price: "200.000đ",
        unit: "/ video",
        notes: "Mức tối thiểu trên mỗi video lẻ"
      },
      {
        title: "Booking Series / Theo Tháng",
        desc: "Hợp tác theo series dài hạn hoặc mục tiêu tháng cụ thể. Ưu tiên dòng thời gian ổn định và có chiết khấu khối lượng.",
        price: "Báo giá theo Brief",
        unit: "",
        notes: "Chiết khấu theo số lượng"
      }
    ],
    longRates: [
      {
        title: "Vlog / Talk Show",
        desc: "Biên tập cắt nối lời thoại sạch sẽ, dựng cấu trúc trình tự logic và cân bằng âm lượng cơ bản.",
        price: "1.200.000đ",
        unit: "/ video",
        notes: "Thời lượng final ≤ 10 phút"
      },
      {
        title: "Podcast Tập",
        desc: "Chuyển đổi góc máy đa camera thô (nếu có), đồng bộ âm thanh thu rời và overlay phụ đề thô.",
        price: "2.000.000đ",
        unit: "/ tập",
        notes: "Thời lượng final ≤ 30 phút"
      },
      {
        title: "Wedding (Cinematic)",
        desc: "Kể chuyện phi tuyến tính nhẹ nhàng, đồng bộ âm nhạc và tối ưu hóa nhịp điệu cảm xúc tự nhiên.",
        price: "3.500.000đ",
        unit: "/ video",
        notes: "Thời lượng final ≤ 7 phút"
      },
      {
        title: "Recap / Doanh Nghiệp",
        desc: "Dựng sự kiện nổi bật gọn gàng, chèn logo branding tiêu chuẩn, nhịp chuyển động chuyên nghiệp.",
        price: "3.500.000đ",
        unit: "/ video",
        notes: "Thời lượng final ≤ 6 phút"
      },
      {
        title: "Music Video / MV",
        desc: "Phụ thuộc mạnh mẽ vào footage quay thực tế, ý tưởng/concept đạo diễn và nhịp cắt khớp nhạc thâm sâu.",
        price: "Báo giá theo Brief",
        unit: "",
        notes: "Đánh giá cụ thể theo kịch bản"
      },
      {
        title: "Series / Nhiều Tập",
        desc: "Bản báo giá tối ưu trọn gói cho kế hoạch xuất bản đều đặn nhiều tập để đồng bộ phong cách dựng.",
        price: "Báo giá theo Brief",
        unit: "",
        notes: "Trao đổi sâu về kỳ hạn ra tập"
      }
    ],
    rawPolicyShort: "Raw policy (Phim Ngắn): Đã bao gồm dung lượng raw đầu vào ≤ 60 phút camera thô cho mỗi 1–2 phút thành phẩm chính thức. Vượt quá hạn mức tính: +50.000đ / mỗi 30 phút camera thô phát sinh.",
    rawPolicyLong: "Raw policy (Phim Dài): Đã bao gồm dung lượng raw đầu vào ≤ 3 giờ camera thô cho toàn dự án. Vượt quá hạn mức tính: +120.000đ / mỗi giờ camera thô phát sinh.",
    
    baseline: {
      title: "Hạng Mục Luôn Đi Kèm (Mặc Định)",
      sub: "Để đảm bảo chất lượng kỹ thuật ổn định, mọi sản phẩm Level 1 của tôi đều tích hợp đầy đủ 6 nền tảng hậu kỳ cốt lõi dưới đây mà không phụ thu:",
      items: [
        {
          title: "Nhịp Dựng & Pacing",
          desc: "Tập trung điều chỉnh khoảng lặng lời thoại, cắt nhịp dứt khoát tránh vụn vặt và hướng dòng chảy thị giác mượt mà."
        },
        {
          title: "Sound Design Cơ Bản",
          desc: "Cân bằng dải tần giọng thoại, lọc ù rền tạp âm nền cơ bản và chèn nhạc nền chuyển đổi (nhạc do khách hàng cung cấp)."
        },
        {
          title: "Subtitle / Caption",
          desc: "Thiết kế chữ phụ đề hiển thị sạch sẽ, kích cỡ vừa vặn dễ theo dõi để nâng niu đôi mắt người xem."
        },
        {
          title: "Text Motion Cơ Bản",
          desc: "Chữ xuất hiện đơn giản, intro tựa đề tinh tế, không màu mè thái quá phá hỏng tính chuyên nghiệp của video."
        },
        {
          title: "Chuyển Cảnh (Transitions)",
          desc: "Sử dụng các lát cắt thẳng (straight cut) hoặc các cú trượt kinh điển phục vụ mục tiêu dẫn chuyện liên tục."
        },
        {
          title: "Color Correction Cơ Bản (Rec709)",
          desc: "Duygital KHÔNG cung cấp chỉnh màu nghệ thuật nâng cao (color grading) chuyên sâu ở gói chuẩn. Tôi thực hiện cân chỉnh kỹ thuật cơ bản: chỉnh phơi sáng, tương phản phẳng và chuyển đổi profile LOG của camera về không gian màu tiêu chuẩn màn hình Rec709 để giữ hình ảnh đồng đều, trung thực nhất."
        }
      ]
    },
    addons: {
      title: "Dịch Vụ Bổ Sung (Khi Brief Yêu Cầu)",
      sub: "Áp dụng khi dự án đòi hỏi khối lượng xử lý (workload) vượt ngoài baseline. Mọi chi phí bổ sung sẽ được xác nhận rõ trước khi bắt tay làm việc.",
      items: [
        {
          title: "Map Animation (After Effects)",
          desc: "Dự kiến phù hợp cho các bên làm Bất động sản / Du lịch / Kể chuyện thực tế bằng tọa độ bản đồ chuyển động.",
          price: "1.000.000đ / phút"
        },
        {
          title: "Short Map Scene (Scene Bản Đồ Ngắn)",
          desc: "Một đoạn chuyển cảnh bản đồ ngắn gọn khoảng 5s đóng vai trò chuyển tiếp bối cảnh bốc lửa.",
          price: "200.000đ / 5 giây"
        },
        {
          title: "Chuyển Đổi Format (16:9 ↔ 9:16 / 1:1)",
          desc: "Biên tập lại bố cục, crop khung hình, sắp xếp lại khung thoại và căn sửa an toàn khung hình an toàn (safe zones).",
          price: "50%–80% so với giá gốc"
        },
        {
          title: "Cinematic Color Grading (Chỉnh Màu Nghệ Thuật Thuê Ngoài)",
          desc: "Tôi là người dựng cấu trúc, không phải một Colorist chuyên nghiệp. Đối với các yêu cầu phân màu nghệ thuật thâm sâu hay thiết kế Look riêng phức tạp, tôi sẽ thuê Colorist chuyên trách bên ngoài dựa theo Moodboard thảo luận trước. Báo giá riêng dựa trên quy mô footage thô.",
          price: "Báo Giá Riêng"
        }
      ]
    },
    faq: {
      title: "Sự Thật Về Cách Tôi Làm Việc",
      tag: "GIỚI HẠN & NIỀM TIN CHÂN THỰC",
      items: [
        {
          question: "1. Bạn dựng những loại video nào?",
          answer: "Mình dựng những loại video sau: talking head, vlog, review, podcast, phỏng vấn, và storytelling. Trọng tâm là nội dung rõ, nhịp xem tự nhiên và giữ người xem ở lại."
        },
        {
          question: "2. Bạn nhận dựng cho những nền tảng nào?",
          answer: "YouTube, TikTok, Instagram Reels, Facebook. Video được dựng riêng cho từng nền tảng, dựa trên tỉ lệ khung hình và cách người xem sử dụng điện thoại hoặc màn hình máy tính."
        },
        {
          question: "3. Quy trình dựng video diễn ra như thế nào?",
          answer: "Nhận footage và yêu cầu → xác định hướng dựng và cảm xúc → gửi bản dựng đầu tiên → chỉnh sửa theo feedback cho đến khi video sẵn sàng sử dụng."
        },
        {
          question: "4. Thời gian hoàn thành một video là bao lâu?",
          answer: "– Video ngắn: 2–4 ngày\n– Video dài hoặc nhiều lớp dựng: 5–7 ngày\nTimeline được thống nhất trước khi bắt đầu. Mình chỉ nhận dự án khi đảm bảo đúng tiến độ."
        },
        {
          question: "5. Bạn có nhận chỉnh sửa không? Có mấy lần miễn phí?",
          answer: "Có 2 vòng chỉnh sửa miễn phí cho mỗi dự án. Nên bạn tổng hợp đầy đủ feedback trước khi gửi để tôi tránh sửa lan man, lặt vặt làm chậm trễ tiến độ dự án."
        },
        {
          question: "6. Tôi cần chuẩn bị những gì trước khi bắt đầu?",
          answer: "Bạn chỉ cần gửi footage gốc, mong muốn cơ bản hoặc video mẫu tham khảo (nếu có). Chuyện còn lại chúng ta cùng thỏa thuận cách triển khai. Nếu bạn không có cách thì mình \"nấu\" video theo ý mình."
        },
        {
          question: "7. Bạn có thêm phụ đề, nhạc và hiệu ứng không?",
          answer: "Có. Mình xử lý nhạc nền, sound effect và phụ đề (khi cần) ở mức vừa đủ, tập trung tăng trải nghiệm xem chứ không làm video bị rối hay “ồn”."
        },
        {
          question: "8. Nếu tôi chưa rõ mình muốn gì thì sao?",
          answer: "Không sao. Nhiều dự án bắt đầu từ ý tưởng chưa rõ ràng. Mình sẽ giúp bạn làm rõ hướng dựng, cấu trúc nội dung và cách kể chuyện phù hợp với video của bạn."
        },
        {
          question: "9. Bạn có nhận mọi dự án không?",
          answer: "Không. Nếu mình thấy dự án không phù hợp hoặc không thể làm tốt, mình sẽ trao đổi thẳng từ đầu để tránh mất thời gian của cả hai bên."
        },
        {
          question: "10. Bạn có làm hợp đồng không?",
          answer: "Có. Khách doanh nghiệp luôn có hợp đồng. Khách cá nhân có thể dùng hợp đồng nếu cần. Mọi thứ được thống nhất trước khi triển khai."
        }
      ]
    }
  }
};

export default function Collaboration({
  workflow,
  pricing,
  faqs,
  onGoToContact,
  language,
}: CollaborationProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const dict = contentLocal[language];

  return (
    <section className="relative min-h-screen py-20 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto z-20 font-sans text-paper">
      
      {/* SECTION A: INTRO STATEMENT - Editorial Frame */}
      <div className="border-b border-paper/10 pb-8 mb-20 text-left">
        <span className="font-mono text-sm text-brand tracking-[0.25em] block mb-3 font-extrabold uppercase">
          {dict.intro.tag}
        </span>
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-paper uppercase leading-tight tracking-tight">
          {dict.intro.title}
        </h2>
        <p className="mt-6 font-sans text-base md:text-lg text-paper/95 leading-relaxed max-w-5xl font-normal">
          {dict.intro.desc}
        </p>
      </div>

      {/* SECTION B: LEVEL SYSTEM - Creative Presentation */}
      <div className="mb-28 text-left">
        <div className="mb-10 max-w-4xl">
          <span className="font-mono text-sm text-brand tracking-[0.2em] block font-extrabold uppercase mb-2">
            SECTION A // {dict.levels.sectionTitle}
          </span>
          <p className="font-sans text-sm md:text-base text-paper/95 leading-relaxed font-normal">
            {dict.levels.sectionSub}
          </p>
        </div>

        {/* 3 Columns evolution layout with breathing room */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* LEVEL 1: Active, Available, Highlighted with subtle branding accent */}
          <div className="border-2 border-brand bg-[#2D143D] p-8 md:p-10 rounded-lg relative flex flex-col justify-between transition-all duration-300 shadow-lg">
            <div>
              <div className="flex items-center justify-between border-b border-brand/40 pb-4 mb-6">
                <span className="font-mono text-xs text-brand tracking-widest font-extrabold uppercase">LEVEL 1 // ENTRY</span>
                <span className="bg-brand text-paper text-xs font-mono px-2.5 py-1 tracking-wider font-extrabold rounded">
                  {dict.levels.level1Badge}
                </span>
              </div>
              
              <div className="space-y-5 flex-1">
                {/* Parameter rows styled beautifully to protect readability */}
                <div className="space-y-1.5">
                  <span className="font-mono text-xs text-brand uppercase tracking-wider block font-extrabold">POSITIONING</span>
                  <p className="text-sm text-paper leading-relaxed font-normal">{dict.levels.l1Positioning}</p>
                </div>
                <div className="space-y-1.5">
                  <span className="font-mono text-xs text-brand uppercase tracking-wider block font-extrabold">FOOTAGE DEPTH</span>
                  <p className="text-sm text-paper leading-relaxed font-normal">{dict.levels.l1Footage}</p>
                </div>
                <div className="space-y-1.5">
                  <span className="font-mono text-xs text-brand uppercase tracking-wider block font-extrabold">MINDSET</span>
                  <p className="text-sm text-paper leading-relaxed font-normal">{dict.levels.l1Mindset}</p>
                </div>
                <div className="space-y-1.5">
                  <span className="font-mono text-xs text-brand uppercase tracking-wider block font-extrabold">TURNAROUND</span>
                  <p className="text-sm text-paper leading-relaxed font-normal">{dict.levels.l1Turnaround}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-brand/20">
              <span className="font-sans text-xs text-paper/95 block mb-4 font-normal leading-relaxed bg-[#1F0A2E] border border-brand/30 p-4 rounded">{dict.levels.l1Ideal}</span>
              <button
                onClick={onGoToContact}
                className="w-full py-4 px-5 bg-brand hover:bg-motion font-mono text-xs text-paper tracking-[0.2em] transition-all duration-300 cursor-pointer text-center font-extrabold uppercase rounded shadow-md block"
              >
                {dict.levels.cta}
              </button>
            </div>
          </div>

          {/* LEVEL 2: Muted Road Map */}
          <div className="border border-paper/20 bg-[#1F0A2E] p-8 md:p-10 rounded-lg relative flex flex-col justify-between opacity-80 transition-all duration-300 hover:opacity-100 hover:border-paper/40 shadow-lg">
            <div>
              <div className="flex items-center justify-between border-b border-paper/20 pb-4 mb-6">
                <span className="font-mono text-xs text-paper/90 tracking-widest font-extrabold uppercase">LEVEL 2 // PRO</span>
                <span className="border border-paper/40 text-paper/90 text-xs font-mono px-2 py-1 tracking-wider uppercase rounded">
                  {dict.levels.level2Badge}
                </span>
              </div>
              
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <span className="font-mono text-xs text-paper/80 uppercase tracking-wider block font-extrabold">POSITIONING</span>
                  <p className="text-sm text-paper/95 leading-relaxed font-normal">{dict.levels.l2Positioning}</p>
                </div>
                <div className="space-y-1.5">
                  <span className="font-mono text-xs text-paper/80 uppercase tracking-wider block font-extrabold">FOOTAGE DEPTH</span>
                  <p className="text-sm text-paper/95 leading-relaxed font-normal">{dict.levels.l2Footage}</p>
                </div>
                <div className="space-y-1.5">
                  <span className="font-mono text-xs text-paper/80 uppercase tracking-wider block font-extrabold">MINDSET</span>
                  <p className="text-sm text-paper/95 leading-relaxed font-normal">{dict.levels.l2Mindset}</p>
                </div>
                <div className="space-y-1.5">
                  <span className="font-mono text-xs text-paper/80 uppercase tracking-wider block font-extrabold">TURNAROUND</span>
                  <p className="text-sm text-paper/95 leading-relaxed font-normal">{dict.levels.l2Turnaround}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-paper/25">
              <span className="font-sans text-xs text-paper/90 block mb-4 font-normal leading-relaxed border border-paper/20 bg-bg p-4 rounded">{dict.levels.l2Ideal}</span>
              <button
                disabled
                className="w-full py-4 px-5 border border-paper/30 text-paper/60 font-mono text-xs tracking-[0.2em] text-center uppercase cursor-not-allowed rounded-none"
              >
                {dict.levels.ctaMuted}
              </button>
            </div>
          </div>

          {/* LEVEL 3: Muted Road Map */}
          <div className="border border-paper/20 bg-[#1F0A2E] p-8 md:p-10 rounded-lg relative flex flex-col justify-between opacity-80 transition-all duration-300 hover:opacity-100 hover:border-paper/40 shadow-lg">
            <div>
              <div className="flex items-center justify-between border-b border-paper/20 pb-4 mb-6">
                <span className="font-mono text-xs text-paper/90 tracking-widest font-extrabold uppercase">LEVEL 3 // PREMIUM</span>
                <span className="border border-paper/40 text-paper/90 text-xs font-mono px-2 py-1 tracking-wider uppercase rounded">
                  {dict.levels.level3Badge}
                </span>
              </div>
              
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <span className="font-mono text-xs text-paper/80 uppercase tracking-wider block font-extrabold">POSITIONING</span>
                  <p className="text-sm text-paper/95 leading-relaxed font-normal">{dict.levels.l3Positioning}</p>
                </div>
                <div className="space-y-1.5">
                  <span className="font-mono text-xs text-paper/80 uppercase tracking-wider block font-extrabold">FOOTAGE DEPTH</span>
                  <p className="text-sm text-paper/95 leading-relaxed font-normal">{dict.levels.l3Footage}</p>
                </div>
                <div className="space-y-1.5">
                  <span className="font-mono text-xs text-paper/80 uppercase tracking-wider block font-extrabold">MINDSET</span>
                  <p className="text-sm text-paper/95 leading-relaxed font-normal">{dict.levels.l3Mindset}</p>
                </div>
                <div className="space-y-1.5">
                  <span className="font-mono text-xs text-paper/80 uppercase tracking-wider block font-extrabold">TURNAROUND</span>
                  <p className="text-sm text-paper/95 leading-relaxed font-normal">{dict.levels.l3Turnaround}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-paper/25">
              <span className="font-sans text-xs text-paper/90 block mb-4 font-normal leading-relaxed border border-paper/20 bg-bg p-4 rounded">{dict.levels.l3Ideal}</span>
              <button
                disabled
                className="w-full py-4 px-5 border border-paper/30 text-paper/60 font-mono text-xs tracking-[0.2em] text-center uppercase cursor-not-allowed rounded-none"
              >
                {dict.levels.ctaMuted}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* RETAINER BRIEF AT BOTTOM OF SECTION B */}
      <div className="mb-24 text-left border-l-2 border-brand pl-6 max-w-4xl">
        <h4 className="font-display font-bold text-paper text-xl uppercase tracking-tight mb-3">
          {dict.pricingHeader.ratesTitle}
        </h4>
        <p className="font-sans text-sm md:text-base text-paper/95 leading-relaxed font-normal">
          {dict.pricingHeader.ratesSub}
        </p>
      </div>

      {/* SECTION C & D: RATE SHEETS */}
      <div className="mb-28 space-y-24 text-left">
        
        {pricing && pricing.length > 0 ? (
          <div>
            <span className="font-mono text-sm text-brand tracking-[0.2em] block font-extrabold uppercase mb-8">
              ACTIVE PLANS // DYNAMIC PORTFOLIO ARCHITECTURE
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {pricing.map((plan: any, i: number) => (
                <div key={plan.id || i} className="border border-paper/20 bg-paper/[0.02]/60 p-8 md:p-10 relative flex flex-col justify-between transition-all hover:border-brand/45 hover:bg-brand/[0.015] rounded shadow-[0_4px_25px_rgba(0,0,0,0.4)]">
                  <div>
                    <span className="font-mono text-xs text-brand font-extrabold tracking-widest block uppercase mb-2">
                      PLAN // 0{i + 1}
                    </span>
                    <h4 className="font-display font-bold text-2xl text-paper uppercase tracking-wider pb-3 border-b border-paper/15 mb-4 leading-tight">
                      {plan.name}
                    </h4>
                    {plan.subtitle && (
                      <p className="text-xs font-mono text-brand font-bold uppercase tracking-widest mb-3">{plan.subtitle}</p>
                    )}
                    {plan.description && (
                      <p className="text-sm text-paper/85 leading-relaxed font-sans mb-6">
                        {plan.description}
                      </p>
                    )}
                    
                    {plan.features && plan.features.length > 0 && (
                      <div className="space-y-3 mb-6">
                        <span className="text-[10px] font-mono text-paper/50 uppercase tracking-widest block font-bold">COOPERATIVE FEATURES</span>
                        <ul className="space-y-2.5">
                          {plan.features.map((feat: string, fIdx: number) => (
                            <li key={fIdx} className="flex items-start gap-2.5 text-xs text-paper/90 font-medium">
                              <span className="w-1.5 h-1.5 bg-brand relative top-1.5 shrink-0" />
                              <span className="leading-relaxed">{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 pt-5 border-t border-paper/12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    {plan.idealFor && (
                      <div className="text-xs font-sans text-paper/70">
                        <span className="block font-mono text-[9px] text-paper/40 uppercase tracking-wider font-bold">IDEAL FIT</span>
                        <span className="font-semibold text-paper/90">{plan.idealFor}</span>
                      </div>
                    )}
                    <span className="text-base md:text-lg font-display font-extrabold text-brand uppercase bg-brand/10 border border-brand/35 px-4 py-2 leading-none">{plan.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* SHORT-FORM PRICING PLAN */}
            <div>
              <div className="mb-6">
                <span className="font-mono text-sm text-brand tracking-[0.2em] block font-extrabold uppercase mb-2">
                  SECTION B // {dict.pricingHeader.shortTitle}
                </span>
                <p className="text-sm md:text-base font-sans text-paper/95 font-normal max-w-3xl leading-relaxed">
                  {dict.pricingHeader.shortSub}
                </p>
                <div className="mt-3 text-xs md:text-sm font-mono bg-brand/10 text-brand px-4 py-2 inline-block rounded-none border border-brand/30 font-extrabold uppercase tracking-wide">
                  {dict.pricingHeader.shortApply}
                </div>
              </div>

              {/* Editorial List table layout */}
              <div className="border-t border-b border-paper/30 divide-y divide-paper/20">
                {/* Table headers */}
                <div className="hidden md:grid grid-cols-12 gap-8 py-4 font-mono text-xs text-brand uppercase tracking-widest font-extrabold">
                  <div className="col-span-3">{dict.pricingHeader.colCategory}</div>
                  <div className="col-span-5">{dict.pricingHeader.colDescription}</div>
                  <div className="col-span-2 text-right">{dict.pricingHeader.colPrice}</div>
                  <div className="col-span-2 text-right">{dict.pricingHeader.colNotes}</div>
                </div>

                {/* List Rows */}
                {dict.shortRates.map((rate, i) => (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-6 items-start hover:bg-paper/[0.02] transition-all">
                    <div className="col-span-12 md:col-span-3 font-display font-bold text-lg text-paper uppercase tracking-wider">
                      {rate.title}
                    </div>
                    <div className="col-span-12 md:col-span-5 font-sans text-sm text-paper/95 leading-relaxed font-normal">
                      {rate.desc}
                    </div>
                    <div className="col-span-12 md:col-span-2 md:text-right font-display text-base md:text-lg font-black text-brand uppercase">
                      {rate.price} <span className="text-xs text-paper/80 block md:inline font-mono font-bold tracking-wider uppercase">{rate.unit}</span>
                    </div>
                    <div className="col-span-12 md:col-span-2 md:text-right font-mono text-xs text-paper/75 font-bold uppercase tracking-wider bg-paper/10 px-3 py-1 inline-block border border-paper/5">
                      {rate.notes}
                    </div>
                  </div>
                ))}
              </div>

              {/* Raw limits policy callout */}
              <div className="mt-6 flex items-center gap-4 bg-brand/[0.08] border border-brand/35 p-5 rounded-none">
                <ShieldAlert className="w-5 h-5 text-brand shrink-0" />
                <p className="font-mono text-xs md:text-sm text-paper font-bold leading-relaxed uppercase tracking-wide">
                  {dict.rawPolicyShort}
                </p>
              </div>
            </div>

            {/* LONG-FORM PRICING PLAN */}
            <div>
              <div className="mb-6">
                <span className="font-mono text-sm text-brand tracking-[0.2em] block font-extrabold uppercase mb-2">
                  SECTION C // {dict.pricingHeader.longTitle}
                </span>
                <p className="text-sm md:text-base font-sans text-paper/95 font-normal max-w-3xl leading-relaxed">
                  {dict.pricingHeader.longSub}
                </p>
                <div className="mt-3 text-xs md:text-sm font-mono bg-brand/10 text-brand px-4 py-2 inline-block rounded-none border border-brand/30 font-extrabold uppercase tracking-wide">
                  {dict.pricingHeader.longApply}
                </div>
              </div>

              {/* Editorial List table layout */}
              <div className="border-t border-b border-paper/30 divide-y divide-paper/20">
                {/* Table headers */}
                <div className="hidden md:grid grid-cols-12 gap-8 py-4 font-mono text-xs text-brand uppercase tracking-widest font-extrabold">
                  <div className="col-span-3">{dict.pricingHeader.colCategory}</div>
                  <div className="col-span-5">{dict.pricingHeader.colDescription}</div>
                  <div className="col-span-2 text-right">{dict.pricingHeader.colPrice}</div>
                  <div className="col-span-2 text-right">{dict.pricingHeader.colNotes}</div>
                </div>

                {/* List Rows */}
                {dict.longRates.map((rate, i) => (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-6 items-start hover:bg-paper/[0.02] transition-all">
                    <div className="col-span-12 md:col-span-3 font-display font-bold text-lg text-paper uppercase tracking-wider">
                      {rate.title}
                    </div>
                    <div className="col-span-12 md:col-span-5 font-sans text-sm text-paper/95 leading-relaxed font-normal">
                      {rate.desc}
                    </div>
                    <div className="col-span-12 md:col-span-2 md:text-right font-display text-base md:text-lg font-black text-brand uppercase">
                      {rate.price} <span className="text-xs text-paper/80 block md:inline font-mono font-bold tracking-wider uppercase">{rate.unit}</span>
                    </div>
                    <div className="col-span-12 md:col-span-2 md:text-right font-mono text-xs text-paper/75 font-bold uppercase tracking-wider bg-paper/10 px-3 py-1 inline-block border border-paper/5">
                      {rate.notes}
                    </div>
                  </div>
                ))}
              </div>

              {/* Raw limits policy callout */}
              <div className="mt-6 flex items-center gap-4 bg-brand/[0.08] border border-brand/35 p-5 rounded-none">
                <ShieldAlert className="w-5 h-5 text-brand shrink-0" />
                <p className="font-mono text-xs md:text-sm text-paper font-bold leading-relaxed uppercase tracking-wide">
                  {dict.rawPolicyLong}
                </p>
              </div>
            </div>
          </>
        )}

      </div>

      {/* SECTION E: BASELINE CHRONOLOGY (Included services) */}
      <div className="mb-28 border-t border-paper/10 pt-16 text-left">
        <div className="mb-12 max-w-2xl">
          <span className="font-mono text-sm text-brand tracking-[0.2em] block font-extrabold uppercase mb-2">
            SECTION D // {dict.baseline.title}
          </span>
          <p className="font-sans text-sm text-paper/95 font-normal leading-relaxed">
            {dict.baseline.sub}
          </p>
        </div>

        {/* 2-Column modular block layouts for solid baseline understanding */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {dict.baseline.items.map((item, i) => (
            <div key={i} className="border border-paper/20 p-6 md:p-8 bg-paper/[0.02]/60 flex flex-col justify-between hover:border-brand/30 transition-all">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 bg-brand shrink-0 block" />
                  <h4 className="font-display font-bold text-sm md:text-base text-paper uppercase tracking-wider leading-relaxed">
                    {item.title}
                  </h4>
                </div>
                <p className="text-xs md:text-sm text-paper leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
              <div className="mt-6 font-mono text-xs text-brand font-extrabold uppercase tracking-widest border-t border-paper/10 pt-4">
                {language === "en" ? "DEFAULT BASELINE" : "HẠNG MỤC MẶC ĐỊNH"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION F: ADD-ONS */}
      <div className="mb-28 border-t border-paper/10 pt-16 text-left">
        <div className="mb-12 max-w-2xl">
          <span className="font-mono text-sm text-brand tracking-[0.2em] block font-extrabold uppercase mb-2">
            SECTION E // {dict.addons.title}
          </span>
          <p className="font-sans text-sm text-paper/95 font-normal leading-relaxed">
            {dict.addons.sub}
          </p>
        </div>

        {/* Modular Grid without glowing SaaS pricing items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {dict.addons.items.map((addon, i) => (
            <div key={i} className="border border-paper/20 bg-paper/[0.02]/60 p-8 md:p-10 relative flex flex-col justify-between transition-all hover:border-brand/40 hover:bg-brand/[0.02]">
              <div>
                <span className="font-mono text-xs text-brand font-extrabold tracking-widest block uppercase mb-2">
                  OPTIONAL // 0{i + 1}
                </span>
                <h4 className="font-display font-bold text-base md:text-lg text-paper uppercase tracking-wider pb-3 border-b border-paper/15 mb-4">
                  {addon.title}
                </h4>
                <p className="text-xs md:text-sm text-paper leading-relaxed font-normal">
                  {addon.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-paper/10 flex justify-between items-center">
                <span className="text-xs font-mono text-paper/90 uppercase font-bold tracking-wider">ADDON RATE</span>
                <span className="text-xs md:text-sm font-display font-extrabold text-brand uppercase bg-brand/10 border border-brand/35 px-3.5 py-1.5">{addon.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION G: FAQ ACCORDION SHEET */}
      <div className="border-t border-paper/15 pt-16 text-left">
        <div className="mb-12">
          <span className="font-mono text-sm text-brand tracking-[0.2em] block font-extrabold uppercase mb-2">
            SECTION F // {dict.faq.title}
          </span>
          <p className="text-sm font-mono text-brand font-extrabold uppercase tracking-widest">
            {dict.faq.tag}
          </p>
        </div>

        <div className="max-w-4xl divide-y divide-paper/20 border-b border-paper/20">
          {(faqs && faqs.length > 0 ? faqs : dict.faq.items).map((item: any, i: number) => {
            const isOpen = openFaqIndex === i;
            return (
              <div key={i} className="py-3 transition-all">
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                  className="w-full flex justify-between items-center text-left py-4 cursor-pointer group border-0 bg-transparent"
                  id={`faq-btn-${i}`}
                >
                  <p className="font-display font-bold text-base md:text-lg text-paper group-hover:text-brand transition-colors duration-200 uppercase tracking-wide">
                    {item.question}
                  </p>
                  <ChevronDown
                    className={`w-5 h-5 text-brand shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm md:text-base text-paper/85 leading-relaxed pb-6 pr-6 font-normal border-l-2 border-brand pl-5 bg-paper/[0.02] my-3 whitespace-pre-line">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* FOOTER INTENT FRAME */}
      <div className="mt-28 border border-paper/20 bg-paper/[0.02]/60 p-6 md:p-10 relative overflow-hidden text-left">
        <span className="font-mono text-xs md:text-sm text-brand tracking-[0.3em] block mb-3 font-bold uppercase">
          {language === "en" ? "STATEMENT OF INTENT" : "CAM KẾT THẨM MỸ"}
        </span>
        <p className="font-serif italic text-xl md:text-2xl text-paper leading-relaxed max-w-3xl font-normal">
          &ldquo;{dict.intro.quote}&rdquo;
        </p>
      </div>

    </section>
  );
}
