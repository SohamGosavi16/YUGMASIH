/**
 * YUGMA — Living Cultural Tradition Dataset
 * State 12: Bihar — Madhubani / Mithila Art
 */

const state_12_data = {
  id: "state_12",
  state: "Bihar",
  tradition: "Madhubani / Mithila Art",
  category: "Living Cultural Tradition",
  region: "Eastern India",
  origin: "Ancient folk art tradition practiced by women in the Mithila region of Bihar. According to legend, King Janaka of Mithila commissioned local artists to paint palace walls with vibrant murals for the wedding of his daughter Sita to Lord Rama. Passed down through maternal lineages across generations.",
  period: "Ancient Epic Antiquity (Ramayana Era) to 14th Century CE (Karnata Dynasty) to Present",
  description: "Madhubani (or Mithila) painting is an ancient, highly stylized visual art tradition of Bihar characterized by intricate line work, double outlines filled with fine cross-hatching, vibrant natural mineral and vegetable dyes, and symbolic depictions of nature and divinity. Created on freshly plastered mud and cow-dung walls (Bhitti Chitra), floors (Aripana), and handmade paper, the art form encompasses five distinct stylistic schools: Bharni (bold jewel-toned pigment fills), Katchni (delicate, monochromatic fine-line cross-hatching), Tantrik (esoteric sacred geometric yantras), Godna (concentric tattoo-inspired motifs), and Kohbar (auspicious bridal chamber murals depicting lotuses, fish, and turtles symbolizing fertility and cosmic union). Artists traditionally work using twigs, sharpened bamboo nibs, cotton rags, and matchsticks without preliminary sketching, filling every millimeter of surface with sacred decorative geometry.",
  culturalRole: "Madhubani painting has served as a powerful medium of maternal storytelling, ritual sanctity, and female empowerment in Mithila. Traditionally created during sacred rites of passage (births, initiations, marriages), it has evolved into a globally recognized fine art form that provides financial autonomy and social recognition to thousands of rural women artisans across Bihar.",
  festivalConnection: "Chhath Puja (Bihar's greatest sun-worship festival), Vivaha Panchami (celebrating Sita-Rama's wedding in Mithila), Madhushravani, and Sama Chakeva.",
  heritageConnection: "Mahabodhi Temple in Bodh Gaya (UNESCO World Heritage Site marking Buddha's enlightenment), the ancient international university ruins of Nalanda Mahavihara, and the historic cultural landscape of Madhubani and Darbhanga.",
  costume: "Traditional hand-spun Tussar silk sarees hand-painted with authentic Madhubani mythological motifs, bordered with intricate fish and lotus patterns. Artisans wear traditional silver Hasli chokers, glass bangles, and a vermilion Sindoor mark.",
  music: "Traditional Maithili folk songs and Sohar (birth songs), Samdauni (farewell songs), and Batgamani sung by women in chorus while painting communal murals.",
  instruments: [
    "Dholak (two-headed folk drum)",
    "Harmonium",
    "Manjira (brass clappers)",
    "Bansuri (flute)",
    "Ektara (single-string drone)"
  ],
  facts: [
    "Madhubani painting was completely unknown to the outside world until the catastrophic Bihar earthquake of 1934, when British officer William G. Archer uncovered stunning interior murals in collapsed mud homes.",
    "The pigments used in traditional Madhubani are 100% natural: black from soot/lampblack, yellow from turmeric and lime, blue from indigo, green from wood-apple leaves, and red from kusum flowers or red sandalwood.",
    "A fundamental rule of Madhubani art is 'horror vacui'—artists leave no empty space on the canvas, filling every void with stylized leaves, birds, fish, and floral dots.",
    "Fish symbolize fertility and good luck, turtles represent union and protection, and lotuses represent feminine creative energy.",
    "Legendary artist Ganga Devi received the Padma Shri for elevating Madhubani art into major international modern art museums worldwide.",
    "In 2007, Madhubani Painting was granted Geographical Indication (GI) tag status, legally protecting its authentic Mithila heritage."
  ],
  objects: [
    "Handmade Lokta/Cowdung-primed canvas scroll with Kohbar marriage motifs",
    "Set of sharpened river-reed bamboo dip pens (Kalam) and cotton swabs",
    "Collection of terracotta bowls containing natural crushed turmeric, indigo, and soot pigments",
    "Hand-painted Tussar Silk Saree displaying the Tree of Life (Jeevan Vriksha)",
    "Carved wooden printing blocks featuring traditional Mithila fish and peacock outlines"
  ],
  modelPath: null,
  thumbnail: "assets/thumbnails/madhubani.jpg",
  videoUrl: "https://www.youtube-nocookie.com/embed/FhvLY9ZnbzI",
  youtubeId: "FhvLY9ZnbzI",
  videoTitle: "Bihar — Madhubani / Mithila Art Showcase",
  arVrPotential: "VR spatial recreation of a traditional Mithila mud home's Kohbar Ghar (nuptial chamber), where users can walk inside the painted walls and use virtual bamboo kalam dip-pens to paint authentic natural pigments in 3D space.",
  threeDExperience: "In this 3D studio, immerse yourself in the sacred graphic geometry of Mithila: inspecting the fibrous handmade paper texture, the organic pigmentation of crushed indigo and turmeric, and the microscopic double-line cross-hatching of the sacred Tree of Life."
};

if (typeof window !== 'undefined') {
  window.YUGMA_STATES_DATA = window.YUGMA_STATES_DATA || {};
  window.YUGMA_STATES_DATA["state_12"] = state_12_data;
  window.YUGMA_STATES_DATA["bihar"] = state_12_data;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = state_12_data;
}
