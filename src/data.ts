import { Project, Essay, PhilosophySnippet, WorkflowStep, PricingPlan, Testimonial, FAQ } from "./types";

// Helper to extract YouTube ID
export function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

// Helper to parse format like "1:24" or "0:12" into seconds
export function parseTimeToSeconds(timeStr: string): number {
  if (!timeStr) return 0;
  const parts = timeStr.trim().split(":");
  if (parts.length === 2) {
    const mins = parseInt(parts[0], 10) || 0;
    const secs = parseInt(parts[1], 10) || 0;
    return mins * 60 + secs;
  } else if (parts.length === 3) {
    const hrs = parseInt(parts[0], 10) || 0;
    const mins = parseInt(parts[1], 10) || 0;
    const secs = parseInt(parts[2], 10) || 0;
    return hrs * 3600 + mins * 60 + secs;
  }
  return parseInt(timeStr, 10) || 0;
}

// Generate the high-fidelity Vietnamese-first default projects matching the permanent columns exactly
function createDefaultProject(raw: {
  slug: string;
  published: boolean;
  featured: boolean;
  title_vi: string;
  title_en: string;
  year: string;
  category: string;
  tags: string[];
  client: string;
  platform: string;
  youtube_url: string;
  vimeo_url: string;
  thumbnail_mode: string;
  thumbnail_url: string;
  thumbnail_time: string;
  runtime: string;
  role_vi: string;
  role_en: string;
  focus_vi: string;
  focus_en: string;
  short_desc_vi: string;
  short_desc_en: string;
  project_context_vi: string;
  project_context_en: string;
  creative_goal_vi: string;
  creative_goal_en: string;
  editing_focus_vi: string;
  editing_focus_en: string;
  deliverables_vi: string;
  deliverables_en: string;
  color_pipeline: string;
  aspect_ratio: string;
  credits: string;
  sort_order: number;
}, language: "en" | "vi" = "vi"): Project {
  const isVi = language === "vi";
  const title = isVi ? raw.title_vi : raw.title_en;
  const role = isVi ? raw.role_vi : raw.role_en;
  const focus = isVi ? raw.focus_vi : raw.focus_en;
  const short_desc = isVi ? raw.short_desc_vi : raw.short_desc_en;
  const project_context = isVi ? raw.project_context_vi : raw.project_context_en;
  const creative_goal = isVi ? raw.creative_goal_vi : raw.creative_goal_en;
  const editing_focus = isVi ? raw.editing_focus_vi : raw.editing_focus_en;
  const deliverables = isVi ? raw.deliverables_vi : raw.deliverables_en;

  let finalThumb = raw.thumbnail_url;
  if (raw.thumbnail_mode === "youtube" && raw.youtube_url) {
    const ytId = getYouTubeId(raw.youtube_url);
    if (ytId) {
      finalThumb = `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`;
    }
  }

  return {
    id: raw.slug,
    ...raw,
    thumbnail_url: finalThumb,
    title,
    role,
    focus,
    short_desc,
    project_context,
    creative_goal,
    editing_focus,
    deliverables
  };
}

