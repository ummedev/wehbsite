import { Treatment, Testimonial } from './types';

export const CLINIC_INFO = {
  name: "Doc+ Dermatology Clinic",
  building: "Doc ➕ Plus Building",
  address: "Doc ➕ Plus Building, Abdullah Street Near Lyallpur Galleria, Service Road, Canal Expy, Faisalabad, Pakistan",
  phone: "+92 309 7823058",
  whatsapp: "+92 309 7823058",
  email: "info@docplusdermatology.com",
  timings: "Monday - Saturday: 11:00 AM - 08:00 PM (Closed Sundays)",
  plusCode: "C4QJ+6P Faisalabad, Pakistan",
  emergencyContact: "+92 300 1234567 (Urgent Post-Procedure Queries)",
  openingHours: [
    { days: "Monday - Friday", hours: "11:00 AM - 08:00 PM" },
    { days: "Saturday", hours: "11:00 AM - 06:00 PM" },
    { days: "Sunday", hours: "Emergency Cases Only (On-Call)" }
  ],
  socials: {
    instagram: "https://instagram.com/docplus.dermatology",
    facebook: "https://facebook.com/docplus.dermatology",
    youtube: "https://youtube.com/c/docplusdermatology"
  },
  history: "Founded in 2014 by Dr. Ayesha Malik, Doc+ Dermatology Clinic was established with a singular vision: to bring international-standard dermatological and aesthetic medical science to the residents of Faisalabad. Over the last decade, we have grown from a boutique consultation clinic into a state-of-the-art multi-specialty laser center, treating over 15,000 satisfied patients. Our clinic houses the latest FDA-approved lasers, high-end sterile surgical rooms, and Punjab's first digital patient-portal tracking engine.",
  mission: "To deliver evidence-based, premium dermatological care with absolute empathy, precision, and clinical integrity, ensuring safe, outstanding, and life-changing skin transformations.",
  vision: "To be recognized as the absolute leader in medical and cosmetic dermatology in Pakistan, pioneered by clinical excellence, cutting-edge medical technologies, and a patient-first experience.",
  values: [
    { title: "Clinical Rigor", desc: "Every therapy, prescription, and aesthetic protocol is verified by scientific evidence and FDA approvals." },
    { title: "Patient Centricity", desc: "We construct personalized treatment regimens aligned with your unique skin biological architecture." },
    { title: "Sterility & Safety", desc: "We maintain class-leading hygienic environments and strict medical sterilization standards for all equipment." },
    { title: "Aesthetic Honesty", desc: "We advocate for natural, subtle enhancement that accentuates your organic symmetry rather than overfilled or artificial outcomes." }
  ],
  certifications: [
    "Pakistan Association of Dermatologists (PAD) Accredited Clinic",
    "College of Physicians and Surgeons Pakistan (CPSP) Certified Fellowship Venue",
    "ISO 9001:2015 Certified Healthcare Practice",
    "Certified Aesthetic Laser Practitioner Elite Level"
  ],
  awards: [
    "Best Clinical Dermatology Center - Faisalabad Health Awards (2022, 2024)",
    "Pioneer in Advanced Non-Invasive Skin Rejuvenation - PakMed Summit (2023)",
    "Patient Satisfaction Excellence Award (2025)"
  ],
  doctors: [
    {
      id: "dr-ayesha",
      name: "Dr. Ayesha Malik",
      specialty: "Consultant Dermatologist & Aesthetic Laser Specialist",
      qualifications: "MBBS, FCPS (Dermatology), MD (Aesthetic Medicine)",
      experience: "12+ Years",
      languages: ["English", "Urdu", "Punjabi"],
      schedule: "Mon - Sat (11:00 AM - 04:00 PM)",
      image: "/src/assets/images/dr_ayesha_dermatologist_1784619150960.jpg",
      bio: "Dr. Ayesha Malik is a highly distinguished dermatologist with international training in laser therapies and medical aesthetic procedures. She specializes in customized acne management, laser scar revision, and anti-aging treatments."
    },
    {
      id: "dr-ahmed",
      name: "Dr. Faisal Ahmed",
      specialty: "Consultant Hair Restoration Surgeon & Dermatologist",
      qualifications: "MBBS, MCPS (Dermatology), Fellowship in Hair Transplant (Turkey)",
      experience: "10+ Years",
      languages: ["English", "Urdu"],
      schedule: "Mon - Sat (04:00 PM - 08:00 PM)",
      image: "/src/assets/images/dr_ahmed_dermatologist_1784604001974.jpg",
      bio: "Dr. Faisal Ahmed is a globally-trained specialist in trichology and hair restoration. With over a decade of experience, he leads our advanced hair loss therapies, scalp diagnostics, and micro-FUE hair transplants."
    }
  ]
};

