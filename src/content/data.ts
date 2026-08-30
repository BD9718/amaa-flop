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
      fr: "Camion de vidange en opération sur un site de dépotage à Nouakchott",
      ar: "شاحنة تفريغ أثناء العمل في موقع تفريغ بنواكشوط",
      en: "Emptying truck in operation at a discharge site in Nouakchott",
    },
    title: {
      fr: "Vaccination des vidangeurs",
      ar: "تلقيح عمال التفريغ",
      en: "Vaccination of sanitation workers",
    },
    summary: {
      fr: "Campagne de vaccination et de protection sanitaire destinée aux travailleurs de la vidange, conduite avec les autorités sanitaires.",
      ar: "حملة تلقيح وحماية صحية لفائدة عمال التفريغ، أُنجزت بالتنسيق مع السلطات الصحية.",
      en: "A vaccination and health-protection campaign for emptying workers, run with the health authorities.",
    },
    location: { fr: "Nouakchott, Mauritanie", ar: "نواكشوط، موريتانيا", en: "Nouakchott, Mauritania" },
    period: { fr: "2024", ar: "2024", en: "2024" },
    context: {
      fr: "Les vidangeurs manipulent quotidiennement des boues fécales sans couverture vaccinale systématique ni équipement adapté.",
      ar: "يتعامل عمال التفريغ يومياً مع حمأة الصرف دون تغطية تلقيحية منهجية ولا تجهيزات ملائمة.",
      en: "Emptying workers handle faecal sludge daily, without systematic vaccination coverage or suitable equipment.",
    },
    problem: {
      fr: "Une exposition élevée aux hépatites, au tétanos et aux infections gastro-intestinales, avec des arrêts de travail fréquents.",
      ar: "تعرض مرتفع للالتهاب الكبدي والكزاز والأمراض المعوية، مع توقفات متكررة عن العمل.",
      en: "High exposure to hepatitis, tetanus and gastro-intestinal infections, leading to frequent work stoppages.",
    },
    objectives: {
      fr: [
        "Vacciner les travailleurs recensés",
        "Distribuer des équipements de protection individuelle",
        "Créer un registre sanitaire de suivi",
      ],
      ar: ["تلقيح العاملين المسجلين", "توزيع وسائل الحماية الفردية", "إنشاء سجل صحي للمتابعة"],
      en: [
        "Vaccinate registered workers",
        "Distribute personal protective equipment",
        "Create a health follow-up registry",
      ],
    },
    beneficiaries: {
      fr: "350 vidangeurs et leurs familles",
      ar: "350 عامل تفريغ وأسرهم",
      en: "350 emptying workers and their families",
    },
    activities: {
      fr: ["Recensement des travailleurs", "Séances de vaccination", "Ateliers d'hygiène et de sécurité"],
      ar: ["إحصاء العاملين", "جلسات التلقيح", "ورشات النظافة والسلامة"],
      en: ["Worker census", "Vaccination sessions", "Hygiene and safety workshops"],
    },
    results: {
      fr: "Une couverture vaccinale nettement améliorée, des équipements de protection distribués et une baisse des arrêts de travail signalés par les opérateurs.",
      ar: "تحسن واضح في التغطية التلقيحية، وتوزيع وسائل الحماية، وانخفاض التوقفات عن العمل التي أبلغ عنها المشغلون.",
      en: "Markedly improved vaccination coverage, protective equipment distributed, and fewer work stoppages reported by operators.",
    },
    partners: {
      fr: "Autorités sanitaires nationales, commune d'intervention et opérateurs privés de vidange",
      ar: "السلطات الصحية الوطنية، بلدية التدخل، ومشغلو التفريغ الخاصون",
      en: "National health authorities, the host municipality and private emptying operators",
    },
    gallery: [
      {
        src: media.vidangeTruck,
        alt: {
          fr: "Agents équipés lors d'une opération de vidange sur site de dépotage",
          ar: "أعوان مجهزون أثناء عملية تفريغ في موقع مخصص",
          en: "Equipped workers during an emptying operation at a discharge site",
        },
      },
      {
        src: media.cleanWater,
        alt: {
          fr: "Démonstration de lavage des mains lors d'un atelier d'hygiène",
          ar: "عرض لغسل الأيدي خلال ورشة نظافة",
          en: "Handwashing demonstration during a hygiene workshop",
        },
      },
    ],
  },
  {
    slug: "gestion-des-dechets-littoral",
    status: "upcoming",
    cover: media.beachWaste,
    coverAlt: {
      fr: "Littoral mauritanien couvert de bidons et de déchets plastiques",
      ar: "ساحل موريتاني مغطى بالبراميل والنفايات البلاستيكية",
      en: "Mauritanian coastline covered with containers and plastic waste",
    },
    title: {
      fr: "Gestion des déchets du littoral",
      ar: "تدبير نفايات الشريط الساحلي",
      en: "Coastal waste management",
    },
    summary: {
      fr: "Nettoyage participatif des plages et mise en place d'une filière de tri avec les communautés de pêcheurs.",
      ar: "تنظيف تشاركي للشواطئ وإرساء سلسلة فرز بمشاركة مجتمعات الصيادين.",
      en: "Participatory beach clean-ups and a waste sorting stream set up with fishing communities.",
    },
    location: { fr: "Zone côtière, Mauritanie", ar: "المنطقة الساحلية، موريتانيا", en: "Coastal zone, Mauritania" },
    period: { fr: "2026", ar: "2026", en: "2026" },
    context: {
      fr: "L'accumulation de déchets solides sur les plages et les sites de débarquement dégrade le cadre de vie et l'activité de pêche.",
      ar: "يؤدي تراكم النفايات الصلبة على الشواطئ ومواقع الإنزال إلى تدهور محيط الحياة ونشاط الصيد.",
      en: "Solid waste piling up on beaches and landing sites degrades living conditions and fishing activity.",
    },
    problem: {
      fr: "Risques sanitaires pour les riverains et dégradation des ressources halieutiques.",
      ar: "مخاطر صحية على السكان المجاورين وتدهور الموارد السمكية.",
      en: "Health risks for nearby residents and degradation of fishery resources.",
    },
    objectives: {
      fr: ["Organiser des campagnes de collecte", "Installer des points de tri", "Former des comités locaux de suivi"],
      ar: ["تنظيم حملات جمع", "تركيب نقاط فرز", "تكوين لجان محلية للمتابعة"],
      en: ["Run collection campaigns", "Install sorting points", "Train local monitoring committees"],
    },
    beneficiaries: {
      fr: "Communautés de pêcheurs, riverains et usagers du littoral",
      ar: "مجتمعات الصيادين والسكان المجاورون ومستخدمو الساحل",
      en: "Fishing communities, nearby residents and coastal users",
    },
    activities: {
      fr: ["Cartographie des dépôts sauvages", "Journées de nettoyage", "Éducation environnementale"],
      ar: ["رسم خريطة نقاط التراكم العشوائي", "أيام تنظيف", "تربية بيئية"],
      en: ["Mapping of illegal dumps", "Clean-up days", "Environmental education"],
    },
    results: {
      fr: "Objectif visé : des sites de débarquement assainis et un dispositif de tri géré durablement par les comités locaux.",
      ar: "الهدف المنشود: مواقع إنزال نظيفة ومنظومة فرز يديرها بشكل مستدام اللجان المحلية.",
      en: "Target outcome: clean landing sites and a sorting system sustainably managed by local committees.",
    },
    partners: {
      fr: "Collectivités côtières, coopératives de pêche et services de l'environnement",
      ar: "الجماعات الساحلية، تعاونيات الصيد، ومصالح البيئة",
      en: "Coastal authorities, fishing cooperatives and environmental services",
    },
    gallery: [
      {
        src: media.beachWaste,
        alt: {
          fr: "Plage jonchée de bidons plastiques avant campagne de nettoyage",
          ar: "شاطئ مغطى ببراميل بلاستيكية قبل حملة التنظيف",
          en: "Beach littered with plastic containers before a clean-up campaign",
        },
      },
    ],
  },
  {
    slug: "acces-eau-potable",
    status: "upcoming",
    cover: media.cleanWater,
    coverAlt: {
      fr: "Mains remplissant un bidon à un point d'eau potable",
      ar: "أيدٍ تملأ برميلاً من نقطة ماء صالح للشرب",
      en: "Hands filling a container at a safe water point",
    },
    title: {
      fr: "Accès à l'eau potable et hygiène",
      ar: "الولوج إلى الماء الصالح للشرب والنظافة",
      en: "Safe water access and hygiene",
    },
    summary: {
      fr: "Points d'eau, stations de lavage des mains et éducation à l'hygiène dans les écoles des quartiers périurbains.",
      ar: "نقاط ماء ومحطات لغسل الأيدي وتربية على النظافة في مدارس الأحياء شبه الحضرية.",
      en: "Water points, handwashing stations and hygiene education in peri-urban schools.",
    },
    location: { fr: "Quartiers périurbains de Nouakchott", ar: "أحياء شبه حضرية بنواكشوط", en: "Peri-urban districts of Nouakchott" },
    period: { fr: "2026–2027", ar: "2026–2027", en: "2026–2027" },
    context: {
      fr: "Plusieurs quartiers en forte croissance disposent d'un accès limité à l'eau potable et d'installations sanitaires insuffisantes.",
      ar: "تعاني عدة أحياء سريعة النمو من ولوج محدود للماء الصالح للشرب ومن نقص في التجهيزات الصحية.",
      en: "Several fast-growing districts have limited access to safe water and insufficient sanitation facilities.",
    },
    problem: {
      fr: "Maladies hydriques récurrentes chez les enfants et absentéisme scolaire associé.",
      ar: "أمراض مرتبطة بالماء متكررة لدى الأطفال وغياب مدرسي مرتبط بها.",
      en: "Recurrent waterborne diseases among children and related school absenteeism.",
    },
    objectives: {
      fr: ["Équiper les écoles en points d'eau", "Former des clubs d'hygiène", "Suivre la qualité de l'eau"],
      ar: ["تجهيز المدارس بنقاط ماء", "تكوين نوادي النظافة", "متابعة جودة الماء"],
      en: ["Equip schools with water points", "Set up hygiene clubs", "Monitor water quality"],
    },
    beneficiaries: {
      fr: "Élèves, enseignants et familles des quartiers ciblés",
      ar: "التلاميذ والمدرسون وأسر الأحياء المستهدفة",
      en: "Pupils, teachers and families in the target districts",
    },
    activities: {
      fr: ["Installation d'équipements", "Sessions pédagogiques", "Analyses périodiques de l'eau"],
      ar: ["تركيب التجهيزات", "حصص بيداغوجية", "تحاليل دورية للماء"],
      en: ["Equipment installation", "Teaching sessions", "Periodic water testing"],
    },
    results: {
      fr: "Objectif visé : des écoles équipées durablement et une baisse des maladies hydriques déclarées.",
      ar: "الهدف المنشود: مدارس مجهزة بشكل مستدام وانخفاض في الأمراض المرتبطة بالماء.",
      en: "Target outcome: sustainably equipped schools and a decline in reported waterborne illness.",
    },
    partners: {
      fr: "Directions régionales de l'éducation, services d'hydraulique et associations de parents d'élèves",
      ar: "المديريات الجهوية للتعليم، مصالح الهيدروليك، وجمعيات أولياء التلاميذ",
      en: "Regional education directorates, water services and parent-teacher associations",
    },
    gallery: [
      {
        src: media.cleanWater,
        alt: {
          fr: "Point d'eau communautaire utilisé par les habitants du quartier",
          ar: "نقطة ماء جماعية يستخدمها سكان الحي",
          en: "Community water point used by neighbourhood residents",
        },
      },
    ],
  },
  {
    slug: "preservation-des-oasis",
    status: "upcoming",
    cover: media.oasis,
    coverAlt: {
      fr: "Oasis mauritanienne : palmeraie et plan d'eau en bordure de dunes",
      ar: "واحة موريتانية: نخيل ومسطح مائي على حدود الكثبان",
      en: "Mauritanian oasis: palm grove and water body at the edge of the dunes",
    },
    title: {
      fr: "Préservation des oasis",
      ar: "الحفاظ على الواحات",
      en: "Oasis preservation",
    },
    summary: {
      fr: "Protection des ressources en eau et promotion d'un assainissement écologique en milieu oasien.",
      ar: "حماية الموارد المائية وتعزيز الإصحاح الإيكولوجي في الواحات.",
      en: "Protecting water resources and promoting ecological sanitation in oasis areas.",
    },
    location: { fr: "Régions oasiennes, Mauritanie", ar: "مناطق الواحات، موريتانيا", en: "Oasis regions, Mauritania" },
    period: { fr: "2027", ar: "2027", en: "2027" },
    context: {
      fr: "La pression sur les nappes et les palmeraies s'accentue, alors que les eaux usées sont rarement traitées.",
      ar: "يتزايد الضغط على المياه الجوفية وواحات النخيل، في حين تبقى المياه العادمة نادراً ما تُعالج.",
      en: "Pressure on aquifers and palm groves is increasing while wastewater is rarely treated.",
    },
    problem: {
      fr: "Pollution diffuse des points d'eau et gestion insuffisante des eaux usées domestiques.",
      ar: "تلوث منتشر لنقاط الماء وتدبير غير كافٍ للمياه العادمة المنزلية.",
      en: "Diffuse pollution of water points and inadequate management of domestic wastewater.",
    },
    objectives: {
      fr: ["Protéger les points d'eau", "Promouvoir l'assainissement écologique", "Impliquer les coopératives agricoles"],
      ar: ["حماية نقاط الماء", "تعزيز الإصحاح الإيكولوجي", "إشراك التعاونيات الزراعية"],
      en: ["Protect water points", "Promote ecological sanitation", "Involve farming cooperatives"],
    },
    beneficiaries: {
      fr: "Populations oasiennes, agriculteurs et coopératives",
      ar: "سكان الواحات والمزارعون والتعاونيات",
      en: "Oasis populations, farmers and cooperatives",
    },
    activities: {
      fr: ["Études hydrologiques", "Démonstrations techniques", "Formation des coopératives"],
      ar: ["دراسات هيدرولوجية", "عروض تقنية", "تكوين التعاونيات"],
      en: ["Hydrological studies", "Technical demonstrations", "Cooperative training"],
    },
    results: {
      fr: "Objectif visé : des points d'eau protégés et des dispositifs d'assainissement écologique répliqués par les coopératives.",
      ar: "الهدف المنشود: نقاط ماء محمية ومنظومات إصحاح إيكولوجي تعيد التعاونيات تطبيقها.",
      en: "Target outcome: protected water points and ecological sanitation systems replicated by cooperatives.",
    },
    partners: {
      fr: "Coopératives oasiennes, services de l'hydraulique et institutions de recherche",
      ar: "تعاونيات الواحات، مصالح الهيدروليك، ومؤسسات البحث",
      en: "Oasis cooperatives, water services and research institutions",
    },
    gallery: [
      {
        src: media.oasis,
        alt: {
          fr: "Palmeraie et plan d'eau à préserver en zone oasienne",
          ar: "نخيل ومسطح مائي يستحقان الحماية في منطقة واحات",
          en: "Palm grove and water body to be preserved in an oasis area",
        },
      },
    ],
  },
  {
    slug: "traitement-boues-vidange",
    status: "upcoming",
    cover: media.sludgeTreatment,
    coverAlt: {
      fr: "Vue aérienne d'un site de traitement des boues de vidange : bassins et lits de séchage",
      ar: "منظر جوي لموقع معالجة حمأة الصرف: أحواض وأسرّة تجفيف",
      en: "Aerial view of a faecal sludge treatment site: ponds and drying beds",
    },
    title: {
      fr: "Traitement des boues de vidange",
      ar: "معالجة حمأة الصرف",
      en: "Faecal sludge treatment",
    },
    summary: {
      fr: "Appui à la mise en place et au suivi de sites de traitement des boues de vidange : bassins, lits de séchage et contrôle qualité.",
      ar: "دعم إنشاء ومتابعة مواقع معالجة حمأة الصرف: الأحواض، أسرّة التجفيف، ومراقبة الجودة.",
      en: "Support for the development and monitoring of faecal sludge treatment sites: ponds, drying beds and quality control.",
    },
    location: { fr: "Nouakchott et communes périphériques, Mauritanie", ar: "نواكشوط والبلديات المجاورة، موريتانيا", en: "Nouakchott and surrounding municipalities, Mauritania" },
    period: { fr: "2026–2027", ar: "2026–2027", en: "2026–2027" },
    context: {
      fr: "Les boues collectées par les opérateurs de vidange sont trop souvent déversées sans traitement, au détriment de la santé publique et de l'environnement.",
      ar: "تُلقى الحمأة التي يجمعها مشغلو التفريغ غالباً دون معالجة، مما يضر بالصحة العامة والبيئة.",
      en: "Sludge collected by emptying operators is too often discharged untreated, harming public health and the environment.",
    },
    problem: {
      fr: "Absence d'infrastructures de traitement adaptées, risques de contamination des nappes et nuisances pour les populations riveraines.",
      ar: "غياب منشآت معالجة ملائمة، ومخاطر تلوث المياه الجوفية، وإزعاج للسكان المجاورين.",
      en: "Lack of suitable treatment infrastructure, risk of groundwater contamination and nuisance for nearby residents.",
    },
    objectives: {
      fr: [
        "Sécuriser les sites de dépotage et de traitement",
        "Suivre la qualité des boues traitées et des rejets",
        "Former les gestionnaires des installations",
      ],
      ar: ["تأمين مواقع التفريغ والمعالجة", "متابعة جودة الحمأة المعالجة والمياه المصروفة", "تكوين مدبّري المنشآت"],
      en: [
        "Secure discharge and treatment sites",
        "Monitor the quality of treated sludge and effluents",
        "Train facility managers",
      ],
    },
    beneficiaries: {
      fr: "Populations riveraines, opérateurs de vidange et collectivités",
      ar: "السكان المجاورون ومشغلو التفريغ والجماعات المحلية",
      en: "Nearby residents, emptying operators and local authorities",
    },
    activities: {
      fr: [
        "Diagnostic des sites existants",
        "Appui technique au dimensionnement des bassins et lits de séchage",
        "Mise en place d'un protocole de contrôle qualité",
      ],
      ar: ["تشخيص المواقع القائمة", "دعم تقني لتحديد أبعاد الأحواض وأسرّة التجفيف", "وضع بروتوكول لمراقبة الجودة"],
      en: [
        "Assessment of existing sites",
        "Technical support for pond and drying-bed sizing",
        "Introduction of a quality-control protocol",
      ],
    },
    results: {
      fr: "Objectif visé : des sites de traitement opérationnels, contrôlés et intégrés à la filière d'assainissement de Nouakchott.",
      ar: "الهدف المنشود: مواقع معالجة جاهزة للعمل وخاضعة للمراقبة ومدمجة في سلسلة الإصحاح بنواكشوط.",
      en: "Target outcome: operational, monitored treatment sites integrated into Nouakchott's sanitation chain.",
    },
    partners: {
      fr: "Services techniques de l'assainissement, communes concernées et opérateurs privés de vidange",
      ar: "المصالح التقنية للإصحاح، البلديات المعنية، ومشغلو التفريغ الخاصون",
      en: "Sanitation technical services, the municipalities concerned and private emptying operators",
    },
    gallery: [
      {
        src: media.sludgeTreatment,
        alt: {
          fr: "Bassins et lits de séchage d'un site de traitement des boues de vidange",
          ar: "أحواض وأسرّة تجفيف في موقع لمعالجة حمأة الصرف",
          en: "Ponds and drying beds at a faecal sludge treatment site",
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
      fr: "Bilan de la campagne menée avec les autorités sanitaires auprès des travailleurs de la vidange.",
      ar: "حصيلة الحملة المنجزة مع السلطات الصحية لفائدة عمال التفريغ.",
      en: "Results of the campaign conducted with the health authorities for emptying workers.",
    },
    body: {
      fr: [
        "La campagne de vaccination des travailleurs de la vidange s'est déroulée sur plusieurs semaines dans les quartiers d'intervention de l'AMAA, en coordination avec les autorités sanitaires et les communes concernées.",
        "Les équipes ont associé trois volets complémentaires : la vaccination des agents recensés, la distribution d'équipements de protection individuelle et des ateliers pratiques sur les gestes d'hygiène et la sécurité au travail.",
        "Les opérateurs partenaires signalent une baisse des arrêts de travail liés aux infections. Un registre sanitaire a été mis en place afin d'assurer le suivi des rappels vaccinaux.",
      ],
      ar: [
        "استمرت حملة تلقيح عمال التفريغ عدة أسابيع في أحياء تدخل الجمعية، بالتنسيق مع السلطات الصحية والبلديات المعنية.",
        "جمعت الفرق ثلاثة محاور متكاملة: تلقيح الأعوان المسجلين، وتوزيع وسائل الحماية الفردية، وورشات تطبيقية حول ممارسات النظافة والسلامة المهنية.",
        "يسجل المشغلون الشركاء انخفاضاً في التوقفات عن العمل المرتبطة بالإصابات. وقد أُنشئ سجل صحي لضمان متابعة الجرعات التذكيرية.",
      ],
      en: [
        "The vaccination campaign for emptying workers ran over several weeks in AMAA's intervention districts, in coordination with the health authorities and the municipalities involved.",
        "Teams combined three complementary components: vaccination of registered workers, distribution of personal protective equipment, and practical workshops on hygiene and occupational safety.",
        "Partner operators report fewer infection-related work stoppages. A health registry was set up to track booster doses.",
      ],
    },
  },
  {
    slug: "nouveau-partenariat-institutionnel",
    date: "2026-04-03",
    category: "institutionnel",
    cover: media.oasis,
    title: {
      fr: "Nouveau partenariat institutionnel pour l'assainissement",
      ar: "شراكة مؤسسية جديدة من أجل الإصحاح",
      en: "New institutional partnership for sanitation",
    },
    excerpt: {
      fr: "Signature d'une convention de coopération technique portant sur la gestion des boues de vidange.",
      ar: "التوقيع على اتفاقية تعاون تقني تتعلق بتدبير حمأة الصرف.",
      en: "A technical cooperation agreement on faecal sludge management has been signed.",
    },
    body: {
      fr: [
        "L'AMAA a signé une convention de coopération technique visant à renforcer la gestion des boues de vidange dans les zones urbaines à forte densité.",
        "La convention prévoit un appui au diagnostic des sites de dépotage, un accompagnement des opérateurs privés et la production de données de terrain utiles aux décisions publiques.",
        "Les premières activités conjointes portent sur la cartographie des flux de boues et sur la formation des agents municipaux chargés du contrôle.",
      ],
      ar: [
        "وقّعت الجمعية الموريتانية للإصحاح اتفاقية تعاون تقني تهدف إلى تعزيز تدبير حمأة الصرف في المناطق الحضرية الكثيفة السكان.",
        "تنص الاتفاقية على دعم تشخيص مواقع التفريغ، ومواكبة المشغلين الخاصين، وإنتاج بيانات ميدانية تفيد القرار العمومي.",
        "تتعلق الأنشطة المشتركة الأولى برسم خريطة تدفقات الحمأة وبتكوين أعوان البلديات المكلفين بالمراقبة.",
      ],
      en: [
        "AMAA has signed a technical cooperation agreement to strengthen faecal sludge management in densely populated urban areas.",
        "The agreement provides for support in assessing discharge sites, assistance to private operators, and the production of field data to inform public decisions.",
        "The first joint activities focus on mapping sludge flows and training municipal agents responsible for oversight.",
      ],
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
      fr: "Trois jours de modules pratiques consacrés à la sécurité au travail et à la prévention des risques.",
      ar: "ثلاثة أيام من الوحدات التطبيقية حول السلامة المهنية والوقاية من المخاطر.",
      en: "Three days of practical modules on occupational safety and risk prevention.",
    },
    body: {
      fr: [
        "L'AMAA a organisé une session de formation de trois jours réunissant des opérateurs de vidange et des agents municipaux.",
        "Les modules ont porté sur le port des équipements de protection, la manipulation des boues, la prévention des accidents et les gestes de premiers secours.",
        "Chaque participant a reçu un support pédagogique trilingue. Les formateurs issus de la session assureront la démultiplication auprès de leurs équipes.",
      ],
      ar: [
        "نظمت الجمعية دورة تكوينية على مدى ثلاثة أيام جمعت مشغلي التفريغ وأعوان البلديات.",
        "تناولت الوحدات استخدام وسائل الحماية، والتعامل مع الحمأة، والوقاية من الحوادث، وإسعافات أولية.",
        "تلقى كل مشارك حافظة بيداغوجية بثلاث لغات، وسيتولى المكوّنون المتخرجون من الدورة نقل المكتسبات إلى فرقهم.",
      ],
      en: [
        "AMAA held a three-day training session bringing together emptying operators and municipal agents.",
        "Modules covered the use of protective equipment, sludge handling, accident prevention and first aid.",
        "Each participant received trilingual teaching material, and the trainers certified in the session will pass on the content to their own teams.",
      ],
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
      fr: "Opération de vidange encadrée sur un site de dépotage autorisé",
      ar: "عملية تفريغ مؤطّرة في موقع تفريغ مرخّص",
      en: "Supervised emptying operation at an authorised discharge site",
    },
  },
  {
    src: media.cleanWater,
    category: "sensibilisation",
    caption: {
      fr: "Sensibilisation à l'hygiène des mains et à l'eau potable",
      ar: "توعية بنظافة اليدين والماء الصالح للشرب",
      en: "Awareness work on hand hygiene and safe drinking water",
    },
  },
  {
    src: media.beachWaste,
    category: "environnement",
    caption: {
      fr: "Littoral pollué identifié avant une campagne de nettoyage",
      ar: "ساحل ملوث تم تحديده قبل حملة تنظيف",
      en: "Polluted coastline identified ahead of a clean-up campaign",
    },
  },
  {
    src: media.oasis,
    category: "environnement",
    caption: {
      fr: "Oasis mauritanienne : une ressource en eau à préserver",
      ar: "واحة موريتانية: موارد مائية تستحق الحماية",
      en: "A Mauritanian oasis: a water resource to preserve",
    },
  },
  {
    src: media.sludgeTreatment,
    category: "assainissement",
    caption: {
      fr: "Traitement des boues de vidange : bassins et lits de séchage",
      ar: "معالجة حمأة الصرف: أحواض وأسرّة تجفيف",
      en: "Faecal sludge treatment: ponds and drying beds",
    },
  },
];

export const partners: { name: L10n; type: L10n }[] = [
  {
    name: {
      fr: "Ministères et autorités sanitaires",
      ar: "الوزارات والسلطات الصحية",
      en: "Ministries and health authorities",
    },
    type: { fr: "Institutions publiques", ar: "مؤسسات عمومية", en: "Public institutions" },
  },
  {
    name: {
      fr: "Communes et collectivités locales",
      ar: "البلديات والجماعات المحلية",
      en: "Municipalities and local authorities",
    },
    type: { fr: "Collectivités", ar: "جماعات محلية", en: "Local government" },
  },
  {
    name: {
      fr: "Services de l'hydraulique et de l'assainissement",
      ar: "مصالح الهيدروليك والإصحاح",
      en: "Water and sanitation services",
    },
    type: { fr: "Services techniques", ar: "مصالح تقنية", en: "Technical services" },
  },
  {
    name: {
      fr: "Partenaires de coopération et bailleurs",
      ar: "شركاء التعاون والممولون",
      en: "Cooperation partners and donors",
    },
    type: { fr: "Coopération internationale", ar: "تعاون دولي", en: "International cooperation" },
  },
  {
    name: {
      fr: "Organisations de la société civile",
      ar: "منظمات المجتمع المدني",
      en: "Civil society organisations",
    },
    type: { fr: "Société civile", ar: "مجتمع مدني", en: "Civil society" },
  },
  {
    name: {
      fr: "Universités et institutions de recherche",
      ar: "الجامعات ومؤسسات البحث",
      en: "Universities and research institutions",
    },
    type: { fr: "Recherche et expertise", ar: "بحث وخبرة", en: "Research and expertise" },
  },
  {
    name: {
      fr: "Opérateurs privés de vidange",
      ar: "مشغلو التفريغ الخاصون",
      en: "Private emptying operators",
    },
    type: { fr: "Secteur privé", ar: "قطاع خاص", en: "Private sector" },
  },
  {
    name: {
      fr: "Coopératives et comités de quartier",
      ar: "التعاونيات ولجان الأحياء",
      en: "Cooperatives and neighbourhood committees",
    },
    type: { fr: "Acteurs communautaires", ar: "فاعلون مجتمعيون", en: "Community actors" },
  },
];

export const contactInfo = {
  phone: "+222 42 99 99 71\n+222 22 37 74 47",
  email: "dramegawa1@gmail.com / mariemdra@gmail.com",
  whatsapp: "22245251234",
  whatsappDisplay: "+222 42999971 / +222 22377447",
};

export function t(value: L10n | string[] | Record<Locale, string[]>, locale: Locale) {
  return (value as Record<Locale, string | string[]>)[locale];
}
