import type { Locale } from "@/i18n";
import { media } from "./media";

type L10n = Record<Locale, string>;
type L10nList = Record<Locale, string[]>;

export type Project = {
  slug: string;
  status: "done" | "upcoming";
  cover: string;
  coverAlt: L10n;
  title: L10n;
  summary: L10n;
  location: L10n;
  period: L10n;
  context: L10n;
  problem: L10n;
  objectives: L10nList;
  beneficiaries: L10n;
  activities: L10nList;
  results: L10n;
  partners: L10n;
  gallery: { src: string; alt: L10n }[];
};

export const projects: Project[] = [
  {
    slug: "vaccination-des-vidangeurs",
    status: "done",
    cover: media.vidangeTruck,
    coverAlt: {
      fr: "Photo de projet d'assainissement : camion de vidange sur un site de dépotage",
      ar: "صورة مشروع إصحاح: شاحنة تفريغ في موقع التفريغ",
      en: "Sanitation project photo: emptying truck at a discharge site",
    },
    title: {
      fr: "Vaccination des vidangeurs",
      ar: "تلقيح عمال التفريغ",
      en: "Vaccination of sanitation workers",
    },
    summary: {
      fr: "[Provisoire] Campagne de vaccination et de protection sanitaire destinée aux travailleurs de la vidange.",
      ar: "[مؤقت] حملة تلقيح وحماية صحية لفائدة عمال التفريغ.",
      en: "[Placeholder] Vaccination and health-protection campaign for emptying workers.",
    },
    location: { fr: "Nouakchott, Mauritanie", ar: "نواكشوط، موريتانيا", en: "Nouakchott, Mauritania" },
    period: { fr: "[Provisoire] 2024", ar: "[مؤقت] 2024", en: "[Placeholder] 2024" },
    context: {
      fr: "[Provisoire] Les vidangeurs manipulent quotidiennement des boues fécales sans couverture vaccinale systématique.",
      ar: "[مؤقت] يتعامل عمال التفريغ يومياً مع الحمأة دون تغطية تلقيحية منهجية.",
      en: "[Placeholder] Emptying workers handle faecal sludge daily without systematic vaccination coverage.",
    },
    problem: {
      fr: "[Provisoire] Forte exposition aux hépatites, au tétanos et aux infections gastro-intestinales.",
      ar: "[مؤقت] تعرض مرتفع للالتهاب الكبدي والكزاز والأمراض المعوية.",
      en: "[Placeholder] High exposure to hepatitis, tetanus and gastro-intestinal infections.",
    },
    objectives: {
      fr: [
        "Vacciner les travailleurs recensés",
        "Distribuer des équipements de protection",
        "Créer un registre sanitaire de suivi",
      ],
      ar: ["تلقيح العاملين المسجلين", "توزيع وسائل الحماية", "إنشاء سجل صحي للمتابعة"],
      en: [
        "Vaccinate registered workers",
        "Distribute protective equipment",
        "Create a health follow-up registry",
      ],
    },
    beneficiaries: {
      fr: "[Provisoire] 350 vidangeurs et leurs familles",
      ar: "[مؤقت] 350 عامل تفريغ وأسرهم",
      en: "[Placeholder] 350 emptying workers and their families",
    },
    activities: {
      fr: ["Recensement des travailleurs", "Séances de vaccination", "Ateliers d'hygiène"],
      ar: ["إحصاء العاملين", "جلسات التلقيح", "ورشات النظافة"],
      en: ["Worker census", "Vaccination sessions", "Hygiene workshops"],
    },
    results: {
      fr: "[Provisoire] Couverture vaccinale largement améliorée et baisse des arrêts de travail signalés.",
      ar: "[مؤقت] تحسن كبير في التغطية التلقيحية وانخفاض التوقفات عن العمل.",
      en: "[Placeholder] Substantially improved vaccination coverage and fewer reported work stoppages.",
    },
    partners: {
      fr: "[Provisoire] Ministère de la Santé, commune partenaire, ONG technique",
      ar: "[مؤقت] وزارة الصحة، بلدية شريكة، منظمة تقنية",
      en: "[Placeholder] Ministry of Health, partner municipality, technical NGO",
    },
    gallery: [
      {
        src: media.vidangeTruck,
        alt: {
          fr: "Photo d'équipe en action sur le site de dépotage",
          ar: "صورة الفريق أثناء العمل في موقع التفريغ",
          en: "Team at work on the discharge site",
        },
      },
      {
        src: media.cleanWater,
        alt: {
          fr: "Photo de sensibilisation à l'hygiène des mains",
          ar: "صورة توعية بنظافة اليدين",
          en: "Hand hygiene awareness photo",
        },
      },
    ],
  },
  {
    slug: "gestion-des-dechets-littoral",
    status: "upcoming",
    cover: media.beachWaste,
    coverAlt: {
      fr: "Photo de littoral pollué par des déchets plastiques",
      ar: "صورة ساحل ملوث بالنفايات البلاستيكية",
      en: "Coastline polluted with plastic waste",
    },
    title: {
      fr: "Gestion des déchets du littoral",
      ar: "تدبير نفايات الشريط الساحلي",
      en: "Coastal waste management",
    },
    summary: {
      fr: "[Provisoire] Nettoyage participatif et filière de tri sur les zones côtières.",
      ar: "[مؤقت] تنظيف تشاركي وسلسلة فرز في المناطق الساحلية.",
      en: "[Placeholder] Participatory clean-ups and a sorting stream in coastal areas.",
    },
    location: { fr: "Zone côtière", ar: "المنطقة الساحلية", en: "Coastal zone" },
    period: { fr: "[Provisoire] 2026", ar: "[مؤقت] 2026", en: "[Placeholder] 2026" },
    context: {
      fr: "[Provisoire] Accumulation de déchets solides sur les plages et sites de pêche.",
      ar: "[مؤقت] تراكم النفايات الصلبة على الشواطئ ومواقع الصيد.",
      en: "[Placeholder] Solid waste accumulating on beaches and fishing sites.",
    },
    problem: {
      fr: "[Provisoire] Risques sanitaires et dégradation des ressources halieutiques.",
      ar: "[مؤقت] مخاطر صحية وتدهور الموارد السمكية.",
      en: "[Placeholder] Health risks and degradation of fishery resources.",
    },
    objectives: {
      fr: ["Organiser des campagnes de collecte", "Installer des points de tri", "Former des comités locaux"],
      ar: ["تنظيم حملات جمع", "تركيب نقاط فرز", "تكوين لجان محلية"],
      en: ["Run collection campaigns", "Install sorting points", "Train local committees"],
    },
    beneficiaries: {
      fr: "[Provisoire] Communautés de pêcheurs et riverains",
      ar: "[مؤقت] مجتمعات الصيادين والسكان المجاورون",
      en: "[Placeholder] Fishing communities and nearby residents",
    },
    activities: {
      fr: ["Diagnostic des dépôts", "Journées de nettoyage", "Éducation environnementale"],
      ar: ["تشخيص نقاط التراكم", "أيام تنظيف", "تربية بيئية"],
      en: ["Waste hotspot mapping", "Clean-up days", "Environmental education"],
    },
    results: {
      fr: "[Provisoire] Résultats attendus à définir avec les partenaires.",
      ar: "[مؤقت] النتائج المتوقعة ستحدد مع الشركاء.",
      en: "[Placeholder] Expected results to be defined with partners.",
    },
    partners: {
      fr: "[Provisoire] Partenaires en cours d'identification",
      ar: "[مؤقت] شركاء قيد التحديد",
      en: "[Placeholder] Partners being identified",
    },
    gallery: [
      {
        src: media.beachWaste,
        alt: {
          fr: "Photo de plage jonchée de déchets",
          ar: "صورة شاطئ مغطى بالنفايات",
          en: "Beach littered with waste",
        },
      },
    ],
  },
  {
    slug: "acces-eau-potable",
    status: "upcoming",
    cover: media.cleanWater,
    coverAlt: {
      fr: "Photo de mains sous un point d'eau potable",
      ar: "صورة أيدٍ تحت نقطة ماء صالح للشرب",
      en: "Hands under a safe water point",
    },
    title: {
      fr: "Accès à l'eau potable et hygiène",
      ar: "الولوج إلى الماء الصالح للشرب والنظافة",
      en: "Safe water access and hygiene",
    },
    summary: {
      fr: "[Provisoire] Points d'eau, stations de lavage des mains et éducation à l'hygiène en milieu scolaire.",
      ar: "[مؤقت] نقاط ماء ومحطات غسل الأيدي وتربية على النظافة في المدارس.",
      en: "[Placeholder] Water points, handwashing stations and school hygiene education.",
    },
    location: { fr: "[Provisoire] Zones périurbaines", ar: "[مؤقت] مناطق شبه حضرية", en: "[Placeholder] Peri-urban areas" },
    period: { fr: "[Provisoire] 2026–2027", ar: "[مؤقت] 2026–2027", en: "[Placeholder] 2026–2027" },
    context: {
      fr: "[Provisoire] Accès limité à l'eau potable dans plusieurs quartiers.",
      ar: "[مؤقت] ولوج محدود للماء الصالح للشرب في عدة أحياء.",
      en: "[Placeholder] Limited safe water access in several neighbourhoods.",
    },
    problem: {
      fr: "[Provisoire] Maladies hydriques récurrentes chez les enfants.",
      ar: "[مؤقت] أمراض مرتبطة بالماء متكررة لدى الأطفال.",
      en: "[Placeholder] Recurrent waterborne diseases among children.",
    },
    objectives: {
      fr: ["Équiper des écoles", "Former des clubs d'hygiène", "Suivre la qualité de l'eau"],
      ar: ["تجهيز المدارس", "تكوين نوادي النظافة", "متابعة جودة الماء"],
      en: ["Equip schools", "Set up hygiene clubs", "Monitor water quality"],
    },
    beneficiaries: {
      fr: "[Provisoire] Élèves, enseignants et familles",
      ar: "[مؤقت] التلاميذ والمدرسون والأسر",
      en: "[Placeholder] Pupils, teachers and families",
    },
    activities: {
      fr: ["Installation d'équipements", "Sessions pédagogiques", "Analyses périodiques"],
      ar: ["تركيب التجهيزات", "حصص بيداغوجية", "تحاليل دورية"],
      en: ["Equipment installation", "Teaching sessions", "Periodic testing"],
    },
    results: {
      fr: "[Provisoire] Indicateurs à définir.",
      ar: "[مؤقت] المؤشرات ستحدد لاحقاً.",
      en: "[Placeholder] Indicators to be defined.",
    },
    partners: {
      fr: "[Provisoire] Partenaires en cours d'identification",
      ar: "[مؤقت] شركاء قيد التحديد",
      en: "[Placeholder] Partners being identified",
    },
    gallery: [
      {
        src: media.cleanWater,
        alt: {
          fr: "Photo d'un point d'eau communautaire",
          ar: "صورة نقطة ماء جماعية",
          en: "Community water point",
        },
      },
    ],
  },
  {
    slug: "preservation-des-oasis",
    status: "upcoming",
    cover: media.oasis,
    coverAlt: {
      fr: "Photo d'oasis mauritanienne",
      ar: "صورة واحة موريتانية",
      en: "Mauritanian oasis",
    },
    title: {
      fr: "Préservation des oasis",
      ar: "الحفاظ على الواحات",
      en: "Oasis preservation",
    },
    summary: {
      fr: "[Provisoire] Protection des ressources en eau et assainissement écologique en milieu oasien.",
      ar: "[مؤقت] حماية الموارد المائية وإصحاح إيكولوجي في الواحات.",
      en: "[Placeholder] Water resource protection and ecological sanitation in oasis areas.",
    },
    location: { fr: "[Provisoire] Régions oasiennes", ar: "[مؤقت] مناطق الواحات", en: "[Placeholder] Oasis regions" },
    period: { fr: "[Provisoire] 2027", ar: "[مؤقت] 2027", en: "[Placeholder] 2027" },
    context: {
      fr: "[Provisoire] Pression croissante sur les nappes et les palmeraies.",
      ar: "[مؤقت] ضغط متزايد على المياه الجوفية وواحات النخيل.",
      en: "[Placeholder] Growing pressure on aquifers and palm groves.",
    },
    problem: {
      fr: "[Provisoire] Pollution diffuse et gestion insuffisante des eaux usées.",
      ar: "[مؤقت] تلوث منتشر وتدبير غير كافٍ للمياه العادمة.",
      en: "[Placeholder] Diffuse pollution and inadequate wastewater management.",
    },
    objectives: {
      fr: ["Protéger les points d'eau", "Promouvoir l'assainissement écologique", "Impliquer les coopératives"],
      ar: ["حماية نقاط الماء", "تعزيز الإصحاح الإيكولوجي", "إشراك التعاونيات"],
      en: ["Protect water points", "Promote ecological sanitation", "Involve cooperatives"],
    },
    beneficiaries: {
      fr: "[Provisoire] Populations oasiennes et agriculteurs",
      ar: "[مؤقت] سكان الواحات والمزارعون",
      en: "[Placeholder] Oasis populations and farmers",
    },
    activities: {
      fr: ["Études hydrologiques", "Démonstrations techniques", "Formation des coopératives"],
      ar: ["دراسات هيدرولوجية", "عروض تقنية", "تكوين التعاونيات"],
      en: ["Hydrological studies", "Technical demonstrations", "Cooperative training"],
    },
    results: {
      fr: "[Provisoire] Résultats attendus à définir.",
      ar: "[مؤقت] النتائج المتوقعة ستحدد لاحقاً.",
      en: "[Placeholder] Expected results to be defined.",
    },
    partners: {
      fr: "[Provisoire] Partenaires en cours d'identification",
      ar: "[مؤقت] شركاء قيد التحديد",
      en: "[Placeholder] Partners being identified",
    },
    gallery: [
      {
        src: media.oasis,
        alt: {
          fr: "Photo de palmeraie et plan d'eau",
          ar: "صورة واحة نخيل ومسطح مائي",
          en: "Palm grove and water body",
        },
      },
    ],
  },
];