const RAW_PROJECTS = [
  {
    slug: "in-between-cold-walls",
    published: true,
    featured: true,
    title_vi: "DƯỚI NHỮNG KHỐI BÊ TÔNG",
    title_en: "IN BETWEEN COLD WALLS",
    year: "2025",
    category: "Phim tài liệu",
    tags: ["Tài liệu", "Kiến trúc", "Âm thanh môi trường"],
    client: "Viện Tư liệu Kiến trúc",
    platform: "Vimeo",
    youtube_url: "",
    vimeo_url: "https://player.vimeo.com/video/347119290",
    thumbnail_mode: "custom",
    thumbnail_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
    thumbnail_time: "",
    runtime: "06:14",
    role_vi: "Dựng phim chính & Âm thanh",
    role_en: "Lead Editor & Sound Designer",
    focus_vi: "Tĩnh lặng, cấu trúc, chân thực",
    focus_en: "Still, structured, grounded",
    short_desc_vi: "Phim tài liệu ngắn khảo cứu mối liên kết thầm lặng giữa kết cấu chung cư đồ sộ hậu Xô Viết và nhịp sinh hoạt thô sơ của con người tích tụ bên trong.",
    short_desc_en: "A documentary exploring the relationship between monumental housing blocks and individual lives in post-Soviet urban developments.",
    project_context_vi: "Khảo sát và ghi lại mối quan hệ vô hình giữa cấu trúc bê tông đồ sộ bên ngoài với những lát cắt cuộc sống riêng tư, tĩnh lặng bên trong các khu tập thể cũ.",
    project_context_en: "To observe and record the invisible relationships between monumental external concrete structures and the quiet, private slices of life inside residential blocks.",
    creative_goal_vi: "Tạo ra sự tương phản sâu sắc giữa tính vĩnh cửu của vật liệu xây dựng thô ráp và sự mong manh trong hơi thở sinh hoạt hàng ngày của cư dân.",
    creative_goal_en: "To create a sharp visceral contrast between the absolute permanence of raw construction materials and the ephemeral rhythms of daily resident survival.",
    editing_focus_vi: "Từ chối hoàn toàn các hiệu ứng chuyển cảnh kỹ thuật số phổ thông. Dựng dựa vào kỹ thuật J-cut và L-cut để tiếng động lan tỏa trước hành động.",
    editing_focus_en: "Strict rejection of digital warp transitions. Focused on natural sequence flow using precise J-cuts and L-cuts to make ambient room tones lead visual timing.",
    deliverables_vi: "Bản dựng tối giản Master, Thiết kế âm thanh không gian đa chiều, Sổ tay cấu trúc nhịp thời gian.",
    deliverables_en: "Final Master Sequence, Multi-channel Cosmic Sound Design, Rhythm Blueprint Ledger.",
    color_pipeline: "ACEScc to Rec.709 lut-profile",
    aspect_ratio: "2.39:1 Cinematic Wide",
    credits: "Đạo diễn: Sofia Karas / Quay phim: Alexei Volkov",
    sort_order: 1
  },
  {
    slug: "a-circling-flame",
    published: true,
    featured: true,
    title_vi: "NGỌN LỬA XOAY VÒNG",
    title_en: "A CIRCLING FLAME",
    year: "2026",
    category: "Thương mại",
    tags: ["Thời trang", "Thương mại", "Cảm xúc"],
    client: "VOID Studio",
    platform: "Vimeo",
    youtube_url: "",
    vimeo_url: "https://player.vimeo.com/video/443851509",
    thumbnail_mode: "custom",
    thumbnail_url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1200",
    thumbnail_time: "",
    runtime: "02:45",
    role_vi: "Biên tập video & Chỉnh màu",
    role_en: "Video Editor & Colorist",
    focus_vi: "Tập trung, tinh khiết, giác quan",
    focus_en: "Focused, clean, sensory",
    short_desc_vi: "Thước phim lookbook đặc tuyển cho dự án ra mắt bộ sưu tập dệt may xúc giác từ VOID Studio, lột tả chân thật sự mềm rũ của sợi tự nhiên.",
    short_desc_en: "A tactile lookbook presentation for VOID Studio's wool collection, prioritizing fabric physics and human physical interaction.",
    project_context_vi: "Thiết kế lookbook quảng bá bộ sưu tập tối giản tactile của VOID Studio. Thay vì đi theo nhịp độ sôi động thông thường của thời trang nhanh, tác phẩm hướng đến truyền tải cảm nhận vật lý chân thực.",
    project_context_en: "Designing a tactile, minimalist presentation for VOID Studio's new collection, conveying the authentic physical sense of raw fibers and slow human movement.",
    creative_goal_vi: "Tập trung vào tính nhất quán của chất liệu dệt may thủ công dưới chuyển động chậm để tăng cường trải nghiệm giác quan gián tiếp.",
    creative_goal_en: "Inject sensory touch expectations through deliberate slow-motion micro-movements of active fabric layers.",
    editing_focus_vi: "Mạch cắt được đồng bộ chính xác với âm thanh ma sát thực tế của chất liệu len nhung, linen thô, hạn chế tối đa các chuyển cảnh động để hướng mắt nhìn tập trung hoàn toàn vào thớ vải.",
    editing_focus_en: "Visual sequences are tightly bound to the raw mechanical sounds of fabric rubbing. Minimized artificial camera action to protect visual consistency.",
    deliverables_vi: "Bản dựng Master 4K ProRes, Trục màu đặc thù thương hiệu VOID, Bộ lưu trữ âm thanh xúc giác.",
    deliverables_en: "Master 4K ProRes Video, Custom Brand Color Palette profiles, Tactile audio elements loop.",
    color_pipeline: "Davinci Wide Gamut Intermediate to Rec.709",
    aspect_ratio: "1.85:1 Academy Standard",
    credits: "Đạo diễn sáng tạo: Marcus Vance / Người mẫu: Elena Rostova",
    sort_order: 2
  },
  {
    slug: "voice-of-the-sculptor",
    published: true,
    featured: false,
    title_vi: "TIẾNG ĐỤC CỦA ĐÁ",
    title_en: "VOICE OF THE SCULPTOR",
    year: "2024",
    category: "Chân dung",
    tags: ["Chân dung", "Nghệ thuật", "Truyền thống"],
    client: "Tinos Heritage Fund",
    platform: "Vimeo",
    youtube_url: "",
    vimeo_url: "https://player.vimeo.com/video/224288968",
    thumbnail_mode: "custom",
    thumbnail_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1200",
    thumbnail_time: "",
    runtime: "08:50",
    role_vi: "Biên tập viên & Đồng đạo diễn",
    role_en: "Editor & Co-Director",
    focus_vi: "Trung thực, kiên nhẫn, mộc mạc",
    focus_en: "Honest, calm, patient",
    short_desc_vi: "Ghi nhận cận cảnh hành trình làm việc và đối chất tự thân kiên cường của một lão nghệ nhân chạm khắc đá tám mươi tuổi tại đảo địa Trung Hải.",
    short_desc_en: "An intimate portrait of an eighty-year-old stonecutter on Greece. Minimizes editorial interference to let the physical efforts speak.",
    project_context_vi: "Ghi lại chân dung về một nghệ nhân điêu khắc đá sống cô độc trên đảo Tinos Hy Lạp. Dự án lưu trữ nhịp độ lao động mài mòn theo năm tháng.",
    project_context_en: "Capturing an intimate portrait of an eighty-year-old traditional stonecutter living on the Greek island of Tinos.",
    creative_goal_vi: "Khám phá bản chất của sự kiên nhẫn bướng bỉnh thông qua tiếng gõ đục thô sơ mộc mạc lặp lại trên đá cẩm thạch trắng.",
    creative_goal_en: "Explore the primal spirit of persistent patience by treating rhythmic stone-sculpting acoustics as a narrative anchor.",
    editing_focus_vi: "Giới hạn biên mức cắt cảnh ở mức tối đa. Giữ trọn vẹn những cảnh quay tĩnh bám theo hành vi gõ đục kéo dài liên tục, triệt tiêu sự dàn dựng giả tạo.",
    editing_focus_en: "Maximum shot length retention. Reserving stone-carving frames for more than 40 seconds straight without cuts to encourage contemplative attention.",
    deliverables_vi: "Thước phim Master trưng bày bảo tàng, Thư viện tư liệu hội thoại, Bản dựng nén chất lượng cao.",
    deliverables_en: "Museum High-Definition Exhibition Film, Sound-bite catalogs, Webmasters delivery sequence.",
    color_pipeline: "Arri Log-C to Kodak 2383 Film Emulation Print",
    aspect_ratio: "1.66:1 European Standard Wide",
    credits: "Đạo diễn: Duygital / Điều phối âm hưởng: Tinos Audio Group",
    sort_order: 3
  },
  {
    slug: "echoes-of-the-monsoon",
    published: true,
    featured: false,
    title_vi: "TIẾNG VỌNG MÙA MƯA",
    title_en: "ECHOES OF THE MONSOON",
    year: "2025",
    category: "Tiểu luận hình ảnh",
    tags: ["Tiểu luận", "Thiên nhiên", "Phi tuyến tính"],
    client: "Liên hoan phim độc lập Việt Nam",
    platform: "Vimeo",
    youtube_url: "",
    vimeo_url: "https://player.vimeo.com/video/812234042",
    thumbnail_mode: "custom",
    thumbnail_url: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&q=80&w=1200",
    thumbnail_time: "",
    runtime: "04:12",
    role_vi: "Biên tập viên dựng phim độc lập",
    role_en: "Editor & Assembler",
    focus_vi: "Không khí, tập trung, chân thực",
    focus_en: "Atmospheric, focused, real",
    short_desc_vi: "Tiểu luận phim suy tư bằng hình ảnh về trạng thái tĩnh tâm của những bản làng thôn dã miền Trung trong bầu khí quyển ngột ngạt chờ đợi giông bão về.",
    short_desc_en: "An audio-visual essay capturing the quiet, heavy atmosphere in a rural village awaiting the monsoon rain seasons.",
    project_context_vi: "Tiểu luận hình ảnh về sự chờ đợi thầm lặng vùng thôn dã miền Trung Việt Nam trước khi giông bão gió mùa ập tới. Trải dài từ cái tĩnh lặng oi nóng tới giông nổi.",
    project_context_en: "A visual essay on the quiet waiting patterns of Vietnamese villagers before the summer storm season arrives.",
    creative_goal_vi: "Đại diện hóa nhịp điệu hồi hộp vô ngôn của không gian nông nghiệp cổ sơ qua các điểm tụ hình thể và tiếng gió sấm tích tụ.",
    creative_goal_en: "Symbolize silent rural waiting rhythms using physical landscape markers and rising acoustic winds.",
    editing_focus_vi: "Sử dụng lối dựng ghép song hành phi tuyến tính, kết nối các khung ảnh qua âm tiếng mưa rào rầm rì. Bản thân cảm xúc lớn dần không dùng nhạc bồi.",
    editing_focus_en: "Relying on non-linear juxtaposition. Visual transitions are triggered by micro-rumbles of distant water. No manipulative melodramatic scores.",
    deliverables_vi: "Bản Master âm thanh vòm Dolby Atmos, Thước phim phân giải gốc 4K, Sơ đồ trục thời gian rải đều.",
    deliverables_en: "Dolby Atmos Surround Master Format, native raw footage print, time-frame spreadsheet map.",
    color_pipeline: "REDWideGamut to Rec.709",
    aspect_ratio: "2.40:1 Scope widescreen",
    credits: "Âm thanh: Duygital / Thiết kế ánh sáng: Mai Nguyễn",
    sort_order: 4
  }
];

