/**
 * YUGMA — Living Cultural Tradition Dataset
 * State 02: Gujarat — Garba
 */

const state_02_data = {
  id: "state_02",
  state: "Gujarat",
  tradition: "Garba",
  category: "Living Cultural Tradition",
  region: "Western India",
  origin: "Emanating from ancient Vedic Shakti worship in Gujarat, centered on the sacred 'Garbha Deep'—a perforated earthen vessel sheltering an eternal wick flame. Inscribed by UNESCO on the Representative List of the Intangible Cultural Heritage of Humanity in 2023.",
  period: "Ancient Roots (Vedic & Puranic Era) codified by 15th Century CE to Present",
  description: "Garba is a devotional, circular community folk dance of Gujarat performed with ecstatic reverence during the nine nights of Navratri to worship Goddess Durga and her feminine manifestations. The dancers move rhythmically in concentric counter-clockwise rings, mimicking the cyclical nature of time (Kalachakra), life, death, and cosmic rebirth around a centrally illuminated clay lantern or image of the Divine Mother. Characterized by synchronized hand-clapping (be-taali and tran-taali), graceful twirls, rhythmic body bends, and sweeping arm gestures, Garba fosters total social equality, bringing together thousands of people regardless of caste, age, or background. Accompanied by dhol beats, shehnai, and devotional singing, the tempo escalates from meditative slowness to an electrifying, high-energy crescendo that embodies cosmic spiritual ecstasy.",
  culturalRole: "Garba is the communal heartbeat of Gujarati identity, embodying egalitarian participation where everyone dances together in unity without hierarchy. It strengthens inter-generational bonds, reinforces devotion to the sacred feminine principle (Shakti), and serves as an exuberant global symbol of Indian festival culture celebrated across diaspora communities worldwide.",
  festivalConnection: "Sharad Navratri (celebrated over 9 consecutive nights across Gujarat), Sharad Purnima, Vasant Panchami, and community harvest celebrations.",
  heritageConnection: "Rani ki Vav (the subterranean stepwell of Patan celebrating water divinity and Goddess sculptures) and the 11th-century Sun Temple of Modhera, where the iconic Modhera Dance Festival honors classical and folk traditions.",
  costume: "Vibrant three-piece Chaniya Choli: heavily flared skirt (Ghagra) adorned with real Abhala (mirror work), intricate Rabari or Kutchi embroidery, bandhani tie-dye prints, and cowrie shells; paired with an embroidered choli and Bandhani Dupatta draped gracefully. Dancers wear antique oxidized silver jewelry (Kada, Jhumkas, Hasli, Kamarbandh) and traditional Mojari footwear.",
  music: "Rhythmic devotional songs dedicated to Amba, Kali, and Krishna; beginning with slow spiritual invocations (Aarti and Stuti) that accelerate dynamically into rapid syncopated claps and foot-stamps.",
  instruments: [
    "Dhol (large double-headed wooden barrel drum)",
    "Dholak (smaller hand drum for intricate fills)",
    "Tabla",
    "Harmonium",
    "Shehnai / Nagada"
  ],
  facts: [
    "In December 2023, UNESCO officially inscribed Gujarat's Garba on the Representative List of the Intangible Cultural Heritage of Humanity.",
    "The word 'Garba' derives from the Sanskrit term 'Garbha', meaning womb, honoring the Goddess as the divine womb of the universe.",
    "The circular movement in Garba symbolizes the eternal cycle of existence (Samsara), reminding dancers that God remains the still center in an ever-changing world.",
    "Traditional Garba is performed with bare feet as an act of sacred respect and direct grounding connection with Mother Earth (Bhumi).",
    "Vadodara (Baroda) hosts the world's largest non-commercial Navratri Garba gathering, with over 50,000 dancers moving in unison each night.",
    "The three-clap sequence (Tran-Taali) honors the three cosmic energies: Brahma (creation), Vishnu (preservation), and Shiva (transformation)."
  ],
  objects: [
    "Perforated Terracotta Garbha Deep lantern with burning diya flame",
    "Mirror-embroidered Kutchi Chaniya Choli with mirrorwork tassel borders",
    "Heavy carved Gujarati Dhol with leather lacing and brass tension rings",
    "Pair of handcrafted wooden Dandiya sticks wrapped in metallic bandhani foil",
    "Hand-forged Oxidized Silver Hasli choker and multi-ringed Hansli necklace"
  ],
  modelPath: null,
  thumbnail: "assets/thumbnails/garba.jpg",
  videoUrl: "https://www.youtube-nocookie.com/embed/gZjNpNuaPLw",
  youtubeId: "gZjNpNuaPLw",
  videoTitle: "Gujarat — Garba Cultural Showcase",
  arVrPotential: "VR spatial audio simulation can recreate the colossal acoustic resonance of thousands of synchronized hand-claps and swirling mirrors inside a full 360-degree digital twin of Modhera Sun Temple or Vadodara festival grounds.",
  threeDExperience: "In this 3D studio, examine the radial symmetry of the Garba circle: inspecting the micro-facets of real Kutchi mirrorwork catching candlelight, the acoustic tension ropes of the wooden Dhol, and the sacred sacred geometry of the central perforated Garbha Deep."
};

if (typeof window !== 'undefined') {
  window.YUGMA_STATES_DATA = window.YUGMA_STATES_DATA || {};
  window.YUGMA_STATES_DATA["state_02"] = state_02_data;
  window.YUGMA_STATES_DATA["gujarat"] = state_02_data;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = state_02_data;
}
