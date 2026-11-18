import { MovementFilter, WatchCategory, WatchProduct } from '../types/watch';

export const HERO_IMAGE = '/src/assets/images/hero_watch_editorial_1794916533103.jpg';
export const ATELIER_IMAGE = '/src/assets/images/watchmaker_atelier_bench_1794916536457.jpg';

const IMG_CASEBACK = '/src/assets/images/mechanical_exhibition_caseback_1794997825445.jpg';
const IMG_CROWN = '/src/assets/images/watch_crown_macro_1794997826385.jpg';
const IMG_WRIST_MALE = '/src/assets/images/wrist_shot_chronograph_1794997826108.jpg';
const IMG_WRIST_FEMALE = '/src/assets/images/wrist_shot_dress_1794997827962.jpg';
const IMG_WRIST_KIDS = '/src/assets/images/wrist_shot_kids_1794997826754.jpg';
const IMG_LEATHER_DETAIL = '/src/assets/images/leather_stitch_detail_1794997828011.jpg';

const MODEL_MALE_CHRONO = '/src/assets/images/male_model_chronograph_1794998175135.jpg';
const MODEL_MALE_DIVER = '/src/assets/images/male_model_diver_1794998176105.jpg';
const MODEL_FEMALE_GOLD = '/src/assets/images/female_model_gold_1794998175954.jpg';
const MODEL_FEMALE_MOON = '/src/assets/images/female_model_moonphase_1794998177466.jpg';
const MODEL_KIDS_FIELD = '/src/assets/images/kids_model_field_1794998177542.jpg';
const MODEL_KIDS_PILOT = '/src/assets/images/kids_model_pilot_1794998177489.jpg';
const MODEL_COLLECTOR = '/src/assets/images/collector_model_accessories_1794998178426.jpg';

const IMG_WALL_INTERIOR = '/src/assets/images/wall_clock_interior_1794998297444.jpg';
const IMG_CLOCK_DETAIL = '/src/assets/images/clock_pendulum_detail_1794998297576.jpg';

export const SECTION_DESCRIPTIONS: Record<
  Exclude<WatchCategory, WatchCategory.ALL>,
  { title: string; subtitle: string }
> = {
  [WatchCategory.MALE]: {
    title: 'Male Collection',
    subtitle: 'Mechanical chronographs, dual-time GMTs, and grade-5 titanium divers engineered for daily precision.',
  },
  [WatchCategory.FEMALE]: {
    title: 'Female Collection',
    subtitle: 'Slim dress proportions, octagonal emerald dials, mother-of-pearl faces, and moonphase apertures.',
  },
  [WatchCategory.KIDS]: {
    title: 'Kids Collection',
    subtitle: 'High-legibility Arabic numerals, shock-resistant steel cases, and washable outdoor & pilot straps.',
  },
  [WatchCategory.WALL_CLOCKS]: {
    title: 'Wall Clocks',
    subtitle: 'Silent sweep walnut, Swiss railway steel, matte gallery, and mechanical regulator wall clocks.',
  },
  [WatchCategory.OTHER]: {
    title: 'Other Horology & Objects',
    subtitle: 'Full-grain leather travel rolls, walnut automatic winders, valet trays, and mechanical desk timepieces.',
  },
};