export const DEFAULT_PROJECTS: Project[] = RAW_PROJECTS.map(p => createDefaultProject(p, "vi"));

export const DEFAULT_PHILOSOPHY: PhilosophySnippet[] = [
  {
    id: "p1",
    quote: "A cut is a moment of punctuation. When you rush it, you disrupt the underlying message of the performance.",
    author: "Duygital",
    context: "Structural Balance Guide"
  },
  {
    id: "p2",
    quote: "Excessive transitions are distractions for insecure timelines. If the story transition isn't clear inside the shot, adding a warp effect won't fix it.",
    author: "Duygital",
    context: "Grounded Editing"
  },
  {
    id: "p3",
    quote: "Good sound design does more work than the eyes. Sound is the physical thread that binds different scenes together.",
    author: "Duygital",
    context: "Sound Integration"
  }
];

export const DEFAULT_ESSAYS: Essay[] = [
  {
    id: "editorial-breath-cut-is-a-lung",
    title: "The Editorial Breathe: Restoring Pace to Video Timelines",
    category: "Pacing",
    excerpt: "Modern editing trends move too fast. We cut on every single syllable to prevent the user from scrolling away, sacrificing structural clarity. Let's explore intentional pacing.",
    content: "The modern timeline is crowded with hasty cuts. We see content creators trim every single pause, wiping out the tiny gap of silence, the inhale, the micro-pause where human thoughts actually form. This is usually done in fear of the scrolled-away finger.\n\nBut film editing needs room to behave naturally. A cut is like a breath. It should occur when the emotional or informational value of the preceding shot has reached its natural conclusion. If we cut before that moment, we create unnecessary fatigue. If we cut too late, the momentum drops.\n\nTo edit with comfortable breathing room requires close observation of performance details: the shift in a physical posture, the natural termination of speech, or the ambient sound of the room. We must let scenes finish their true tasks before snapping the next frames into place.",
    readTime: "4 min read",
    date: "May 2026"
  },
  {
    id: "avoiding-the-dopamine-trap",
    title: "How to Build Focus on a Clean Video Timeline",
    category: "Philosophy",
    excerpt: "Powerful visual products work because of patience, excellent framing, and honest, steady layouts. Tips on avoiding clickbait editing trends.",
    content: "We live in an era of transition overloads—constant whip-zooms, synthetic assets, paper rips, and aggressive speed-ramps designed to hold short attention spans at all costs. This is not editing; it is visual distraction.\n\nWhen we look at the quiet elegance of modern documentaries or cinematic features, we are reminded of the true weight of a straight cut. A straight cut is an act of confidence. It signals that the content of the frame is so compelling, so resolved, that it requires no artificial transition to enter the next scene.\n\nTo build genuine tension, start by hiding the preset effects. Try to edit a short sequence using only clean straight cuts, J-cuts, and L-cuts. Rely entirely on human composition and deliberate sound layouts to guide the user. That is where real capability lives.",
    readTime: "5 min read",
    date: "Apr 2026"
  },
  {
    id: "sonic-blueprint-before-first-frame",
    title: "Creating the Sound Blueprint Before the First Cut",
    category: "Technical Art",
    excerpt: "Many editors treat audio as a final task, throwing raw music over locked footage. We establish spatial audio first so the edit has a physical heartbeat to follow.",
    content: "Sound is 70% of a film's quality, but it is often treated as plaster to fix visual cuts. Establishing sound early means building the auditory skeleton of a sequence before the final footage is aligned.\n\nWhen we edit, the natural background audio—the ticking of a wall clock, the hum of traffic, or subtle footsteps—tells us how long a shot should be. If we strip away these elements, the visual cuts often feel arbitrary.\n\nBuild temporary sound beds with clear field recordings. Set up the physical location through noise layers, align your cuts to those natural auditory triggers, and watch the visuals assemble with direct, organic logic.",
    readTime: "5 min read",
    date: "Mar 2026"
  }
];

