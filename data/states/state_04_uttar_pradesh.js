/**
 * YUGMA — Living Cultural Tradition Dataset
 * State 04: Uttar Pradesh — Kathak
 */

const state_04_data = {
  id: "state_04",
  state: "Uttar Pradesh",
  tradition: "Kathak",
  category: "Living Cultural Tradition",
  region: "Northern India",
  origin: "Originating with ancient wandering bards known as 'Kathakars' (storytellers) who recited Sanskrit epics and Puranic legends with mime, song, and gesture in temple courtyards across the Gangetic plains. It later received magnificent royal patronage in the Mughal courts and Awadh royal darbars of Lucknow, synthesizing Hindu devotional storytelling with refined Persian aesthetic courtliness.",
  period: "Ancient roots (4th Century BCE Natya Shastra) through 16th–19th Century CE Golden Age to Present",
  description: "Kathak is one of India's preeminent classical dance forms, distinguished by intricate, lightning-fast footwork (Tatkar), rapid multi-rotational pirouettes (Chakkars), nuanced mime (Abhinaya), and subtle eye and eyebrow expressions. Governed by the ancient adage 'Katha Kahe So Kathak Kahlaave' (one who tells a story is a Kathak), the dancer weaves narrative episodes from the lives of Radha and Krishna or abstract rhythmic permutations set to complex time-cycles (Tala). The art form evolved through three distinct gharanas (schools): Lucknow (renowned for emotional grace and delicate Abhinaya), Jaipur (celebrated for dizzying foot speed and athletic virtuosity), and Banaras (known for meditative spiritual purity). Synchronizing directly with the Tabla and Pakhawaj, the dancer communicates through spoken mnemonic syllables (Bols) before executing them with razor-sharp physical precision.",
  culturalRole: "Kathak represents the pinnacle of North Indian classical confluence, bridging sacred Hindu temple ritual with the sophisticated etiquette (Tehzeeb) of the royal Awadhi courts. It is an intellectual and physical repository of complex mathematical rhythm cycles, poetry, devotional literature (Bhakti), and courtly heritage, maintaining living lineages across generations of master gurus.",
  festivalConnection: "Janmashtami, Holi, Lucknow Mahotsav, Ganga Mahotsav in Varanasi, and classical music festivals across northern India.",
  heritageConnection: "Taj Mahal and Agra Fort (Mughal court dance venues), the sacred Ghats and Kashi Vishwanath Temple of Varanasi, and the Bara Imambara and Qaiserbagh palaces of Lucknow.",
  costume: "Two traditional variations: The Hindu temple attire featuring a bright silk Ghagra-Choli with a sheer embroidered Odhani, or the regal Mughal court Anarkali frock-style tunic worn over snug Churidar pants with a jeweled waist sash. Dancers wear dense cords of 100 to 150 brass Ghungroos on each ankle, complemented by silver or Kundan jewelry.",
  music: "Hindustani classical music set to classical ragas, powered by cyclic rhythms (Teentaal, Dhamar, Ektaal) and accompanied by emotive Thumri, Dadra, Ghazal, and Dhrupad vocal compositions.",
  instruments: [
    "Tabla (pair of tuned hand drums)",
    "Pakhawaj (barrel-shaped classical drum)",
    "Sarangi (bowed multi-string instrument)",
    "Bansuri (bamboo flute)",
    "Harmonium"
  ],
  facts: [
    "The name 'Kathak' is derived from the Sanskrit word 'Katha', meaning story, and 'Kathakar', meaning storyteller.",
    "Nawab Wajid Ali Shah of Awadh was an accomplished Kathak dancer and poet who spent vast royal treasury patronizing the Lucknow Gharana.",
    "Kathak is the only Indian classical dance tradition that features both Hindu temple and Indo-Islamic courtly lineages.",
    "A master Kathak dancer can execute up to 27 rapid continuous pirouettes (Chakkars) on a single heel without losing balance or rhythm.",
    "Kathak dancers can isolate individual bells (Ghungroos) on their feet, ringing just one bell while keeping the remaining 99 silent.",
    "The legendary Pandit Birju Maharaj took Kathak to global opera stages, blending intricate mathematics with sublime emotional depth."
  ],
  objects: [
    "Dense Ghungroo ankle cords containing over 100 tuned bell clusters",
    "Carved Sheesham wood Tabla and Bayan with syahi black tuning paste",
    "Classic Awadhi flared Anarkali silk costume with gold Zari border",
    "Traditional 39-string bowed Sarangi carved from a single block of wood",
    "Kundan-set Jhumar hair ornament and pearl choker"
  ],
  modelPath: null,
  thumbnail: "assets/thumbnails/kathak.jpg",
  videoUrl: "https://www.youtube-nocookie.com/embed/hpKtU21PVu0",
  youtubeId: "hpKtU21PVu0",
  videoTitle: "Uttar Pradesh — Kathak Classical Showcase",
  arVrPotential: "Volumetric capture enables interactive step-by-step masterclasses where learners in VR see ghosted biomechanical tracking lines showing foot strike angles, torso alignment, and spin momentum vectors.",
  threeDExperience: "In this 3D studio, observe the statuesque verticality of the Kathak posture: analyzing the multi-tiered bell geometry of the ankle Ghungroos, the acoustic tension spikes of the Tabla's black tuning paste, and the rotational silhouette of the Awadhi silk skirt."
};

if (typeof window !== 'undefined') {
  window.YUGMA_STATES_DATA = window.YUGMA_STATES_DATA || {};
  window.YUGMA_STATES_DATA["state_04"] = state_04_data;
  window.YUGMA_STATES_DATA["uttar_pradesh"] = state_04_data;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = state_04_data;
}
