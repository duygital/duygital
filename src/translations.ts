export interface TranslationBundle {
  header: {
    logoSubtitle: string;
    status: string;
    cms: string;
    home: string;
    works: string;
    thinking: string;
    collaboration: string;
    contact: string;
  };
  hero: {
    studio: string;
    title1: string;
    title2: string;
    title3: string;
    pacingTag: string;
    pacingDesc: string;
    soundTag: string;
    soundDesc: string;
    visionTag: string;
    visionDesc: string;
    cta: string;
    projectTag: string;
    studyTag: string;
    lockedTag: string;
  };
  works: {
    selectedWork: string;
    title: string;
    desc: string;
    manageBtn: string;
    projectIndex: string;
    dominantFeeling: string;
    pacingMetric: string;
    watchBtn: string;
    activeFilm: string;
    closeBtn: string;
  };
  thinking: {
    tag: string;
    title: string;
    principleTag: string;
    principleQuote: string;
  };
  collaboration: {
    tag: string;
    title: string;
    p1No: string;
    p1Title: string;
    p1Desc: string;
    p2No: string;
    p2Title: string;
    p2Desc: string;
    p3No: string;
    p3Title: string;
    p3Desc: string;
    ratesTag: string;
    ratesTitle: string;
    ratesSub: string;
    ratesPrice: string;
    featuresHeader: string;
    idealFit: string;
    connectStudy: string;
    processTag: string;
    processTitle: string;
    faqTag: string;
    faqTitle: string;
    stageLabel: string;
    deliverableLabel: string;
    policyRevNo: string;
    policyRevTitle: string;
    policyRevText: string;
    policyRawNo: string;
    policyRawTitle: string;
    policyRawText: string;
    policyPayNo: string;
    policyPayTitle: string;
    policyPayText: string;
  };
  contact: {
    tag: string;
    title: string;
    disclaimer: string;
    form: {
      name: string;
      email: string;
      company: string;
      projectType: string;
      pacingQuestion: string;
      references: string;
      feelingQuestion: string;
      avoidQuestion: string;
      footageScale: string;
      extraNotes: string;
      btnSend: string;
      btnSending: string;
    };
    success: {
      received: string;
      filed: string;
      desc: string;
      another: string;
    };
  };
  footer: {
    copyright: string;
    subtitle: string;
  };
}