export const TREATMENTS: Treatment[] = [
  // ==================== MEDICAL DERMATOLOGY ====================
  {
    id: "acne-vulgaris",
    name: "Medical Acne Vulgaris Treatment",
    category: "medical",
    shortDescription: "Targeted pharmaceutical and clinical grade therapy to eliminate active papules, pustules, and sebum production.",
    fullDescription: "Active acne requires medical intervention. Our clinical treatment combines advanced topical comedolytics, systemic anti-microbials, sebum-regulating protocols, and blue-light photodynamic therapy to clear severe outbreaks. We focus on healing active infections and regulating follicular keratinization to prevent future lesions from forming.",
    duration: "40 mins",
    price: "Rs. 5,000",
    image: "/src/assets/images/skincare_vanity_1784603112992.jpg",
    benefits: [
      "Eliminates 90% of active acne lesions and painful pustules",
      "Suppresses hyperactive sebaceous glands to balance oily skin",
      "Accelerates epidermal cellular turnover to clear hyperpigmented blemishes",
      "Reduces active micro-bacterial colonies without dry systemic damage"
    ],
    procedureSteps: [
      "Sebum mapping and active micro-lesion analysis",
      "Double skin preparation utilizing salicylic/glycolic therapeutic primers",
      "Micro-comedone extraction and blue-light LED photodynamic sterilization",
      "Application of customized anti-bacterial and zinc barrier formulations"
    ],
    skinTypes: ["Oily", "Acne-Prone", "Sensitive", "Combination"],
    recovery: "No down-time. Temporary pinkness may occur for 2-4 hours. Strict daily sun protection is required.",
    faqs: [
      { q: "How many sessions are typically required?", a: "Most patients experience active clearance in 3 to 5 bi-weekly sessions combined with custom medical prescriptions." },
      { q: "Is this safe for sensitive, red skin?", a: "Yes, our formulations are balanced and supervised by dermatologists to ensure they do not compromise the skin barrier." }
    ],
    beforeAfterImage: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=600&h=400&fit=crop"
  },
  {
    id: "laser-resurfacing",
    name: "Fractional Acne Scars Revision",
    category: "medical",
    shortDescription: "Precision fractional laser skin rejuvenation to target deep-set rolling, boxcar, and icepick acne scars.",
    fullDescription: "Our fractional CO2 and Erbium laser therapy delivers micro-pulses of light to penetrate deep into the dermal skin layers. This triggers rapid natural healing and massive collagen remodeling. It is highly effective for reducing deep-set acne scars, surgical scars, persistent pigmentation, and aging lines.",
    duration: "45 mins",
    price: "Rs. 15,000",
    image: "/src/assets/images/laser_procedure_1784603065821.jpg",
    benefits: [
      "Visibly reduces deep acne scars and texture roughness",
      "Stimulates natural collagen production for up to 6 months",
      "Evens out skin tone and tightens sagging facial skin",
      "Safe and controlled with precision cooling technology"
    ],
    procedureSteps: [
      "Detailed professional skin scanning and depth assessment",
      "Application of a high-grade topical numbing ointment (30 mins)",
      "Precision laser application with concurrent skin cooling",
      "Post-procedure soothing serum and medical-grade sunscreen shield"
    ],
    skinTypes: ["Oily", "Combination", "Normal", "Mature"],
    recovery: "3-5 days of mild social downtime. Superficial microscopic crusts will form and shed naturally. Avoid sun exposure completely for 7 days.",
    faqs: [
      { q: "Is fractional CO2 painful?", a: "With our premium topical numbing ointment applied beforehand, patients report only a mild warm tingling sensation." },
      { q: "When will I see the full scar improvement?", a: "Initial collagen healing shows at 4 weeks, with structural remodeling continuing to smooth scars over 3-6 months." }
    ],
    beforeAfterImage: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&h=400&fit=crop"
  },
  {
    id: "eczema-management",
    name: "Clinical Eczema & Barrier Repair",
    category: "medical",
    shortDescription: "Dermatological therapies to calm inflammatory eczema, dry scaling, and intense skin itching.",
    fullDescription: "Atopic dermatitis and eczema are triggered by immune dysfunction and a compromised epidermal barrier. Dr. Faisal Ahmed designs localized steroid-sparing immunosuppressants, medical wet-wraps, and lipid-replenishing barrier formulas to eliminate cellular inflammation and secure cellular hydration.",
    duration: "30 mins",
    price: "Rs. 4,000",
    image: "/src/assets/images/skincare_vanity_1784603112992.jpg",
    benefits: [
      "Immediately relieves intense, sleep-disrupting itching",
      "Restores essential ceramides to repair cracked epidermal skin",
      "Regulates immune flares to prevent recurring red plaques",
      "Deeply hydrates severely dry, scaling skin tissue"
    ],
    procedureSteps: [
      "Transepidermal water loss (TEWL) testing and barrier check",
      "Application of active immunomodulatory creams under clinical supervision",
      "Infusion of medical lipid balms with soothing wet-dressings",
      "Formulation of personalized home care ceramide regimens"
    ],
    skinTypes: ["Dry", "Very Dry", "Extremely Sensitive", "Eczema-Prone"],
    recovery: "Immediate soothing relief. No downtime.",
    faqs: [
      { q: "Is this treatment safe for long term use?", a: "Yes. We avoid long-term potent topical steroids, focusing instead on immunomodulating topicals and barrier-building lipids." },
      { q: "Can eczema be cured?", a: "While eczema is a chronic condition, our customized protocol can maintain perfect, flare-free skin for years." }
    ]
  },
  {
    id: "psoriasis-therapy",
    name: "Chronic Psoriasis Care",
    category: "medical",
    shortDescription: "Specialized dermatologist care managing systemic plaques, scaling, and skin cell hyper-proliferation.",
    fullDescription: "Psoriasis causes skin cells to multiply up to 10 times faster than normal, building up into bumpy red plaques covered with silvery scales. We offer complete clinical management including systemic biological therapies, highly effective coal tar compounds, and localized corticosteroid monitoring.",
    duration: "40 mins",
    price: "Rs. 4,500",
    image: "/src/assets/images/skincare_vanity_1784603112992.jpg",
    benefits: [
      "Fades plaques and reduces thick, silvery scaling",
      "Controls over-proliferation of surface skin cells",
      "Relieves joint soreness associated with psoriatic symptoms",
      "Improves overall aesthetic quality of affected skin areas"
    ],
    procedureSteps: [
      "Plaque thickness and body surface area assessment",
      "Keratolytic preparation to gently remove stubborn build-up scales",
      "Targeted systemic dosage tailoring or highly focused topical dressing",
      "Long-term wellness charting and dietetic advice"
    ],
    skinTypes: ["Dry", "Thick", "Inflamed"],
    recovery: "Immediate reduction in scaling. Redness resolves gradually over 2-3 weeks.",
    faqs: [
      { q: "Are biological injectables available?", a: "Yes, Dr. Faisal Ahmed provides counseling and clinical prescribing of modern biological treatments for severe cases." }
    ]
  },
  {
    id: "fungal-infections",
    name: "Medical Anti-Fungal Therapy",
    category: "medical",
    shortDescription: "Rapid clinical treatment for ringworm, tinea versicolor, nail fungus, and candidiasis infections.",
    fullDescription: "Fungal infections can be incredibly persistent, especially in hot, humid climates. We provide precise skin scrapings and microscopic examinations to identify the exact fungal strain, allowing us to prescribe highly targeted medical antifungals and antifungal therapeutic washes.",
    duration: "30 mins",
    price: "Rs. 3,500",
    image: "/src/assets/images/skincare_vanity_1784603112992.jpg",
    benefits: [
      "Stops fungal growth and spreading instantly",
      "Eradicates itching, peeling, and skin discolorations",
      "Restores even skin color on discolored patches",
      "Provides complete clearance of deep nail fungus beds"
    ],
    procedureSteps: [
      "Clinical skin scraping and KOH preparation microscopy",
      "Targeted disinfection of active skin regions",
      "Prescription of combined systemic and high-strength topical azoles",
      "In-depth patient hygiene guidance to prevent recurrences"
    ],
    skinTypes: ["All Skin Types"],
    recovery: "Symptom relief within 48 hours. Full clearing depends on infection type (2-4 weeks for skin, longer for nails).",
    faqs: [
      { q: "Why does my fungal infection keep coming back?", a: "Infections recur if spores remain in shoes, clothes, or the skin barrier isn't fully treated. We ensure complete eradication." }
    ]
  },
  {
    id: "skin-allergies",
    name: "Allergy Testing & Relief",
    category: "medical",
    shortDescription: "Expert diagnosis and clinical treatments for contact dermatitis, hives, and chronic urticaria.",
    fullDescription: "When skin reacts to cosmetics, fragrances, metals, or fabrics, determining the allergen is crucial. We offer clinical diagnosis, patch testing referrals, and intensive soothing therapies to calm active skin hypersensitivity, swelling, and hives.",
    duration: "30 mins",
    price: "Rs. 3,800",
    image: "/src/assets/images/skincare_vanity_1784603112992.jpg",
    benefits: [
      "Stops severe allergic itching and skin hives rapidly",
      "Identifies the precise environmental or chemical triggers",
      "Soothes severe hives and swelling with intravenous antihistamines if required",
      "Creates a safe skin-care routine free of irritating ingredients"
    ],
    procedureSteps: [
      "Comprehensive patient lifestyle and contact allergen audit",
      "Application of cooling, anti-inflammatory therapeutic compresses",
      "Administration of non-sedating medical anti-histaminic therapies",
      "Provision of an 'Allergy-Safe' list of clinical soaps and moisturizers"
    ],
    skinTypes: ["Allergic", "Reactive", "Highly Sensitive"],
    recovery: "Hives and acute swelling typically settle within 12-24 hours.",
    faqs: [
      { q: "Can I use make-up after an allergic reaction?", a: "We advise pausing all cosmetics for 72 hours until the barrier fully seals, and then introducing approved hypoallergenic items." }
    ]
  },
  {
    id: "warts-removal",
    name: "Clinical Cryotherapy for Warts",
    category: "medical",
    shortDescription: "Instant cryo-ablation and radiofrequency treatment to safely eliminate viral warts.",
    fullDescription: "Warts are caused by the HPV virus on the skin surface. We offer quick, clinical cryotherapy (liquid nitrogen freezing) and radiofrequency electro-cautery to permanently ablate wart tissues. This prevents spreading and guarantees clean aesthetic healing.",
    duration: "20 mins",
    price: "Rs. 4,500",
    image: "/src/assets/images/laser_procedure_1784603065821.jpg",
    benefits: [
      "Provides immediate, sterile removal of viral lesions",
      "Minimizes the risk of viral spreading to other body parts",
      "Extremely quick procedure requiring zero surgical stitches",
      "Virtually zero scar formation when handled by Dr. Ayesha Malik"
    ],
    procedureSteps: [
      "Surgical sterilization of the treatment area",
      "Targeted application of liquid nitrogen gas or radiofrequency loop",
      "Excision of necrotic tissue under local anesthetic if necessary",
      "Application of medical antibiotic sealants"
    ],
    skinTypes: ["All Skin Types"],
    recovery: "Mild blistering may occur at the treated site, which drys and falls off in 5-7 days. Keep dry and bandaged.",
    faqs: [
      { q: "Does the cryotherapy freeze hurt?", a: "You will feel an intense cold pinch for about 10-15 seconds. It is highly tolerable and very fast." }
    ]
  },
  {
    id: "moles-evaluation",
    name: "Mole Mapping & Radiofrequency Removal",
    category: "medical",
    shortDescription: "Clinical mapping of moles and safe aesthetic removal using radiofrequency surgical loops.",
    fullDescription: "Moles should always be evaluated under a dermatoscope. We provide clinical screening for irregular moles and offer highly precise aesthetic removal using radiofrequency ablation, ensuring zero stitching and minimal downtime.",
    duration: "20 mins",
    price: "Rs. 6,000",
    image: "/src/assets/images/laser_procedure_1784603065821.jpg",
    benefits: [
      "Provides medical evaluation of mole borders for safety",
      "Delivers absolute flat, scarless removal of raised moles",
      "Utilizes radiofrequency loops that seal blood vessels instantly",
      "Extremely comfortable with local numbing injections"
    ],
    procedureSteps: [
      "Dermatoscopic digital mole-border mapping",
      "Infusion of a tiny local anesthetic under the mole",
      "Precise radiofrequency shaving or surgical flat-excision",
      "Pathology referral for biopsy if any atypical features are detected"
    ],
    skinTypes: ["All Skin Types"],
    recovery: "A small pink spot will remain for 7-10 days, healing into normal skin. Apply medical-grade ointment daily.",
    faqs: [
      { q: "Will the mole grow back?", a: "If the base cells are completely shaved off using radiofrequency, the mole is permanently removed in 98% of cases." }
    ]
  },

  // ==================== COSMETIC DERMATOLOGY ====================
  {
    id: "botox-wrinkles",
    name: "Anti-Wrinkle Botox Therapy",
    category: "cosmetic",
    shortDescription: "FDA-approved wrinkle-relaxing injections to eliminate forehead, frown, and crow's feet lines.",
    fullDescription: "Using premium, ultra-purified Botulinum Toxin Type A (Allergan Botox), Dr. Ayesha Malik precisely targets and relaxes the overactive muscles responsible for fine expression lines. This softens dynamic lines and delivers a completely refreshed, youthful, and naturally rested appearance.",
    duration: "25 mins",
    price: "Rs. 25,000",
    image: "/src/assets/images/facial_procedure_1784603091197.jpg",
    benefits: [
      "Softens deep forehead furrows, frown lines, and crow's feet",
      "Prevents static, permanent lines from setting into the skin",
      "Quick 15-minute treatment with zero downtime",
      "Subtle, natural muscle relaxation without the 'frozen' look"
    ],
    procedureSteps: [
      "Detailed dynamic muscle mapping during facial expressions",
      "Skin sanitization and local ice-anesthesia placement",
      "Injection using imported, microscopic Japanese needles",
      "Post-injection briefing on posture and facial movement"
    ],
    skinTypes: ["Normal", "Dry", "Oily", "Mature"],
    recovery: "Zero downtime. Do not lie down or massage the face for 4 hours post-procedure. Normal skincare can resume tomorrow.",
    faqs: [
      { q: "How long does Botox last?", a: "Results gradually appear over 3 to 7 days, peaking at 2 weeks, and typically last between 3 to 5 months." },
      { q: "Are there any side effects?", a: "Tiny, pin-prick red spots may appear at injection points, which completely fade away within 30 minutes." }
    ],
    beforeAfterImage: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600&h=400&fit=crop"
  },
  {
    id: "dermal-fillers",
    name: "Aesthetic Dermal Fillers",
    category: "cosmetic",
    shortDescription: "Premium hyaluronic acid fillers to restore volume to lips, cheeks, and jawlines.",
    fullDescription: "As the skin ages, it loses critical structural fat, collagen, and bone support. We utilize world-class, cohesive hyaluronic acid dermal fillers (Juvederm and Restylane) to restore natural cheek contours, plump deflated lip structures, and sculpt sharp jawlines instantly.",
    duration: "45 mins",
    price: "Rs. 38,000",
    image: "/src/assets/images/facial_procedure_1784603091197.jpg",
    benefits: [
      "Instantly plumps thin lips, restoring symmetrical contours",
      "Lifts sagging cheeks and softens deep nasolabial laugh lines",
      "Provides structured, sharp definition to chin and jawlines",
      "Intensifies skin hydration due to water-binding hyaluronic acid"
    ],
    procedureSteps: [
      "Facial proportion assessment and volume calculation",
      "Application of medical numbing gel and mapping of critical blood vessels",
      "Precise injection of filler material using a sterile blunt cannula",
      "Gentle modeling of filler to ensure perfectly smooth contours"
    ],
    skinTypes: ["All Skin Types", "Mature", "Dry"],
    recovery: "Very minimal swelling or minor bruising for 2-3 days. Avoid strenuous exercises and steam rooms for 48 hours.",
    faqs: [
      { q: "Is the filler permanent?", a: "No, hyaluronic acid fillers are completely biocompatible and slowly dissolve over 9 to 15 months." },
      { q: "What if I do not like the result?", a: "Hyaluronic acid is completely reversible. We can instantly dissolve it using a specialized enzyme called Hyaluronidase." }
    ]
  },
  {
    id: "premium-hydrafacial",
    name: "Premium Hydrafacial & Infusion",
    category: "cosmetic",
    shortDescription: "A multi-step medical facial that deeply cleanses, extracts impurities, and hydrates the skin.",
    fullDescription: "The Hydrafacial procedure uses a patented vortex-fusion delivery system to exfoliate, extract, and hydrate skin simultaneously. Our clinic enhances this standard treatment by infusing personalized, dermatologist-selected antioxidant serums, hyaluronic acids, and peptides tailored to your specific skin concerns.",
    duration: "60 mins",
    price: "Rs. 8,500",
    image: "/src/assets/images/facial_procedure_1784603091197.jpg",
    benefits: [
      "Instantly extracts blackheads, whiteheads, and deep sebum",
      "Imbues intense hydration leaving a dewy, glowing finish",
      "Minimizes enlarged pores and refines general skin texture",
      "Zero downtime; perfect for pre-event skin preparation"
    ],
    procedureSteps: [
      "Lactic acid exfoliation and active skin cleansing",
      "Gentle glycolic/salicylic peel for pore relaxation",
      "Automated vortex suction extraction of congested pores",
      "Intense antioxidant, peptide, and hyaluronic acid hydration infusion"
    ],
    skinTypes: ["All Skin Types", "Sensitive", "Dry", "Oily", "Acne-Prone"],
    recovery: "None. Instant, luminous skin brightness. Apply sunblock daily.",
    faqs: [
      { q: "Can I get this done on the day of an event?", a: "Yes! There is zero redness or peeling. It is the perfect 'red carpet' treatment to make makeup sit beautifully." }
    ]
  },
  {
    id: "chemical-peels",
    name: "Advanced Aesthetic Peels",
    category: "cosmetic",
    shortDescription: "Dermatologist-formulated chemical peels to brighten skin, treat active acne, and reverse sun damage.",
    fullDescription: "We offer customized chemical resurfacing peels (including Glycolic Acid, Salicylic Acid, TCA, and Yellow Peels) that gently remove dry, damaged outer skin layers. This triggers active cell renewal, uncovering a fresh, perfectly clear, and radiant complexion beneath.",
    duration: "30 mins",
    price: "Rs. 6,000",
    image: "/src/assets/images/skincare_vanity_1784603112992.jpg",
    benefits: [
      "Rapidly clears active acne lesions and reduces future breakouts",
      "Significantly fades melasma, dark spots, and sun freckles",
      "Enhances cellular turnover rate for fresh skin texture",
      "Customizable strength levels based on skin tolerance"
    ],
    procedureSteps: [
      "Double-cleansing and priming with a sebum-balancing solution",
      "Controlled application of the selected peel agent by Dr. Malik",
      "Neutralization and monitoring of skin response",
      "Application of hydrating skin-barrier recovery balm"
    ],
    skinTypes: ["Oily", "Acne-Prone", "Dull", "Hyperpigmented"],
    recovery: "Superficial flaking or peeling starting on day 3, finishing by day 6. Do not pull or scratch peeling skin.",
    faqs: [
      { q: "Is a chemical peel safe for dark Pakistani skin tones?", a: "Yes. Dr. Ayesha Malik carefully adjusts the depth and pH of the peels to prevent post-inflammatory hyperpigmentation (PIH)." }
    ]
  },
  {
    id: "microneedling-collagen",
    name: "Microneedling & Growth Factors",
    category: "cosmetic",
    shortDescription: "Clinical microneedling using sterile cartridges to infuse growth factors, repairing scars and pores.",
    fullDescription: "We utilize medical-grade automated microneedling pens (Dermapen 4) to create thousands of micro-channels in the epidermis. This triggers the skin's natural repair mechanisms and allows deep absorption of medical-grade growth factors, smoothing out large pores and rough textures.",
    duration: "50 mins",
    price: "Rs. 9,500",
    image: "/src/assets/images/facial_procedure_1784603091197.jpg",
    benefits: [
      "Restructures superficial scars and rough skin textures",
      "Visibly shrinks dilated, stretched pores",
      "Boosts natural elastin and collagen synthesis safely",
      "Infuses cell-regenerating growth factor serums deep into the dermis"
    ],
    procedureSteps: [
      "Deep facial cleansing and application of anesthetic cream (35 mins)",
      "Selection of treatment depth customized per facial zone (0.5mm - 2.5mm)",
      "Systematic pen passes while applying sterile growth factor serum",
      "Placement of a cooling hyaluronic sheet mask to reduce immediate redness"
    ],
    skinTypes: ["All Skin Types", "Combination", "Acne-Scattered", "Dull"],
    recovery: "Mild sunburn redness and tightness for 24-48 hours. Avoid makeup for 24 hours. Keep hydrated.",
    faqs: [
      { q: "Are the needles clean?", a: "We use only single-use, sterile, vacuum-sealed needle cartridges that are opened in front of the patient and discarded immediately after." }
    ]
  },
  {
    id: "laser-rejuvenation",
    name: "Carbon Laser Peel (Hollywood Peel)",
    category: "cosmetic",
    shortDescription: "Instant purification, pore-minimizing, and brightening utilizing carbon cream and Q-Switched laser.",
    fullDescription: "The Hollywood Carbon Laser Peel is a fast, highly effective clinical procedure. A thin layer of liquid carbon is applied to the face, which binds deep inside the pores. The Q-Switched laser is then passed over the skin, vaporizing the carbon particles along with dead cells, sebum, and blackheads instantly.",
    duration: "40 mins",
    price: "Rs. 10,000",
    image: "/src/assets/images/laser_procedure_1784603065821.jpg",
    benefits: [
      "Delivers instant luminous brightness and uniform skin tone",
      "Shatters deep pigment particles to fade dark spots",
      "Deeply purifies pores, clearing blackheads and whiteheads",
      "Stimulates inner collagen for subtle firming and tightening"
    ],
    procedureSteps: [
      "Face preparation and application of liquid organic carbon paste",
      "Allowing carbon paste to dry and absorb into pores (10 mins)",
      "Double pass Q-Switched Nd:YAG laser treatment to vaporize carbon",
      "Soothing skin hydration and application of broad-spectrum block"
    ],
    skinTypes: ["Oily", "Combination", "Normal", "Dull"],
    recovery: "Zero downtime. Skin feels incredibly smooth and bright immediately. Perfect pre-party treatment.",
    faqs: [
      { q: "Is the carbon laser peel painful?", a: "No. You will hear a loud popping sound as the laser meets the carbon and feel a mild warm snap. It is painless." }
    ]
  },
  {
    id: "skin-brightening",
    name: "Glutathione & Vitamin C Infusion",
    category: "cosmetic",
    shortDescription: "Premium antioxidant infusions to detoxify skin, brighten complexions, and reduce melanin synthesis.",
    fullDescription: "Our skin-brightening infusion features medical-grade glutathione (a powerful antioxidant) combined with high-dose Vitamin C. Administered intravenously under strict clinical supervision, it neutralizes free radicals and inhibits the tyrosinase enzyme to promote overall skin glow.",
    duration: "45 mins",
    price: "Rs. 12,000",
    image: "/src/assets/images/skincare_vanity_1784603112992.jpg",
    benefits: [
      "Brightens skin color and fades dark spots across the entire body",
      "Improves liver detoxification and cellular vitality",
      "Neutralizes heavy oxidative stress from air pollution and UV light",
      "Promotes a healthy, radiant, glowing complexion"
    ],
    procedureSteps: [
      "Clinical evaluation of medical history, blood pressure, and kidney markers",
      "Custom formulation of sterile antioxidants in a saline drip",
      "Slow, comfortable IV administration in a relaxing private suite (30 mins)",
      "Post-infusion monitoring and hydration guidance"
    ],
    skinTypes: ["All Skin Types", "Dull", "Hyperpigmented"],
    recovery: "Zero downtime. Resume all daily tasks immediately.",
    faqs: [
      { q: "How many sessions are recommended for visible glow?", a: "Most patients notice systemic skin hydration and clarity after 4 to 6 weekly sessions." }
    ]
  },
  {
    id: "anti-aging-hifu",
    name: "HIFU Non-Surgical Facelift",
    category: "cosmetic",
    shortDescription: "High-Intensity Focused Ultrasound (HIFU) to lift, sculpt, and tighten sagging jawlines and neck skin.",
    fullDescription: "HIFU is an advanced, non-invasive cosmetic treatment. It delivers highly focused ultrasound waves deep into the SMAS layer (the structural muscle layer targeted during surgical facelifts). This triggers localized thermal coagulation, resulting in immediate tightening and a dramatic collagen lift.",
    duration: "75 mins",
    price: "Rs. 30,000",
    image: "/src/assets/images/laser_procedure_1784603065821.jpg",
    benefits: [
      "Drastically tightens sagging neck skin (turkey neck) and double chins",
      "Lifts drooping brow areas and sharpens soft jawlines",
      "Requires absolutely zero needles, cuts, or surgical stitching",
      "Results continue to improve for 3 months as collagen rebuilds"
    ],
    procedureSteps: [
      "Facial assessment and clinical marking of target vector pathways",
      "Application of medical conductive ultrasound gel",
      "Systematic delivery of focused ultrasound pulses at 3.0mm and 4.5mm depths",
      "Post-treatment soothing massage and cold compress placement"
    ],
    skinTypes: ["Mature", "Normal", "Dry", "Combination"],
    recovery: "Zero downtime. Minor muscle tenderness or light swelling may persist for 2-3 days under the jawline.",
    faqs: [
      { q: "How many HIFU sessions do I need?", a: "Just one single session can deliver amazing results that last between 12 to 18 months." }
    ]
  },

  // ==================== HAIR TREATMENTS ====================
  {
    id: "hair-loss-consult",
    name: "Medical Hair Loss Management",
    category: "hair",
    shortDescription: "Comprehensive diagnostic assessment and clinical prescriptions to stop active shedding and thinning.",
    fullDescription: "Male and female pattern baldness, alopecia, and stress shedding (telogen effluvium) require structured clinical diagnosis. Dr. Faisal Ahmed analyzes your follicular density, hormone profiles, and mineral statuses to draft a medical program featuring advanced topical blockades, growth stimulants, and nutritional plans.",
    duration: "30 mins",
    price: "Rs. 3,500",
    image: "/src/assets/images/dr_ahmed_dermatologist_1784604001974.jpg",
    benefits: [
      "Stops active hair fall and shedding in as little as 3 weeks",
      "Blocks follicular-miniaturizing dihydrotestosterone (DHT) hormones",
      "Revitalizes sleeping hair roots to support active regrowth",
      "Strengthens thin, fragile hair shafts from the core"
    ],
    procedureSteps: [
      "Digital video-microscopy trichoscopy of the scalp",
      "Evaluation of blood markers for vitamin deficiencies and hormones",
      "Drafting of customized clinical prescription topicals and anti-DHT supplements",
      "Long-term density tracking on a 30-day interval schedule"
    ],
    skinTypes: ["All Skin Types"],
    recovery: "None. Simple clinical consultation and prescription.",
    faqs: [
      { q: "Will I lose my hair if I stop the treatment?", a: "Androgenetic alopecia requires maintenance. We design easy, budget-friendly long-term plans to preserve your results indefinitely." }
    ],
    beforeAfterImage: "https://images.unsplash.com/photo-1566616213894-2d4e1baee5d8?q=80&w=600&h=400&fit=crop"
  },
  {
    id: "hair-prp",
    name: "Advanced Scalp PRP Therapy",
    category: "hair",
    shortDescription: "Platelet-Rich Plasma (PRP) scalp micro-injections using growth factors to reverse hair thinning.",
    fullDescription: "PRP is a natural medical therapy that utilizes the healing power of your own blood platelets. We draw a small sample of your blood, place it in a high-speed centrifuge to isolate the platelets, and inject the concentrated growth factors into thinning areas of the scalp, reviving dormant hair follicles.",
    duration: "45 mins",
    price: "Rs. 9,000",
    image: "/src/assets/images/dr_ahmed_dermatologist_1784604001974.jpg",
    benefits: [
      "Substantially reverses hair thinning and strengthens weak follicles",
      "100% natural and safe with zero risk of allergic reactions",
      "Significantly increases the volume and thickness of individual hair shafts",
      "Accelerates healing and hair growth after hair transplants"
    ],
    procedureSteps: [
      "Drawing a small sample of blood into a sterile gel-barrier tube",
      "Double-centrifugation to isolate platelet-rich plasma",
      "Scalp sanitation and application of cooling numbing spray",
      "Precise micro-injections into the dermal layer of the scalp"
    ],
    skinTypes: ["All Skin Types"],
    recovery: "Very minor scalp tightness or tenderness for 12 hours. Do not wash your hair or exercise for 24 hours.",
    faqs: [
      { q: "How many sessions are recommended?", a: "We recommend an initial series of 3 to 4 sessions, spaced 4 weeks apart, followed by maintenance every 6 months." }
    ]
  },
  {
    id: "scalp-analysis",
    name: "Trichoscopy Scalp Analysis",
    category: "hair",
    shortDescription: "High-definition video trichoscopy to analyze scalp health, sebum build-up, and hair density.",
    fullDescription: "A healthy scalp is the foundation of thick hair. Utilizing a high-resolution, computerized trichoscope that magnifies the scalp up to 200 times, we analyze sebum congestion, hair follicle grouping, dry scaling, and scalp circulation.",
    duration: "30 mins",
    price: "Rs. 3,000",
    image: "/src/assets/images/dr_ahmed_dermatologist_1784604001974.jpg",
    benefits: [
      "Provides clear visual evidence of scalp health and follicle blockage",
      "Differentiates between various forms of hair loss with high accuracy",
      "Identifies fungal, bacterial, or inflammatory scalp issues early",
      "Enables precise tracking of follicle density improvements"
    ],
    procedureSteps: [
      "Sectioning of the scalp into key reference areas",
      "Scanning with a high-definition polarization trichoscope camera",
      "Analysis of follicle density and shaft thickness measurements",
      "Creation of a personalized scalp-cleansing and care plan"
    ],
    skinTypes: ["All Skin Types"],
    recovery: "None. Totally non-invasive digital scan.",
    faqs: [
      { q: "Is a scalp scan necessary before PRP?", a: "Yes. Understanding your follicle viability ensures that PRP will be highly effective for your specific condition." }
    ]
  },
  {
    id: "hair-restoration-transplant",
    name: "Micro-FUE Hair Restoration",
    category: "hair",
    shortDescription: "State-of-the-art Follicular Unit Extraction (FUE) transplant for natural, lifelong hair restoration.",
    fullDescription: "For advanced hair loss, Micro-FUE transplantation is the gold standard. Led by Dr. Faisal Ahmed, our surgical team extracts individual healthy hair grafts from the donor area (back of head) and implants them into thinning areas with natural angles and maximum density, guaranteeing permanent, lifelong growth.",
    duration: "300 mins",
    price: "Rs. 95,000",
    image: "/src/assets/images/dr_ahmed_dermatologist_1784604001974.jpg",
    benefits: [
      "Permanently restores receding hair lines and balding crowns",
      "Grows completely natural-looking hair that can be cut, washed, and styled",
      "Utilizes micro-punches that leave tiny, invisible pin-point scars",
      "Extremely comfortable procedure with local anesthesia"
    ],
    procedureSteps: [
      "Symmetric hairline design aligned with your facial structure",
      "Local anesthetic administration to ensure a pain-free session",
      "Extraction of donor grafts using precision computerized micro-punches",
      "Implantation of grafts with strict attention to hair angle and density"
    ],
    skinTypes: ["All Skin Types"],
    recovery: "7-10 days of social recovery. Tiny scabs will form and shed naturally. Detailed post-operative wash instructions provided.",
    faqs: [
      { q: "Is a hair transplant permanent?", a: "Yes. Grafts taken from the back of the head are genetically immune to DHT hormones and will grow for a lifetime." }
    ]
  }
];