export const DEFAULT_WORKFLOW: WorkflowStep[] = [
  {
    stepNumber: "01",
    title: "Consultation & Scope Definition",
    description: "We meet to outline your project goals, review your cinematic references, clarify the intended tone, list visual elements to avoid, and define how we want the audience to respond.",
    duration: "Week 1",
    deliverable: "The Tone Document & Avoid List"
  },
  {
    stepNumber: "02",
    title: "Acoustics & Sound Foundation",
    description: "Before locking visual timelines, we draft temporary audio tracks using select field recordings, ambient room tones, and rhythm references to establish sound continuity.",
    duration: "Weeks 1 - 2",
    deliverable: "Audio Scaffold Drafts"
  },
  {
    stepNumber: "03",
    title: "Visual Assembly & Sculpting",
    description: "We assemble your footage blocks, prioritizing pacing and readability. We avoid unnecessary transitions, focusing on the human performances and physical spaces.",
    duration: "Weeks 2 - 4",
    deliverable: "Rough Cut and Fine Assemblies"
  },
  {
    stepNumber: "04",
    title: "Timeline Simplification",
    description: "A rigorous clean-up phase. We analyze every transition to ensure it has a purpose, removing frames or tricks that don't directly move the narrative forward.",
    duration: "Week 4",
    deliverable: "Locked Timeline Print"
  },
  {
    stepNumber: "05",
    title: "Precision Color & Delivery",
    description: "Subtle, realistic color grading, fine audio mastering, and clean, high-contrast, modern graphic titles suited for premium distribution.",
    duration: "Week 5",
    deliverable: "Final Master Cinematic Files"
  }
];

