/**
 * YUGMA — Living Cultural Tradition Dataset
 * State 10: Assam — Bihu
 */

const state_10_data = {
  id: "state_10",
  state: "Assam",
  tradition: "Bihu",
  category: "Living Cultural Tradition",
  region: "North-Eastern India",
  origin: "Emanates from the ancient agrarian cycles and fertility celebrations of indigenous Tibeto-Burman and Austroasiatic communities in the fertile Brahmaputra River valley. Given grand royal patronage by the Ahom kings (Swargadeos) from the 13th to 18th centuries CE, who invited village folk troupes to perform in the royal sports amphitheater of Rang Ghar in Rongpur (Sivasagar).",
  period: "13th Century CE (Ahom Kingdom Patronage) to Present",
  description: "Bihu is an exuberant, joy-drenched folk dance and musical celebration of Assam that heralds the arrival of the spring harvest season and the Assamese New Year (Rongali or Bohag Bihu). Performed by young men and women in lush tea gardens, village greens, and riverbanks, the dance radiates youth, vitality, and romance. Dancers move with rapid, fluttering hand movements, rhythmic hip thrusts, sudden drops, and synchronized formations. The men beat the thunderous Dhol and blow the piercing, curved Buffalo-horn Pepa, while the women, dressed in golden Muga silk, weave intricate circular choreographies that mirror the flight of birds and the blossoming of orchids in the eastern Himalayas. The atmosphere is saturated with earthy love lyrics (Bihu Geet), infectious laughter, and unrestrained communal camaraderie.",
  culturalRole: "Bihu is the quintessential secular symbol of Assamese cultural identity (Asomiya). Transcending caste, tribe, and religion, it binds diverse ethnic groups together in communal gratitude for agricultural fertility. It honors the sacred relationship between human labor, the life-giving waters of the Brahmaputra River, and seasonal renewal.",
  festivalConnection: "Bohag (Rongali) Bihu in mid-April (celebrating the Assamese New Year and spring sowing), Kati (Kongali) Bihu in October (reverent lamp-lighting for crop protection), and Magh (Bhogali) Bihu in January (post-harvest bonfire feasts).",
  heritageConnection: "Rang Ghar in Sivasagar (Asia's oldest surviving royal sports and festival amphitheater, built by Ahom King Pramatta Singha in 1746 CE), Sivasagar Sivadol, and the lush riverine landscapes of Majuli Island.",
  costume: "Exquisite two-piece Mekhela Chador woven from natural golden-yellow Muga Silk (the exclusive wild silk of Assam that shines brighter with every wash), decorated with bright red Kingkhap floral motifs. Dancers wear fresh Kopou Phool (foxtail orchids) in their hair, bright red coral and gold Gamkharu bracelets, Junbiri moon-shaped necklaces, and red Alta dye.",
  music: "High-tempo, infectious folk melodies characterized by rapid drum syncopations, joyous call-and-response vocal refrains, and the melancholic, wailing timbre of the buffalo-horn hornpipe.",
  instruments: [
    "Bihu Dhol (double-headed wooden drum beaten with stick and hand)",
    "Pepa (indigenous hornpipe crafted from wild water-buffalo horn and bamboo)",
    "Gogona (bamboo jaw harp played using mouth resonance)",
    "Toka (slit bamboo clapper)",
    "Xutuli (clay whistle shaped like a fish or bird)"
  ],
  facts: [
    "The golden Muga silk used in Bihu costumes is produced exclusively in Assam from the wild silkworm Antheraea assamensis and has a natural golden sheen that lasts centuries.",
    "The Pepa is crafted from the shed horn of the wild Asiatic water buffalo, fitted with a bamboo reed and brass ferrule.",
    "The Kopou Phool (foxtail orchid) that blooms in mid-April is an indispensable symbol of youth, love, and the arrival of Bohag Bihu.",
    "In April 2023, Assam entered the Guinness World Records when 11,304 Bihu dancers and drummers performed simultaneously in Guwahati.",
    "The ancient Ahom kings viewed Bihu performances from the upper royal pavilion of Rang Ghar, making it one of Asia's earliest state-patronized festivals.",
    "The Gogona, carved from a single piece of dried bamboo, is pressed against the performer's teeth to amplify vibration with vocal mouth shapes."
  ],
  objects: [
    "Carved Buffalo-horn Pepa with engraved brass fittings and bamboo reed",
    "Traditional Assamese Bihu Dhol drum with braided leather straps",
    "Handcrafted Bamboo Gogona jaw harp with fine vibrating tongue",
    "Golden Muga Silk Mekhela Chador with crimson Kingkhap woven embroidery",
    "Crescent-shaped Gold Junbiri and Dholbiri pendant necklace"
  ],
  modelPath: null,
  thumbnail: "assets/thumbnails/bihu.jpg",
  videoUrl: "https://www.youtube-nocookie.com/embed/4buWapbwT0E",
  youtubeId: "4buWapbwT0E",
  videoTitle: "Assam — Bihu Folk Showcase",
  arVrPotential: "Spatial environmental AR mapping allows users to place the Ahom royal amphitheater of Rang Ghar onto open surfaces, stepping inside the arena while interactive 3D audio simulates the surrounding roar of 100 Bihu Dhols and Pepas.",
  threeDExperience: "In this 3D studio, inspect the organic material heritage of Assam's living tradition: exploring the dark natural curve of the wild buffalo-horn Pepa, the shimmering golden grain of pure wild Muga silk, and the handcrafted bamboo elasticity of the indigenous Toka clapper."
};

if (typeof window !== 'undefined') {
  window.YUGMA_STATES_DATA = window.YUGMA_STATES_DATA || {};
  window.YUGMA_STATES_DATA["state_10"] = state_10_data;
  window.YUGMA_STATES_DATA["assam"] = state_10_data;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = state_10_data;
}