export type NewsArticle = {
  slug: string;
  date: string;
  category: "institutionnel" | "terrain" | "formation";
  cover: string;
  title: L10n;
  excerpt: L10n;
  body: L10nList;
};

export const newsCategories: { key: NewsArticle["category"]; label: L10n }[] = [
  {
    key: "institutionnel",
    label: { fr: "Institutionnel", ar: "مؤسسي", en: "Institutional" },
  },
  { key: "terrain", label: { fr: "Terrain", ar: "ميداني", en: "Field" } },
  { key: "formation", label: { fr: "Formation", ar: "تكوين", en: "Training" } },
];

export const news: NewsArticle[] = [
  {
    slug: "campagne-vaccination-cloturee",
    date: "2026-06-12",
    category: "terrain",
    cover: media.vidangeTruck,
    title: {
      fr: "Clôture de la campagne de vaccination des vidangeurs",
      ar: "ختام حملة تلقيح عمال التفريغ",
      en: "Vaccination campaign for sanitation workers concludes",
    },
    excerpt: {
      fr: "[Provisoire] Bilan de la campagne menée avec les autorités sanitaires.",
      ar: "[مؤقت] حصيلة الحملة المنجزة مع السلطات الصحية.",
      en: "[Placeholder] Results of the campaign run with health authorities.",
    },
    body: {
      fr: [
        "[Texte provisoire] La campagne s'est déroulée sur plusieurs semaines dans les quartiers d'intervention.",
        "[Texte provisoire] Les équipes ont associé vaccination, distribution d'équipements et ateliers d'hygiène.",
      ],
      ar: [
        "[نص مؤقت] استمرت الحملة عدة أسابيع في أحياء التدخل.",
        "[نص مؤقت] جمعت الفرق بين التلقيح وتوزيع التجهيزات وورشات النظافة.",
      ],
      en: [
        "[Placeholder] The campaign ran over several weeks in the target neighbourhoods.",
        "[Placeholder] Teams combined vaccination, equipment distribution and hygiene workshops.",
      ],
    },
  },
  {
    slug: "nouveau-partenariat-institutionnel",
    date: "2026-04-03",
    category: "institutionnel",
    cover: media.oasis,
    title: {
      fr: "Nouveau partenariat institutionnel",
      ar: "شراكة مؤسسية جديدة",
      en: "New institutional partnership",
    },
    excerpt: {
      fr: "[Provisoire] Signature d'une convention de coopération technique.",
      ar: "[مؤقت] التوقيع على اتفاقية تعاون تقني.",
      en: "[Placeholder] A technical cooperation agreement has been signed.",
    },
    body: {
      fr: ["[Texte provisoire] Détails de la convention à publier après validation."],
      ar: ["[نص مؤقت] تفاصيل الاتفاقية ستنشر بعد المصادقة."],
      en: ["[Placeholder] Agreement details to be published after validation."],
    },
  },
  {
    slug: "session-formation-vidangeurs",
    date: "2026-02-18",
    category: "formation",
    cover: media.cleanWater,
    title: {
      fr: "Session de formation pour les opérateurs de vidange",
      ar: "دورة تكوينية لفائدة عمال التفريغ",
      en: "Training session for emptying operators",
    },
    excerpt: {
      fr: "[Provisoire] Trois jours de modules pratiques sur la sécurité au travail.",
      ar: "[مؤقت] ثلاثة أيام من الوحدات التطبيقية حول السلامة المهنية.",
      en: "[Placeholder] Three days of practical modules on workplace safety.",
    },
    body: {
      fr: ["[Texte provisoire] Programme et supports pédagogiques disponibles sur demande."],
      ar: ["[نص مؤقت] البرنامج والوسائط البيداغوجية متاحة عند الطلب."],
      en: ["[Placeholder] Programme and teaching materials available on request."],
    },
  },
];