export const DEFAULT_PRICING: PricingPlan[] = [
  {
    id: "coaching",
    name: "Structural Pacing Review",
    subtitle: "Professional review of existing cuts",
    price: "$1,850",
    description: "For directors or teams who have assembled a cut but find the pacing feels flat, flat, or lacks room to breathe.",
    features: [
      "Frame-by-frame structural timeline analysis",
      "Comprehensive review of audio pacing and transitions",
      "Detailed written feedback on cut extensions and silence slots",
      "Curated custom sound design recommendations"
    ],
    idealFor: "Documentary teams, short films, and indie directors looking for an objective, professional structural review."
  },
  {
    id: "commercial-narrative",
    name: "Boutique Project Edit",
    subtitle: "Pacing-driven corporate & brand films",
    price: "$6,500 / Project",
    description: "Full editorial assembly, sound design, and realistic color grading for high-end fashion, architectural, or commercial launch films.",
    features: [
      "Complete visual assembly from raw camera logs",
      "Custom audio layout (ambient room sound, realistic foley)",
      "Modern typographic design and custom subtitle layouts",
      "Exactly 3 clear, highly structured revision cycles",
      "Professional, realistic color grading"
    ],
    idealFor: "Design firms, slow-fashion labels, cultural collectives, and boutique commercial brands."
  },
  {
    id: "full-short-film",
    name: "Complete Editorial Partnership",
    subtitle: "Full-scale storytelling collaboration",
    price: "Custom Editorial Retainer",
    description: "Ongoing collaborative editing for narrative short films, visual essays, or indie documentaries with an emphasis on deliberate visual storytelling.",
    features: [
      "Early pre-production consultation (pacing strategies, audio logs)",
      "Comprehensive multi-week editorial and structural molding",
      "Advanced sound mixing and realistic color grading profiles",
      "Hands-on collaboration with the directory team",
      "Typographic and titles styling matching modern standards"
    ],
    idealFor: "Independent filmmakers, agency directors, and artists seeking a long-term professional editing partner."
  }
];

export const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote: "Duygital is a rarity in post-production. He doesn't look for flashy shortcuts; he edits with deep respect for the script, character, and underlying rhythm.",
    clientName: "Sofia Karas",
    clientRole: "Director",
    projectTitle: "In Between Cold Walls"
  },
  {
    id: "t2",
    quote: "He saved our launch video. The original edit felt hyperactive and noisy. Duygital focused on calm pacing, highlighted natural fabric movements, and turned noise into deliberate quality.",
    clientName: "Marcus Vance",
    clientRole: "Creative Director",
    projectTitle: "VOID Studio Cashmere Campaign"
  }
];

export const DEFAULT_FAQ: FAQ[] = [
  {
    id: "faq1",
    question: "Why do you refuse hyperactive or clickbait 'dopamine' edits?",
    answer: "Hyperactive edits (cutting every single second, flashing assets, extreme speed-ramping) are designed to hijack short attention spans, often for immediate product promotion in saturated feeds. They treat viewers purely as chemical triggers. True visual design respects user intelligence, relying on emotion, pacing, and clear narratives to engage. We choose focus over distraction.",
    category: "Philosophy"
  },
  {
    id: "faq2",
    question: "Do you offer unlimited revisions?",
    answer: "No. Unlimited revisions suggest a lack of clear planning. We offer three deliberate revision stages where we walk through the cuts together, scrutinize the timeline structure, and match visual goals directly. This ensures efficiency and respects both of our schedules.",
    category: "Workflow"
  },
  {
    id: "faq3",
    question: "How does the Google Sheets CMS integration work?",
    answer: "To keep this portfolio fully customizable without writing code, you can publish a Google Sheet to the web as a CSV and link its ID in the CMS settings panel. The website will automatically fetch and render your latest projects, pricing, essays, and FAQ options on the fly.",
    category: "Technical"
  }
];

// Helper to parse CSV data safely
function parseCSV(csvText: string): any[] {
  const lines: string[] = [];
  let currentLine = "";
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === '\n' && !inQuotes) {
      lines.push(currentLine);
      currentLine = "";
    } else if (char === '\r' && !inQuotes) {
      if (nextChar === '\n') {
        lines.push(currentLine);
        currentLine = "";
        i++; // skip next char
      } else {
        lines.push(currentLine);
        currentLine = "";
      }
    } else {
      currentLine += char;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }

  if (lines.length < 2) return [];

  const headers = lines[0].split(",").map(h => h.trim().replace(/^"|"$/g, ''));
  const results = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;

    const row: string[] = [];
    let currentCell = "";
    let cellInQuotes = false;

    for (let j = 0; j < line.length; j++) {
      const c = line[j];
      if (c === '"') {
        cellInQuotes = !cellInQuotes;
      } else if (c === ',' && !cellInQuotes) {
        row.push(currentCell.trim().replace(/^"|"$/g, ''));
        currentCell = "";
      } else {
        currentCell += c;
      }
    }
    row.push(currentCell.trim().replace(/^"|"$/g, ''));

    const obj: any = {};
    headers.forEach((header, index) => {
      let val = row[index] || "";
      // Handle array split if header is 'tags' or 'features'
      if (header === 'tags' || header === 'features') {
        obj[header] = val ? val.split(";").map(t => t.trim()) : [];
      } else {
        obj[header] = val;
      }
    });
    results.push(obj);
  }

  return results;
}

