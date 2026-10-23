/**
 * YUGMA — Living Cultural Tradition Dataset
 * State 07: Karnataka — Yakshagana
 */

const state_07_data = {
  id: "state_07",
  state: "Karnataka",
  tradition: "Yakshagana",
  category: "Living Cultural Tradition",
  region: "Southern India",
  origin: "Emerged during the Bhakti movement along the coastal (Karavali) and Western Ghats (Malenadu) districts of Karnataka around the 11th to 16th centuries CE. Highly patronized by the monarchs of the Vijayanagara Empire, it synthesizes classical Sanskrit theatrical canons with dynamic indigenous Dravidian folklore, martial acrobatics, and impromptu Kannada dialogues.",
  period: "11th–16th Century CE (Vijayanagara Empire) to Present",
  description: "Yakshagana (literally 'the song of celestial beings') is a monumental traditional theatre and dance-drama form of Karnataka, distinguished by towering, gilded turbans (Pagade), hyper-elaborate facial makeup, dazzling costumes, thunderous drumming, and high-octane martial leaps and pirouettes. Traditionally staged all night long in open-air paddy fields (Bayalata), Yakshagana dramatizes grand mythological episodes (Prasangas) from the Mahabharata, Ramayana, and Puranas. The performance operates under the live artistic leadership of the Himmela (the musical troupe led by the master narrator-singer or Bhagavatha), who sings verses while the Mummela (costumed actors) improvise spoken dialogues and unleash explosive, spin-heavy battle choreographies accompanied by the deafening crack of the Chande and the rumbling cadence of the Maddale drums.",
  culturalRole: "Yakshagana functions as a living university of morals, mythological wisdom, and social discourse in coastal Karnataka. It preserves archaic classical Kannada linguistic idioms, instills moral values across village communities, and provides communal catharsis through electrifying live theatre, uniting rural farmers and urban intellectuals across generational divides.",
  festivalConnection: "Navaratri, Deepavali, Ugadi, and annual temple chariot festivals (Jatras) celebrated across Udupi, Mangalore, Shimoga, and Uttara Kannada.",
  heritageConnection: "Hampi (the UNESCO World Heritage capital of the Vijayanagara Empire with stone reliefs of dancers and musicians), Hoysaleswara Temple in Halebidu, and the Sri Krishna Temple in Udupi.",
  costume: "Colossal wooden headgear (Mundasa and Pagade) carved from light Balsa wood and decorated with gold foil, mirrored glass, and colored ribbons; padded shoulder guards (Bhujakeerthi), chest armor (Edebadike), red and yellow striped baggy trousers (Dhabbu Kase), and intense natural facial makeup with distinct symbolic color codes for noble kings, demons, and celestial beings.",
  music: "High-volume, dramatic musical narration combining Yakshagana Ragas (incorporating both Carnatic and ancient regional scales) with fast, sharp percussion strikes.",
  instruments: [
    "Chande (loud, high-pitched cylindrical drum beaten with thin canes)",
    "Maddale (horizontal double-headed wooden barrel drum)",
    "Taala / Chaktala (pair of heavy brass bell-metal cymbals)",
    "Harmonium",
    "Pungi / Shruti Box"
  ],
  facts: [
    "The word 'Yakshagana' literally means the celestial song or music of the Yakshas (divine nature spirits in Hindu cosmology).",
    "Traditional Yakshagana performances are held outdoors throughout the entire night, from dusk until the break of dawn.",
    "The Bhagavatha acts as the director, narrator, musical conductor, and master of ceremonies on stage, guiding the actors' improvisations.",
    "There are two primary regional styles: Tenkutittu (Southern school, renowned for Carnatic music and lightning-fast spins) and Badagutittu (Northern school, famed for colossal headdresses and martial jumps).",
    "The massive Pagade headdress can measure over 3 feet in width and require elaborate balancing skill during multi-spin choreographies.",
    "Legendary scholar and dramatist Dr. K. Shivarama Karanth revolutionized Yakshagana by streamlining choreographies and introducing it to international audiences."
  ],
  objects: [
    "Towering carved wood and gold-foiled Badagutittu Mundasa / Pagade headdress",
    "Heavy wooden Bhujakeerthi (winged shoulder guards) with gilded mirror inlays",
    "Authentic cylindrical Chande drum with cane beating sticks",
    "Carved Jackwood Maddale barrel drum with tuning pastes",
    "Ornate Edebadike chest armor plate with mirrored sunburst medallion"
  ],
  modelPath: null,
  thumbnail: "assets/thumbnails/yakshagana.jpg",
  videoUrl: "https://www.youtube-nocookie.com/embed/qUYWZXHL8JU",
  youtubeId: "qUYWZXHL8JU",
  videoTitle: "Karnataka — Yakshagana Cultural Showcase",
  arVrPotential: "VR night-sky environment simulation of a traditional village Bayalata performance field in coastal Karnataka, allowing users to inspect the multi-layered Balsa-wood headdress up close while feeling the directional audio thud of the Chande drum.",
  threeDExperience: "In this 3D studio, explore the colossal sculptural presence of the Yakshagana warrior persona: inspecting the intricate gilded filigree of the Mundasa headdress, the wooden wing-like Bhujakeerthi shoulder armor, and the resonant cane-struck skin of the sacred Chande drum."
};

if (typeof window !== 'undefined') {
  window.YUGMA_STATES_DATA = window.YUGMA_STATES_DATA || {};
  window.YUGMA_STATES_DATA["state_07"] = state_07_data;
  window.YUGMA_STATES_DATA["karnataka"] = state_07_data;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = state_07_data;
}