export const BLOG_POSTS = [
  {
    id: "prevent-acne",
    title: "How to Prevent Acne: 5 Clinically Proven Skincare Rules",
    author: "Dr. Ayesha Malik",
    date: "2026-07-15",
    category: "Acne Care",
    summary: "Acne can be stubborn, but understanding sebum chemistry and cellular turnover can unlock perfectly clear skin. Discover 5 key rules recommended by clinical dermatologists.",
    content: "Acne Vulgaris is not simply a cosmetic annoyance—it is a chronic, inflammatory medical disorder of the pilosebaceous unit. To prevent breakouts effectively, follow these 5 rules:\n\n1. **Stop Scrubbing Your Skin**: Aggressive physical scrubs cause microscopic tears, which trigger inflammatory responses and worsen active acne.\n2. **Use Salicylic Acid (BHA)**: This oil-soluble acid penetrates deep into follicles to dissolve dead skin cells and sebum plugs.\n3. **Moisturize Oily Skin**: Dehydrated skin triggers overactive sebaceous glands, resulting in even more oil. Opt for oil-free, non-comedogenic gel moisturizers.\n4. **Never Pop Lesions**: Popping pushes infection deeper into the dermis, leaving stubborn scars.\n5. **Introduce Topical Retinoids**: Retinoids accelerate skin cell turnover, keeping pores clear before acne can form.",
    image: "/src/assets/images/skincare_vanity_1784603112992.jpg",
    readTime: "5 min read"
  },
  {
    id: "sunscreen-guide",
    title: "Choosing the Right Sunscreen for Pakistani Skin Tones",
    author: "Dr. Ayesha Malik",
    date: "2026-07-08",
    category: "Sun Protection",
    summary: "Pakistan's intense sun exposure causes hyperpigmentation, melasma, and premature aging. Learn how to select a sunscreen that protects your skin without leaving a white cast.",
    content: "In South Asia, UV radiation is extremely intense year-round. Choosing a sunscreen requires careful consideration:\n\n* **Look for Broad-Spectrum**: Ensure protection against both UVB (burning rays) and UVA (aging rays).\n* **SPF 50+ & PA+++**: Pakistan's climate demands high protection. PA+++ ratings guarantee excellent protection against UVA rays, which cause melasma.\n* **Avoid the White Cast**: Many physical sunblocks containing zinc oxide leave a pasty white film on olive skin tones. Look for modern hybrid formulas or tinted mineral sunscreens that blend seamlessly.\n* **Match Your Skin Type**: Gel or fluid sunscreens are perfect for oily, humid summers, while rich creams are ideal for dry winter months.",
    image: "/src/assets/images/skincare_vanity_1784603112992.jpg",
    readTime: "4 min read"
  },
  {
    id: "anti-aging-tips",
    title: "Anti-Aging Skincare: When to Start and What Actually Works",
    author: "Dr. Ayesha Malik",
    date: "2026-06-28",
    category: "Anti-Aging",
    summary: "When it comes to anti-aging, prevention is much easier than correction. Learn about the science of collagen and which clinical ingredients are proven to reverse wrinkles.",
    content: "Natural collagen production starts to decline by approximately 1% each year after the age of 25. An effective anti-aging routine focuses on three pillars:\n\n1. **Protection (Daily SPF)**: 90% of skin aging is caused by UV rays. Daily sunscreen is your best defense against wrinkles.\n2. **Correction (Retinol/Retinoids)**: Retinoids are the gold standard in anti-aging, proven to stimulate collagen and smooth skin texture.\n3. **Hydration (Hyaluronic Acid & Peptides)**: Peptides act as cell messengers to signal collagen production, while hyaluronic acid plumps fine lines.\n\nIn your 40s and 50s, combining home-care topicals with clinical procedures like HIFU or Botox yields the most natural, youthful results.",
    image: "/src/assets/images/facial_procedure_1784603091197.jpg",
    readTime: "6 min read"
  },
  {
    id: "laser-guide",
    title: "The Ultimate Guide to Laser Skin Rejuvenation",
    author: "Dr. Ayesha Malik",
    date: "2026-06-15",
    category: "Laser Science",
    summary: "Confused about fractional lasers, carbon peels, and Nd:YAG? We break down the differences, recovery times, and expected outcomes.",
    content: "Laser technologies have transformed modern dermatology. Here's a quick guide to choosing the right laser treatment:\n\n* **Fractional CO2 Laser**: Best for deep acne scars, surgical scars, and intense skin tightening. It creates microscopic treatment zones, leaving surrounding skin intact for rapid healing. Downtime: 3-5 days.\n* **Q-Switched Nd:YAG Laser**: Ideal for treating hyperpigmentation, melasma, and tattoo removal. It shatters pigment particles without heat damage. Downtime: None.\n* **Carbon Laser (Hollywood Peel)**: Explodes organic carbon particles off the skin surface to clear blackheads, shrink pores, and give an instant glow. Downtime: None.",
    image: "/src/assets/images/laser_procedure_1784603065821.jpg",
    readTime: "6 min read"
  },
  {
    id: "winter-skincare",
    title: "Winter Skincare: Lock in Moisture & Prevent Flaking",
    author: "Dr. Faisal Ahmed",
    date: "2025-12-02",
    category: "Seasonal Care",
    summary: "Cold, dry winds strip skin of its natural lipids. Dr. Faisal Ahmed shares his protocol to transition your skincare from summer to winter safely.",
    content: "Winter humidity drop dries out the skin barrier, leading to eczema flares, redness, and flaking skin. Adjust your routine:\n\n* **Swap Gel for Cream**: Move away from lightweight gel cleansers and moisturizers toward barrier-repairing creams containing ceramides, cholesterol, and fatty acids.\n* **Reduce Exfoliation**: Gently lower your acid usage (salicylic/glycolic) to prevent over-drying an already fragile skin barrier.\n* **Apply on Damp Skin**: Apply your hyaluronic acid serums on slightly damp skin to trap moisture inside the cells.",
    image: "/src/assets/images/skincare_vanity_1784603112992.jpg",
    readTime: "4 min read"
  },
  {
    id: "summer-skincare",
    title: "Summer Skincare: Combatting Humidity & Extreme Sebum",
    author: "Dr. Faisal Ahmed",
    date: "2026-05-18",
    category: "Seasonal Care",
    summary: "Faisalabad's hot and humid summer months can lead to congested pores and acne breakouts. Keep your skin clear and oil-free.",
    content: "In extreme heat, sweat and oil combine to clog pores and cause severe breakouts. Implement these summer adjustments:\n\n* **Salicylic Acid Wash**: Use a 2% salicylic cleanser in the morning to dissolve sebum and clear pore congestion.\n* **Ultra-Light Hydration**: Choose weightless, oil-free water gels or hyaluronic acid serums instead of heavy moisturizers.\n* **Non-Greasy Sunscreen**: Opt for fluid, dry-touch, or matte-finish chemical sunscreens that won't clog your pores.",
    image: "/src/assets/images/skincare_vanity_1784603112992.jpg",
    readTime: "4 min read"
  },
  {
    id: "common-skin-diseases",
    title: "Understanding Psoriasis, Eczema, and Fungal Skin Diseases",
    author: "Dr. Faisal Ahmed",
    date: "2026-04-12",
    category: "Medical Dermatology",
    summary: "Not all red, scaling rashes are the same. Learn how to differentiate between eczema, psoriasis, and common fungal skin infections.",
    content: "Misdiagnosing skin conditions often leads to using incorrect treatments that can worsen symptoms. Let's look at the key differences:\n\n* **Eczema**: Characterized by dry, intensely itchy, red patches, commonly found inside elbows or behind knees. It is caused by an immune response and a weak skin barrier.\n* **Psoriasis**: Presents as raised, thick red plaques covered in dry, silvery scales, often on elbows, knees, or the scalp. It is caused by rapid skin cell over-growth.\n* **Fungal Infection**: Often features circular, red, itchy rashes with raised, scaly borders (ringworm) or light/dark discolored spots on chest (tinea versicolor). It requires specific antifungal topicals rather than steroids.",
    image: "/src/assets/images/skincare_vanity_1784603112992.jpg",
    readTime: "7 min read"
  },
  {
    id: "hair-care-advice",
    title: "Dermatologist Advice for Stopping Hair Loss & Regrowing Density",
    author: "Dr. Faisal Ahmed",
    date: "2026-07-02",
    category: "Hair Care",
    summary: "Hair thinning is highly reversible when caught early. Learn the difference between scalp shedding and permanent follicular miniaturization.",
    content: "Trichology, the study of hair and scalp health, tells us that 85% of hair loss is treatable. Focus on these three essentials:\n\n1. **Stop Stress Shedding (Telogen Effluvium)**: Physical or emotional stress pushes hair follicles into a resting phase, causing sudden shedding 3 months later. This is reversible with vitamins, iron, and stress management.\n2. **Inhibit DHT (Androgenetic Alopecia)**: Genetic hair loss is caused by dihydrotestosterone (DHT) shrinking hair roots. Medical DHT blockers (like finasteride or saw palmetto) are required to stop this.\n3. **Stimulate Blood Flow (PRP & Minoxidil)**: Micro-injections of Platelet-Rich Plasma (PRP) deliver highly concentrated growth factors that reactivate dormant hair roots, promoting thick, healthy hair growth.",
    image: "/src/assets/images/dr_ahmed_dermatologist_1784604001974.jpg",
    readTime: "5 min read"
  }
];