export const WATCH_CATALOG: WatchProduct[] = [
  // ================= MALE COLLECTION (4 GOODS) =================
  {
    id: 'chronometre-slate-40',
    reference: 'VH-401',
    name: 'Chronomètre Slate 40',
    category: WatchCategory.MALE,
    movementType: 'Automatic',
    movementGroup: MovementFilter.AUTOMATIC,
    designStyle: 'Bicompax Chronograph',
    price: 168000,
    image: '/src/assets/images/male_chronograph_watch_1794916533358.jpg',
    imageAlt: 'Chronomètre Slate 40 men brushed steel chronograph watch with charcoal dial and brown leather strap',
    gallery: [
      {
        url: '/src/assets/images/male_chronograph_watch_1794916533358.jpg',
        caption: 'Studio Front',
        alt: 'Chronomètre Slate 40 sunburst charcoal dial on travertine pedestal',
        kind: 'studio',
      },
      {
        url: MODEL_MALE_CHRONO,
        caption: 'On Model',
        alt: 'Male model in oatmeal blazer wearing Chronomètre Slate 40 chronograph on wrist',
        kind: 'model',
      },
      {
        url: IMG_CROWN,
        caption: 'Crown & Lugs',
        alt: 'Side profile of fluted chronograph crown, pushers, and saddle leather stitching',
        kind: 'detail',
      },
      {
        url: IMG_CASEBACK,
        caption: 'Caliber V-82',
        alt: 'Sapphire exhibition caseback showing Geneva stripes and gold balance wheel',
        kind: 'detail',
      },
    ],
    tagline: 'Column-wheel mechanical chronograph with sunburst slate dial.',
    description:
      'Built around a regulated bi-compax automatic caliber with 62 hours of power reserve. Paired with vegetable-tanned saddle calfskin and quick-release spring bars.',
    variants: [
      { id: 'saddle-calf', label: 'Saddle Calfskin', swatchHex: '#7A4B2A' },
      { id: 'slate-suede', label: 'Charcoal Suede', swatchHex: '#3D3E40' },
      { id: 'steel-link', label: 'Brushed Steel Bracelet', swatchHex: '#A7A9AC' },
    ],
    specs: {
      caliber: 'Cal. V-82 Automatic',
      caseSize: '40.0 mm × 11.4 mm',
      waterResistance: '100 m / 10 ATM',
      crystal: 'Box-Domed Sapphire',
      material: '316L Brushed Steel',
    },
  },
  {
    id: 'abyssal-titanium-300',
    reference: 'VH-412',
    name: 'Abyssal Titanium 300',
    category: WatchCategory.MALE,
    movementType: 'Automatic',
    movementGroup: MovementFilter.AUTOMATIC,
    designStyle: 'Ceramic Bezel Diver',
    price: 194000,
    image: '/src/assets/images/male_diver_watch_1794916534200.jpg',
    imageAlt: 'Abyssal Titanium 300 men titanium dive watch with forest green ceramic bezel',
    gallery: [
      {
        url: '/src/assets/images/male_diver_watch_1794916534200.jpg',
        caption: 'Studio Front',
        alt: 'Abyssal Titanium 300 diver with matte forest ceramic bezel',
        kind: 'studio',
      },
      {
        url: MODEL_MALE_DIVER,
        caption: 'On Model',
        alt: 'Male model in charcoal knit polo wearing Abyssal Titanium 300 dive watch',
        kind: 'model',
      },
      {
        url: IMG_WRIST_MALE,
        caption: 'On-Wrist Fit',
        alt: 'Men steel sports timepiece worn on wrist beside linen cuff',
        kind: 'detail',
      },
      {
        url: IMG_CASEBACK,
        caption: 'Caliber V-90',
        alt: 'Regulated automatic movement visible through sapphire back',
        kind: 'detail',
      },
    ],
    tagline: 'Featherweight grade-5 titanium diver with ceramic bezel.',
    description:
      'Machined from solid grade-5 titanium for effortless wrist balance and corrosion resistance. Features a 120-click matte forest ceramic bezel and Swiss Super-LumiNova indices.',
    availabilityNote: 'Limited Run',
    variants: [
      { id: 'forest-ti', label: 'Forest Ceramic / Titanium', swatchHex: '#234232' },
      { id: 'fkm-rubber', label: 'Matte Black FKM Strap', swatchHex: '#1D1E20' },
    ],
    specs: {
      caliber: 'Cal. V-90 Chronometer',
      caseSize: '41.0 mm × 11.8 mm',
      waterResistance: '300 m / 30 ATM',
      crystal: 'Flat AR Sapphire',
      material: 'Grade-5 Titanium',
    },
  },
  {
    id: 'heritage-two-tone-40',
    reference: 'VH-408',
    name: 'Atelier Heritage Two-Tone',
    category: WatchCategory.MALE,
    movementType: 'Automatic',
    movementGroup: MovementFilter.AUTOMATIC,
    designStyle: 'Two-Tone Architectural',
    price: 215000,
    image: '/src/assets/images/hero_watch_editorial_1794916533103.jpg',
    imageAlt: 'Atelier Heritage Two-Tone brushed steel and champagne bronze mechanical chronograph wristwatch',
    gallery: [
      {
        url: '/src/assets/images/hero_watch_editorial_1794916533103.jpg',
        caption: 'Studio Front',
        alt: 'Atelier Heritage Two-Tone steel and champagne bronze chronograph',
        kind: 'studio',
      },
      {
        url: MODEL_MALE_CHRONO,
        caption: 'On Model',
        alt: 'Male model wearing tailored blazer with Heritage chronograph on wrist',
        kind: 'model',
      },
      {
        url: IMG_CROWN,
        caption: 'Case Profile',
        alt: 'Macro view of bevelled lugs and fluted winding crown',
        kind: 'detail',
      },
      {
        url: ATELIER_IMAGE,
        caption: 'Atelier Bench',
        alt: 'Master watchmaker regulating mechanical caliber on bench',
        kind: 'detail',
      },
    ],
    tagline: 'Champagne dial chronograph with brushed bronze center links.',
    description:
      'Our flagship bicompax chronograph combining 316L stainless steel with warm brushed bronze accents, recessed sub-registers, and exhibition sapphire caseback.',
    availabilityNote: 'Flagship Edition',
    variants: [
      { id: 'steel-bronze', label: 'Steel & Bronze Bracelet', swatchHex: '#A68658' },
      { id: 'espresso-leather', label: 'Espresso Alligator Grain', swatchHex: '#3B281E' },
    ],
    specs: {
      caliber: 'Cal. V-85 Column Wheel',
      caseSize: '40.5 mm × 11.6 mm',
      waterResistance: '100 m / 10 ATM',
      crystal: 'Domed AR Sapphire',
      material: '316L Steel & Bronze',
    },
  },
  {
    id: 'meridian-gmt-40',
    reference: 'VH-425',
    name: 'Meridian Dual-Time GMT 40',
    category: WatchCategory.MALE,
    movementType: 'Automatic',
    movementGroup: MovementFilter.AUTOMATIC,
    designStyle: 'True-Traveler GMT',
    price: 186000,
    image: '/src/assets/images/male_gmt_watch_1794997824894.jpg',
    imageAlt: 'Meridian Dual-Time GMT 40 steel watch with navy and slate 24-hour bezel',
    gallery: [
      {
        url: '/src/assets/images/male_gmt_watch_1794997824894.jpg',
        caption: 'Studio Front',
        alt: 'Meridian Dual-Time GMT 40 navy and slate ceramic bezel',
        kind: 'studio',
      },
      {
        url: MODEL_MALE_DIVER,
        caption: 'On Model',
        alt: 'Male model wearing brushed steel sports watch outdoors on travertine terrace',
        kind: 'model',
      },
      {
        url: IMG_WRIST_MALE,
        caption: 'On-Wrist Fit',
        alt: 'Steel bracelet GMT watch worn on wrist in natural window light',
        kind: 'detail',
      },
      {
        url: IMG_CASEBACK,
        caption: 'Caliber V-94 GMT',
        alt: 'Sapphire caseback revealing automatic dual-time rotor',
        kind: 'detail',
      },
    ],
    tagline: 'Bi-color 24-hour ceramic bezel with independent jumping hour hand.',
    description:
      'Built for crossing time zones effortlessly. Tracks home and local time simultaneously with a high-contrast orange GMT pointer and solid-link brushed steel bracelet.',
    availabilityNote: 'New Design',
    variants: [
      { id: 'navy-slate-steel', label: 'Navy/Slate Steel Bracelet', swatchHex: '#1F3A60' },
      { id: 'obsidian-leather', label: 'Obsidian Saddle Leather', swatchHex: '#252629' },
    ],
    specs: {
      caliber: 'Cal. V-94 Traveler GMT',
      caseSize: '40.0 mm × 11.9 mm',
      waterResistance: '150 m / 15 ATM',
      crystal: 'Flat AR Sapphire',
      material: '316L Brushed Steel',
    },
  },

  // ================= FEMALE COLLECTION (4 GOODS) =================
  {
    id: 'aura-champagne-mesh',
    reference: 'VH-204',
    name: 'Aura Champagne Mesh 32',
    category: WatchCategory.FEMALE,
    movementType: 'Swiss Quartz',
    movementGroup: MovementFilter.QUARTZ_SOLAR,
    designStyle: 'Ultra-Slim Dress',
    price: 92000,
    image: '/src/assets/images/female_gold_watch_1794916533976.jpg',
    imageAlt: 'Aura Champagne Mesh 32 women slim gold dress watch with mother-of-pearl dial',
    gallery: [
      {
        url: '/src/assets/images/female_gold_watch_1794916533976.jpg',
        caption: 'Studio Front',
        alt: 'Aura Champagne Mesh 32 mother-of-pearl dial and gold mesh',
        kind: 'studio',
      },
      {
        url: MODEL_FEMALE_GOLD,
        caption: 'On Model',
        alt: 'Female model in cream silk blouse wearing Aura Champagne Mesh watch',
        kind: 'model',
      },
      {
        url: IMG_WRIST_FEMALE,
        caption: 'On-Wrist Fit',
        alt: 'Champagne gold dress watch worn on wrist beside ivory knitwear',
        kind: 'detail',
      },
      {
        url: IMG_CROWN,
        caption: 'Profile Detail',
        alt: 'Refined slim case profile and fluted crown finishing',
        kind: 'detail',
      },
    ],
    tagline: 'Ultra-slim 6.2mm profile with natural mother-of-pearl dial.',
    description:
      'Proportioned at 32mm for graceful everyday wear. Features an iridescent white mother-of-pearl dial, faceted baton markers, and a fluid woven Milanese bracelet.',
    variants: [
      { id: 'champagne-mesh', label: 'Champagne Gold Mesh', swatchHex: '#C9A86A' },
      { id: 'ivory-calf', label: 'Warm Ivory Calfskin', swatchHex: '#EAE3D5' },
    ],
    specs: {
      caliber: 'Cal. R-12 High-Torque',
      caseSize: '32.0 mm × 6.2 mm',
      waterResistance: '50 m / 5 ATM',
      crystal: 'Flat Sapphire',
      material: '18k Gold PVD Steel',
    },
  },
  {
    id: 'carre-roman-tank',
    reference: 'VH-219',
    name: 'Carré Roman Tank',
    category: WatchCategory.FEMALE,
    movementType: 'Hand-Wound',
    movementGroup: MovementFilter.HAND_WOUND,
    designStyle: 'Rectangular Tank',
    price: 135000,
    image: '/src/assets/images/female_tank_watch_1794916534269.jpg',
    imageAlt: 'Carré Roman Tank women rectangular steel watch with burgundy leather strap',
    gallery: [
      {
        url: '/src/assets/images/female_tank_watch_1794916534269.jpg',
        caption: 'Studio Front',
        alt: 'Carré Roman Tank rectangular steel dress watch on stone',
        kind: 'studio',
      },
      {
        url: MODEL_FEMALE_MOON,
        caption: 'On Model',
        alt: 'Female model in tailored navy blazer wearing luxury dress watch',
        kind: 'model',
      },
      {
        url: IMG_CROWN,
        caption: 'Lug & Strap',
        alt: 'Close-up of chamfered case lugs and stitched calfskin strap',
        kind: 'detail',
      },
      {
        url: IMG_WRIST_FEMALE,
        caption: 'On-Wrist Style',
        alt: 'Women luxury dress timepiece worn in warm morning daylight',
        kind: 'detail',
      },
    ],
    tagline: 'Architectural rectangular case with thermally blued hands.',
    description:
      'Inspired by 1930s European dress horology, the Carré frames a guilloché cream dial with crisp Roman numerals and a supple deep burgundy strap.',
    variants: [
      { id: 'burgundy-leather', label: 'Burgundy Croc-Embossed', swatchHex: '#591D27' },
      { id: 'onyx-leather', label: 'Noir Box Calfskin', swatchHex: '#1C1C1C' },
    ],
    specs: {
      caliber: 'Cal. V-44 Manual Wind',
      caseSize: '26.0 × 33.5 mm',
      waterResistance: '30 m / 3 ATM',
      crystal: 'Curved Sapphire',
      material: 'Polished 316L Steel',
    },
  },
  {
    id: 'sovereign-rose-moonphase',
    reference: 'VH-226',
    name: 'Sovereign Rose Moonphase 34',
    category: WatchCategory.FEMALE,
    movementType: 'Automatic',
    movementGroup: MovementFilter.AUTOMATIC,
    designStyle: 'Astronomical Moonphase',
    price: 148000,
    image: '/src/assets/images/female_moonphase_watch_1794916951084.jpg',
    imageAlt: 'Sovereign Rose Moonphase 34 women rose gold watch with midnight blue moonphase dial',
    gallery: [
      {
        url: '/src/assets/images/female_moonphase_watch_1794916951084.jpg',
        caption: 'Studio Front',
        alt: 'Sovereign Rose Moonphase 34 midnight blue dial and gold moon disc',
        kind: 'studio',
      },
      {
        url: MODEL_FEMALE_MOON,
        caption: 'On Model',
        alt: 'Female model wearing Sovereign Rose Moonphase watch on navy strap',
        kind: 'model',
      },
      {
        url: IMG_CASEBACK,
        caption: 'Caliber V-68',
        alt: 'Open sapphire caseback showing automatic Geneva-striped movement',
        kind: 'detail',
      },
      {
        url: IMG_WRIST_FEMALE,
        caption: 'On-Wrist Fit',
        alt: 'Dress watch proportions styled in soft daylight',
        kind: 'detail',
      },
    ],
    tagline: 'Midnight sunray dial with 122-year astronomical moon disc.',
    description:
      'Pairs a warm 18k rose-gold plated 34mm steel case with a deep midnight blue sunray dial, applied gilt indices, and an intricate lunar complication at six o’clock.',
    variants: [
      { id: 'midnight-calf', label: 'Midnight Navy Calfskin', swatchHex: '#1F2A44' },
      { id: 'rose-milanese', label: 'Rose Gold Mesh', swatchHex: '#C58E74' },
    ],
    specs: {
      caliber: 'Cal. V-68 Moonphase Auto',
      caseSize: '34.0 mm × 9.6 mm',
      waterResistance: '50 m / 5 ATM',
      crystal: 'Domed AR Sapphire',
      material: '18k Rose PVD Steel',
    },
  },
  {
    id: 'octagon-emerald-30',
    reference: 'VH-234',
    name: 'Octagon Emerald Gold 30',
    category: WatchCategory.FEMALE,
    movementType: 'Automatic',
    movementGroup: MovementFilter.AUTOMATIC,
    designStyle: 'Integrated Octagonal',
    price: 156000,
    image: '/src/assets/images/female_emerald_watch_1794997825808.jpg',
    imageAlt: 'Octagon Emerald Gold 30 women octagonal gold watch with emerald sunburst dial',
    gallery: [
      {
        url: '/src/assets/images/female_emerald_watch_1794997825808.jpg',
        caption: 'Studio Front',
        alt: 'Octagon Emerald Gold 30 brushed bezel and emerald green dial',
        kind: 'studio',
      },
      {
        url: MODEL_FEMALE_GOLD,
        caption: 'On Model',
        alt: 'Female model wearing champagne gold timepiece in sunlit atelier',
        kind: 'model',
      },
      {
        url: IMG_WRIST_FEMALE,
        caption: 'On-Wrist Fit',
        alt: 'Champagne gold women watch styled beside knitwear',
        kind: 'detail',
      },
      {
        url: IMG_CASEBACK,
        caption: 'Caliber V-52',
        alt: 'Exhibition caseback showcasing regulated automatic rotor',
        kind: 'detail',
      },
    ],
    tagline: 'Brushed octagonal bezel paired with deep emerald sunray dial.',
    description:
      'Architectural geometry meets jewel-toned restraint. Features eight polished bezel screws, an integrated tapering gold bracelet, and luminous baton markers.',
    availabilityNote: 'New Design',
    variants: [
      { id: 'emerald-gold', label: 'Brushed Champagne Link', swatchHex: '#1B5E3C' },
      { id: 'ivory-silk', label: 'Forest Calfskin Strap', swatchHex: '#254233' },
    ],
    specs: {
      caliber: 'Cal. V-52 Slim Auto',
      caseSize: '30.0 mm × 8.8 mm',
      waterResistance: '50 m / 5 ATM',
      crystal: 'Flat AR Sapphire',
      material: '18k Champagne PVD Steel',
    },
  },

  // ================= KIDS COLLECTION (4 GOODS) =================
  {
    id: 'junior-explorer-field',
    reference: 'VH-102',
    name: 'Junior Explorer Field 31',
    category: WatchCategory.KIDS,
    movementType: 'Quartz',
    movementGroup: MovementFilter.QUARTZ_SOLAR,
    designStyle: '12/24h Field Dial',
    price: 18500,
    image: '/src/assets/images/kids_field_watch_1794916535030.jpg',
    imageAlt: 'Junior Explorer Field 31 kids navy dial analog field watch on woven nylon strap',
    gallery: [
      {
        url: '/src/assets/images/kids_field_watch_1794916535030.jpg',
        caption: 'Studio Front',
        alt: 'Junior Explorer Field 31 navy dial with 12/24 hour markers',
        kind: 'studio',
      },
      {
        url: MODEL_KIDS_FIELD,
        caption: 'On Model',
        alt: 'Young boy outdoors wearing Junior Explorer Field watch on navy nylon strap',
        kind: 'model',
      },
      {
        url: IMG_WRIST_KIDS,
        caption: 'Outdoor Wrist',
        alt: 'Kids analog field watch worn outdoors in natural daylight',
        kind: 'detail',
      },
      {
        url: IMG_CROWN,
        caption: 'Steel Case',
        alt: 'Brushed stainless steel case and lug durability detail',
        kind: 'detail',
      },
    ],
    tagline: 'Clear 12/24-hour numerals designed for learning analog time.',
    description:
      'Engineered to survive playground adventures with a recessed crown guard, scratch-resistant mineral-sapphire hybrid glass, and a machine-washable nylon pass-through strap.',
    variants: [
      { id: 'cobalt-nylon', label: 'Cobalt Woven Nylon', swatchHex: '#1F3A60' },
      { id: 'olive-nylon', label: 'Forest Woven Nylon', swatchHex: '#3A4D39' },
    ],
    specs: {
      caliber: 'Shock-Mounted Quartz',
      caseSize: '31.0 mm × 8.5 mm',
      waterResistance: '50 m / 5 ATM',
      crystal: 'Sapphire-Coated Mineral',
      material: 'Brushed 316L Steel',
    },
  },
  {
    id: 'cadet-tide-sport',
    reference: 'VH-109',
    name: 'Cadet Tide Sport 30',
    category: WatchCategory.KIDS,
    movementType: 'Solar Quartz',
    movementGroup: MovementFilter.QUARTZ_SOLAR,
    designStyle: 'Swim-Grade Bezel',
    price: 21000,
    image: '/src/assets/images/kids_sport_watch_1794916534972.jpg',
    imageAlt: 'Cadet Tide Sport 30 kids water-resistant watch with sage bezel and slate silicone strap',
    gallery: [
      {
        url: '/src/assets/images/kids_sport_watch_1794916534972.jpg',
        caption: 'Studio Front',
        alt: 'Cadet Tide Sport 30 sage bezel and quick-dry silicone strap',
        kind: 'studio',
      },
      {
        url: MODEL_KIDS_FIELD,
        caption: 'On Model',
        alt: 'Young explorer wearing water-resistant kids analog watch outdoors',
        kind: 'model',
      },
      {
        url: IMG_WRIST_KIDS,
        caption: 'On-Wrist Fit',
        alt: 'Durable kids wristwatch worn outdoors on wrist',
        kind: 'detail',
      },
      {
        url: IMG_CROWN,
        caption: 'Crown Guard',
        alt: 'Protected steel crown and shock-resistant case profile',
        kind: 'detail',
      },
    ],
    tagline: '100m swim-ready solar watch with labeled 5-minute track.',
    description:
      'Powered by ambient sunlight so it never needs routine battery swaps. High-contrast minute numerals and a hypoallergenic quick-dry silicone strap make it ideal for young swimmers.',
    variants: [
      { id: 'sage-slate', label: 'Sage Bezel / Slate Strap', swatchHex: '#638C74' },
      { id: 'ocean-navy', label: 'Deep Blue Silicone', swatchHex: '#2C4969' },
    ],
    specs: {
      caliber: 'Solar-Cell Quartz (6mo)',
      caseSize: '30.0 mm × 9.0 mm',
      waterResistance: '100 m / 10 ATM',
      crystal: 'Hardened Mineral',
      material: 'Bead-Blasted Steel',
    },
  },
  {
    id: 'trailblazer-kids-field-32',
    reference: 'VH-115',
    name: 'Trailblazer Kids Field 32',
    category: WatchCategory.KIDS,
    movementType: 'Quartz',
    movementGroup: MovementFilter.QUARTZ_SOLAR,
    designStyle: 'High-Contrast Outdoor',
    price: 19500,
    image: '/src/assets/images/kids_outdoor_watch_1794916950530.jpg',
    imageAlt: 'Trailblazer Kids Field 32 brushed steel kids outdoor watch with crisp white dial and charcoal nylon strap',
    gallery: [
      {
        url: '/src/assets/images/kids_outdoor_watch_1794916950530.jpg',
        caption: 'Studio Front',
        alt: 'Trailblazer Kids Field 32 white dial with bold Arabic numerals',
        kind: 'studio',
      },
      {
        url: MODEL_KIDS_PILOT,
        caption: 'On Model',
        alt: 'Young girl outdoors checking crisp white dial analog field watch on wrist',
        kind: 'model',
      },
      {
        url: IMG_WRIST_KIDS,
        caption: 'Outdoor Wrist',
        alt: 'Kids outdoor watch worn on wrist in afternoon sunlight',
        kind: 'detail',
      },
      {
        url: IMG_CROWN,
        caption: 'Lug Detail',
        alt: 'Brushed 316L steel lugs and woven strap hardware',
        kind: 'detail',
      },
    ],
    tagline: 'Crisp matte-white dial with high-visibility orange sweep hand.',
    description:
      'Built for young hikers and camp explorers with bold luminous Arabic numerals, an outer 60-minute learning ring, and a double-keeper charcoal nylon strap.',
    variants: [
      { id: 'charcoal-nylon', label: 'Charcoal Woven Nylon', swatchHex: '#4E5154' },
      { id: 'terracotta-nylon', label: 'Terracotta Nylon', swatchHex: '#B85437' },
    ],
    specs: {
      caliber: 'Anti-Shock Swiss Quartz',
      caseSize: '32.0 mm × 8.8 mm',
      waterResistance: '50 m / 5 ATM',
      crystal: 'Hardened Sapphire-Coat',
      material: 'Brushed 316L Steel',
    },
  },
  {
    id: 'aviator-junior-pilot-31',
    reference: 'VH-122',
    name: 'Aviator Junior Pilot 31',
    category: WatchCategory.KIDS,
    movementType: 'Quartz',
    movementGroup: MovementFilter.QUARTZ_SOLAR,
    designStyle: 'Heritage Pilot Dial',
    price: 17500,
    image: '/src/assets/images/kids_pilot_watch_1794997824179.jpg',
    imageAlt: 'Aviator Junior Pilot 31 cream dial kids pilot watch with tan canvas strap',
    gallery: [
      {
        url: '/src/assets/images/kids_pilot_watch_1794997824179.jpg',
        caption: 'Studio Front',
        alt: 'Aviator Junior Pilot 31 warm cream dial and tan canvas strap',
        kind: 'studio',
      },
      {
        url: MODEL_KIDS_PILOT,
        caption: 'On Model',
        alt: 'Smiling girl in olive jacket wearing Aviator Junior Pilot 31 watch',
        kind: 'model',
      },
      {
        url: IMG_WRIST_KIDS,
        caption: 'Outdoor Wrist',
        alt: 'Kids field watch worn outdoors in natural light',
        kind: 'detail',
      },
      {
        url: IMG_CROWN,
        caption: 'Crown & Stitching',
        alt: 'Easy-grip pilot crown and reinforced strap stitching',
        kind: 'detail',
      },
    ],
    tagline: 'Warm cream pilot dial with oversized numerals and canvas strap.',
    description:
      'Inspired by vintage cockpit instruments scaled cleanly for smaller wrists. Features a triangle 12-hour orientation marker, red-tipped sweep hand, and breathable tan canvas.',
    availabilityNote: 'New Design',
    variants: [
      { id: 'tan-canvas', label: 'Sand Woven Canvas', swatchHex: '#B89E74' },
      { id: 'navy-canvas', label: 'Squadron Blue Canvas', swatchHex: '#253D5B' },
    ],
    specs: {
      caliber: 'Anti-Shock Quartz',
      caseSize: '31.0 mm × 8.4 mm',
      waterResistance: '50 m / 5 ATM',
      crystal: 'Sapphire-Coat Mineral',
      material: 'Brushed 316L Steel',
    },
  },

  // ================= OTHER HOROLOGY & OBJECTS (4 GOODS) =================
  {
    id: 'atelier-leather-travel-roll',
    reference: 'VH-901',
    name: 'Cognac Two-Watch Roll & Tool',
    category: WatchCategory.OTHER,
    movementType: 'Accessories',
    movementGroup: MovementFilter.ACCESSORIES,
    designStyle: 'Full-Grain Storage',
    price: 24500,
    image: '/src/assets/images/watch_travel_roll_1794916535398.jpg',
    imageAlt: 'Cognac full-grain leather two-watch travel roll with suede cushion and brass spring-bar tool',
    gallery: [
      {
        url: '/src/assets/images/watch_travel_roll_1794916535398.jpg',
        caption: 'Studio Set',
        alt: 'Cognac leather travel roll with suede watch cushion and brass tool',
        kind: 'studio',
      },
      {
        url: MODEL_COLLECTOR,
        caption: 'With Collector',
        alt: 'Watch collector placing wristwatch into cognac leather travel roll',
        kind: 'model',
      },
      {
        url: IMG_LEATHER_DETAIL,
        caption: 'Stitch & Brass',
        alt: 'Macro close-up of saddle stitching, suede interior, and knurled brass tool',
        kind: 'detail',
      },
      {
        url: ATELIER_IMAGE,
        caption: 'Atelier Craft',
        alt: 'Watchmaker workbench with precision strap and movement tools',
        kind: 'detail',
      },
    ],
    tagline: 'Hand-stitched full-grain travel roll with solid brass strap tool.',
    description:
      'Crafted from Italian vegetable-tanned leather lined with ultra-soft microsuede cushions and snap dividers to protect two watches in transit. Includes our knurled brass spring-bar tool.',
    variants: [
      { id: 'cognac-brass', label: 'Cognac / Brass Hardware', swatchHex: '#8C5230' },
      { id: 'espresso-steel', label: 'Espresso / Brushed Steel', swatchHex: '#3A2B24' },
    ],
    specs: {
      caliber: '2-Slot Protective Roll',
      caseSize: '185 × 82 × 75 mm',
      waterResistance: 'Waxed Leather Finish',
      crystal: 'Suede Cushion Interior',
      material: 'Full-Grain Calf & Brass',
    },
  },
  {
    id: 'meridian-bronze-desk-clock',
    reference: 'VH-914',
    name: 'Meridian Bronze Desk Clock',
    category: WatchCategory.OTHER,
    movementType: '8-Day Manual',
    movementGroup: MovementFilter.HAND_WOUND,
    designStyle: 'Exposed Balance Desk',
    price: 118000,
    image: '/src/assets/images/bronze_desk_clock_1794916535112.jpg',
    imageAlt: 'Meridian Bronze mechanical desk clock with visible balance wheel on travertine block',
    gallery: [
      {
        url: '/src/assets/images/bronze_desk_clock_1794916535112.jpg',
        caption: 'Studio Front',
        alt: 'Meridian Bronze mechanical desk clock with exposed balance wheel',
        kind: 'studio',
      },
      {
        url: MODEL_COLLECTOR,
        caption: 'In Studio',
        alt: 'Collector desk setup showcasing artisanal horological objects',
        kind: 'model',
      },
      {
        url: IMG_CASEBACK,
        caption: 'Caliber D-800',
        alt: 'Hand-finished mechanical movement bridges and escapement detail',
        kind: 'detail',
      },
      {
        url: ATELIER_IMAGE,
        caption: 'Atelier Assembly',
        alt: 'Horological bench assembly and regulation check',
        kind: 'detail',
      },
    ],
    tagline: 'Open-balance mechanical table timepiece with 8-day reserve.',
    description:
      'A tactile desk sculpture machined from patinating architectural bronze. Houses a slow-beat 18,000 vph mechanical movement visible through the lower aperture, with folding travel easel.',
    availabilityNote: 'Small Batch',
    variants: [
      { id: 'patina-bronze', label: 'Brushed Bronze / Ivory', swatchHex: '#8C6A3B' },
      { id: 'gunmetal-steel', label: 'Gunmetal PVD / Cream', swatchHex: '#43464B' },
    ],
    specs: {
      caliber: 'Cal. D-800 8-Day Wind',
      caseSize: '64.0 mm × 24.0 mm',
      waterResistance: 'Desk & Travel Grade',
      crystal: 'Domed Sapphire Front/Back',
      material: 'CuSn8 Architectural Bronze',
    },
  },
  {
    id: 'solstice-walnut-winder',
    reference: 'VH-922',
    name: 'Solstice Walnut Watch Winder',
    category: WatchCategory.OTHER,
    movementType: 'Accessories',
    movementGroup: MovementFilter.ACCESSORIES,
    designStyle: 'Silent Rotor Cube',
    price: 64000,
    image: '/src/assets/images/walnut_watch_winder_1794916951517.jpg',
    imageAlt: 'Solstice Walnut Watch Winder cube in dark walnut wood and brushed brass bezel ring',
    gallery: [
      {
        url: '/src/assets/images/walnut_watch_winder_1794916951517.jpg',
        caption: 'Studio Front',
        alt: 'Solstice Walnut Watch Winder in dark walnut and brushed brass',
        kind: 'studio',
      },
      {
        url: MODEL_COLLECTOR,
        caption: 'With Collector',
        alt: 'Collector organizing mechanical timepiece with solid walnut objects',
        kind: 'model',
      },
      {
        url: IMG_CASEBACK,
        caption: 'Rotor Compatibility',
        alt: 'Automatic watch movement kept wound at optimal turns per day',
        kind: 'detail',
      },
      {
        url: IMG_LEATHER_DETAIL,
        caption: 'Suede & Hardware',
        alt: 'Close-up of soft suede interior lining and solid brass detailing',
        kind: 'detail',
      },
    ],
    tagline: 'Whisper-quiet Japanese Mabuchi rotor in solid walnut & brass.',
    description:
      'Keeps automatic calibers wound and ready to wear with programmable 650–1,950 TPD bi-directional rotation, brushed brass toggle switch, and anti-magnetic shielding.',
    variants: [
      { id: 'walnut-brass', label: 'Dark Walnut / Brushed Brass', swatchHex: '#5C3D28' },
      { id: 'ebony-steel', label: 'Smoked Oak / Steel', swatchHex: '#2F2E2C' },
    ],
    specs: {
      caliber: '650–1,950 TPD Silent Drive',
      caseSize: '132 × 132 × 140 mm',
      waterResistance: 'Anti-Magnetic Shielded',
      crystal: 'Beveled Mineral Glass',
      material: 'Solid Walnut & Brass',
    },
  },
  {
    id: 'atelier-walnut-valet-tray',
    reference: 'VH-930',
    name: 'Saddle & Walnut Valet Tray',
    category: WatchCategory.OTHER,
    movementType: 'Accessories',
    movementGroup: MovementFilter.ACCESSORIES,
    designStyle: 'Bedside Horology Tray',
    price: 34500,
    image: '/src/assets/images/watch_valet_tray_1794997825511.jpg',
    imageAlt: 'Saddle and walnut watch valet tray with suede watch pillow and brass dividers',
    gallery: [
      {
        url: '/src/assets/images/watch_valet_tray_1794997825511.jpg',
        caption: 'Studio Overview',
        alt: 'Solid walnut valet tray holding watch, brass divider, and everyday carry',
        kind: 'studio',
      },
      {
        url: MODEL_COLLECTOR,
        caption: 'With Collector',
        alt: 'Collector using walnut valet tray and leather roll on travertine desk',
        kind: 'model',
      },
      {
        url: IMG_LEATHER_DETAIL,
        caption: 'Leather & Suede',
        alt: 'Macro view of hand-stitched full-grain leather and brass hardware',
        kind: 'detail',
      },
      {
        url: '/src/assets/images/watch_travel_roll_1794916535398.jpg',
        caption: 'Collection Pairing',
        alt: 'Matched with cognac watch roll on travertine surface',
        kind: 'detail',
      },
    ],
    tagline: 'Solid walnut catchall with removable suede watch pillow & brass bar.',
    description:
      'Hand-joined American walnut frame inlaid with saddle calfskin and brushed brass dividers. Dedicated recessed watch pillow keeps bracelets scratch-free overnight.',
    availabilityNote: 'New Design',
    variants: [
      { id: 'walnut-saddle', label: 'Walnut / Saddle Leather', swatchHex: '#7A4B2A' },
      { id: 'walnut-espresso', label: 'Walnut / Espresso Leather', swatchHex: '#3B281E' },
    ],
    specs: {
      caliber: '1-Watch Pillow + 2 Bays',
      caseSize: '260 × 175 × 38 mm',
      waterResistance: 'Oiled Timber & Leather',
      crystal: 'Microsuede Resting Bay',
      material: 'Walnut, Calfskin & Brass',
    },
  },

  // ================= WALL CLOCKS COLLECTION (4 GOODS) =================
  {
    id: 'chronos-walnut-brass-wall-38',
    reference: 'VH-701',
    name: 'Chronos Walnut & Brass 38cm',
    category: WatchCategory.WALL_CLOCKS,
    movementType: 'Silent Sweep',
    movementGroup: MovementFilter.WALL_CLOCKS,
    designStyle: 'Walnut & Brass Wall',
    price: 78000,
    image: '/src/assets/images/walnut_wall_clock_1794998295651.jpg',
    imageAlt: 'Chronos Walnut and Brass 38cm round wall clock on limestone wall',
    gallery: [
      {
        url: '/src/assets/images/walnut_wall_clock_1794998295651.jpg',
        caption: 'Studio Front',
        alt: 'Chronos 38cm solid walnut and brass wall clock with ivory dial',
        kind: 'studio',
      },
      {
        url: IMG_WALL_INTERIOR,
        caption: 'In Interior',
        alt: 'Minimalist walnut and brass wall clock mounted above travertine console in study',
        kind: 'model',
      },
      {
        url: IMG_CLOCK_DETAIL,
        caption: 'Joinery Detail',
        alt: 'Macro close-up of walnut miter joinery and crystal bezel',
        kind: 'detail',
      },
      {
        url: ATELIER_IMAGE,
        caption: 'Atelier Craft',
        alt: 'Master watchmaker workbench calibrating precision clock components',
        kind: 'detail',
      },
    ],
    tagline: 'Solid American walnut bezel with silent continuous-sweep movement.',
    description:
      'Turned from kiln-dried American walnut and fitted with an inner brushed brass ring. A zero-tick high-torque quartz movement glides smoothly across the warm ivory dial.',
    availabilityNote: 'New Design',
    variants: [
      { id: 'walnut-ivory', label: 'Walnut / Ivory Dial', swatchHex: '#6F4E37' },
      { id: 'walnut-brass-dial', label: 'Walnut / Smoked Oak', swatchHex: '#4B3626' },
    ],
    specs: {
      caliber: 'High-Torque Silent Sweep',
      caseSize: '380 mm × 46 mm',
      waterResistance: 'Indoor Architectural',
      crystal: 'Anti-Glare Mineral Glass',
      material: 'American Walnut & Brass',
    },
  },
  {
    id: 'atelier-railway-station-42',
    reference: 'VH-708',
    name: 'Atelier Railway Station 42cm',
    category: WatchCategory.WALL_CLOCKS,
    movementType: 'Silent Sweep',
    movementGroup: MovementFilter.WALL_CLOCKS,
    designStyle: 'Swiss Railway Wall',
    price: 94000,
    image: '/src/assets/images/station_steel_clock_1794998296795.jpg',
    imageAlt: 'Atelier Railway Station 42cm brushed stainless steel wall clock with red paddle seconds hand',
    gallery: [
      {
        url: '/src/assets/images/station_steel_clock_1794998296795.jpg',
        caption: 'Studio Front',
        alt: 'Atelier Railway Station 42cm steel wall clock on stone wall',
        kind: 'studio',
      },
      {
        url: IMG_WALL_INTERIOR,
        caption: 'In Interior',
        alt: 'Architectural wall clock styled in sunlit contemporary study',
        kind: 'model',
      },
      {
        url: IMG_CLOCK_DETAIL,
        caption: 'Hands & Bezel',
        alt: 'Close-up of precision balanced clock hands and frame edge',
        kind: 'detail',
      },
      {
        url: ATELIER_IMAGE,
        caption: 'Atelier Assembly',
        alt: 'Swiss-inspired horological assembly bench',
        kind: 'detail',
      },
    ],
    tagline: 'Brushed 316L steel housing with iconic crimson paddle sweep.',
    description:
      'Inspired by mid-century European transit clocks, engineered for instant cross-room readability with stark geometric batons and a spun brushed stainless steel casing.',
    variants: [
      { id: 'brushed-steel-white', label: 'Brushed Steel / White', swatchHex: '#B6B8BA' },
      { id: 'matte-slate-white', label: 'Anodized Slate / White', swatchHex: '#3C3F42' },
    ],
    specs: {
      caliber: 'Cal. S-400 Sync Sweep',
      caseSize: '420 mm × 52 mm',
      waterResistance: 'Sealed Dustproof Case',
      crystal: 'Tempered Flat Glass',
      material: 'Brushed 316L Steel',
    },
  },
  {
    id: 'nocturne-slate-gallery-40',
    reference: 'VH-714',
    name: 'Nocturne Slate Gallery 40cm',
    category: WatchCategory.WALL_CLOCKS,
    movementType: 'Silent Sweep',
    movementGroup: MovementFilter.WALL_CLOCKS,
    designStyle: 'Matte Gallery Wall',
    price: 86000,
    image: '/src/assets/images/slate_gallery_clock_1794998295731.jpg',
    imageAlt: 'Nocturne Slate Gallery 40cm matte black wall clock with champagne gold numerals',
    gallery: [
      {
        url: '/src/assets/images/slate_gallery_clock_1794998295731.jpg',
        caption: 'Studio Front',
        alt: 'Nocturne Slate Gallery 40cm charcoal dial with raised gold numerals',
        kind: 'studio',
      },
      {
        url: IMG_WALL_INTERIOR,
        caption: 'In Interior',
        alt: 'Wall clock mounted in modern living room above console table',
        kind: 'model',
      },
      {
        url: IMG_CLOCK_DETAIL,
        caption: 'Detail Finish',
        alt: 'Close-up of brushed metallic frame and crystal dial cover',
        kind: 'detail',
      },
      {
        url: IMG_CASEBACK,
        caption: 'Precision Drive',
        alt: 'Regulated internal gear train craftsmanship',
        kind: 'detail',
      },
    ],
    tagline: 'Anodized obsidian aluminum rim with raised champagne numerals.',
    description:
      'Subtle radial sunburst charcoal dial catches ambient daylight while dimensional champagne numerals cast crisp micro-shadows across the face.',
    availabilityNote: 'New Design',
    variants: [
      { id: 'obsidian-champagne', label: 'Obsidian / Champagne Gold', swatchHex: '#252629' },
      { id: 'bronze-charcoal', label: 'Burnished Bronze / Slate', swatchHex: '#8C6A3B' },
    ],
    specs: {
      caliber: 'Whisper-Quiet Quartz',
      caseSize: '400 mm × 44 mm',
      waterResistance: 'Indoor Gallery Grade',
      crystal: 'Low-Iron Glass',
      material: 'Anodized Aluminum',
    },
  },
  {
    id: 'heritage-regulator-pendulum-52',
    reference: 'VH-729',
    name: 'Heritage Regulator Pendulum 52cm',
    category: WatchCategory.WALL_CLOCKS,
    movementType: '14-Day Manual',
    movementGroup: MovementFilter.WALL_CLOCKS,
    designStyle: 'Mechanical Regulator',
    price: 165000,
    image: '/src/assets/images/pendulum_regulator_clock_1794998296459.jpg',
    imageAlt: 'Heritage Regulator Pendulum 52cm walnut and glass mechanical wall clock with brass pendulum',
    gallery: [
      {
        url: '/src/assets/images/pendulum_regulator_clock_1794998296459.jpg',
        caption: 'Studio Front',
        alt: 'Heritage Regulator 52cm mechanical wall clock with exposed brass pendulum',
        kind: 'studio',
      },
      {
        url: IMG_WALL_INTERIOR,
        caption: 'In Interior',
        alt: 'Architectural wall timepiece positioned in warm sunlit room',
        kind: 'model',
      },
      {
        url: IMG_CLOCK_DETAIL,
        caption: 'Pendulum & Hands',
        alt: 'Macro view of brass weight, mitered walnut joinery, and blued steel hands',
        kind: 'detail',
      },
      {
        url: ATELIER_IMAGE,
        caption: 'Atelier Assembly',
        alt: 'Master horologist regulating mechanical gear train',
        kind: 'detail',
      },
    ],
    tagline: '14-day key-wind mechanical regulator with exposed brass pendulum.',
    description:
      'A full mechanical wall regulator featuring thermally blued steel hands, an open-worked brass gear train, and a solid spun brass pendulum enclosed behind beveled glass.',
    availabilityNote: 'Small Batch',
    variants: [
      { id: 'walnut-brass-reg', label: 'Walnut / Spun Brass', swatchHex: '#7A5438' },
      { id: 'ebony-steel-reg', label: 'Smoked Oak / Steel', swatchHex: '#33312E' },
    ],
    specs: {
      caliber: 'Cal. W-14 14-Day Mechanical',
      caseSize: '520 × 280 × 110 mm',
      waterResistance: 'Hinged Glass Cabinet',
      crystal: 'Beveled Mineral Glass',
      material: 'Solid Walnut & Brass',
    },
  },
];