// Fetch from published sheet
export async function fetchSheetCSV(sheetUrl: string): Promise<any[]> {
  try {
    const response = await fetch(sheetUrl);
    if (!response.ok) throw new Error("Google Sheets CSV response was not ok");
    const text = await response.text();
    return parseCSV(text);
  } catch (error) {
    console.error("Failed to fetch published Google Sheet CSV:", error);
    throw error;
  }
}

// Extract Spreadsheet ID from Google Sheet URL
export function extractSpreadsheetId(url: string): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  // If it's already a 44-character spreadsheet ID
  if (/^[a-zA-Z0-9-_]{40,50}$/.test(trimmed)) {
    return trimmed;
  }
  const match = trimmed.match(/\/d\/([a-zA-Z0-9-_]{40,50})/);
  return match ? match[1] : null;
}

// Helper to look up keys based on locale with graceful fallbacks
function getLocaleValue(row: any, keys: string[], language: "en" | "vi"): string {
  // 1. Try key WITH language suffix first (e.g. title_vi, title_en)
  for (const k of keys) {
    const localizedKey = `${k}_${language}`;
    if (row[localizedKey] !== undefined && row[localizedKey] !== null && String(row[localizedKey]).trim() !== "") {
      return String(row[localizedKey]).trim();
    }
    const localizedKeyLower = `${k.toLowerCase()}_${language}`;
    if (row[localizedKeyLower] !== undefined && row[localizedKeyLower] !== null && String(row[localizedKeyLower]).trim() !== "") {
      return String(row[localizedKeyLower]).trim();
    }
  }
  // 2. Try the other language suffix if the target is completely blank but the other key exists
  const fallbackLang = language === "en" ? "vi" : "en";
  for (const k of keys) {
    const localizedKey = `${k}_${fallbackLang}`;
    if (row[localizedKey] !== undefined && row[localizedKey] !== null && String(row[localizedKey]).trim() !== "") {
      return String(row[localizedKey]).trim();
    }
    const localizedKeyLower = `${k.toLowerCase()}_${fallbackLang}`;
    if (row[localizedKeyLower] !== undefined && row[localizedKeyLower] !== null && String(row[localizedKeyLower]).trim() !== "") {
      return String(row[localizedKeyLower]).trim();
    }
  }
  // 3. Try key without suffix
  for (const k of keys) {
    if (row[k] !== undefined && row[k] !== null && String(row[k]).trim() !== "") {
      return String(row[k]).trim();
    }
    const lowerK = k.toLowerCase();
    if (row[lowerK] !== undefined && row[lowerK] !== null && String(row[lowerK]).trim() !== "") {
      return String(row[lowerK]).trim();
    }
  }
  return "";
}

function getRowValue(row: any, key: string): string {
  if (!row) return "";
  if (row[key] !== undefined && row[key] !== null) {
    return String(row[key]).trim();
  }
  const lowerKey = key.toLowerCase();
  for (const k of Object.keys(row)) {
    if (k.toLowerCase() === lowerKey) {
      return String(row[k]).trim();
    }
  }
  return "";
}