export type GalleryItem = {
  src: string;
  category: "assainissement" | "sensibilisation" | "environnement";
  caption: L10n;
};

export const galleryCategories: { key: GalleryItem["category"]; label: L10n }[] = [
  {
    key: "assainissement",
    label: { fr: "Assainissement", ar: "الإصحاح", en: "Sanitation" },
  },
  {
    key: "sensibilisation",
    label: { fr: "Sensibilisation", ar: "التوعية", en: "Awareness" },
  },
  {
    key: "environnement",
    label: { fr: "Environnement", ar: "البيئة", en: "Environment" },
  },
];

export const gallery: GalleryItem[] = [
  {
    src: media.vidangeTruck,
    category: "assainissement",
    caption: {
      fr: "Photo d'équipe en action : vidange sur site de dépotage",
      ar: "صورة الفريق أثناء العمل: تفريغ في موقع مخصص",
      en: "Team at work: emptying at a discharge site",
    },
  },
  {
    src: media.cleanWater,
    category: "sensibilisation",
    caption: {
      fr: "Photo de sensibilisation : hygiène des mains et eau potable",
      ar: "صورة توعية: نظافة اليدين والماء الصالح للشرب",
      en: "Awareness photo: hand hygiene and safe water",
    },
  },
  {
    src: media.beachWaste,
    category: "environnement",
    caption: {
      fr: "Photo de littoral pollué avant campagne de nettoyage",
      ar: "صورة ساحل ملوث قبل حملة التنظيف",
      en: "Polluted coastline before a clean-up campaign",
    },
  },
  {
    src: media.oasis,
    category: "environnement",
    caption: {
      fr: "Photo d'oasis : ressource en eau à préserver",
      ar: "صورة واحة: موارد مائية تستحق الحماية",
      en: "Oasis: a water resource to protect",
    },
  },
];