export const translations: Record<"en" | "vi", TranslationBundle> = {
  vi: {
    header: {
      logoSubtitle: "BIÊN TẬP ĐIỆN ẢNH",
      status: "CHỈNH CHU VÀ TIẾT CHẾ",
      cms: "CMS",
      home: "Trang chủ",
      works: "Dự án",
      thinking: "Quy trình",
      collaboration: "Bảng giá",
      contact: "Liên hệ",
    },
    hero: {
      studio: "XƯỞNG BIÊN TẬP DUYGITAL",
      title1: "Biên tập hình ảnh",
      title2: "được dẫn dắt bởi sự thấu hiểu",
      title3: "và nhịp điệu tự nhiên.",
      pacingTag: "01 / NHỊP ĐIỆU DÒNG THỜI GIAN",
      pacingDesc: "Mỗi nhịp cắt là một nhịp thở chuyển tiếp. Sự nôn nóng trong biên tập thường tước đi cơ hội để người xem thấu cảm trọn vẹn diễn bản chất và thông điệp sâu xa.",
      soundTag: "02 / THIẾT KẾ ÂM THANH",
      soundDesc: "Chúng tôi phác thảo không gian âm thanh trước khi khóa các khung hình cuối cùng. Tiếng động môi trường và âm nền tĩnh tạo nên hồn cốt trước cả khi những diễn biến thị giác bắt đầu.",
      visionTag: "03 / TẦM NHÌN BIÊN TẬP",
      visionDesc: "Sự tiết chế tối đa nhằm tôn vinh sự mạch lạc, tập trung cao độ và sức nặng chân thực ẩn sâu trong tài liệu của bạn.",
      cta: "XEM CÁC TÁC PHẨM TUYỂN CHỌN",
      projectTag: "TÌNH HUỐNG THỰC GỐC",
      studyTag: "THỬ NGHIỆM ĐIỆN ẢNH",
      lockedTag: "DÒNG THỜI GIAN ĐÃ DUYỆT",
    },
    works: {
      selectedWork: "02 / TÁC PHẨM NỔI BẬT",
      title: "Tuyển Chọn Tác Phẩm",
      desc: "Mạch truyện vững vàng, âm thanh chiều sâu. Từng nút cắt đều chứa đựng dụng ý thẩm mĩ và nhịp thở tự nhiên của câu chuyện bên trong.",
      manageBtn: "[ Đồng bộ tác phẩm qua trang tính Google Sheets ]",
      projectIndex: "MÃ DỰ ÁN: ",
      dominantFeeling: "CẢM QUAN CHỦ ĐẠO:",
      pacingMetric: "MẬT ĐỘ TIẾT CHẾ:",
      watchBtn: "[ THƯỞNG THỨC TÁC PHẨM ]",
      activeFilm: "TÁC PHẨM ĐANG CHIẾU: ",
      closeBtn: "[ ĐÓNG KHUNG PHÁT ]",
    },
    thinking: {
      tag: "03 / NGUYÊN TẮC HỢP TÁC & HOẠT ĐỘNG",
      title: "Quá Trình Thiết Lập Ý Tưởng",
      principleTag: "CAM KẾT LÀM VIỆC CHUNG",
      principleQuote: "Một kết nối minh bạch là nền tảng của tác phẩm giá trị. Chúng tôi làm việc dựa trên cấu trúc mạch lạc, bảo vệ sự yên tĩnh của không gian và từ chối các xu hướng gây nhiễu thị giác vô nghĩa.",
    },
    collaboration: {
      tag: "04 / QUY TRÌNH & ĐIỀU KHOẢN HỢP TÁC",
      title: "Triết lý và Điều khoản hoạt động",
      p1No: "TIÊU CHÍ 01",
      p1Title: "Từ chối phân tâm thị giác",
      p1Desc: "Nói không với hiệu ứng gấp gáp ăn liền, những cú giật hình giựt gân, hay các khung chữ nhảy múa dồn dập. Mỗi lát cắt xuất hiện chỉ vì sự trọn vẹn của diễn xuất và cảm xúc.",
      p2No: "TIÊU CHÍ 02",
      p2Title: "Thiết kế âm thanh đi trước",
      p2Desc: "Âm thanh không phải bước đệm phụ trợ cuối cùng. Chúng tôi cấu hình khung thoại, tiếng thở môi trường, tiếng động tĩnh lặng và nhịp nhạc cốt lõi trước rồi mới tiến hành đặt khuôn hình dựng.",
      p3No: "TIÊU CHÍ 03",
      p3Title: "Khung phản hồi có định mức",
      p3Desc: "Các đề xuất sửa đổi được quy hoạch chặt chẽ trong ba vòng phản hồi. Phương pháp này loại bỏ những chu trình sửa chữa mơ hồ vô hạn, giúp đôi bên luôn bảo vệ mục tiêu sáng tạo ban đầu.",
      ratesTag: "PHÂN TÁCH GÓI SÁNG TẠO",
      ratesTitle: "Hạn Mức Ngân Sách",
      ratesSub: "BIỂU PHÍ VÀ ĐỊNH LƯỢNG BIÊN TẬP",
      ratesPrice: "Mức phí hợp tác",
      featuresHeader: "Hạng mục cốt lõi đi kèm:",
      idealFit: "PHÙ HỢP HOÀN HẢO VỚI:",
      connectStudy: "THẢO LUẬN Ý ĐỒ",
      processTag: "TRÌNH TỰ BIÊN TẬP DỰ ÁN",
      processTitle: "Lộ Trình Triển Khai",
      faqTag: "THÔNG TIN VÀ SỰ MINH BẠCH",
      faqTitle: "Những Chương Tự Hỏi & Trả Lời",
      stageLabel: "GIAI ĐOẠN BIÊN TẬP",
      deliverableLabel: "BÀN GIAO THỰC TẾ",
      policyRevNo: "ĐIỀU KHOẢN CHI TIẾT 01",
      policyRevTitle: "Chu trình sửa chữa",
      policyRevText: "Hai phiên phản hồi lớn được tích hợp sẵn trong kế hoạch thời gian. Các chu kỳ sửa đổi phát sinh thêm sau đó được tính dựa trên số giờ xưởng hoạt động thực tế, giúp duy trì năng lượng tích cực.",
      policyRawNo: "ĐIỀU KHOẢN CHI TIẾT 02",
      policyRawTitle: "Quyền sở hữu tài liệu gốc",
      policyRawText: "Chúng tôi bàn giao những thước phim thành phẩm sắc nét có giá trị lưu giữ cao. Toàn bộ file quay gốc thô, thư mục dự án biên tập và bộ nhớ đệm hậu kỳ thuộc bản quyền của xưởng trừ khi được thỏa thuận thương thảo trước.",
      policyPayNo: "ĐIỀU KHOẢN CHI TIẾT 03",
      policyPayTitle: "Ký thác và Hoàn thành",
      policyPayText: "Khoản đặt cọc giữ chỗ 50% giúp cố định lịch làm việc chính thức của chúng tôi cho bạn. Khoản phí còn lại sẽ được tất toán trước khi xưởng chuyển giao gói tài liệu chất lượng cao chính thức không watermark.",
    },
    contact: {
      tag: "05 / CUỘC TRÒ CHUYỆN KHỞI TẠO TRỰC TIẾP",
      title: "Khởi đầu sự đồng điệu sáng tạo",
      disclaimer: "Biểu mẫu tìm kiếm sự đồng thuận này giúp chúng tôi đi thẳng vào trọng tâm thẩm mỹ, nhịp điệu yêu thích cùng hạn mức tài chính trước khi khởi động dự án.",
      form: {
        name: "Họ và Tên của Bạn *",
        email: "Địa chỉ Email liên hệ *",
        company: "Tên Thương hiệu hoặc Ý tưởng",
        projectType: "Thể loại thước phim",
        pacingQuestion: "Nhịp độ biên tập bạn định hướng cho thước phim?",
        references: "Đường dẫn tài liệu tham khảo truyền cảm hứng (Vimeo, YouTube)",
        feelingQuestion: "Người xem sẽ mang cảm xúc gì sau khi trải nghiệm xong?",
        avoidQuestion: "Mọi phong cách hình ảnh hoặc chuyển động cần TRÁNH tuyệt đối?",
        footageScale: "Quy mô nguyên liệu thô sẵn có (Tính bằng Giờ)",
        extraNotes: "Chia sẻ sâu thêm về mong mỏi của bạn",
        btnSend: "GỬI YÊU CẦU ĐỒNG SÁNG TẠO",
        btnSending: "ĐANG GỬI THÔNG TIN...",
      },
      success: {
        received: "Hồ Sơ Sáng Tạo Đã Được Lịch Trình",
        filed: "CUỘC HỌP PHÁC THẢO Ý TƯỞNG ĐÃ ĐƯỢC CHUẨN BỊ BƯỚC ĐẦU",
        desc: "Lòng chân thành thấu cảm của bạn là năng lượng tuyệt vời. Tôi sẽ xem kỹ các ý tưởng thẩm mỹ, lựa chọn nhịp độ và gửi thư trao đổi riêng cùng lịch trò chuyện trực tiếp trong vòng 2 ngày làm việc sắp tới.",
        another: "KHỞI TẠO THÊM MỘT HỒ SƠ KHÁC",
      },
    },
    footer: {
      copyright: "© 2026 DUYGITAL. THIẾT KẾ VỚI NHỊP ĐIỆU VÀ SỰ PHÁT TRIỂN CÓ CHỦ ĐÍCH.",
      subtitle: "BẢN THIẾT KẾ VÀ MỤC LỤC TÁC PHẨM.",
    },
  },
  en: {
    header: {
      logoSubtitle: "VISUAL EDITORIAL",
      status: "EDITED FOR INTENT",
      cms: "CMS",
      home: "Home",
      works: "Projects",
      thinking: "Process",
      collaboration: "Pricing",
      contact: "Contact",
    },
    hero: {
      studio: "DUYGITAL EDITORIAL STUDIO",
      title1: "Video editing",
      title2: "guided by deep understanding",
      title3: "and natural organic rhythm.",
      pacingTag: "01 / TIMELINE RHYTHM",
      pacingDesc: "A cut is a moment of transition. Rushing the timeline prevents the audience from absorbing the underlying performance and core message of the scene.",
      soundTag: "02 / SOUND INTEGRATION",
      soundDesc: "We build the audio outline before adjusting the final frames. Natural ambient tones provide the background story before visual action starts.",
      visionTag: "03 / PRODUCTION VISION",
      visionDesc: "Restrained visual editing built specifically to honor clarity, focus, and the weight of your raw story elements.",
      cta: "VIEW SELECTED WORKS",
      projectTag: "PROJECT ENTRY",
      studyTag: "STILL STUDY",
      lockedTag: "LOCKED TIMELINE",
    },
    works: {
      selectedWork: "02 / SELECTED WORK",
      title: "Works & Studies",
      desc: "Every clip is chosen with intent. We assemble sequences by prioritizing clear narrative structure, balanced pacing, and solid audio integration.",
      manageBtn: "[ Sync this portfolio index via Google Sheets ]",
      projectIndex: "PROJECT INDEX: ",
      dominantFeeling: "DOMINANT FEELING:",
      pacingMetric: "PACING METRIC:",
      watchBtn: "[ WATCH PROJECT FILM ]",
      activeFilm: "SELECTED FILM: ",
      closeBtn: "[ CLOSE PLAYER ]",
    },
    thinking: {
      tag: "03 / CO-CREATION & TERMS OF SERVICE",
      title: "Workflow & Working Principles",
      principleTag: "ENGAGEMENT OUTLINE",
      principleQuote: "A transparent creative relationship creates honest visual output. We prioritize absolute structure, professional pacing, and transparent guidelines to deliver uncompromised editorial quality.",
    },
    collaboration: {
      tag: "04 / WORKING PROCESS & COOPERATION",
      title: "Collaboration",
      p1No: "PRINCIPLE 01",
      p1Title: "Pacing & Structural Focus",
      p1Desc: "We avoid whip-zooms, hyperactive overlay text, or visual glitch trends. Every transition is chosen solely to benefit performance clarity and emotional storytelling.",
      p2No: "PRINCIPLE 02",
      p2Title: "Audio-First Development",
      p2Desc: "We don't treat audio as a final layer. We design temp-audio scaffolds, spatial ambient room tones, and rhythm structures before locking video timelines.",
      p3No: "PRINCIPLE 03",
      p3Title: "Defined Review Stages",
      p3Desc: "We organize visual changes into three highly structured review sessions. This prevents endless revisions and helps us concentrate on structural goals.",
      ratesTag: "CREATIVE BUDGET & RETREATS",
      ratesTitle: "Professional Rates",
      ratesSub: "ESTABLISHED SERVICE DIVISION",
      ratesPrice: "Price Structure",
      featuresHeader: "Core Included Deliverables:",
      idealFit: "IDEAL FIT FOR:",
      connectStudy: "DISCUSS INTENT",
      processTag: "PROJECT CHRONOLOGY",
      processTitle: "Post-Production Workflow",
      faqTag: "TRANSPARENCY & CLARITY",
      faqTitle: "Frequently Explored Queries",
      stageLabel: "PROJECT STAGE",
      deliverableLabel: "OUTPUTS",
      policyRevNo: "POLICY 01",
      policyRevTitle: "Revision Cycles",
      policyRevText: "Two comprehensive review cycles are integrated into our timeline format. Subsequent revisions are processed transparently on structured studio hour rates, keeping goals focused and logical.",
      policyRawNo: "POLICY 02",
      policyRawTitle: "Raw Footage Ownership",
      policyRawText: "We deliver meticulously crafted, high-fidelity master films. Raw footage collections, unedited project files, and system project caches remain with the studio unless negotiated formally beforehand.",
      policyPayNo: "POLICY 03",
      policyPayTitle: "Payment & Retention",
      policyPayText: "A 50% reservation deposit secures your timeline budget position. Standard remaining balance is invoiced and settled in full prior to the final unwatermarked delivery cache transfer.",
    },
    contact: {
      tag: "05 / INTAKE & PROJECT DETAILS",
      title: "Start a Project",
      disclaimer: "This enquiry focuses on creative alignment, visual design expectations, and pacing details. It helps me evaluate core project structures before we begin.",
      form: {
        name: "Your Full Name *",
        email: "Your Email Address *",
        company: "Company or Project Name",
        projectType: "Project Type",
        pacingQuestion: "What kind of pacing do you want?",
        references: "Visual or Pacing Reference Links (Vimeo, YouTube)",
        feelingQuestion: "What should people feel after watching?",
        avoidQuestion: "Any visual styles you want to avoid?",
        footageScale: "Footage Scale (Estimated Hours)",
        extraNotes: "Additional Project Notes",
        btnSend: "SEND PROJECT INTAKE",
        btnSending: "SENDING SUBMISSION...",
      },
      success: {
        received: "Project Details Received",
        filed: "YOUR INTAKE HAS BEEN FILED",
        desc: "Thank you. Your details have been submitted. Duygital will review your requirements, pacing preferences, and styling details, and reach out to discuss the next steps within two business days.",
        another: "MAKE ANOTHER INTAKE",
      },
    },
    footer: {
      copyright: "© 2026 DUYGITAL. DESIGNED WITH EDITORIAL PACING AND FOCUS.",
      subtitle: "PORTFOLIO AND PROJECT INDEX.",
    },
  },
};