export const GENERAL_FAQS = [
  {
    q: "Do I need to book an appointment beforehand?",
    a: "Yes, to ensure high standards of care and zero waiting times, we operate strictly by appointment. You can easily schedule your consultation through our online booking tool or patient portal."
  },
  {
    q: "Is laser treatment painful?",
    a: "Our advanced lasers feature built-in cooling systems that soothe the skin. For deeper procedures like Fractional CO2, we apply a high-strength medical numbing cream for 30 minutes, ensuring the treatment is comfortable and painless."
  },
  {
    q: "What is the consultation fee at Doc+ Dermatology?",
    a: "Our basic diagnostic skin or scalp consultation is Rs. 1,500. However, if you proceed with any clinical procedure on the same day, the consultation fee is fully waived."
  },
  {
    q: "How long does a typical treatment take?",
    a: "Most clinical procedures, like Hydrafacials or Peels, take between 30 to 60 minutes. Advanced laser sessions may take 45 to 60 minutes including numbing preparation. Hair transplants are a full-day outpatient procedure taking 5-6 hours."
  },
  {
    q: "Are cosmetic treatments safe for long-term health?",
    a: "Absolutely. All injectables (Botox, fillers) and laser treatments at our clinic are FDA-approved and administered by certified medical dermatologists, ensuring complete safety with zero long-term side effects."
  },
  {
    q: "Which payment methods are accepted?",
    a: "We accept Cash, Direct Bank Transfers, EasyPaisa, JazzCash, and all major Debit/Credit Cards (Visa/Mastercard) at our Faisalabad clinic reception."
  }
];