// Map parsed tab records into verified Projects array with error resilience and bilingual support
export function parseProjects(rows: any[], language: "en" | "vi"): Project[] {
  const fallbacks = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&q=80&w=1200"
  ];

  return rows
    .filter((row) => {
      const slug = (getRowValue(row, "slug") || getRowValue(row, "id") || "").trim();
      const titleVi = (getRowValue(row, "title_vi") || "").trim();
      const titleEn = (getRowValue(row, "title_en") || "").trim();
      if (!slug && !titleVi && !titleEn) return false;

      // Handle published column configuration
      const publishedVal = getRowValue(row, "published").toLowerCase();
      if (publishedVal === "false" || publishedVal === "no" || publishedVal === "0" || publishedVal === "hidden" || publishedVal === "draft") {
        return false;
      }
      return true;
    })
    .map((row, idx) => {
      const slug = (getRowValue(row, "slug") || getRowValue(row, "id") || `project-${idx}`).trim();
      const published = true;
      const featuredVal = getRowValue(row, "featured").toLowerCase();
      const featured = featuredVal === "true" || featuredVal === "yes" || featuredVal === "1" || featuredVal === "featured";

      const title_vi = getRowValue(row, "title_vi") || getRowValue(row, "title") || "";
      const title_en = getRowValue(row, "title_en") || getRowValue(row, "title") || "";

      const year = getRowValue(row, "year") || "";
      const category = getRowValue(row, "category") || "";
      
      const rawTags = getRowValue(row, "tags");
      const tags = rawTags
        ? rawTags.split(/[;,]/).map((t: string) => t.trim()).filter(Boolean)
        : [];

      const client = getRowValue(row, "client") || "";
      const platform = getRowValue(row, "platform") || "";
      const youtube_url = getRowValue(row, "youtube_url") || getRowValue(row, "youtubeurl") || "";
      const vimeo_url = getRowValue(row, "vimeo_url") || getRowValue(row, "vimeourl") || "";
      const thumbnail_mode = getRowValue(row, "thumbnail_mode") || "";
      const thumbnail_url = getRowValue(row, "thumbnail_url") || "";
      const thumbnail_time = getRowValue(row, "thumbnail_time") || "";
      const runtime = getRowValue(row, "runtime") || getRowValue(row, "duration") || "";

      const role_vi = getRowValue(row, "role_vi") || getRowValue(row, "role") || "";
      const role_en = getRowValue(row, "role_en") || getRowValue(row, "role") || "";

      const focus_vi = getRowValue(row, "focus_vi") || getRowValue(row, "feeling") || "";
      const focus_en = getRowValue(row, "focus_en") || getRowValue(row, "feeling") || "";

      const short_desc_vi = getRowValue(row, "short_desc_vi") || getRowValue(row, "description") || "";
      const short_desc_en = getRowValue(row, "short_desc_en") || getRowValue(row, "description") || "";

      const project_context_vi = getRowValue(row, "project_context_vi") || "";
      const project_context_en = getRowValue(row, "project_context_en") || "";

      const creative_goal_vi = getRowValue(row, "creative_goal_vi") || "";
      const creative_goal_en = getRowValue(row, "creative_goal_en") || "";

      const editing_focus_vi = getRowValue(row, "editing_focus_vi") || "";
      const editing_focus_en = getRowValue(row, "editing_focus_en") || "";

      const deliverables_vi = getRowValue(row, "deliverables_vi") || "";
      const deliverables_en = getRowValue(row, "deliverables_en") || "";

      const color_pipeline = getRowValue(row, "color_pipeline") || "";
      const aspect_ratio = getRowValue(row, "aspect_ratio") || "";
      const credits = getRowValue(row, "credits") || "";
      const sort_order = parseInt(getRowValue(row, "sort_order") || "100", 10) || 100;

      // Local translation resolution helper: prior Vietnamese first globally
      const isVi = language === "vi";
      const title = isVi ? title_vi : title_en;
      const role = isVi ? role_vi : role_en;
      const focus = isVi ? focus_vi : focus_en;
      const short_desc = (isVi ? short_desc_vi : short_desc_en) || short_desc_vi || short_desc_en;
      const project_context = (isVi ? project_context_vi : project_context_en) || project_context_vi || project_context_en;
      const creative_goal = (isVi ? creative_goal_vi : creative_goal_en) || creative_goal_vi || creative_goal_en;
      const editing_focus = (isVi ? editing_focus_vi : editing_focus_en) || editing_focus_vi || editing_focus_en;
      const deliverables = (isVi ? deliverables_vi : deliverables_en) || deliverables_vi || deliverables_en;

      // Extract resolved thumbnail URL based on the selected mode:
      let finalThumbnail = thumbnail_url;
      const mode = thumbnail_mode.toLowerCase().trim();
      const ytId = getYouTubeId(youtube_url);
      
      if (mode === "youtube" && ytId) {
        finalThumbnail = `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`;
      } else if (mode === "timestamp") {
        if (ytId) {
          const seconds = parseTimeToSeconds(thumbnail_time);
          if (seconds <= 30) {
            finalThumbnail = `https://img.youtube.com/vi/${ytId}/1.jpg`;
          } else if (seconds <= 90) {
            finalThumbnail = `https://img.youtube.com/vi/${ytId}/2.jpg`;
          } else {
            finalThumbnail = `https://img.youtube.com/vi/${ytId}/3.jpg`;
          }
        } else {
          finalThumbnail = thumbnail_url;
        }
      } else if (mode === "custom") {
        finalThumbnail = thumbnail_url;
      } else {
        if (ytId) {
          finalThumbnail = `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`;
        } else {
          finalThumbnail = thumbnail_url;
        }
      }

      // Default Unsplash fallbacks if somehow it remains empty:
      if (!finalThumbnail) {
        finalThumbnail = fallbacks[idx % fallbacks.length];
      }

      return {
        id: slug,
        slug,
        published,
        featured,
        title_vi,
        title_en,
        year,
        category,
        tags,
        client,
        platform,
        youtube_url,
        vimeo_url,
        thumbnail_mode,
        thumbnail_url: finalThumbnail,
        thumbnail_time,
        runtime,
        role_vi,
        role_en,
        focus_vi,
        focus_en,
        short_desc_vi,
        short_desc_en,
        project_context_vi,
        project_context_en,
        creative_goal_vi,
        creative_goal_en,
        editing_focus_vi,
        editing_focus_en,
        deliverables_vi,
        deliverables_en,
        color_pipeline,
        aspect_ratio,
        credits,
        sort_order,
        title,
        role,
        focus,
        short_desc,
        project_context,
        creative_goal,
        editing_focus,
        deliverables
      };
    })
    .sort((a, b) => a.sort_order - b.sort_order);
}