// Start with a clone of original defaults to support switching / resets
const ORIGINAL_DEFAULTS = JSON.parse(JSON.stringify(translations));

export function resetTranslations() {
  const defaults = JSON.parse(JSON.stringify(ORIGINAL_DEFAULTS));
  Object.assign(translations.vi, defaults.vi);
  Object.assign(translations.en, defaults.en);
}

// Resilient setter supporting both "header.home" and "header_home", as well as Array parsing
function setNestedPath(obj: any, path: string, value: string) {
  if (!obj || !path) return;
  
  let keys = path.trim().split('.');
  
  // If the sheet used underscored naming for root keys e.g. "header_home"
  if (keys.length === 1 && path.includes('_')) {
    const firstUnderscoreIndex = path.indexOf('_');
    const firstPart = path.substring(0, firstUnderscoreIndex);
    const secondPart = path.substring(firstUnderscoreIndex + 1);
    const knownRoots = ["header", "hero", "works", "contact", "thinking", "collaboration", "footer"];
    if (knownRoots.includes(firstPart.toLowerCase())) {
      keys = [firstPart, secondPart];
    }
  }

  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i];
    if (current[k] === undefined) {
      current[k] = {};
    }
    current = current[k];
  }

  const lastKey = keys[keys.length - 1];
  if (current && lastKey) {
    if (Array.isArray(current[lastKey])) {
      current[lastKey] = value.split(/[;|]/).map((item) => item.trim()).filter(Boolean);
    } else {
      current[lastKey] = value;
    }
  }
}

export function updateTranslationsWithLabels(rows: any[]) {
  if (!rows || rows.length === 0) return;
  
  // Clean translation states to default first
  resetTranslations();

  for (const row of rows) {
    // Look up key/path
    const key = (row.key || row.Key || row.path || row.Path || row.id || row.ID || "").trim();
    if (!key) continue;

    // Grab values for vi and en
    const viVal = (row.vi !== undefined && row.vi !== null ? String(row.vi) : (row.text_vi || row.label_vi || "")).trim();
    const enVal = (row.en !== undefined && row.en !== null ? String(row.en) : (row.text_en || row.label_en || "")).trim();

    if (viVal) {
      setNestedPath(translations.vi, key, viVal);
    }
    if (enVal) {
      setNestedPath(translations.en, key, enVal);
    }
  }
}