export const GALLERY_ITEMS = [
  { id: "g1", category: "interior", title: "Modern Clinical Reception", imageUrl: "/src/assets/images/clinic_interior_1784604026769.jpg" },
  { id: "g2", category: "interior", title: "Private Patient Consultation Suite", imageUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=600&h=400&fit=crop" },
  { id: "g3", category: "treatment_rooms", title: "Surgical Sterilized Procedure Room", imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=600&h=400&fit=crop" },
  { id: "g4", category: "equipment", title: "FDA-Approved Fractional Laser Tech", imageUrl: "/src/assets/images/laser_procedure_1784603065821.jpg" },
  { id: "g5", category: "equipment", title: "Computerized Trichoscopy Scalp Analyzer", imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=600&h=400&fit=crop" },
  { id: "g6", category: "before_after", title: "Acne Scars Improvement (3 Sessions CO2)", imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&h=400&fit=crop" },
  { id: "g7", category: "before_after", title: "Skin Brightening & Glow (Hydrafacial)", imageUrl: "/src/assets/images/facial_procedure_1784603091197.jpg" },
  { id: "g8", category: "team", title: "Dermatologist Panel", imageUrl: "/src/assets/images/dr_ahmed_dermatologist_1784604001974.jpg" }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Zainab Fatima",
    treatmentName: "Fractional Acne Scars Revision",
    rating: 5,
    text: "The fractional laser treatments completely changed my confidence. My deep rolling acne scars on my cheeks are almost completely flat now. Dr. Malik is incredibly precise and reassuring!",
    date: "2026-06-20"
  },
  {
    id: "t2",
    name: "Kamran Shah",
    treatmentName: "Micro-FUE Hair Restoration",
    rating: 5,
    text: "I was extremely self-conscious about my receding hairline. Dr. Faisal Ahmed and his transplant team were outstanding. The local anesthesia was painless, and now my hairline looks incredibly natural.",
    date: "2026-05-14"
  },
  {
    id: "t3",
    name: "Ayesha Malik (Sargodha)",
    treatmentName: "Premium Hydrafacial & Infusion",
    rating: 5,
    text: "The absolute best aesthetic facial I have ever had. The skin scanning is very scientific, and they customize the serums. My skin was glowing for over two weeks with zero redness!",
    date: "2026-07-01"
  }
];