// Map parsed tab records into PricingPlan array
export function parsePricing(rows: any[], language: "en" | "vi"): PricingPlan[] {
  return rows
    .filter((row) => {
      const id = (row.id || row.ID || "").trim();
      const name = (row.name || row.name_en || row.name_vi || row.Name || "").trim();
      return id || name;
    })
    .map((row, idx) => {
      const id = (row.id || row.ID || `pricing-${idx}`).trim();
      const name = getLocaleValue(row, ["name", "Name"], language) || "Standard Tier";
      const subtitle = getLocaleValue(row, ["subtitle", "Subtitle"], language) || "Rates detail";
      const price = String(row.price || row.Price || "Custom Quote").trim();
      const description = getLocaleValue(row, ["description", "Description"], language) || "Details of cooperation";
      
      const rawFeatures = getLocaleValue(row, ["features", "Features"], language);
      const features = rawFeatures
        ? rawFeatures.split(/[;|]/).map((f: string) => f.trim()).filter(Boolean)
        : [];

      const idealFor = getLocaleValue(row, ["idealFor", "idealfor", "IdealFor"], language) || "Creative partners";

      return {
        id,
        name,
        subtitle,
        price,
        description,
        features,
        idealFor,
      };
    });
}

// Map parsed tab records into FAQ array
export function parseFaq(rows: any[], language: "en" | "vi"): FAQ[] {
  return rows
    .filter((row) => {
      const q = (row.question || row.question_en || row.question_vi || row.Question || "").trim();
      return q;
    })
    .map((row, idx) => {
      const id = (row.id || row.ID || `faq-${idx}`).trim();
      const question = getLocaleValue(row, ["question", "Question"], language);
      const answer = getLocaleValue(row, ["answer", "Answer"], language);
      const category = getLocaleValue(row, ["category", "Category"], language) || "Technical";

      return {
        id,
        question,
        answer,
        category,
      };
    });
}

// Map parsed tab records into WorkflowStep array
export function parseWorkflow(rows: any[], language: "en" | "vi"): WorkflowStep[] {
  return rows
    .filter((row) => {
      const step = (row.stepNumber || row.stepnumber || row.StepNumber || "").trim();
      const title = (row.title || row.title_en || row.title_vi || row.Title || "").trim();
      return step || title;
    })
    .map((row, idx) => {
      const stepNumber = String(row.stepNumber || row.stepnumber || row.StepNumber || `0${idx + 1}`).trim();
      const title = getLocaleValue(row, ["title", "Title"], language) || "Project Stage";
      const description = getLocaleValue(row, ["description", "Description"], language) || "Story Details";
      const duration = getLocaleValue(row, ["duration", "Duration"], language) || "Week 1";
      const deliverable = getLocaleValue(row, ["deliverable", "Deliverable"], language) || "Milestone";

      return {
        stepNumber,
        title,
        description,
        duration,
        deliverable,
      };
    });
}

export interface SheetsData {
  projects?: any[];
  pricing?: any[];
  faq?: any[];
  workflow?: any[];
  labels?: any[];
}

// Core multi-tab fetcher fetching single CSV tab via Google Visualization Query API
export async function fetchTabCSV(spreadsheetId: string, tabName: string): Promise<any[]> {
  const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tabName)}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Google Sheets tab '${tabName}' response was not ok`);
  const text = await response.text();
  return parseCSV(text);
}

// Primary portal loader that triggers searches on projects, pricing, faq, and workflow tabs
export async function fetchSpreadsheetTabs(spreadsheetUrl: string): Promise<SheetsData> {
  const spreadsheetId = extractSpreadsheetId(spreadsheetUrl);
  if (!spreadsheetId) {
    throw new Error("Invalid Google Sheets URL or ID format.");
  }

  const result: SheetsData = {};

  // Fetch projects tab
  try {
    const raw = await fetchTabCSV(spreadsheetId, "projects");
    if (raw && raw.length > 0) result.projects = raw;
  } catch (err) {
    console.warn("Could not fetch 'projects' tab, falling back to local defaults:", err);
  }

  // Fetch pricing tab
  try {
    const raw = await fetchTabCSV(spreadsheetId, "pricing");
    if (raw && raw.length > 0) result.pricing = raw;
  } catch (err) {
    console.warn("Could not fetch 'pricing' tab, falling back to local defaults:", err);
  }

  // Fetch faq tab
  try {
    const raw = await fetchTabCSV(spreadsheetId, "faq");
    if (raw && raw.length > 0) result.faq = raw;
  } catch (err) {
    console.warn("Could not fetch 'faq' tab, falling back to local defaults:", err);
  }

  // Fetch workflow tab
  try {
    const raw = await fetchTabCSV(spreadsheetId, "workflow");
    if (raw && raw.length > 0) result.workflow = raw;
  } catch (err) {
    console.warn("Could not fetch 'workflow' tab, falling back to local defaults:", err);
  }

  // Fetch labels tab
  try {
    const raw = await fetchTabCSV(spreadsheetId, "labels");
    if (raw && raw.length > 0) result.labels = raw;
  } catch (err) {
    console.warn("Could not fetch 'labels' tab, falling back to local defaults:", err);
  }

  return result;
}