export const partners: { name: L10n; type: L10n }[] = [
  {
    name: { fr: "Partenaire institutionnel 1", ar: "شريك مؤسسي 1", en: "Institutional partner 1" },
    type: { fr: "Ministère", ar: "وزارة", en: "Ministry" },
  },
  {
    name: { fr: "Partenaire institutionnel 2", ar: "شريك مؤسسي 2", en: "Institutional partner 2" },
    type: { fr: "Collectivité", ar: "جماعة محلية", en: "Local authority" },
  },
  {
    name: { fr: "Bailleur 1", ar: "ممول 1", en: "Donor 1" },
    type: { fr: "Coopération", ar: "تعاون", en: "Cooperation" },
  },
  {
    name: { fr: "ONG partenaire", ar: "منظمة شريكة", en: "Partner NGO" },
    type: { fr: "Société civile", ar: "مجتمع مدني", en: "Civil society" },
  },
  {
    name: { fr: "Université partenaire", ar: "جامعة شريكة", en: "Partner university" },
    type: { fr: "Recherche", ar: "بحث", en: "Research" },
  },
  {
    name: { fr: "Entreprise partenaire", ar: "مؤسسة شريكة", en: "Partner company" },
    type: { fr: "Secteur privé", ar: "قطاع خاص", en: "Private sector" },
  },
];

export const contactInfo = {
  phone: "+222 00 00 00 00",
  email: "contact@amaa.mr",
  whatsapp: "22200000000",
};

export function t(value: L10n | string[] | Record<Locale, string[]>, locale: Locale) {
  return (value as Record<Locale, string | string[]>)[locale];
}
