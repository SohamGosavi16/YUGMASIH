/**
 * YUGMA — Living Cultural Tradition Dataset
 * State 01: Maharashtra — Lavani
 */

const state_01_data = {
  id: "state_01",
  state: "Maharashtra",
  tradition: "Lavani",
  category: "Living Cultural Tradition",
  region: "Western India",
  origin: "Evolved in the 17th and 18th centuries in the Maratha Empire, flourishing particularly during the reign of the Peshwas in Pune and Satara. Originally performed to boost the morale of Maratha soldiers, it seamlessly synthesized classic Sanskrit theatre elements with robust folk rhythms.",
  period: "17th–18th Century CE (Peshwa Era) to Present",
  description: "Lavani is an exhilarating, rhythmic dance and musical performance tradition of Maharashtra that combines poetry, theatrical expression, sensuous elegance, and lightning-fast footwork. Derived from the Marathi word 'Lavanya' meaning beauty and charm, Lavani is traditionally performed to the thunderous beats of the dual-headed Dholki drum. Dancers enact dramatic stories of romance, social satire, devotion, and historical valor with acute facial expressions, rapid pirouettes, and energetic hip movements. As both a village theatrical spectacle (Tamasha) and a revered classical stage art, Lavani serves as a dynamic living archive of Maharashtra's socio-political history and feminist artistic expression, celebrating resilience, female agency, and vibrant communal joy across centuries.",
  culturalRole: "Lavani holds an indispensable role in Maharashtra's rural society and working-class entertainment through Tamasha folk theatre. It historically served as psychological and spiritual rejuvenation for Maratha warriors returning from campaigns. Today, it stands as a celebrated platform for female artistic expression, social commentary, and theatrical storytelling, bridging rural agrarian celebrations with contemporary urban concert halls.",
  festivalConnection: "Ganesh Chaturthi, Gudi Padwa (Marathi New Year), Narali Purnima, and regional village pilgrimage fairs (Jatras) across Maharashtra.",
  heritageConnection: "Ajanta and Ellora Caves (celebrating ancient sculptural dance postures and apsaras) and historic Maratha fortifications such as Raigad Fort and Shaniwar Wada in Pune, where royal Lavani baithaks were famously hosted.",
  costume: "The iconic Nauvari (nine-yard) bright silk Paithani saree draped in the traditional Kashta pant-style, allowing expansive athletic footwork. Adorned with a Maharashtrian crescent Chandrarekha bindi, traditional pearl and ruby Nath (nose ring), Kolhapuri Saaj gold necklace, green glass bangles, and heavy brass Ghungroo (ankle bells) weighing over a kilogram on each leg.",
  music: "High-tempo folk melody driven by rapid Dholki syncopation, characterized by quick crescendos (Kavith), dramatic vocal call-and-response, and poignant Sringara (romantic) and Bhakti (devotional) poetic compositions.",
  instruments: [
    "Dholki (two-headed barrel drum)",
    "Manjira (brass hand cymbals)",
    "Tuntune (single-string rhythmic drone)",
    "Halgi (circular frame drum)",
    "Harmonium"
  ],
  facts: [
    "The word 'Lavani' originates from 'Lavanya', which translates to 'grace, charm, and beauty' in Sanskrit.",
    "During the late 18th century, Peshwa Baji Rao II was an ardent patron of Lavani, elevating it from battlefield camps to royal court baithaks.",
    "Lavani is divided into two distinct genres: Nirguni (philosophical and spiritual) and Shringari (romantic, celebratory, and theatrical).",
    "A professional Lavani dancer's Ghungroos can weigh between 1.5 to 2.5 kilograms per foot, requiring exceptional stamina.",
    "Lavani poetry traditionally served as news dissemination and social commentary across rural Maharashtra.",
    "The tradition remains the artistic core of Tamasha, Maharashtra's historic traveling folk theatre."
  ],
  objects: [
    "Nine-yard Paithani Silk Nauvari Saree with intricate peacock gold borders",
    "Carved wooden Dholki with goatskin parchment and cotton tuning ropes",
    "Multi-layered Brass Ghungroo ankle bell cords",
    "Maharashtrian Crescent Pearl Nath (nose jewel)",
    "Brass Tuntune acoustic resonator"
  ],
  modelPath: null,
  thumbnail: "assets/thumbnails/lavani.jpg",
  videoUrl: "https://www.youtube-nocookie.com/embed/Kh4MU4EonkI",
  youtubeId: "Kh4MU4EonkI",
  videoTitle: "Maharashtra — Lavani Cultural Showcase",
  arVrPotential: "Spatial full-body volumetric motion capture can allow users to stand side-by-side with a master Lavani artist, studying intricate mudras, micro-facial expressions (abhinaya), and syncopated Dholki step mechanics in interactive 1:1 scale AR.",
  threeDExperience: "In this 3D studio, explore the sacred volumetric geometry of the Lavani performance mandala: observing the kinetic trajectory of the Paithani nine-yard drape, the resonant acoustic proportions of the handcrafted Dholki, and the rhythmic weight distribution of ceremonial brass ghungroos."
};

if (typeof window !== 'undefined') {
  window.YUGMA_STATES_DATA = window.YUGMA_STATES_DATA || {};
  window.YUGMA_STATES_DATA["state_01"] = state_01_data;
  window.YUGMA_STATES_DATA["maharashtra"] = state_01_data;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = state_01_data;
}
