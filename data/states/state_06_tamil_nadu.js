/**
 * YUGMA — Living Cultural Tradition Dataset
 * State 06: Tamil Nadu — Bharatanatyam
 */

const state_06_data = {
  id: "state_06",
  state: "Tamil Nadu",
  tradition: "Bharatanatyam",
  category: "Living Cultural Tradition",
  region: "Southern India",
  origin: "Evolved from the ancient sacred dance 'Sadir Natyam' performed by Devadasis in the towering granite temple sanctums of Tamil Nadu. Deeply codified in Bharata Muni's 2nd-century BCE Sanskrit treatise Natya Shastra and the Tamil epic Silappatikaram, it achieved royal imperial zenith under the Chola kings and the Tanjore Quartet in the 18th–19th centuries.",
  period: "2nd Century BCE (Sangam Era) to 10th Century CE (Chola Apex) to Present",
  description: "Bharatanatyam is one of the world's most sophisticated and geometrically rigorous classical dance forms, revered as the visual manifestation of Carnatic music and temple sculpture brought to life. Characterized by crisp linear lines, sharp dynamic angles, the foundational demi-plié posture (Araimandi), complex rhythmic foot-strikes (Adavus), and elaborate hand mudras (Hastas), the dance communicates both pure abstract rhythm (Nritta) and profound emotional poetry (Abhinaya). The performer embodies the human soul's longing for union with the Supreme Divine through poetic padams, varnams, and tillanas. In ancient times, the 108 Karanas (sculpted dance postures) were immortalized into the granite walls of the Brihadisvara Temple and Chidambaram Nataraja Temple, serving as an eternal stone manual for dancers across millenniums.",
  culturalRole: "Bharatanatyam serves as the spiritual and aesthetic pillar of Tamil culture. Originally performed as a daily sacred offering (Upachara) to temple deities, it underwent a historic cultural renaissance in the 1930s led by Rukmini Devi Arundale and E. Krishna Iyer, evolving from temple courtyards to a globally celebrated benchmark of classical discipline, philosophy, and architectural harmony.",
  festivalConnection: "Natyanjali Dance Festival (held annually during Maha Shivaratri at Chidambaram and Thanjavur), Chennai Margazhi Music & Dance Season, Pongal, and Chidambaram Brahmotsavam.",
  heritageConnection: "Brihadisvara Temple in Thanjavur (where 81 of the 108 Karanas are sculpted along the first tier of the vimana), Shore Temple of Mamallapuram, and the Nataraja Temple of Chidambaram.",
  costume: "Opulent Kanchipuram pure silk saree tailored with an accordion-pleated pleated front fan that spreads dramatically like peacock plumage during Araimandi postures. Adorned with Temple Jewelry (headpieces of Surya and Chandra, Mattal, Jhumkas, Oddiyanam gold waist belt), Alta red dye on palms and feet, and dense cords of tuned brass Salangai (bells).",
  music: "Carnatic classical music governed by the complex mathematical Tala cycles (Adi Tala, Rupaka Tala) and melodic Ragas, directed live by the Nattuvanar wielding bronze cymbals.",
  instruments: [
    "Mridangam (double-sided Carnatic percussion drum)",
    "Nattuvangam / Talam (pair of thick bronze cymbals)",
    "Flute (Carnatic bamboo flute)",
    "Violin (adapted into the Carnatic classical tradition)",
    "Veena"
  ],
  facts: [
    "The 108 Karanas of Natya Shastra are intricately carved in stone reliefs on the grand Gopurams of Chidambaram and the sanctum of Brihadisvara Temple.",
    "The acronym 'BHA-RA-TA' is traditionally understood as: BHAva (emotion), RAga (melody), and TAla (rhythm).",
    "The Tanjore Quartet (four royal court musician brothers in the 19th century) formalized the modern Margam concert format (Alarippu to Tillana).",
    "Dancers apply red Alta (or Maruthani) dye to fingertips, palms, and feet to highlight intricate mudras and foot stamps under temple oil lamps.",
    "The Araimandi posture creates an equilateral triangle between the knees and pelvic center, mirroring the sacred Yantra geometry of Dravidian temple architecture.",
    "Bharatanatyam is considered a fire dance (representing the element Agni), symbolizing the divine dancing fire of Lord Nataraja."
  ],
  objects: [
    "Pleated Kanchipuram Silk Costume with real Zari gold brocade border",
    "Set of handcrafted 24-karat gold-plated Temple Jewelry with ruby cabochons",
    "Heavy bronze Nattuvangam cymbals with wooden mallet",
    "Carved jackwood Mridangam drum with concentric leather rings",
    "Traditional Salangai leather ankle pads fitted with triple rows of brass bells"
  ],
  modelPath: null,
  thumbnail: "assets/thumbnails/bharatanatyam.jpg",
  videoUrl: "https://www.youtube-nocookie.com/embed/2-9Lt01xY-k",
  youtubeId: "2-9Lt01xY-k",
  videoTitle: "Tamil Nadu — Bharatanatyam Classical Showcase",
  arVrPotential: "Interactive 3D anatomical skeletal rigs can demonstrate the precise 45-degree and 90-degree geometric joint alignments of the Araimandi and Muzhumandi postures, comparing user camera input to master temple sculptured angles.",
  threeDExperience: "In this 3D studio, discover the architectural symmetry of Bharatanatyam: observing how the flared Kanchipuram silk pleats accentuate the geometric Araimandi posture, alongside the acoustic resonance of the Jackwood Mridangam and hand-forged bronze Nattuvangam cymbals."
};

if (typeof window !== 'undefined') {
  window.YUGMA_STATES_DATA = window.YUGMA_STATES_DATA || {};
  window.YUGMA_STATES_DATA["state_06"] = state_06_data;
  window.YUGMA_STATES_DATA["tamil_nadu"] = state_06_data;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = state_06_data;
}
